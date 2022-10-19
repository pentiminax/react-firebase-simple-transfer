import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { collection, query, where, getDocs, getFirestore, DocumentData } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, getMetadata, FullMetadata } from "firebase/storage";
import { useParams } from "react-router-dom";
import { bytesToSize } from "../../utils";
import firebaseService from "../../services/firebase";

export default function File() {
    const params = useParams();

    const [file, setFile] = useState<DocumentData>();
    const [downloadURL, setDownloadURL] = useState<string>();
    const [metadata, setMetadata] = useState<FullMetadata>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function initialize() {
            const file = await firebaseService.getSingleFile(params.id);

            if (file) {
                setFile(file);
                setDownloadURL(await getDownloadURL(ref(getStorage(), file.uniqueFilename)));
                setMetadata(await getMetadata(ref(getStorage(), file.uniqueFilename)));
            } else {
                // TODO: Redirect to 404 Not Found.
            }

            setLoading(false);
        }
        if (!file) {
            initialize();
        }
    });

    const handleDownload = async () => {
        const a = document.createElement('a');
        a.href = downloadURL;
        a.download = file.originalFilename
        a.click();
        a.remove();
    }

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
                        <Card.Title>{file?.originalFilename} - {bytesToSize(metadata?.size)}</Card.Title>
                        <Button variant="success" onClick={handleDownload}>Télécharger</Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    )
}