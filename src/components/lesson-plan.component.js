import { marked } from "marked"
import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import TinyMceEditor from "./tinymce-editor.component"

/**
 * Component to display & edit a lesson plan
 */
const LessonPlanComponent = ({mdContentUrl}) => {

    const [ isLoading, setIsLoading ]           = useState(true)
    const [ lessonPlanHtml, setLessonPlanHtml ] = useState('')

    useEffect(() => {

        //Fetch markdown content using the API route
        const fetchMarkdownContent = async () => {
            try {
                const response = await fetch(`/api/fetch-markdown-content?urlPath=${encodeURIComponent(mdContentUrl)}`)
                const data = await response.json()

                //Format content as HTML
                const contentAsHtml = marked(data.content)

                //Set HTML content state
                setLessonPlanHtml(contentAsHtml)
            } catch (error) {
                console.error(`Error fetching markdown content: ${error}`)
                setLessonPlanHtml(`Failed to load content.`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMarkdownContent()
    }, [mdContentUrl])

    return (
        <>
            {
                isLoading ? (
                    <Skeleton count={5} className='mb-2' />
                ) : (
                    <TinyMceEditor value={lessonPlanHtml} setValue={setLessonPlanHtml} />
                )
            }
        </>
    )

}

export default LessonPlanComponent