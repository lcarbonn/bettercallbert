import { storage } from '@/plugins/firebase.js';

// get the url for download image
export const getImageSrc = (callback, src) => {
    let storageRef = storage.ref();
    storageRef.child(src).getDownloadURL().then(function (url) {
        // console.debug("url:" + url);
        callback(url)
    }).catch(function (error) {
        // console.debug("error:" + error.code);
        callback(error.code)
    })
};

// upload an image file
export const uploadImageFile = async (callback, file) => {
    // Create a reference to the destination where we're uploading
    // the file.
    const imageRef = storage.ref(`images/${file.name}`)

    const uploadTask = imageRef.put(file, metadata).then((snapshot) => {
        // Once the image is uploaded, obtain the download URL, which
        // is the publicly accessible URL of the image.
        return snapshot.ref.getDownloadURL().then((url) => {
            callback(url)
        })
    })
};
