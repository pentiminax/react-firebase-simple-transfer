import { FormEvent, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

export default function RequestFile() {
    const [inputFileRef, setInputFileRef] = useState<HTMLInputElement>();

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        inputFileRef.value = "";
    }

    return (
        <Card>
            <Card.Header>Rechercher un fichier</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control className="mb-3" ref={setInputFileRef} type="text" minLength={8} maxLength={8} max="8" placeholder="Exemple : YOM2W71F" required />
                    <Button className="w-100" type="submit">Rechercher</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}