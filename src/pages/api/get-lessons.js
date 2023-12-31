import { collection, getDoc, doc, query, getDocs, where } from "firebase/firestore"
import { db } from "../../../firebaseConfig"

export default async function handler(req, res) {
    try {

        console.log('req query: ', req.query)

        // Check if 'public' query param exists to fetch public lessons
        if (req.query.public === 'true') {
            const publicLessonsQuery = query(collection(db, 'lessons'), where('public', '==', true));
            const publicLessonsSnapshot = await getDocs(publicLessonsQuery);
            const publicLessons = publicLessonsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log('Public Lessons: ', publicLessons)
            res.status(200).json(publicLessons);
            return;
        }

        if (!req.query.ids && req.query.ids.length) {
            //Return nothning
            res.status(200).json([])
        }

        const ids = req.query.ids.split(',').filter(id => id.trim() !== '');
        if (ids.length === 0) {
            res.status(200).json([]);
            return;
        }

        const lessonsCollectionRef = collection(db, 'lessons');
        const lessonsPromises = ids.map(id => getDoc(doc(lessonsCollectionRef, id)));
        const lessonsSnapshots = await Promise.all(lessonsPromises);

        const lessons = lessonsSnapshots
            .filter(snapshot => snapshot.exists())
            .map(snapshot => ({
                id: snapshot.id,
                ...snapshot.data()
            }));

        res.status(200).json(lessons);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    }
}
