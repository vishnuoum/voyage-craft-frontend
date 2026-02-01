import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectGroupSocket = (groupId, onMessage) => {
    // Prevent duplicate connections
    if (stompClient?.active) return;

    stompClient = new Client({
        brokerURL: "http://localhost:8080/ws",
        reconnectDelay: 5000,

        onConnect: () => {
            console.log("Connected to group:", groupId);

            stompClient.subscribe(`/topic/group.${groupId}`, (msg) => {
                onMessage(JSON.parse(msg.body));
            });
        },

        onStompError: (frame) => {
            console.error("Broker error:", frame.headers["message"]);
        }
    });

    stompClient.activate();
};

export const sendGroupMessage = (message, token) => {
    if (stompClient?.connected) {
        stompClient.publish({
            destination: "/app/group.send",
            body: JSON.stringify(message),
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
};

export const disconnectSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
        console.log("Socket disconnected");
    }
};
