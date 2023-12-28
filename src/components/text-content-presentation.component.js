import { marked } from "marked"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPrint, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

const TextContentPresentationComponent = ({mdContent, title}) => {

    const [ isCollapsed, setIsCollapsed ] = useState(true)  //isCollapsed state

    //Parse markdown content to html
    const htmlContent = marked(mdContent)

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
              <title>Lesson Plan</title>
              <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
              <style>
                body {
                  font-family: 'Roboto', sans-serif;
                  margin: 20px;
                  line-height: 1.6;
                  margin: 30px;
                }
                  body {
                    margin: 30px;
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
            setTimeout(() => {
                printWindow.print() //Trigger the print dialog
                URL.revokeObjectURL(url)
            }, 1000)
        }
    }

    return (
        <div className="relative border p-4 rounded-md shadow-sm bg-white mb-7">
            <h2 className="text-center text-xl font-semibold bg-gray-100 p-2 rounded border-b border-gray-300" >
                {title}
            </h2>

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
    
            <div className={`${isCollapsed ? 'max-h-40 overflow-hidden' : ''}`}>
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
        </div>
    )
}

export default TextContentPresentationComponent