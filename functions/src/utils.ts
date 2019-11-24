// import * as crypto from "crypto";
import * as admin from 'firebase-admin';

// const firestoreAdmin = admin;
const firestoreInstance = admin.firestore();

export const API_URLS = {
    appStatsDaily: 'appStatsDaily',
    users: 'users',
};

// async function createSeed() {
//     let cryptoSeed = null;
//     let result = '';

//     const chars =
//         '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';

//     try {
//         cryptoSeed = new Uint8Array(40);
//         window.crypto.getRandomValues(cryptoSeed);
//     } catch (e) { }

//     if (
//         cryptoSeed === undefined ||
//         (cryptoSeed[0] === 0 && cryptoSeed[1] === 0 && cryptoSeed[2] === 0)
//     ) {
//         cryptoSeed = null;
//     }

//     for (let i = 0; i < 40; i++) {
//         let rnum = null;

//         if (cryptoSeed !== null) {
//             rnum = cryptoSeed[i] % chars.length;
//         } else {
//             rnum = Math.floor(Math.random() * chars.length);
//         }

//         result += chars.substring(rnum, rnum + 1);
//     }

//     return result;
// };

// export async function getRolledNumber() {
//     const seed = await createSeed();

//     const hash = crypto
//         .createHmac('sha512', seed)
//         .digest('hex');

//     let index = 0;

//     let lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);

//     // keep grabbing characters from the hash while greater than
//     while (lucky >= Math.pow(10, 6)) {
//         index++;
//         lucky = parseInt(hash.substring(index * 5, index * 5 + 5), 16);

//         // if we reach the end of the hash, just default to highest number
//         if (index * 5 + 5 > 128) {
//             lucky = 9999;
//             break;
//         }
//     }

//     lucky %= Math.pow(10, 4);

//     return lucky;
// }

export async function getAppStatsDailyId(timestamp: any) {
    const dateOffset = (7*60*60*1000);
    const today = timestamp.toDate();
    today.setTime(today.getTime() - dateOffset);
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    // 4__27__2019
    const appStatsDailyDocId = month + '__' + day + '__' + year;

    return appStatsDailyDocId;
}

export async function getDocData(docRef: any) {
    const docSnap = await docRef.get();
    return docSnap.data();
}

export async function getTimeFromNow(prevTime: any) {
    const serverTimestamp = admin.firestore.Timestamp.now();

    const newDate = serverTimestamp.toDate().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const currentDate = new Date(newDate);
    const currentDateValue = currentDate.valueOf();

    const prevBoostCollectDate = prevTime.toDate().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    const prevBoostDate = new Date(prevBoostCollectDate);
    const prevBoostDateValue = prevBoostDate.valueOf();

    const time = currentDateValue - prevBoostDateValue;

    return time;
}

export function getParameterByName(name: any, url: any) {
    const newName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + newName + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export async function getUserFromDisplayName(name: string) {
    const lName = name.toLowerCase();
    const displayNameDoc = firestoreInstance.doc('displayNames/' + lName);

    return await displayNameDoc.get().then(snapshot => {
        if (!snapshot.exists) {
            console.log('Display name not found!');
            return undefined;
        } else {
            return snapshot.data();
        }
    });
}

// export function chunk(arr: any, chunkSize: any, cache = []) {
//     const tmp = [...arr]
//     while (tmp.length) cache.push(tmp.splice(0, chunkSize))
//     return cache
// }