import type { ReactElement } from "react";
import { Party } from "../data/Party";
import Abolish from "../assets/Abolish.jpg";
import Alba from "../assets/AlbaParty.jpg";
import AllForUnity from "../assets/AllForUnity.png";
import Communists from "../assets/Communists.png";
import FamilyParty from "../assets/FamilyParty.jpg";
import FreedomAlliance from "../assets/freedom_alliance.png";
import Greens from "../assets/Greens.png";
import IndyGreenVoice from "../assets/IndependentGreenVoice.png";
import Labour from "../assets/Labour.png";
import LibDems from "../assets/LibDems.png";
import Liberal from "../assets/Liberal.png";
import Libertarians from "../assets/Libertarians.jpg";
import Reclaim from "../assets/Reclaim.jpeg";
import ReformUK from "../assets/ReformUK.png";
import Renew from "../assets/Renew.png";
import Scotia from "../assets/Scotia.png";
import SDP from "../assets/SDP.png";
import SNP from "../assets/SNP.svg";
import Sovereignty from "../assets/Sovereignty.jpg";
import Tories from "../assets/Tories.jpg";
import TUSC from "../assets/TUSC.png";
import UKIP from "../assets/Screenshot 2026-04-17 162036.png";
import WEP from "../assets/WEP.jpg";
import Reform from "../assets/Reform.png";
import SSP from "../assets/SSP_logo.png";
import AdvanceUKLogo from "../assets/AdvanceUK.svg";
import TheLiberalPartyLogo from "../assets/TheLiberalParty.svg";
import AnimalWelfare from "../assets/AnimalWelfare.png";
import ATLS from "../assets/ATLS.png";
import ChristianPartyLogo from "../assets/ChristianParty.svg";
import HeritagePartyLogo from "../assets/HeritageParty.png";
import ISP from "../assets/ISP.png";
import WorkersPartyLogo from "../assets/WorkersParty.svg";
import SocialistLabour from "../assets/SocialistLabour.png";
import ADFLogo from "../assets/ADF.png";
import ScottishCommonPartyLogo from "../assets/ScottishCommonParty.webp";
import ScottishRuralPartyLogo from "../assets/ScottishRuralParty.jpg";
import EDELLogo from "../assets/EDEL.jpg";
import EqualityPartyLogo from "../assets/image.png";

export const GetPartyLogo = (party: Party): ReactElement => {
  switch (party) {
    case Party.AbolishTheScottishParliamentParty:
      return <img src={Abolish} />;
    case Party.AlbaParty:
      return <img src={Alba} />;
    case Party.AllForUnity:
      return <img src={AllForUnity} />;
    case Party.CommunistPartyOfBritain:
      return <img src={Communists} />;
    case Party.ScottishGreenParty:
      return <img src={Greens} />;
    case Party.ScottishFamilyParty:
      return <img src={FamilyParty} />;
    case Party.FreedomAlliance:
      return <img src={FreedomAlliance} />;
    case Party.IndependentGreenVoice:
      return <img src={IndyGreenVoice} />;
    case Party.ScottishLabourParty:
      return <img src={Labour} />;
    case Party.ScottishLiberalDemocrats:
      return <img src={LibDems} />;
    case Party.LiberalParty:
      return <img src={Liberal} />;
    case Party.ScottishLibertarianParty:
      return <img src={Libertarians} />;
    case Party.ReclaimParty:
      return <img src={Reclaim} />;
    case Party.ReformUkScotland:
      return <img src={ReformUK} />;
    case Party.RestoreScotland:
      return <img src={Sovereignty} />;
    case Party.ScottishRenew:
      return <img src={Renew} />;
    case Party.ScotiaFuture:
      return <img src={Scotia} />;
    case Party.SocialDemocraticParty:
      return <img src={SDP} />;
    case Party.ScottishNationalParty:
      return <img src={SNP} />;
    case Party.ScottishConservativeParty:
      return <img src={Tories} />;
    case Party.TradeUnionistAndSocialistCoalition:
      return <img src={TUSC} />;
    case Party.UkIndependenceParty:
      return <img src={UKIP} />;
    case Party.ScottishWomensEqualityParty:
      return <img src={WEP} />;
    case Party.Reform:
      return <img src={Reform} />;
    case Party.ScottishSocialistParty:
      return <img src={SSP} />;
    case Party.AdvanceUK:
      return <img src={AdvanceUKLogo} />;
    case Party.TheLiberalParty:
      return <img src={TheLiberalPartyLogo} />;
    case Party.AnimalWelfareParty:
      return <img src={AnimalWelfare} />;
    case Party.AllianceToLiberateScotland:
      return <img src={ATLS} />;
    case Party.ChristianParty:
      return <img src={ChristianPartyLogo} />;
    case Party.HeritageParty:
      return <img src={HeritagePartyLogo} />;
    case Party.IndependenceForScotlandParty:
      return <img src={ISP} />;
    case Party.WorkersParty:
      return <img src={WorkersPartyLogo} />;
    case Party.SocialistLabourParty:
      return <img src={SocialistLabour} />;
    case Party.AllianceForDemocracyAndFreedom:
      return <img src={ADFLogo} />;
    case Party.ScottishCommonParty:
      return <img src={ScottishCommonPartyLogo} />;
    case Party.ScottishRuralParty:
      return <img src={ScottishRuralPartyLogo} />;
    case Party.EdinburghEastLothianPeople:
      return <img src={EDELLogo} />;
    case Party.EqualityParty:
      return <img src={EqualityPartyLogo} />;
    default:
      return <div></div>;
  }
};
