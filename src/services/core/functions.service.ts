import firebaseApp from "./firebase.service";
import {getFunctions, httpsCallable} from "firebase/functions";
import {Functions, HttpsCallable} from "@firebase/functions";

class FunctionsService {

    private readonly functions: Functions;

    constructor() {
        this.functions = getFunctions(firebaseApp);
    }

    getFunction = <RequestData = unknown, ResponseData = unknown>(name: string): HttpsCallable<RequestData, ResponseData> =>
        httpsCallable(this.functions, name);
}

const functions = new FunctionsService();
export default functions;
