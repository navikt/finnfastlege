import { finnMiljoStreng } from "../utils";

const ContextholderConnection = (ident: string) => {
  return new WebSocket(
    `wss://veilederflatehendelser${finnMiljoStreng()}.adeo.no/modiaeventdistribution/ws/${ident}`
  );
};

export const opprettWebsocketConnection = (ident: string, callback: any) => {
  if (window.location.hostname.indexOf("localhost") !== -1) {
    return;
  }

  const connection = ContextholderConnection(ident);
  connection.onmessage = (e) => {
    callback(e);
  };
  connection.onerror = () => {};
  connection.onclose = () => {
    setTimeout(() => {
      opprettWebsocketConnection(ident, callback);
    }, 1000);
  };
};
