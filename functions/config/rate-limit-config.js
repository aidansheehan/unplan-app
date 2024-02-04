/**
 * Centralized rate-limiting configuration for all functions
 */
module.exports = {
    createLessonPlan: {
        name: 'generate_lesson_plan_rate_limiter',
        periodSeconds: 86400,
        maxCalls: 1000
    },
    createStudentHandout: {
        name: 'create_student_handout_rate_limiter',
        periodSeconds: 86400,
        maxCalls: 1000
    },
    findSbWho: {
        name: 'find_sb_who_rate_limiter',
        periodSeconds: 86400,
        maxCalls: 1000
    },
    gramVocab: {
        name: 'gram_vocab_rate_limiter',
        periodSeconds: 86400,
        maxCalls: 1000
    },
    readingComp: {
        name: 'reading_comp_rate_limiter',
        periodSeconds: 86400,
        maxCalls: 1000
    }
}