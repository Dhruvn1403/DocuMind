export type ScheduleKind = "reminder" | "questionnaire" | "appointment";
export type ScheduleVisibilityInput = {
    kind: ScheduleKind;
    scheduledAt: Date;
    completedAt?: Date | null;
    isActive?: boolean | null;
};
/**
 * - Reminders & questionnaires (active): calendar day is **today** or **tomorrow** only.
 * - Appointments: same today/tomorrow window, **plus** incomplete appointments from earlier
 *   days (still visible until completed), capped to the last 30 days to avoid unbounded lists.
 * - Items with `scheduledAt` later than end of tomorrow are excluded (not in this “upcoming” view).
 */
export declare function shouldShowInUpcoming(item: ScheduleVisibilityInput, now?: Date): boolean;
//# sourceMappingURL=scheduleVisibility.d.ts.map