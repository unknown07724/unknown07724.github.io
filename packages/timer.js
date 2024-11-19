export const TimeUtils = {
    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return date.toISOString().replace("T", " ").split(".")[0];
    },
    timeDifference(start, end) {
        const diffMs = new Date(end) - new Date(start);
        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        return { hours,
