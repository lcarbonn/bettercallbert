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

    // firestore.collection(`themes`).orderBy('order').onSnapshot(querySnapshot => {
    //     const list = [];
    //     let theme = {}
    //     querySnapshot.forEach(doc => {
    //         theme = {}
    //         theme = doc.data()
    //         theme.id = doc.id
    //         list.push(theme);
    //     });
    //     callback(list);
    // });
};

export const getTheme = (callback, id) => {
    // firestore.collection("themes").doc(id).get().then((doc) => {
    //     let theme = null
    //     if (doc.exists) {
    //         theme = doc.data()
    //         theme.id = doc.id
    //     }
    //     callback(theme)
    // })
};

