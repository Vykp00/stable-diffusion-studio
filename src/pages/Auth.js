import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import BrandHeader from "../components/Header";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';

function WelcomeMessage() {
    return (
        <Container fluid>
            <Alert variant="info">
                <Alert.Heading>Hey, Welome to Studio.ai</Alert.Heading>
                <p>
                    This website is a space for you try out different stable diffusion models. You can generate images from text and store them into a photo gallery. Sign up and try it now!
                </p>
                <hr />
                <p className="mb-0">
                    GDPR Consent: We care deeply about your right to privacy and want you to know that your personal datas are stored to support the essential functionalities only.
                </p>
            </Alert>
        </Container>
    );
}
function DisabledForm() {
    return (
        <Container>
            <h1 className="text-center">Studio.ai Playground</h1>
            <h4 className="text-center">Just enter your prompt and click the generate button.</h4>
            <h4 className="text-center">No code required to generate your image!</h4>
            <Stack gap={3}>
                <Form>
                    <Row>
                        <Col sm={9}>
                            <Form.Group className="mb-3">
                                <Form.Label><h2><Badge pill bg="info">Prompts</Badge></h2></Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    type="text"
                                    placeholder="Enter your prompt" disabled />
                            </Form.Group>
                        </Col>
                        <Col sm={3}>
                            <Form.Group className="mb-3">
                                <Form.Label><h2><Badge pill bg="info">Select Models</Badge></h2></Form.Label>
                                {/*Here user select the model*/}
                                <Form.Select disabled>
                                    <option value="stable-diffusion-2-1">Stable Diffusion v2.1</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="outline-primary" size="lg" disabled>
                            Generate
                        </Button>
                    </Row>
                </Form>
                <h2><Badge pill bg="info">Image</Badge></h2>
            </Stack >
        </Container >
    );
}
function Auth() {
    return (
        <React.Fragment>
            <Stack gap={5}>
                <BrandHeader />
                <Outlet />
                <WelcomeMessage />
                <br></br>
                <Footer />
            </Stack>
        </React.Fragment>
    );
}
export default Auth;