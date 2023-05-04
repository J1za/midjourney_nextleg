import firebaseApp from "./firebase.service";
import {FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";

class StorageService {

    private readonly storage: FirebaseStorage;

    constructor() {
        this.storage = getStorage(firebaseApp);
    }

    link = (fileName: string) => getDownloadURL(ref(this.storage, fileName));

    upload = (fileName: string, file: any) => uploadBytes(ref(this.storage, fileName), file);

}

const storage = new StorageService();
export default storage;
