import { Schema } from "mongoose";
const scheduleItemSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    kind: {
        type: String,
        enum: ["reminder", "questionnaire", "appointment"],
        required: true,
    },
    title: { type: String, required: true, trim: true },
    scheduledAt: { type: Date, required: true },
    completedAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
scheduleItemSchema.index({ userId: 1, scheduledAt: 1 });
scheduleItemSchema.index({ userId: 1, completedAt: 1 });
export const getScheduleItemModel = (conn) => conn.models.ScheduleItem ||
    conn.model("ScheduleItem", scheduleItemSchema);
//# sourceMappingURL=scheduleItem.model.js.map