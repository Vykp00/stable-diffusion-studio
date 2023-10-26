import { Link } from "react-router-dom";
import notFound from "../static/404 Error-bro.png";
import Container from "react-bootstrap/esm/Container";
import Image from 'react-bootstrap/Image';

function NotFound() {
    return (
        <Container>
            <h1>Oops! You seem to be lost.</h1>
            <Image
                src={notFound}
                alt="Page Not Found"
                fluid/>
            <p>Here are some helpful links:</p>
            <Link to='/'>Home</Link>
            <br></br>
            <Link to='/auth/login'>Login</Link>
        </Container>
    );
}
export default NotFound;