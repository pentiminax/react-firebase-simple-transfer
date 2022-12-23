import { Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useFilesSentByCurrentUser } from "../hooks/useFilesSentByCurrentUser";

export default function Sent() {
    const { files } = useFilesSentByCurrentUser();

    const navigate = useNavigate();

    return (
        <Card>
            <Card.Header>Fichiers envoyés</Card.Header>
            <ListGroup className="list-group-flush">
                {0 === files.length
                    ? <ListGroupItem></ListGroupItem>
                    : files.map((doc, key) => {
                        return <ListGroupItem action key={key} onClick={() => navigate(`/files/${doc.id}`)}>{doc.originalFilename}</ListGroupItem>
                    })
                }
            </ListGroup>
        </Card>
    )
}