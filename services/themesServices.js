import { firestore } from '@/plugins/firebase.js';

export const getThemes = (callback) => {
    firestore.collection(`themes`).orderBy('order').onSnapshot(querySnapshot => {
        const list = [];
        let theme = {}
        querySnapshot.forEach(doc => {
            theme = {}
            theme = doc.data()
            theme.id = doc.id
            list.push(theme);
        });
        callback(list);
    });
};
