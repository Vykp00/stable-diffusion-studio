import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'

function BrandHeader() {
    return (
        <>
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
                </Container>
            </Navbar>

        </>
    );
}

export default BrandHeader;