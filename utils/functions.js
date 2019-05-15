import { STORE } from '@/plugins/firebase.js';

// get the url for download image
export async function getUrl(src) {
    let storageRef = STORE.ref();
    let href=null;
    if(src.indexOf("http")==-1) {
        await storageRef.child(src).getDownloadURL().then(function(url) {
            console.log("url:"+url);
            href = url;
        }).catch(function(error) {
            console.log("error:"+error.code);
            href=error.code;
        })
    } else {
        href=src;
    }
    console.log("href:"+href);
    return href;
};
