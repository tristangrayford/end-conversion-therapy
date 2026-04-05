import { Party } from "./Party";
import { CamelCaseToSentence } from "../utils/camelCaseToSentence";

export const PARTY_SHORT_NAMES: Partial<Record<Party, string>> = {
  [Party.ScottishNationalParty]: "SNP",
  [Party.ScottishGreenParty]: "SGP",
  [Party.ScottishLiberalDemocrats]: "LibDems",
  [Party.ScottishConservativeParty]: "Conservatives",
  [Party.ScottishLabourParty]: "Labour",
  [Party.UkIndependenceParty]: "UKIP",
  [Party.IndependenceForScotlandParty]: "IFSP",
  [Party.TradeUnionistAndSocialistCoalition]: "TUSC",
  [Party.IndependentGreenVoice]: "IGV",
};

export const PARTY_COLORS: Partial<Record<Party, string>> = {
  [Party.ScottishNationalParty]: "#FDF38E",
  [Party.ScottishGreenParty]: "#00A651",
  [Party.ScottishLiberalDemocrats]: "#FAA61A",
  [Party.ScottishConservativeParty]: "#0087DC",
  [Party.ScottishLabourParty]: "#E4003B",
  [Party.AlbaParty]: "#005EB8",
  [Party.ReformUkScotland]: "#12B6CF",
  [Party.Reform]: "#12B6CF",
  [Party.ScottishFamilyParty]: "#002395",
  [Party.ScottishSocialistParty]: "#CC0000",
  [Party.CommunistPartyOfBritain]: "#CC0000",
  [Party.UkIndependenceParty]: "#70147A",
  [Party.ScottishLibertarianParty]: "#F4C430",
  [Party.Independent]: "#AAAAAA",
  [Party.IndependentGreenVoice]: "#4CAF50",
  [Party.ScottishWorkersPartyOfBritain]: "#D32F2F",
  [Party.IndependenceForScotlandParty]: "#0052A4",
  [Party.AnimalWelfareParty]: "#41924B",
  [Party.HeritageParty]: "#722F37",
  [Party.EqualityParty]: "#7B2D8E",
  [Party.AllianceToLiberateScotland]: "#0065BF",
  [Party.AllianceForDemocracyAndFreedom]: "#2C7A7B",
  [Party.AdvanceUK]: "#4A90D9",
  [Party.EdinburghEastLothianPeople]: "#6B8E23",
  [Party.ScottishCommonParty]: "#607D8B",
  [Party.AllForUnity]: "#1C3A6E",
  [Party.TradeUnionistAndSocialistCoalition]: "#E5004B",
  [Party.ScottishWomensEqualityParty]: "#7B2D8E",
  [Party.SocialDemocraticParty]: "#C41E3A",
  [Party.ScottishRenew]: "#2E86C1",
  [Party.VanguardParty]: "#333333",
  [Party.FreedomAlliance]: "#D4A017",
  [Party.ReclaimParty]: "#1B3A5C",
  [Party.LiberalParty]: "#FDBB30",
  [Party.RestoreScotland]: "#4682B4",
  [Party.ScotiaFuture]: "#2E8B57",
  [Party.AbolishTheScottishParliamentParty]: "#8B0000",
};

export const getPartyLabel = (party: Party): string =>
  PARTY_SHORT_NAMES[party] ?? CamelCaseToSentence(Party[party]);

export const getPartyFullLabel = (party: Party): string =>
  CamelCaseToSentence(Party[party]);
