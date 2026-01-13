const helpers = require('./subFunctions')

module.exports = {
    calculateStudyProgress({ studyWord, resolution }) {

        switch (resolution) {
            case 'EASY':
                studyWord.coefficient + 0.15 < 90
                    ? studyWord.coefficient = +(studyWord.coefficient + 0.15).toFixed(2)
                    : studyWord.coefficient = 90
                
                studyWord.studyInterval * studyWord.coefficient < 180
                    ? studyWord.studyInterval = +(studyWord.studyInterval * studyWord.coefficient).toFixed(0)
                    : studyWord.studyInterval = 180
                break

            case 'GOOD':
                studyWord.studyInterval * studyWord.coefficient < 180
                    ? studyWord.studyInterval = +(studyWord.studyInterval * studyWord.coefficient).toFixed(0)
                    : studyWord.studyInterval = 180
                break

            case 'HARD':
                studyWord.coefficient - 0.3 > 1.3
                    ? studyWord.coefficient = +(studyWord.coefficient - 0.3).toFixed(2)
                    : studyWord.coefficient = 1.3

                studyWord.studyInterval * studyWord.coefficient < 180
                    ? studyWord.studyInterval = +(studyWord.studyInterval * studyWord.coefficient).toFixed(0)
                    : studyWord.studyInterval = 180
                break

            case 'FAIL':
                studyWord.coefficient - 0.45 > 1.3
                    ? studyWord.coefficient = +(studyWord.coefficient - 0.45).toFixed(2)
                    : studyWord.coefficient = 1.3

                studyWord.studyInterval = 1
                break
        }

        studyWord.nextShowDate = new Date(Date.now() + helpers.addTimestampDays({ dayCount: studyWord.studyInterval }))

        return studyWord
    }
}