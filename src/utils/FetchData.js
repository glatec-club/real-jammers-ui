//prettier-ignore
import { authDb } from '../firebase-config'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'

//fetch all docs from firebase
export const getAllFeeds = async (firebaseDb) => {
    const feeds = await getDocs(query(
        collection(firebaseDb, 'videos'), orderBy('id', 'desc'))
    );

    return feeds.docs.map(doc => doc.data());
};

// fetch the user information user userId

export const getUserInfo = async (userId) => {
    const userRef = doc(authDb, 'users', userId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists()){
        return userSnap.data();
    }else{
        return "No such document"
    }
};

// fetch the specific video
export const getSpecificVideo = async (videoId) => {
    const videoRef = doc(authDb, 'videos', videoId);
    const videoSnap = await getDoc(videoRef);
    if(videoSnap.exists){
        return videoSnap.data();
    }else{
        return 'No such document'
    }
};