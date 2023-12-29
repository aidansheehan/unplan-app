
const ViewLesson = ({lessonId}) => {
    return (
        <div>
            I am the lesson ID page!
            Lesson ID: {lessonId}
        </div>
    )
}


export async function getServerSideProps(context) {

    const { lessonId } = context.params

    return {
        props: { lessonId }
    }
}

export default ViewLesson