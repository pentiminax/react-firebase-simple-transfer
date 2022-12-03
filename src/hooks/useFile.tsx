import { DocumentData } from "firebase/firestore";
import { FullMetadata, getMetadata, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import firebaseService, { FileData } from "../services/firebase";

export type useFileData = {
    error: boolean,
    file: FileData,
    loading: boolean,
    metadata: FullMetadata,
    owner: DocumentData,
}

export const useFile = (id: string): useFileData => {
    const [error, setError] = useState<boolean>(false);
    const [file, setFile] = useState<FileData>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [metadata, setMetadata] = useState<FullMetadata>();
    const [owner, setOwner] = useState<DocumentData>();

    const fetchData = async () => {
        try {
            const file = await firebaseService.getSingleFile(id);

            setFile(file);
            setMetadata(await getMetadata(ref(getStorage(), file.uniqueFilename)));

            if (file.userId) {
                setOwner(await firebaseService.getSingleUser(file.userId));
            }
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { error, file, loading, metadata, owner };
}