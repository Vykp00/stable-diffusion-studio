import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormSelect from 'react-bootstrap/FormSelect'
import Container from 'react-bootstrap/esm/Container';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

import React, { useState } from 'react';
import ImageDisplay from './ImageDisplay';
import HTTP from '../httpClient';
import AutoCarousel from './AutoCarousel';

function ModelForm() {
    const [imageData, setImageData] = useState(null);
    const [formData, setFormData] = useState({
        prompt: "",
        api: "stable-diffusion-2-1" // Default to Stable Diffusion v2.1
    });

    const handleInputChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await HTTP.post('http://127.0.0.1:5000/model', formData)
            .then((response) => { 
                console.log(response);
                setImageData(response.data);
               });

        } catch(error) {
            if (error.response) {
              console.log(error.response)
              console.log(error.response.status)
              console.log(error.response.headers)
              }};
    };

    return (
        <>
            <Stack gap={3}>
                < AutoCarousel />

                <Container>
                    <h1 className="text-center">Studio.ai Playground</h1>
                    <h4 className="text-center">Just enter your prompt and click the generate button.</h4>
                    <h4 className="text-center">No code required to generate your image!</h4>
                    <Stack gap={3}>
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col sm={9}>
                                    <Form.Group className="mb-3">
                                        <Form.Label><h2><Badge pill bg="info">Prompts</Badge></h2></Form.Label>
                                        <Form.Control as="textarea" rows={3}
                                            type="text"
                                            placeholder="Enter your prompt"
                                            name= "prompt"
                                            value={formData.prompt}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </Col>
                                <Col sm={3}>
                                    <Form.Group className="mb-3">
                                        <Form.Label><h2><Badge pill bg="info">Select Models</Badge></h2></Form.Label>
                                        {/*Here user select the model*/}
                                        <Form.Select name="api" value={formData.api} onChange={handleInputChange}>
                                            <option value="stable-diffusion-2-1">Stable Diffusion v2.1</option>
                                            <option value="stable-diffusion-v1-5">Stable Diffusion v1.5</option>
                                            <option value="stable-diffusion-xl-base-1.0">Stable Diffusion XL 1.0</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Button variant="outline-primary" size="lg" type="submit">
                                    Generate
                                </Button>
                            </Row>
                        </Form>
                        <h2><Badge pill bg="info">Image</Badge></h2>
                        {imageData && <ImageDisplay imageData={imageData.url} />}
                    </Stack >
                </Container >
            </Stack >
        </>
    );
}

export default ModelForm;