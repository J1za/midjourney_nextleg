import firebase from 'firebase/compat/app';
import firebaseApp from "./firebase.service";

class AuthService {

    private readonly auth: firebase.auth.Auth;

    constructor() {
        this.auth = firebase.auth(firebaseApp);
    }

    register = (email: string, pw: string, name: string) =>
        this.auth.createUserWithEmailAndPassword(email, pw)
            .then(userCredentials => {
                const user = { ...userCredentials.user!, displayName: name }
                return this.auth.updateCurrentUser(user)
            })

    login = (email: string, pw: string, rememberMe: boolean) =>
        this.auth.setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.NONE)
            .then(() => this.auth.signInWithEmailAndPassword(email, pw))

    loginWithGoogle = (rememberMe: boolean) =>
        this.auth.setPersistence(rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.NONE)
            .then(() => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))

    getCurrentUser = () => this.auth.currentUser;

    logout = () => this.auth.signOut();

    sendPasswordResetEmail = (email: string) => this.auth.sendPasswordResetEmail(email);

    onAuthStateChanged = (onAuthStateChanged: | firebase.Observer<any> | ((a: firebase.User | null) => any)) =>
        this.auth.onAuthStateChanged(onAuthStateChanged);
}

const auth = new AuthService();
export default auth;
