import { FormEvent, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import firebaseService from "../../services/firebase";

export default function RequestFile() {
    const [inputFileRef, setInputFileRef] = useState<HTMLInputElement>();
    const navigate = useNavigate();

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const file = await firebaseService.getSingleFile(inputFileRef.value);

        inputFileRef.value = "";

        if (undefined !== file) {
            navigate(`/files/${file.id}`);
            return;
        }

        await Swal.fire({
            icon: 'question',
            title: 'Aucun résultat',
            text: "S'il vous plaît veuillez réessayer avec un autre identifiant"
        });
    }

    return (
        <Card>
            <Card.Header>Rechercher un fichier</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control type="text" className="mb-3" name="fileId" ref={setInputFileRef} minLength={8} maxLength={8} max="8" placeholder="Exemple : YOM2W71F" required />
                    <Button className="w-100" type="submit">Rechercher</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}