import { Schema, type Model, type Connection } from "mongoose";
export type ScheduleItemKind = "reminder" | "questionnaire" | "appointment";
export interface IScheduleItem {
    _id: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    kind: ScheduleItemKind;
    title: string;
    scheduledAt: Date;
    completedAt?: Date | null;
    /** Questionnaires respect this; other kinds ignore (treated as active). */
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const getScheduleItemModel: (conn: Connection) => Model<IScheduleItem>;
//# sourceMappingURL=scheduleItem.model.d.ts.map