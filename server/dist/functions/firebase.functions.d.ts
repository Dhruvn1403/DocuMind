import type { NotificationPayload } from "../utils/types.js";
export declare function sendNotificationMultiCast({ tokens, title, body, image, data, }: NotificationPayload): Promise<void>;
export declare function sendNotificationToOne({ token, title, body, image, data, }: {
    token: string;
    title: string;
    body: string;
    image?: string;
    data?: Record<string, string>;
}): Promise<void>;
//# sourceMappingURL=firebase.functions.d.ts.map