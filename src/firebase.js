import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    getFirestore,
    addDoc,
    collection
} from "firebase/firestore";
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from "./constant";

const logInWithEmailAndPassword = async (email, password) => {
    try {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data;
    } catch (err) {
        console.log(err);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

const firebaseConfig = { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createRdv = async (date, idPrestataire, lieu) => {
    try {
        const user = auth.currentUser
        await addDoc(collection(db, "rdv"), {
            date: date,
            idClient: user.uid,
            idPrestataire: idPrestataire,
            lieu: lieu
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export {
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    logout,
    db,
    auth,
    createRdv
};