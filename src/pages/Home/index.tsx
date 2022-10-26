import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Card, Form, ProgressBar } from 'react-bootstrap'
import firebaseService from '../../services/firebase';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

export default function Home() {
    const [file, setFile] = useState<File>();
    const [fileInputRef, setFileInputRef] = useState<HTMLInputElement>();
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (null !== files && files.length === 1) {
            setFile(files[0]);
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const uniqueFilename = firebaseService.getUniqueFilename(file);

        const uploadTask = firebaseService.uploadFile(file, uniqueFilename);

        uploadTask.on('state_changed', (snapshot) => {
            setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        });

        const id = await firebaseService.addFile(file.name, uniqueFilename);

        setFile(null);
        fileInputRef.value = null;

        Swal.fire({
            confirmButtonText: 'OK',
            footer: `<a href="/files/${id}">${id}</a>`,
            icon: 'success',
            title: "C'est tout bon !",
            text: 'Le fichier a été envoyé avec succès !'
        });
    }

    return (
        <Card>
            <Card.Header>Envoyer un fichier</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Control className="mb-3" ref={setFileInputRef} type="file" onChange={handleFileChange} required />
                    <ProgressBar animated className="mb-3" now={uploadProgress} label={`${uploadProgress}%`} />
                    <Button className="w-100" type="submit">Obtenir un lien</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}