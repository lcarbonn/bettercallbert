import { firestore } from '@/plugins/firebase.js';

export const getCards = (callback) => {
    firestore.collection(`cards`).orderBy('idTheme').onSnapshot(querySnapshot => {
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

export const getCard = (callback, id) => {
    firestore.collection("cards").doc(id).get().then((doc) => {
        let card = null
        if (doc.exists) {
            card = doc.data()
            card.id = doc.id
            card.title = card.title.toUpperCase()
        }
        callback(card)
    })
};

export const getNextId = (callback, id) => {
    let nextId = null
    firestore.collection("cards").doc(id).get().then((doc) => {
        let nextRef = firestore.collection('cards')
            .orderBy('idTheme')
            .startAfter(doc)
            .limit(1);
        nextRef.get().then((nextDocs) => {
            nextDocs.forEach((nexDoc) => {
                nextId = nexDoc.id;
            });
            callback(nextId)
        });
    })
};

export const getPreviousId = (callback, id) => {
    let previousId = null
    firestore.collection("cards").doc(id).get().then((doc) => {
        let nextRef = firestore.collection('cards')
            .orderBy('idTheme')
            .endBefore(doc);
        nextRef.get().then((nextDocs) => {
            nextDocs.forEach((nexDoc) => {
                previousId = nexDoc.id;

            });
            callback(previousId)
        });
    })
};
