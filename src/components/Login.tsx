import { Button, Card } from "react-bootstrap";
import firebaseService from "../services/firebase";

export default function Login() {

    const siginInWithGoogle = async () => {
        await firebaseService.signInWithGoogle();
    }

    return (
        <Card>
            <Card.Header>Se connecter</Card.Header>
            <Card.Body>
                <Button variant="danger" className="w-100" onClick={siginInWithGoogle}>Se connecter avec Google</Button>
            </Card.Body>
        </Card>
    );
}