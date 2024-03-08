import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './markdown.module.scss'
import { PrinterIcon } from "@heroicons/react/24/outline"
import ButtonAltComponent from "../button/button.alt.component"

const HtmlContentPresentationComponent = ({htmlContent, title}) => {

    const [ isCollapsed, setIsCollapsed ]   = useState(true)    //isCollapsed state

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

    const printBtnJsx = (
        <div className="inline-flex items-center align-middle">
            <PrinterIcon className="h-6" />
            <span className="ml-2">Print</span>
        </div>
    )

    return (
        <div className="relative border p-4 rounded-md shadow-sm bg-white mb-7">

                {isCollapsed && (
                    <div className="text-center mt-4 absolute bottom-4 right-8">
                        <ButtonAltComponent
                            onClick={openForPrint}
                            style='bg-accent rounded-lg'
                        >
                            {printBtnJsx}
                        </ButtonAltComponent>
                    </div>
                )}
                
                <div className={`${styles.markdownContent} ${isCollapsed ? 'max-h-40 overflow-hidden' : ''}`}>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
                
                {!isCollapsed && (
                    <div className="text-center mt-4">
                    <ButtonAltComponent 
                            onClick={openForPrint}
                        >
                            {printBtnJsx}
                        </ButtonAltComponent>
                        </div>
                )}

                <button 
                onClick={toggleCollapse}
                className="mt-2 text-accent hover:text-darkPrimary"
                >
                    {isCollapsed ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
                </button>

        </div>
    )
}

export default HtmlContentPresentationComponent