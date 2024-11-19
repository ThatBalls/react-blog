import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";

export interface EventTypes {
  start: string;
  message: string;
  chunk: string;
  complete: string;
}

export const socket = isBrowser ? io() : null;