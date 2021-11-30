import { IncomingMessage, ServerResponse } from "http";
interface NextFunction {
    (err?: any): void;
    (deferToNext: 'router'): void;
    (deferToNext: 'route'): void;
}
interface Response {
    ipInfo?: {
        range: [number, number];
        country: string;
        region: string;
        eu: "0" | "1";
        timezone: string;
        city: string;
        ll: [number, number];
        metro: number;
        area: number;
    };
    error?: string;
}
export declare const ipInfo: (ip: string | undefined) => Promise<Response>;
export declare const ip: (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void;
export {};
