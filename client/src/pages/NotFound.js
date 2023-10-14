import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
            <h1>Oops! You seem to be lost.</h1>
            <svg width="640" height="426" xmlns="https://images.unsplash.com/photo-1600077106724-946750eeaf3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80">
            <image
                href="https://images.unsplash.com/photo-1600077106724-946750eeaf3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
                width="640" height="426"
                alt="Page Not Found"
            />
            </svg>
            <p>Here are some helpful links:</p>
            <Link to='/'>Home</Link>
            <br></br>
            <Link to='/login'>Login</Link>
        </div>
    );
}
export default NotFound;