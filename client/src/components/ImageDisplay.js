import React, { useState, useEffect } from "react";
import HTTP from "../httpClient";

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