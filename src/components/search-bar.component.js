
/**
 * Reusable search bar component
 */
const SearchBarComponent = ({ searchTerm, setSearchTerm }) => (
    <input 
        type='text'
        placeholder='Search lessons...'
        className='w-full p-2 mb-8 border rounded shadow'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
)

export default SearchBarComponent