import { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import './App.scss'

function App() {
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
        const storageRef = ref(getStorage(), file.name);

        const uploadResult = await uploadBytes(storageRef, file);

        await addDoc(collection(getFirestore(), 'images'), {
            fullPath: uploadResult.ref.fullPath,
            key: 'AE1P34'
        });

        setFile(null);
        setFileInputRef(null);
        fileInputRef.value = null;
    }

    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <Form.Control className="mb-3" ref={setFileInputRef} type="file" onChange={handleFileChange} />
                <Button className="w-100" type="submit">Obtenir un lien</Button>
            </Form>
        </Card>
    )
}

export default App
