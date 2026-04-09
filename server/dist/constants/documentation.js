export const DOCUMENTATION_SLUGS = [
    "stripe",
    "livekit",
    "firebase",
    "openai",
    "nextjs",
];
export function normalizeDocumentationSlug(value) {
    if (typeof value === "string" &&
        DOCUMENTATION_SLUGS.includes(value)) {
        return value;
    }
    return "stripe";
}
//# sourceMappingURL=documentation.js.map