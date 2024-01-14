import { useEffect, useRef, useState } from "react"
import TinyMceEditor from "./tinymce-editor.component"

/**
 * Component to fetch, display and edit content
 */
const ContentEditorComponent = ({contentUrl, title}) => {

    const [ content, setContent ] = useState('')
    const [ isLoading, setIsLoading ] = useState(true)

    const contentRef = useRef('')

    //Function to save new content
    const saveContent = async () => {
        
        if (!contentUrl) {
            console.error('File path not found for ', title)
            return;
        }

        try {

            //TODO use real firebase
            const response = await fetch('http://127.0.0.1:5001/lesson-planner-3eff4/us-central1/updateContent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    filePath: contentUrl,
                    content: contentRef.current
                })
            })

            if (response.ok) {
                console.log('Content saved successfully')
            } else {
                console.error('Failed to save content')
                console.log('response: ', response)
            }
        } catch (error) {
            console.error('Error saving content:', error)
        }
    }
    useEffect(() => {
        contentRef.current = content
    }, [content])

    useEffect(() => {

        //Fetch content using API route
        const fetchContent = async () => {
            try {
                //TODO use real firebase
                const response = await fetch(`http://127.0.0.1:5001/lesson-planner-3eff4/us-central1/getContent?urlPath=${encodeURIComponent(contentUrl)}`)
                const data = await response.json()

                //Set content state
                setContent(data.content)
            } catch (error) {
                console.error(`Error fetching content: ${content}`)
                setContent(`<p>Failed to load content.</p>`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchContent()
    }, [contentUrl])

    return (
        <div>
            <h2>Lesson Plan</h2>
            {
                isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <TinyMceEditor value={content} setValue={setContent} saveFn={saveContent} />
                )
            }
        </div>
    )

    
}

export default ContentEditorComponent