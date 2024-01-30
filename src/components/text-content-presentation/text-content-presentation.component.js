import { marked } from "marked"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './markdown.module.scss'

const TextContentPresentationComponent = ({mdContentUrl, title}) => {

    const [ isCollapsed, setIsCollapsed ]   = useState(true)    //isCollapsed state
    const [ htmlContent, setHtmlContent ]   = useState('')      //HTML content
    const [ isLoading, setIsLoading ]       = useState(true)    //Loading

    //Parse markdown content to html
    // const htmlContent = marked(mdContent)

    //Function to toggle collapsed
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    //Function to open the content for print
    const openForPrint = () => {

        //Create standalone HTML content
        const standaloneHtmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>${title}</title>
              <style>
                body {
                  font-family: 'Arial', sans-serif;
                  margin: 20px;
                  line-height: 1.6;
                  margin: 30px;
                }
                  body {
                    margin: 30px;
                  }

                /* Style for all tables */
                table {
                    width: 100%; /* Full width */
                    border-collapse: collapse; /* Collapses borders between table cells */
                    table-layout: fixed; /* Fixed table layout for equal spacing */
                    word-wrap: break-word; /* Ensures text wraps in cells */
                }

                /* Style for table headers and cells */
                th, td {
                    border: 1px solid #ddd; /* Light grey border */
                    padding: 8px; /* Add space around content */
                    text-align: left; /* Align text to the left */
                    vertical-align: top; /* Align content to the top of the cell */
                }

                /* Ensure that content in cells can wrap and that there is space for user input */
                th, td {
                    min-width: 120px; /* Minimum width for columns */
                    max-width: 1fr; /* Allows the column to take up the fraction of the table width */
                }

                /* Style for cells where users will need to write in */
                td {
                    height: 50px; /* Fixed height for input cells */
                }

                /* Additional styling for printing */
                @media print {
                    th, td {
                    padding: 15px; /* Increase padding for better readability in print */
                    height: auto; /* Auto height for flexibility in print */
                    }
                }


              </style>
            </head>
                <body>
                  ${htmlContent}
                </body>
            </html>
            `;
        
        const blob = new Blob([standaloneHtmlContent], { type: 'text/html'})
        const url = URL.createObjectURL(blob)
        
        const printWindow = window.open(url)
        
        printWindow.onload = () => {
                printWindow.print() //Trigger the print dialog
                URL.revokeObjectURL(url)
        }
    }

    useEffect(() => {

        // Fetch markdown content using the API route
        const fetchMarkdownContent = async () => {
            try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_URL}fetchMarkdownContent?urlPath=${encodeURIComponent(mdContentUrl)}`);
            const data = await response.json();

            //Format content as HTML
            const contentAsHtml = marked(data.content)

            //Set HTML content state
            setHtmlContent(contentAsHtml)

            // return data.content;
            } catch (error) {
            console.error('Error fetching markdown content:', error)
            setHtmlContent('Failed to load content.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchMarkdownContent()
    }, [mdContentUrl])

    return (
        <div className="relative border p-4 rounded-md shadow-sm bg-white mb-7">
            <h2 className="text-center text-xl font-semibold bg-gray-100 p-2 rounded border-b border-gray-300 mb-5" >
                {title}
            </h2>

            {
                isLoading ? (
                    <Skeleton count={5} className="mb-2" />
                ) : (
                    <>
                        {isCollapsed && (
                            <div className="text-center mt-4 absolute bottom-4 right-8">
                            <button 
                                onClick={openForPrint}
                                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-green-300 inline-flex items-center"
                                >
                                    <FontAwesomeIcon icon={faPrint} />
                                    <span className="ml-2">Print</span>
                                </button>
                            </div>
                            )}
                
                        <div className={`${styles.markdownContent} ${isCollapsed ? 'max-h-40 overflow-hidden' : ''}`}>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        </div>
                
                        {!isCollapsed && (
                            <div className="text-center mt-4">
                                <button 
                                    onClick={openForPrint}
                                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring focus:ring-green-300 inline-flex items-center"
                                >
                                    <FontAwesomeIcon icon={faPrint} />
                                        <span className="ml-2">Print</span>
                                    </button>
                                </div>
                        )}

                        <button 
                        onClick={toggleCollapse}
                        className="mt-2 text-blue-500 hover:text-blue-700"
                        >
                            {isCollapsed ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
                        </button>
                        
                    </>
                )
            }

        </div>
    )
}

export default TextContentPresentationComponent