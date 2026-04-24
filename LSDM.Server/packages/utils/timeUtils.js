class TimeUtils {
    secondsToMiliseconds(seconds) {
        return seconds * 1000;
    }
    minutesToMiliseconds(minutes) {
        return minutes * 60 * 1000;
    }
}
module.exports = new TimeUtils();