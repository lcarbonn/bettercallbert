import { collection, query, orderBy, getDocs, doc, getDoc } from "firebase/firestore"
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

export const getTheme = async (callback, id) => {
    const docRef = doc(db, "themes", id)
    const docSnap = await getDoc(docRef)
    let theme = null
    if (docSnap.exists) {
        theme = docSnap.data()
        theme.id = docSnap.id
    }
    callback(theme)
};
