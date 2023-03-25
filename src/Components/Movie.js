import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
function Movie() {
  const [isMedia, setMedia] = useState("");
  
  return (
    <>
    < Navbar />
     
      <video
        src={isMedia}
        id="sampleMovie"
        width="100%"
        height="100%"
        preload
        controls
      ></video>
       <input
        type="file"
        accept=".mp4"
        onChange={(e) => {
          let file = e.target.files[0];
          const reader = new FileReader();
          reader.addEventListener("load", (event) => {
            setMedia(event.target.result);
          });
          reader.readAsDataURL(file);
        }}
      />
    </>
  );
}

export default Movie;
