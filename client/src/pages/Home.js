import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';

function HomePage() {
  
    return (
        <Card className="text-center">
        <Card.Body>
          <Card.Title>Hello World</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

export default HomePage;