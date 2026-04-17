import { Party } from "../data/Party";
import { getPartyFullLabel, getPartyLabel } from "../data/partyData";
import { CamelCaseToSentence } from "./camelCaseToSentence";

export interface PartyPledgeStat {
  party: number;
  label: string;
  total: number;
  pledged: number;
  proportion: number;
}

export interface PartyInData {
  party: number;
  label: string;
  total: number;
}

export interface PartyFilterOption {
  party: number;
  total: number;
  label: string;
}

export interface ConstituencyFilterOption {
  key: string;
  label: string;
}

export function makeGetConstituencyKey(
  ConstituencyEnum: Record<number, string>,
  RegionEnum: Record<number, string>,
) {
  return (candidate: { Constituency?: number; Region?: number }): string => {
    if (candidate.Constituency !== undefined) {
      if (typeof candidate.Constituency === "number") {
        return `constituency:${ConstituencyEnum[candidate.Constituency] ?? ""}`;
      }

      return `constituency:${String(candidate.Constituency)}`;
    }

    if (candidate.Region !== undefined) {
      return `region:${RegionEnum[candidate.Region] ?? ""}`;
    }

    return "";
  };
}

export function makeGetConstituencyLabel(
  ConstituencyEnum: Record<number, string>,
  RegionEnum: Record<number, string>,
  fallback = "",
) {
  return (candidate: { Constituency?: number; Region?: number }): string => {
    if (candidate.Constituency !== undefined) {
      const label =
        typeof candidate.Constituency === "number"
          ? ConstituencyEnum[candidate.Constituency]
          : String(candidate.Constituency);

      return CamelCaseToSentence(label);
    }

    if (candidate.Region !== undefined) {
      return CamelCaseToSentence(RegionEnum[candidate.Region]);
    }

    return fallback;
  };
}

export function computeUniqueNames(candidates: { Name: string }[]): string[] {
  return Array.from(new Set(candidates.map((c) => c.Name))).sort();
}

export function computePartyFilterOptions(
  candidates: { Party: number }[],
): PartyFilterOption[] {
  const counts = new Map<number, number>();

  for (const c of candidates) {
    counts.set(c.Party, (counts.get(c.Party) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([party, total]) => ({
      party,
      total,
      label: getPartyFullLabel(party),
    }))
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.label.localeCompare(b.label);
    });
}

export function computeRegionOptions(
  RegionEnum: Record<string, string | number>,
): { value: number; label: string }[] {
  return Object.keys(RegionEnum)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: RegionEnum[key] as number,
      label: CamelCaseToSentence(key),
    }));
}

export function computeConstituencyFilterOptions<T>(
  candidates: T[],
  getConstituencyKey: (c: T) => string,
): ConstituencyFilterOption[] {
  return Array.from(
    new Set(candidates.map(getConstituencyKey).filter((key) => key !== "")),
  )
    .map((key) => ({
      key,
      label: CamelCaseToSentence(key.replace(/^constituency:|^region:/, "")),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function computePartiesInData(
  candidates: { Party: number }[],
): PartyInData[] {
  const counts = new Map<number, number>();

  for (const c of candidates) {
    counts.set(c.Party, (counts.get(c.Party) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .filter(([party]) => party !== Party.Independent)
    .map(([party, total]) => ({
      party,
      label: CamelCaseToSentence(Party[party]),
      total,
    }))
    .sort((a, b) => {
      if (b.total !== a.total) return b.total - a.total;
      return a.label.localeCompare(b.label);
    });
}

export function computePartyPledgeStats<T extends { Party: number }>(
  candidates: T[],
  isPledged: (c: T) => boolean,
): PartyPledgeStat[] {
  const stats = new Map<number, { total: number; pledged: number }>();

  for (const c of candidates) {
    const current = stats.get(c.Party) ?? { total: 0, pledged: 0 };
    current.total += 1;
    if (isPledged(c)) current.pledged += 1;
    stats.set(c.Party, current);
  }

  return Array.from(stats.entries())
    .map(([party, counts]) => ({
      party,
      label: getPartyLabel(party),
      total: counts.total,
      pledged: counts.pledged,
      proportion: counts.total === 0 ? 0 : counts.pledged / counts.total,
    }))
    .sort((a, b) => {
      const aHasPledges = a.pledged > 0 ? 1 : 0;
      const bHasPledges = b.pledged > 0 ? 1 : 0;
      if (bHasPledges !== aHasPledges) return bHasPledges - aHasPledges;
      if (b.total !== a.total) return b.total - a.total;
      if (b.proportion !== a.proportion) return b.proportion - a.proportion;
      if (b.pledged !== a.pledged) return b.pledged - a.pledged;
      return a.label.localeCompare(b.label);
    });
}

export function computePartyPledgeRank(
  stats: { party: number }[],
): Map<number, number> {
  const rank = new Map<number, number>();
  stats.forEach((item, index) => rank.set(item.party, index));
  return rank;
}

export function filterAndSortCandidates<
  T extends {
    Name: string;
    Party: number;
    Region?: number;
    RegionRank?: number;
  },
>(
  candidates: T[],
  filters: {
    nameFilter: string;
    partyFilter: number | "";
    regionFilter: number | "";
    constituencyFilter: string;
    supportFilter: boolean;
  },
  getConstituencyKey: (c: T) => string,
  isSupported: (c: T) => boolean,
  partyPledgeRank: Map<number, number>,
): T[] {
  return candidates
    .filter((c) => {
      const nameMatch = c.Name.toLowerCase().includes(
        filters.nameFilter.toLowerCase(),
      );
      const partyMatch =
        filters.partyFilter === "" || c.Party === filters.partyFilter;
      const regionMatch =
        filters.regionFilter === "" ||
        (c.Region !== undefined && c.Region === filters.regionFilter);
      const constituencyMatch =
        filters.constituencyFilter === "" ||
        getConstituencyKey(c) === filters.constituencyFilter;
      const supportMatch = !filters.supportFilter || isSupported(c);
      return (
        nameMatch &&
        partyMatch &&
        regionMatch &&
        constituencyMatch &&
        supportMatch
      );
    })
    .sort((a, b) => {
      const aRank = partyPledgeRank.get(a.Party) ?? Infinity;
      const bRank = partyPledgeRank.get(b.Party) ?? Infinity;
      if (aRank !== bRank) return aRank - bRank;
      if (
        a.Region !== undefined &&
        b.Region !== undefined &&
        a.Region === b.Region
      ) {
        return (a.RegionRank ?? Infinity) - (b.RegionRank ?? Infinity);
      }
      return 0;
    });
}
