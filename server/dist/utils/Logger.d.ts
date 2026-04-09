import winston from "winston";
import "winston-mongodb";
declare const logger: winston.Logger;
declare const addTransports: () => void;
export declare const createLogger: (uniqueCode: string) => winston.Logger;
export { addTransports };
export default logger;
//# sourceMappingURL=Logger.d.ts.map