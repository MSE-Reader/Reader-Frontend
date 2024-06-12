import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const CustomWidget = ({ imageurl }) => {
  return (
    <div>
      <Zoom>
        <img
          src={`data:image/png;base64,${imageurl}`}
          alt="Chat Image"
          style={{ maxWidth: "100%", cursor: "pointer" }}
        />
      </Zoom>
    </div>
  );
};

export default CustomWidget;
