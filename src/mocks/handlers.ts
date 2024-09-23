import mockFastlegerest from "@/mocks/mockFastlegerest";
import mockIstilgangskontroll from "@/mocks/mockIstilgangskontroll";
import mockModiacontextholder from "@/mocks/mockModiacontextholder";
import mockSyfoperson from "@/mocks/mockSyfoperson";

const handlers = [
  mockFastlegerest,
  mockIstilgangskontroll,
  ...mockModiacontextholder,
  ...mockSyfoperson,
];

export default handlers;
