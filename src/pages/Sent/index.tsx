import { Anchor, Card, ListGroup, ListGroupItem } from "react-bootstrap"
import { useFilesSentByCurrentUser } from "../../hooks/useFilesSentByCurrentUser";

export default function Sent() {
    const { files } = useFilesSentByCurrentUser();

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