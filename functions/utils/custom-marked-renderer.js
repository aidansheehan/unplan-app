const { marked } = require('marked')

/**
 * Custom marked renderer to avoid <code> and <pre> tags
 */

// Define a custom renderer
const customRenderer = new marked.Renderer()

// Customize how code blocks are rendered
customRenderer.code = function(code, language) {
    // Return the code without <pre> or <code> tags
    return code
}

// Customize how inline code is rendered
customRenderer.codespan = function(text) {
    // Return the text without <code> tags
    return text
}

// Function to apply the custom renderer and convert Markdown to HTML
const renderMarkdown = (markdownContent) => {
    marked.setOptions({ renderer: customRenderer })
    return marked(markdownContent)
}

module.exports = { renderMarkdown }