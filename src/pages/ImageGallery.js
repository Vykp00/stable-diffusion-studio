import React, { useState, useEffect } from 'react';
import HTTP from '../httpClient';
import BrandHeader from '../components/Header';
import Footer from '../components/Footer';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Make an API request to fetch the images from your Flask backend
    HTTP.get('https://studio-ai.onrender.com/gallery')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  return (
    <React.Fragment>
      <BrandHeader />
      <h1>My Gallery</h1>
      <Row xs={6} md={3} className="g-4">
        {images.map((image) => (
          <Col key={image.id} xs={6} md={3}>
            <Card>
              <Card.Img variant="top" src={image.url} />
              <Card.Body>
                <Card.Title>{image.prompt}</Card.Title>
                <Card.Text>
                  <b>Prompt: </b> {image.prompt}
                  <br></br>
                  <b>Model: </b> {image.api}
                  <br></br>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Footer />
    </React.Fragment>
  );
};

export default ImageGallery;