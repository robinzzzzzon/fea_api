module.exports = {
    addTimestampDays({ dayCount }) {
        return (24 * 60 * 60 * 1000) * dayCount
    }
}