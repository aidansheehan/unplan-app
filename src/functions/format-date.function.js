
/**
 * Function to format date/time for display to user
 */
const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('default', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true,
        timeZoneName: 'short'
    }).format(date)
}

export default formatDate