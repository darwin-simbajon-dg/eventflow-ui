import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

export const useSignalR = (hubUrl: string, onMessageReceived: (message: any) => void) => {
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on("ReceiveMessage", onMessageReceived);

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("SignalR connection established");
      } catch (error) {
        console.error("Error establishing SignalR connection:", error);
      }
    };

    startConnection();

    return () => {
      connection.off("ReceiveMessage", onMessageReceived);
      connection.stop().catch((error) => console.error("Error stopping SignalR connection:", error));
    };
  }, [hubUrl, onMessageReceived]);
};