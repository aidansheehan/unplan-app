import ContentGridComponent from "@/components/content-grid.component";
import EmptyStateComponent from "@/components/empty-state.component";
import LessonCard from "@/components/lesson-card.component";
import LoadingSpinner from "@/components/loading-spinner";
import PageHeaderComponent from "@/components/page-header";
import SearchBarComponent from "@/components/search-bar.component";
import { useLessons } from "@/context/lessons.context";
import ProtectedRoute from "@/hoc/protected-route.hoc";
import { useEffect, useState } from "react";

const YourLessons = () => {

    const { lessons, isLoading } = useLessons()

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
        <div className="flex flex-col" >
            <PageHeaderComponent text='My Lesson Plans' />

            {
                isLoading ? (
                    <LoadingSpinner />
                ) : (
                    lessons.length || true? (
                        <>
                            <SearchBarComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            {/* <ContentGridLessonContainer lessons={filteredLessons} /> */}
                            <ContentGridComponent contents={filteredLessons} CardComponent={<LessonCard />} />
                        </>
                    ) : (
                         <div className="min-h-full flex justify-center items-center py-32" >
                            <EmptyStateComponent size='2x' text="Time to create your first masterpiece." href="/plan" />
                        </div>
                    )
                )
            }

        </div>
    )

}

export default ProtectedRoute(YourLessons)