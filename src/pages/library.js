import ContentGridComponent from "@/components/content-grid.component"
import LessonCard from "@/components/lesson-card.component"
import PageHeaderComponent from "@/components/page-header"
import SearchBarComponent from "@/components/search-bar.component"
import { useLessonsLibrary } from "@/context/lessons-library.context"
import ProtectedRoute from "@/hoc/protected-route.hoc"
import { useEffect, useState } from "react"

/**
 * Page to display lesson library
 */
const Library = () => {

    const { lessons } = useLessonsLibrary()

    const [ filteredLessons, setFilteredLessons ]   = useState(lessons)
    const [ searchTerm, setSearchTerm ]             = useState('')

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase()   // Parse search term to lower case

        // Find lessons matching search term
        const filtered = lessons.filter(lesson => 
            lesson.topic.toLowerCase().includes(lowercasedSearchTerm) || 
            lesson.level.toLowerCase().includes(lowercasedSearchTerm) || 
            (lesson.ageGroup && lesson.ageGroup.toLowerCase().includes(lowercasedSearchTerm))
            )
            
        // Set filtered lessons state
        setFilteredLessons(filtered)
    }, [searchTerm, lessons])

    return (
        <div >
            <PageHeaderComponent text='Lesson Library' />
            <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ContentGridComponent contents={filteredLessons} CardComponent={<LessonCard />} />
        </div>
    )

}


export default ProtectedRoute(Library)