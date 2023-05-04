import firebaseApp from "./firebase.service";
import firebase from "firebase/compat";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    QueryConstraint,
    setDoc,
    updateDoc,
    serverTimestamp
} from "@firebase/firestore";

class DbService {

    private readonly db: firebase.firestore.Firestore;

    constructor() {
        this.db = firebaseApp.firestore();
    }

    getDocument = (collectionName: string, id: string) => getDoc(doc(this.db, collectionName, id))

    getDocuments = (collectionName: string, ...queryConstraints: QueryConstraint[]) => getDocs(query(collection(this.db, collectionName), ...queryConstraints));

    getSubDocuments = (collectionName: string, docName: string, subCollectionName: string, ...queryConstraints: QueryConstraint[]) => getDocs(query(collection(this.db, collectionName, docName, subCollectionName), ...queryConstraints));

    addDocument = (collectionName: string, data: object) => addDoc(collection(this.db, collectionName), { createdAt: serverTimestamp(), ...data })

    updateDocument = (collectionName: string, id: string, data: object) => updateDoc(doc(this.db, collectionName, id), data)

    setDocument = (collectionName: string, id: string, data: any) => setDoc(doc(this.db, collectionName, id), { createdAt: serverTimestamp(), ...data })

    removeDocument = (collectionName: string, id: string) => deleteDoc(doc(this.db, collectionName, id));

}

const db = new DbService();
export default db;
