const { useState, useEffect } = require("react")

/**
 * Reusable useLessons hook for fetching and filtering lessons
 */
const useLessons = ( fetchLessonsFunction, initialLessons = []) => {
    const [ lessons, setLessons ] = useState(initialLessons)
    const [ isLoading, setIsLoading ] = useState(!initialLessons.length)
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ filteredLessons, setFilteredLessons ] = useState(initialLessons)

    useEffect(() => {

        const fetchLessons = async () => {
            setIsLoading(true)
            try {
                const lessonsData = await fetchLessonsFunction()
                setLessons(lessonsData)
                setFilteredLessons(lessonsData)
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (!initialLessons.length) {
            fetchLessons()
        }
    }, [])

    useEffect(() => {

        const lowercasedSearchTerm = searchTerm.toLowerCase()
        const filtered = lessons?.filter(lesson => 
            lesson.topic.toLowerCase().includes(lowercasedSearchTerm) || 
            lesson.level.toLowerCase().includes(lowercasedSearchTerm) || 
            (lesson.ageGroup && lesson.ageGroup.toLowerCase().includes(lowercasedSearchTerm))
            )
        setFilteredLessons(filtered)

    }, [searchTerm, lessons])

    return { isLoading, lessons, setLessons, searchTerm, setSearchTerm, filteredLessons }
}

export default useLessons