export type Candidate = {
    Name: string;
    RegionRank?: number;
    Region?: Region;
    Support: Support;
    Constituency?: Constituency;
    Statement?: string;
    Party: Party;
    Elected?: boolean;
}

export enum Region {
CentralScotland,
HighlandsAndIslands,
Lothian,
MidScotlandAndFife,
NorthEastScotland,
SouthScotland,
WestScotland,
Glasgow,
}



export enum Support {
    NoReply, 
    Yes,
    YesWithCaveats,
    No
}

export enum Constituency {MotherwellAndWishaw,
CaithnessSutherlandAndRoss,
EdinburghNorthernAndLeith,
BanffshireAndBuchanCoast,
GlasgowSouthside,
CunninghameSouth,
AirdrieAndShotts,
ClydebankAndMilngavie,
Dumbarton,
Eastwood,
EdinburghCentral,
EttrickRoxburghAndBerwickshire,
FalkirkEast,
GlasgowPollok,
GreenockAndInverclyde,
NaHEileananAnIar,
Shetland,
InvernessAndNairn,
DundeeCityWest,
Ayr,
RenfrewshireSouth,
FalkirkWest,
EastKilbride,
HamiltonLarkhallAndStonehouse,
CumbernauldAndKilsyth,
CoatbridgeAndChryston,
UddingstonAndBellshill,
GlasgowProvan,
GlasgowAnniesland,
GlasgowShettleston,
Rutherglen,
GlasgowMaryhillAndSpringburn,
ArgyllAndBute,
SkyeLochaberAndBadenoch,
Moray,
Orkney,
EdinburghSouthern,
EdinburghWestern,
EdinburghPentlands,
EdinburghEastern,
MidlothianNorthAndMusselburgh,
Linlithgow,
PerthshireNorth,
PerthshireSouthAndKinrossShire,
Stirling,
ClackmannanshireAndDunblane,
NorthEastFife,
Cowdenbeath,
Kirkcaldy,
MidFifeAndGlenrothes,
AberdeenSouthAndNorthKincardine,
AberdeenCentral,
AngusSouth,
AberdeenshireEast,
AberdeenDonside,
DundeeCityEast,
AberdeenshireWest,
EastLothian,
KilmarnockAndIrvineValley,
CarrickCumnockAndDoonValley,
MidlothianSouthTweedaleAndLauderdale,
Clydesdale,
Dumfriesshire,
GallowayAndWestDumfries,
Paisley,
CunninghameNorth,
RenfrewshireNorthAndWest,
StrathkelvinAndBearsden,
AlmondValley,
AngusNorthAndMearns,
Dunfermline,
GlasgowCathcart,
GlasgowKelvin,}

export enum Party {AbolishTheScottishParliamentParty, AlbaParty, AllForUnity, CommunistPartyOfBritain, FreedomAlliance, ScottishConservativeParty, ScottishFamilyParty, ScottishGreenParty, ScottishLabourParty, ScottishLiberalDemocrats, ScottishNationalParty, ScottishLibertarianParty, UkIndependenceParty, TradeUnionistAndSocialistCoalition, ScottishWomensEqualityParty, SocialDemocraticParty, ScottishRenew, VanguardParty, Independent, IndependentGreenVoice, ReformUkScotland, ReclaimParty, LiberalParty, RestoreScotland, ScotiaFuture}