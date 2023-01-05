import { collection, query, orderBy, getDocs, getDoc, doc, startAfter, limit, endBefore } from "firebase/firestore"
import { db } from '@/plugins/firebase.js'


export const getCards = async (callback) => {

    const q = query(collection(db, "cards"), orderBy("idTheme"));

    const querySnapshot = await getDocs(q);
    const list = [];
    let card = {}

    querySnapshot.forEach(doc => {
        card = {}
        card = doc.data()
        card.id = doc.id
        if (card.src.indexOf("http") == -1) {
            card.img = null
        } else {
            card.img = card.src
        }
        list.push(card);
    });
    callback(list);
};

export const getCard = async (callback, id) => {
    const docRef = doc(db, "cards", id)
    const docSnap = await getDoc(docRef)
    let card = null
    if (docSnap.exists) {
        card = docSnap.data()
        card.id = docSnap.id
    }
    callback(card)
};

export const getNextId = async (callback, id) => {
    let nextId = null
    const docRef = doc(db, "cards", id)
    const docSnap = await getDoc(docRef)
    const q = query(collection(db, "cards"), orderBy("idTheme"), startAfter(docSnap), limit(1))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(nextDoc => {
        nextId = nextDoc.id;
    })
    callback(nextId)
};

export const getPreviousId = async (callback, id) => {
    let previousId = null
    const docRef = doc(db, "cards", id)
    const docSnap = await getDoc(docRef)
    const q = query(collection(db, "cards"), orderBy("idTheme"), endBefore(docSnap))

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(nextDoc => {
        previousId = nextDoc.id;
    })
    callback(previousId)
};

export const saveCard = async (card) => {
    console.log("saveCard id=" + card.id)
    // await firestore.collection('cards').doc(card.id).update({
    //     title: card.title,
    //     link: card.link,
    //     src: card.src,
    //     idTheme: card.idTheme
    // })
};

export const deleteCard = async (id) => {
    console.log("deleteCard id=" + id)
    // await firestore.collection('cards').doc(id).delete()
};

export const createCard = async () => {
    const newCard = {
        "title": "New Card",
        "idTheme": "DEFAULT",
        "link": "",
        "src": "",
    }
    // const ref = await firestore.collection('cards').add(newCard)
    // newCard.id = ref.id
    return newCard
};
