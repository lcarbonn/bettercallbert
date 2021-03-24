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

