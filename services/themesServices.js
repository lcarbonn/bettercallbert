import { firestore } from '@/plugins/firebase.js';

export const getThemes = (callback) => {
    firestore.collection(`themes`).onSnapshot(querySnapshot => {
        const list = [];
        let theme = {}
        querySnapshot.forEach(doc => {
            // console.debug(`get theme:${doc.id} => ${doc.data().title}`);
            theme = {}
            theme = doc.data()
            theme.id = doc.id
            list.push(theme);
        });
        callback(list);
    });
};
export const getThemeColor = (callback, idTheme) => {
    firestore.collection("themes").doc(idTheme).get().then((doc) => {
        let color = null
        if (doc.exists) {
            color = doc.data()
        }
        callback(color)
    });
};