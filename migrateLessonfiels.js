const { initializeApp } = require('firebase/app')
const { ref, uploadBytes, getDownloadURL, getStorage } = require('firebase/storage')
const { doc, getDoc, updateDoc, getFirestore, collection, getDocs } = require('firebase/firestore')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
require('dotenv').config({path: './.env.local'})

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

//Initialize firebase
const app = initializeApp(config)
const storage = getStorage(app)
const db = getFirestore(app)

async function migrateLessonPlanData(lessonId) {

    const lessonRef = doc(db, 'lessons', lessonId)
    const docSnapshot = await getDoc(lessonRef)

    if (!docSnapshot.exists()) {
        console.log('Lesson not found');
        return;
    }
    
    // const lessonData = doc.data()
    const lessonData = docSnapshot.data()

    // Check if the document is already in the new format
    if (!lessonData.lessonPlanUrl || !lessonData.handoutUrl) {
        console.log(`Document ${lessonId} is already in the new format.`)
        return;
    }

    const lessonPlanPath = lessonData.lessonPlanUrl
    const handoutPath = lessonData.handoutUrl
    
        // Function to download and upload file
        async function downloadAndUploadFile(sourceUrl, destinationPath) {
            sourceUrl = await getDownloadURL(ref(storage, sourceUrl))
            const response = await axios.get(sourceUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');
            const storageRef = ref(storage, destinationPath);
            await uploadBytes(storageRef, buffer);
            // return getDownloadURL(storageRef);
            return destinationPath;
        }

    //Function to get file creation time
    async function getFileCreationTime(path) {
        const [metadata] = await bucket.file(path).getMetadata()
        return metadata.timeCreated
    }
    
    //Copy lesson plan and handout to new location
    try {

        const planUrl = await downloadAndUploadFile(lessonPlanPath, `lessons/${lessonId}/plan.md`);
        const handoutUrl = await downloadAndUploadFile(handoutPath, `lessons/${lessonId}/handout.md`);

        await updateDoc(lessonRef, {
            'contentRef.plan': planUrl,
            'contentRef.handout': handoutUrl,
            'createdAt': new Date() //Set current date as createdAt time
        })

        console.log('Migration and Firestore update completed for lesson ID:', lessonId);
    
    } catch (error) {

        console.log(`There was an error migrating lesson ${lessonId}`)
        console.log('ERROR: ', error)
    }
}

async function migrateAllLessonPlans() {
    const lessonsRef = collection(db, 'lessons')
    const querySnapshot = await getDocs(lessonsRef)

    for (const docSnapshot of querySnapshot.docs) {
        const lessonId = docSnapshot.id

        await migrateLessonPlanData(lessonId)
    }
}

migrateAllLessonPlans()