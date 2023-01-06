import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'


export const getThemes = async (callback) => {
    const q = query(collection(db, "themes"), orderBy("order"));

    const querySnapshot = await getDocs(q);
    const list = [];
    let theme = {}

    querySnapshot.forEach(doc => {
        theme = {}
        theme = doc.data()
        theme.id = doc.id
        list.push(theme);
    });
    callback(list);
};
