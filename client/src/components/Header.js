import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

function BrandHeader() {
    return (
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={"client/public/static/brush-svg-large.svg"}
                            className="d-inline-block align-top"
                        />{' '}
                        Studio.ai
                    </Navbar.Brand>
                    <Nav>
                        <Button href="/login" variant="primary">Login</Button>{' '}
                        <Button href="/" variant="light">Signup</Button>{' '}
                    </Nav>
                </Container>
            </Navbar>
    );
}

export default BrandHeader;