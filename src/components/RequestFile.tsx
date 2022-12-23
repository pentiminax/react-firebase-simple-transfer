import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import firebaseService from "../services/firebase";

export default function RequestFile() {
    const [fileId, setFileId] = useState<string>("");
    const navigate = useNavigate();

    const handleFileIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileId(e.target.value);
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const file = await firebaseService.getSingleFile(fileId);

        setFileId("");

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
                    
                    <Form.Control 
                    className="mb-3" 
                    type="text" 
                    value={fileId} 
                    onChange={handleFileIdChange}
                    minLength={8} 
                    maxLength={8} 
                    max="8" 
                    placeholder="Exemple : YOM2W71F" 
                    required />

                    <Button className="w-100" type="submit">Rechercher</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}