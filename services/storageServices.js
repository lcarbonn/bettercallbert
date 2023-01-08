import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from '@/plugins/firebase.js';

// get the url for download image
export const getImageSrc = (callback, src) => {
    // console.debug("getImageSrc src:" + src);
    const storageRef = ref(storage, src)
    getDownloadURL(storageRef).then(function (url) {
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
    const storageRef = ref(storage, "cards/" + file.name)
    const metadata = {
        contentType: file.type
    }
    // Upload the file and metadata
    const uploadTask = uploadBytes(storageRef, file, metadata).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            const paths = {
                imagePath: storageRef.fullPath,
                imageUrl: url
            }
            console.debug("storage path=" + paths.imagePath + ', url=' + paths.imageUrl)
            callback(paths)
        })
    })
};
