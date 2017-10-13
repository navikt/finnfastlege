const ContextholderConnection = () => {
    return new WebSocket(`wss://${window.location.hostname}/modiaeventdistribution/websocket`);
};

export const opprettWebsocketConnection = (callback) => {
    if (window.location.hostname.indexOf('localhost') !== -1) {
        return;
    }

    const connection = new ContextholderConnection();
    connection.onmessage = (e) => {
        callback(e);
    };
    connection.onerror = () => {
    };
    connection.onclose = () => {
        setTimeout(() => {
            opprettWebsocketConnection(callback);
        }, 1000);
    };
};
