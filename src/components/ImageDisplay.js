import React from "react";

function ImageDisplay({imageData}) {
  return (
    <div>
        <img
          src={imageData} // Assuming the image is in JPEG format
          alt="Image"
        />
    </div>
  );
}

export default ImageDisplay;