import { useContext, useEffect, useState } from "react";
import { Anchor, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { AuthContext } from "../../context/AuthContext";
import firebaseService, { FileData } from "../../services/firebase";
;

export default function Sent() {
    const { currentUser } = useContext(AuthContext);
    const [files, setFiles] = useState<FileData[]>([]);

    useEffect(() => {
        async function initialize() {
            setFiles(await firebaseService.getFilesSentByCurrentUser());
        }

        if (currentUser) {
            initialize();
        }
    }, [currentUser]);

    return (
        <Card>
            <Card.Header>Fichiers envoyés</Card.Header>
            <ListGroup className="list-group-flush">
                {0 === files.length
                    ? <ListGroupItem></ListGroupItem>
                    : files.map((doc, key) => {
                        return <ListGroupItem key={key}>{doc.originalFilename} - <Anchor href={`/files/${doc.id}`}>{doc.id}</Anchor></ListGroupItem>
                    })
                }
            </ListGroup>
        </Card>
    )
}