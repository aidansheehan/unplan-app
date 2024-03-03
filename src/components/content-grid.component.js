import React from 'react'

/**
 * Generic 'Content Grid' component that can display any type of content card
 */
const ContentGridComponent = ({ contents, CardComponent }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contents.map((content) => (
                // Render the CardComponent, passing all content props
                React.cloneElement(CardComponent, { key: content.id, ...content })
            ))}
        </div>
    );
};

export default ContentGridComponent;
