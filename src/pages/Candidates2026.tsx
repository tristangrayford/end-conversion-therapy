import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Constituency, Region, Support, type Candidate } from "../data/Types26";
import { Party } from "../data/Party";
import {
  EMAIL_BODY_26,
  EMAIL_SUBJECT_26,
} from "../data/CandidateEmailTemplate26";
import { CamelCaseToSentence } from "../utils/camelCaseToSentence";
import { FullCandidateData26 } from "../data/Candidates2026";
import { GetPartyLogo } from "../utils/getPartyLogo";
import {
  makeGetConstituencyKey,
  makeGetConstituencyLabel,
  computeUniqueNames,
  computePartyFilterOptions,
  computeRegionOptions,
  computeConstituencyFilterOptions,
  computePartiesInData,
  computePartyPledgeStats,
  computePartyPledgeRank,
  filterAndSortCandidates,
} from "../utils/candidateUtils";
import { CandidateFilterControls } from "../components/candidates/CandidateFilterControls";
import { PartyPledgeTracker } from "../components/candidates/PartyPledgeTracker";
import { CandidatesTable } from "../components/candidates/CandidatesTable";
import { ManifestoTracker26 } from "../components/candidates/ManifestoTracker26";
import { renderSupportCell } from "../components/candidates/SupportCell";

const EMAIL_SUBJECT_PARAM_26 = encodeURIComponent(EMAIL_SUBJECT_26);
const EMAIL_BODY_PARAM_26 = encodeURIComponent(EMAIL_BODY_26).replace(
  /%0A/g,
  "%0D%0A",
);

const getConstituencyKey = makeGetConstituencyKey(Constituency, Region);
const getConstituencyLabel = makeGetConstituencyLabel(
  Constituency,
  Region,
  "Not published",
);

function Candidates2026() {
  const [nameFilter, setNameFilter] = useState("");
  const [partyFilter, setPartyFilter] = useState<number | "">("");
  const [regionFilter, setRegionFilter] = useState<number | "">("");
  const [constituencyFilter, setConstituencyFilter] = useState("");
  const [supportFilter, setSupportFilter] = useState(false);
  const filterByParty = (party: number) => {
    setNameFilter("");
    setRegionFilter("");
    setConstituencyFilter("");
    setPartyFilter((prev) => (prev === party ? "" : party));
  };
  const uniqueNames = useMemo(
    () => computeUniqueNames(FullCandidateData26),
    [],
  );

  const partyFilterOptions = useMemo(
    () => computePartyFilterOptions(FullCandidateData26),
    [],
  );

  const regionOptions = useMemo(() => computeRegionOptions(Region), []);

  const constituencyFilterOptions = useMemo(
    () =>
      computeConstituencyFilterOptions(FullCandidateData26, getConstituencyKey),
    [],
  );

  const partiesInData = useMemo(
    () => computePartiesInData(FullCandidateData26),
    [],
  );

  const partyPledgeStats = useMemo(
    () =>
      computePartyPledgeStats(
        FullCandidateData26,
        (c) =>
          c.SupportBan === Support.Yes &&
          c.SupportLife === Support.Yes &&
          c.SupportHealthcare === Support.Yes,
      ),
    [],
  );

  const partyPledgeRank = useMemo(
    () => computePartyPledgeRank(partyPledgeStats),
    [partyPledgeStats],
  );

  const filteredData = useMemo(
    () =>
      filterAndSortCandidates(
        FullCandidateData26,
        {
          nameFilter,
          partyFilter,
          regionFilter,
          constituencyFilter,
          supportFilter,
        },
        getConstituencyKey,
        (c) =>
          c.SupportBan === Support.Yes ||
          c.SupportLife === Support.Yes ||
          c.SupportHealthcare === Support.Yes,
        partyPledgeRank,
      ),
    [
      nameFilter,
      partyFilter,
      regionFilter,
      constituencyFilter,
      supportFilter,
      partyPledgeRank,
    ],
  );

  const columnHelper = createColumnHelper<Candidate>();

  const columns = [
    columnHelper.accessor("Name", {
      header: () => "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Email", {
      header: () => "Email your candidate",
      cell: (info) => {
        const email = info.getValue();
        if (!email) {
          return "";
        }

        return (
          <a
            href={`mailto:${email}?subject=${EMAIL_SUBJECT_PARAM_26}&body=${EMAIL_BODY_PARAM_26}`}
            className="email-button"
            aria-label={`Email ${email}`}
          >
            Email
          </a>
        );
      },
    }),
    columnHelper.accessor("Party", {
      header: () => "Party",
      cell: (info) => {
        const party = info.getValue();
        const partyLabel = Party[party];

        return (
          <div className="party">
            {GetPartyLogo(party)}
            <p>{CamelCaseToSentence(partyLabel)}</p>
          </div>
        );
      },
    }),
    columnHelper.accessor("SupportBan", {
      header: () => "Supports a Ban",
      cell: (info) =>
        renderSupportCell(
          info.getValue(),
          Support,
          Support.Yes,
          Support.YesWithCaveats,
          Support.No,
        ),
    }),
    columnHelper.accessor("SupportLife", {
      header: () => "Supports an Inclusive Society",
      cell: (info) =>
        renderSupportCell(
          info.getValue(),
          Support,
          Support.Yes,
          Support.YesWithCaveats,
          Support.No,
        ),
    }),
    columnHelper.accessor("SupportHealthcare", {
      header: () => "Supports Trans Healthcare",
      cell: (info) =>
        renderSupportCell(
          info.getValue(),
          Support,
          Support.Yes,
          Support.YesWithCaveats,
          Support.No,
        ),
    }),
    columnHelper.accessor("Region", {
      header: () => "Region",
      cell: (info) => {
        const region = info.getValue();
        return (
          <span className="nowrap-cell">
            {CamelCaseToSentence(
              region === undefined ? undefined : Region[region],
            )}
          </span>
        );
      },
    }),
    columnHelper.accessor("RegionRank", {
      header: () => "List Rank",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Constituency", {
      header: () => "Constituency",
      cell: (info) => {
        return getConstituencyLabel(info.row.original);
      },
    }),
    columnHelper.accessor("Statement", {
      header: () => "Statement",
      cell: (info) => <div className="statement-cell">{info.getValue()}</div>,
    }),
  ];
  const options: TableOptions<Candidate> = {
    columns: columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
  };
  const table = useReactTable(options);
  return (
    <div className="page-content">
      <h2>Candidates 2026</h2>
      <ManifestoTracker26
        partiesInData={partiesInData}
        onPartyClick={filterByParty}
      />
      <PartyPledgeTracker
        stats={partyPledgeStats}
        onPartyClick={filterByParty}
      />
      <CandidateFilterControls
        idPrefix=""
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        partyFilter={partyFilter}
        setPartyFilter={setPartyFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
        constituencyFilter={constituencyFilter}
        setConstituencyFilter={setConstituencyFilter}
        supportFilter={supportFilter}
        setSupportFilter={setSupportFilter}
        uniqueNames={uniqueNames}
        partyOptions={partyFilterOptions}
        regionOptions={regionOptions}
        constituencyOptions={constituencyFilterOptions}
      />
      <CandidatesTable
        table={table}
        columnCount={columns.length}
        emptyMessage="No candidate data available yet."
      />
    </div>
  );
}

export default Candidates2026;
