export declare const getGenderStringFromCode: (code: string) => "Male" | "Female" | "Other" | "Unknown";
export declare const isMobileNumber: (mobileNumber: string) => boolean;
export declare const isEmail: (email: string) => boolean;
export declare const generateQrCode: (data: string) => Promise<string>;
export declare const base64ToFile: (base64Data: string, outputDir?: string, fileName?: string, preferredMimeType?: string) => string;
export declare const convertToWav: (inputPath: string, outputPath: string) => Promise<string>;
export declare const deleteFile: (filePath: string) => void;
export declare const localize: (obj: any, lang: string) => any;
export interface TimeSlot {
    value: string;
    label: string;
}
export declare const generateTimeSlots: (start?: string, end?: string, intervalMinutes?: number) => TimeSlot[];
export declare const convertTo12Hour: (time24: string) => string;
export declare const convertTo24Hour: (time12h: string) => string;
export declare const maskEmail: (email: string) => string;
//# sourceMappingURL=helper.functions.d.ts.map