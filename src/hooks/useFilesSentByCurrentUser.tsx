import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebaseService, { FileData } from "../services/firebase";

export const useFilesSentByCurrentUser = () => {
    const { currentUser } = useContext(AuthContext);
    const [files, setFiles] = useState<FileData[]>([]);

    const fetchData = async () => {
        setFiles(await firebaseService.getFilesSentByCurrentUser());
    }

    useEffect(() => {
        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    return {currentUser, files};
}