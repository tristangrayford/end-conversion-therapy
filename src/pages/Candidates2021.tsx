import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  type TableOptions,
} from "@tanstack/react-table";
import { Constituency, Region, Support, type Candidate } from "../data/Types21";
import { Party } from "../data/Party";
import { FullCandidateData } from "../data/Candidates2021";
import { CamelCaseToSentence } from "../utils/camelCaseToSentence";
import { GetPartyLogo } from "../utils/getPartyLogo";
import { useMemo, useState } from "react";
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
import { ManifestoTracker21 } from "../components/candidates/ManifestoTracker21";

const getConstituencyKey = makeGetConstituencyKey(Constituency, Region);
const getConstituencyLabel = makeGetConstituencyLabel(Constituency, Region);

function Candidates2021() {
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

  const uniqueNames = useMemo(() => computeUniqueNames(FullCandidateData), []);

  const partyFilterOptions = useMemo(
    () => computePartyFilterOptions(FullCandidateData),
    [],
  );

  const regionOptions = useMemo(() => computeRegionOptions(Region), []);

  const constituencyFilterOptions = useMemo(
    () =>
      computeConstituencyFilterOptions(FullCandidateData, getConstituencyKey),
    [],
  );

  const partiesInData = useMemo(
    () => computePartiesInData(FullCandidateData),
    [],
  );

  const partyPledgeStats = useMemo(
    () =>
      computePartyPledgeStats(
        FullCandidateData,
        (c) => c.Support === Support.Yes,
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
        FullCandidateData,
        {
          nameFilter,
          partyFilter,
          regionFilter,
          constituencyFilter,
          supportFilter,
        },
        getConstituencyKey,
        (c) => c.Support === Support.Yes,
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
    columnHelper.accessor("Party", {
      header: () => "Party",
      cell: (info) => {
        return (
          <div className="party">
            {GetPartyLogo(info.getValue())}
            <p>{CamelCaseToSentence(Party[info.getValue()])}</p>
          </div>
        );
      },
    }),
    columnHelper.accessor("Support", {
      header: () => "Support",
      cell: (info) => CamelCaseToSentence(Support[info.getValue()]),
    }),
    columnHelper.accessor("Region", {
      header: () => "Region",
      cell: (info) =>
        info.getValue() == undefined
          ? "" // @ts-expect-error Type 'undefined' cannot be used as an index type
          : CamelCaseToSentence(Region[info.getValue()]),
    }),
    columnHelper.accessor("RegionRank", {
      header: () => "Rank",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("Constituency", {
      header: () => "Constituency",
      cell: (info) => getConstituencyLabel(info.row.original),
    }),
    columnHelper.accessor("Statement", {
      header: () => "Statement",
      cell: (info) => info.getValue(),
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
      <h2>Candidates 2021</h2>
      <ManifestoTracker21
        partiesInData={partiesInData}
        onPartyClick={filterByParty}
      />
      <PartyPledgeTracker
        stats={partyPledgeStats}
        onPartyClick={filterByParty}
        pledgeLabel="supported"
      />
      <CandidateFilterControls
        idPrefix="21"
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
      <CandidatesTable table={table} columnCount={columns.length} />
    </div>
  );
}

export default Candidates2021;
