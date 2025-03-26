import { EventTypes } from "websockets/clientSocket";

export const generateEventTypes: (prefix: string) => EventTypes = (prefix: string) => {
  return {
    start: `${prefix}-start`,
    message: `${prefix}-message`,
    chunk: `${prefix}-chunk`,
    complete: `${prefix}-complete`
  };
}