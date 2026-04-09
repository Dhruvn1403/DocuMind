import { addDays, endOfDay, startOfDay } from "date-fns";
import { getConnection } from "../utils/Connections.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { getScheduleItemModel } from "../models/scheduleItem.model.js";
import { shouldShowInUpcoming } from "../utils/scheduleVisibility.js";
function serializeScheduleItem(doc) {
    return {
        _id: String(doc._id),
        kind: doc.kind,
        title: doc.title,
        scheduledAt: doc.scheduledAt,
        completedAt: doc.completedAt ?? null,
        isActive: doc.isActive,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
}
export const getUpcomingSchedule = async (req, res, next) => {
    try {
        const db = await getConnection();
        const ScheduleItem = getScheduleItemModel(db);
        const now = new Date();
        const todayStart = startOfDay(now);
        const tomorrowEnd = endOfDay(addDays(now, 1));
        const windowStart = addDays(todayStart, -30);
        const raw = await ScheduleItem.find({
            userId: req.userId,
            $or: [{ completedAt: null }, { completedAt: { $exists: false } }],
            isActive: { $ne: false },
            scheduledAt: { $lte: tomorrowEnd, $gte: windowStart },
        })
            .sort({ scheduledAt: 1 })
            .lean();
        const items = raw
            .filter((doc) => shouldShowInUpcoming({
            kind: doc.kind,
            scheduledAt: new Date(doc.scheduledAt),
            completedAt: doc.completedAt,
            isActive: doc.isActive,
        }, now))
            .map((doc) => serializeScheduleItem(doc));
        res
            .status(200)
            .json(ApiResponse.success({ items }, "Upcoming reminders, questionnaires, and appointments retrieved"));
    }
    catch (error) {
        next(error);
    }
};
export const createScheduleItem = async (req, res, next) => {
    try {
        const { kind, title, scheduledAt, isActive = true } = req.body;
        const db = await getConnection();
        const ScheduleItem = getScheduleItemModel(db);
        const created = await ScheduleItem.create({
            userId: req.userId,
            kind,
            title,
            scheduledAt: new Date(scheduledAt),
            isActive,
        });
        res
            .status(201)
            .json(ApiResponse.created({ item: serializeScheduleItem(created) }, "Schedule item created"));
    }
    catch (error) {
        next(error);
    }
};
export const completeScheduleItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id)
            throw ApiError.badRequest("Item id is required");
        const db = await getConnection();
        const ScheduleItem = getScheduleItemModel(db);
        const updated = await ScheduleItem.findOneAndUpdate({ _id: id, userId: req.userId, completedAt: null }, { completedAt: new Date() }, { new: true }).lean();
        if (!updated)
            throw ApiError.notFound("Schedule item not found or already completed");
        res.status(200).json(ApiResponse.success({ item: serializeScheduleItem(updated) }, "Marked complete"));
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=schedule.controller.js.map