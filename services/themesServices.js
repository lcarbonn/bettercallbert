import { DB } from '@/plugins/firebase.js';

export const getThemes = (callback) => {
    DB.collection(`themes`).onSnapshot(querySnapshot => {
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