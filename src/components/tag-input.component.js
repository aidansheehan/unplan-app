import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { WithContext as ReactTags } from 'react-tag-input'

//Key codes
const KeyCodes = {
    enter: 13
}

//Delimters
const delimiters = [KeyCodes.enter]

/**
 * Tag input component
 */
const TagInputComponent = ({tags, setTags, label, placeholder, tagLimit}) => {

    //Input value
    const [ inputValue, setInputValue ] = useState('')

    //Function to handle manual addition of tags
    const addTag = () => {
        if (inputValue.trim()) {
            const newTag = { id: inputValue, text: inputValue }
            handleAddition(newTag)
            setInputValue('')
        }
    }

    //Handle tag addition
    const handleAddition = (tag) => {
        console.log('tags: ', tags)
        setTags([...tags, tag])
        setInputValue('')
    }

    //Handle tag deletion
    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i))
    }

    //Check button disabled
    const isDisabled = tags.length >= tagLimit || tags.find(t => t.text === inputValue)

    return (
        <div className="flex flex-col gap-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center border border-gray-300 rounded-md relative">
        <ReactTags 
            tags={tags}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            delimiters={delimiters}
            placeholder={placeholder}
            classNames={{
                tags: 'flex-1 flex flex-wrap gap-2 p-2 flex-grow',
                tagInput: 'flex w-[calc(100%-40px)] items-center border border-gray-200 h-fit',
                tagInputField: 'w-full p-2 text-base placeholder-gray-500 rounded-none focus:ring-0',
                selected: 'flex flex-wrap min-h-12 w-full items-center gap-1',
                tag: 'bg-blue-500 rounded text-sm font-medium text-white py-1 px-2 mr-1',
                remove: 'cursor-pointer text-white ml-2',
                suggestions: 'border border-gray-300 bg-white rounded-md',
            }}
            inputFieldPosition='bottom'
            autofocus={false}
            handleInputChange={(value) => setInputValue(value)}
            inputValue={inputValue}
            allowDragDrop={false}
        />
         <button 
             type="button"
             onClick={addTag}
             className={`flex-shrink-0 p-2 text-sm bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 absolute bottom-3 right-2 ${isDisabled ? 'bg-gray-200 && cursor-not-allowed' : 'hover:bg-blue-600 '}`}
             aria-label="Add word"
             disabled={isDisabled}
         >
             <FontAwesomeIcon icon={faPlus} />
         </button>
    </div>
</div>

    )

}

export default TagInputComponent