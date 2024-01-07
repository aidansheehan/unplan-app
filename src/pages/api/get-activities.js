import { collection, getDoc, doc } from "firebase/firestore"
import { db } from "../../../firebaseConfig"

export default async function handler(req, res) {
    try {

        if (!req.query.ids && req.query.ids.length) {
            //Return nothning
            res.status(200).json([])
        }

        const ids = req.query.ids.split(',').filter(id => id.trim() !== '');
        if (ids.length === 0) {
            res.status(200).json([]);
            return;
        }

        const activitiesCollectionRef = collection(db, 'activities');
        const activitiesPromises = ids.map(id => getDoc(doc(activitiesCollectionRef, id)));
        const activitiesSnapshots = await Promise.all(activitiesPromises);

        const activities = activitiesSnapshots
            .filter(snapshot => snapshot.exists())
            .map(snapshot => ({
                id: snapshot.id,
                ...snapshot.data()
            }))

        res.status(200).json(activities);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message });
    }
}
