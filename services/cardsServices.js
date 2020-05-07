import { DB } from '@/plugins/firebase.js';

export const getCards = (callback) => {
    DB.collection(`cards`).orderBy('idTheme').onSnapshot(querySnapshot => {
        const list = [];
        let card = {}
        querySnapshot.forEach(doc => {
            // console.debug(`get card:${doc.id} => ${doc.data().title}`);
            card = {}
            card = doc.data()
            card.id = doc.id
            list.push(card);
        });
        callback(list);
    });
};