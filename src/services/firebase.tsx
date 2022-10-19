import { initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup, signOut, User, UserCredential } from "firebase/auth";
import { collection, CollectionReference, doc, DocumentData, Firestore, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { FirebaseStorage, getStorage, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from '@firebase/util';
import { customAlphabet } from "nanoid";
import config from "./config.json";

class FirebaseService {
    auth: Auth;
    firestore: Firestore;
    filesCollection: CollectionReference;
    googleAuthProvider: GoogleAuthProvider;
    storage: FirebaseStorage;

    constructor() {
        initializeApp(config);

        this.auth = getAuth();
        this.auth.useDeviceLanguage();

        this.firestore = getFirestore();
        this.filesCollection = collection(this.firestore, 'files');
        this.googleAuthProvider = new GoogleAuthProvider();
        this.storage = getStorage();
    }

    async addFile(originalFilename: string, uniqueFilename: string): Promise<string> {
        const id = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)().toUpperCase();

        await setDoc(doc(this.filesCollection, id), {
            originalFilename: originalFilename,
            uniqueFilename: uniqueFilename
        });

        return id;
    }

    async getSingleFile(id: string): Promise<DocumentData> {
        const documentData = await getDoc(doc(this.filesCollection, id));

        return documentData.data();
    }

    getCurrentUser(): User | null {
        return this.auth.currentUser;
    }

    async uploadFile(file: File): Promise<string> {
        const filename = `${uuidv4()}.${file.name.split('.').pop()}`;
        const storageRef = ref(this.storage, filename);

        await uploadBytes(storageRef, file);

        return filename;
    }

    async signInWithGoogle(): Promise<UserCredential> {
        try {
            return await signInWithPopup(this.auth, this.googleAuthProvider);
        } catch (error) {
            return null;
        }
    }

    async signOut(): Promise<void> {
        await signOut(this.auth);
    }
}

const firebaseService = new FirebaseService();

export default firebaseService;