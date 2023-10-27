import React from "react";
import Container from "react-bootstrap/Container";
function Footer () {

    return (
        <React.Fragment>
            <footer className="bg-light border-top py-3 flex">
                <Container>
                    &copy; Studio.ai
                </Container>
            </footer>
        </React.Fragment>
    );
}
export default Footer;