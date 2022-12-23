import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Card, Form, ProgressBar } from 'react-bootstrap'
import firebaseService from '../services/firebase';
import Swal from 'sweetalert2';

export default function Home() {
    const MAX_FILE_SIZE_IN_MB = 10;

    const [file, setFile] = useState<File>();
    const [fileInputRef, setFileInputRef] = useState<HTMLInputElement>();
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [validated, setValidated] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (null === files || files.length === 0) {
            return;
        }

        const fileSizeInMB = Number((files[0].size / (1048576)).toFixed(2));

        if (fileSizeInMB >= MAX_FILE_SIZE_IN_MB) {
            Swal.fire({
                icon: 'error',
                html: `Le fichier est trop gros (${fileSizeInMB} MB).<br> Taille maximale : ${MAX_FILE_SIZE_IN_MB} MB.`,
                title: "Une erreur est survenue"
            });
            return;
        }

        setFile(files[0]);

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!e.currentTarget.checkValidity()) {
            setValidated(true);
            return;
        }

        const uniqueFilename = firebaseService.getUniqueFilename(file);
        const uploadTask = firebaseService.uploadFile(file, uniqueFilename);

        uploadTask.on('state_changed', (snapshot) => {
            setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        });

        const id = await firebaseService.addFile(file.name, uniqueFilename);

        setFile(null);
        fileInputRef.value = null;

        Swal.fire({
            footer: `<a href="/files/${id}">${id}</a>`,
            icon: 'success',
            text: 'Le fichier a été envoyé avec succès !',
            title: "C'est tout bon !"
        });
    }

    return (
        <Card>
            <Card.Header>Envoyer un fichier</Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Control className="mb-3" ref={setFileInputRef} type="file" onChange={handleFileChange} required />
                    <ProgressBar animated className="mb-3" now={uploadProgress} label={`${uploadProgress}%`} />
                    <Button className="w-100" type="submit">Obtenir un lien</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}