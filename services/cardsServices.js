import { collection, query, orderBy, getDocs, getDoc, doc, startAfter, limit, endBefore, updateDoc, deleteDoc, addDoc } from "firebase/firestore"
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
    if (!card) return null
    console.debug("start updateCard id=" + card.id)
    const cardRef = doc(db, "cards", card.id)
    await updateDoc(cardRef, {
        title: card.title,
        link: card.link ? card.link : "",
        src: card.src,
        idTheme: card.idTheme
    })
    console.debug("end updateCard id=" + card.id)

};

export const deleteCard = async (id) => {
    console.debug("deleteCard id=" + id)
    await deleteDoc(doc(db, "cards", id));
};

export const createCard = async () => {
    let newCard = {
        "title": "New Card",
        "idTheme": "DEFAULT",
        "link": "",
        "src": "",
    }
    console.debug("start addCard")
    const ref = await addDoc(collection(db, "cards"), newCard)
    newCard.id = ref.id
    console.debug("end addCard id=" + newCard.id)
    return newCard
};
