import React, { useState, useEffect } from "react";
import axios from "axios";
import HTTP from "../httpClient";

function ImageDisplay() {
  const [imageData, setImageData] = useState('');

  useEffect(() => {
    // Fetch the image bytes from the Flask server
    HTTP.get('http://127.0.0.1:5000/model_SD2_1')
      .then((response) => {
        if (response.status === 200) {
          setImageData(response.data.image);
        } else {
          throw new Error('Failed to fetch image');
        }
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });
  }, []);

  return (
    <div>
      <h2>Image Display</h2>
      {imageData && (
        <img
          src={`data:image/jpeg;base64,${imageData}`} // Assuming the image is in JPEG format
          alt="Image"
        />
      )}
    </div>
  );
}

export default ImageDisplay;