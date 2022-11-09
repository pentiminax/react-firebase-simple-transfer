import { useEffect, useState } from "react";
import { Alert, Button, Card, Spinner } from "react-bootstrap";
import { DocumentData } from "firebase/firestore";
import { getStorage, ref, getMetadata, FullMetadata, getBlob } from "firebase/storage";
import { useParams } from "react-router-dom";
import { bytesToSize, createClickableAnchorForObjectURL } from "../../utils";
import firebaseService, { FileData } from "../../services/firebase";

export default function File() {
    const params = useParams();

    const [downloading, setDownloading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [file, setFile] = useState<FileData>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [metadata, setMetadata] = useState<FullMetadata>();
    const [owner, setOwner] = useState<DocumentData>();

    useEffect(() => {
        const initialize = async () => {
            try {
                const file = await firebaseService.getSingleFile(params.id);
                setFile(file);
                setMetadata(await getMetadata(ref(getStorage(), file.uniqueFilename)));
                if (file.userId) {
                    setOwner(await firebaseService.getSingleUser(file.userId));
                }
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        if (!file) {
            initialize();
        }
    }, [file]);

    const handleDownload = async () => {
        setDownloading(true);
        
        const blob = await getBlob(ref(getStorage(), file.uniqueFilename));
        const url = URL.createObjectURL(blob);
        const a = createClickableAnchorForObjectURL(url, file.originalFilename);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);

        setDownloading(false);
    }

    return (
        <div>
            {error
                ? (
                    <Alert variant="danger">Une erreur s'est produite !</Alert>
                )
                : loading ? (
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
                            <Button className={downloading ? 'disabled mb-3' : 'mb-3'} variant="success" onClick={handleDownload}>
                                {downloading ? 'Téléchargement en cours...' : 'Télécharger'}
                            </Button>
                        </Card.Body>
                        <Card.Footer>
                            {owner ? `Partagé par ${owner.displayName}` : 'Partagé par un utilisateur anonyme'}
                        </Card.Footer>
                    </Card>
                )}
        </div>
    )
}