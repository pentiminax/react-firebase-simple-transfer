import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { collection, query, where, getDocs, getFirestore, DocumentData } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, getMetadata, FullMetadata } from "firebase/storage";
import { useParams } from "react-router-dom";

export default function File() {
    const params = useParams();

    const [file, setFile] = useState<DocumentData>();
    const [downloadURL, setDownloadURL] = useState<string>();
    const [metadata, setMetadata] = useState<FullMetadata>();
    const [loading, setLoading] = useState<boolean>(true);

    const bytesToSize = (bytes: number): string => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return 'n/a';
        const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
        if (i === 0) return `${bytes} ${sizes[i]}`;
        return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
    }

    const handleDownload = async () => {
        console.log(metadata); return;
        const response = await fetch(downloadURL, {
            mode: 'no-cors'
        });

        const blob = await response.blob();

        const objectUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = file.originalName
        a.click();
        a.remove();
    }

    useEffect(() => {
        async function initialize() {
            const q = query(collection(getFirestore(), 'images'), where('key', '==', params.id));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const documentData = querySnapshot.docs[0].data();
                setFile(documentData);
                setDownloadURL(await getDownloadURL(ref(getStorage(), documentData.fullPath)));
                setMetadata(await getMetadata(ref(getStorage(), documentData.fullPath)));
            } else {
                // TODO: Redirect to 404 Not Found.
            }

            setLoading(false);
        }

        if (!file) {
            initialize();
        }
    });

    return (
        <div>
            {loading ? (
                <Card>
                    <Card.Body className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Card.Body>
                </Card>
            ) : (
                <Card className="text-center">
                    <Card.Header>Téléchargement</Card.Header>
                    <Card.Body>
                        <Card.Title>{file?.originalName} - {bytesToSize(metadata?.size)}</Card.Title>
                        <Button variant="success" onClick={handleDownload}>Télécharger</Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}