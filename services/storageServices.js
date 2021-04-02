import { storage } from '@/plugins/firebase.js';

// get the url for download image
export const getImageSrc = (callback, src) => {
    const storageRef = storage.ref();
    storageRef.child(src).getDownloadURL().then(function (url) {
        // console.debug("url:" + url);
        callback(url)
    }).catch(function (error) {
        // console.debug("error:" + error.code);
        callback(error.code)
    })
};

// upload an image file
export const uploadImageFile = (callback, file) => {
    // Create a reference to the destination where we're uploading
    // the file.
    const storageRef = storage.ref();
    const imageRef = storageRef.child("cards/" + file.name)
    const metadata = {
        contentType: file.type
    }
    const uploadTask = imageRef.put(file, metadata).then((snapshot) => {
        callback(imageRef.fullPath)
    })
};
