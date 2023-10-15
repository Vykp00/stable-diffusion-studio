import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/esm/Image';

import slide1 from '../static/451428_an abandoned pirate ship in the middle of the jung_xl-1024-v1-0.png';
import slide2 from '../static/611728_A beautify view of skyscraper with flying whales a_xl-1024-v1-0.png';
import slide3 from '../static/626665_a robotic lion sleeping on scenic cloud, with stun_xl-1024-v1-0.png';

function AutoCarousel() {
    return (
        <Container>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img width={1536} height={640} src={slide1} alt="slide1" />
                    <Carousel.Caption>
                        <h1>Making your dreams come true</h1>
                        <p>Generate amazing AI Art images from text using Stable Diffusion</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img width={1536} height={640} src={slide2} alt="slide2" />
                    <Carousel.Caption>
                        <h1>Easy to use</h1>
                        <p>It can create high quality images of anything you can imagine in seconds–just type in a text prompt and hit Generate.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img width={1536} height={640} src={slide3} alt="slide3" />
                    <Carousel.Caption>
                        <h1>Freedom</h1>
                        <p>No limitations on what you can enter.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

function ModelForm() {
    return (
        <>
            <Stack gap={3}>
                < AutoCarousel />
                
                <Container>
                    <h1 className="text-center">Studio.ai Playground</h1>
                    <h4 className="text-center">Just enter your prompt and click the generate button.</h4>
                    <h4 className="text-center">No code required to generate your image!</h4>
                    <Stack gap={3}>
                        <Form>
                            <Row>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label><h2><Badge pill bg="info">Prompts</Badge></h2></Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Button variant="outline-primary" size="lg" type="submit">
                                    Generate
                                </Button>
                            </Row>
                        </Form>
                        <h2><Badge pill bg="info">Image</Badge></h2>
                        <Image src="" />
                        <Button variant="primary" size="lg" type="button">
                            Download
                        </Button>
                    </Stack >
                </Container >
            </Stack >
        </>
    );
}

export default ModelForm;