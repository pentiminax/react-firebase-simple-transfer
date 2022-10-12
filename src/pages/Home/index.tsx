import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { uuidv4 } from '@firebase/util';
import { nanoid } from 'nanoid'
import Swal from 'sweetalert2';

export default function Home() {
    const [file, setFile] = useState<File>();
    const [fileInputRef, setFileInputRef] = useState<HTMLInputElement>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (null !== files && files.length === 1) {
            setFile(files[0]);
        }
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const filename = `${uuidv4()}.${file.name.split('.').pop()}`;
        const key = nanoid(8).toUpperCase();
        const storageRef = ref(getStorage(), filename);

        await uploadBytes(storageRef, file);

        await addDoc(collection(getFirestore(), 'images'), {
            fullPath: filename,
            key: key
        });

        setFile(null);
        fileInputRef.value = null;
        
        Swal.fire({
            confirmButtonText: 'OK',
            footer: `<a href="#">${key}</a>`,
            icon: 'success',
            title: "C'est tout bon !",
            text: 'Le fichier a été envoyé avec succès !'
          })
    }

    return (
        <Card>
            <Card.Header>Envoyer un fichier</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control className="mb-3" ref={setFileInputRef} type="file" onChange={handleFileChange} required />
                    <Button className="w-100" type="submit">Obtenir un lien</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}