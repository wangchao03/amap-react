import React, { useState } from "react";
import img from "@/style/imgs/404.png";

const ErrorPage: React.FC = () => {
  const [animated, setAnimated] = useState("");
  return (
    <div
      className="center"
      style={{ height: "100%", background: "#ececec", overflow: "hidden" }}
    >
      <img
        src={img}
        alt="404"
        className={`animated swing ${animated}`}
        onMouseEnter={() => {
          setAnimated("hinge");
        }}
      />
    </div>
  );
};
export default ErrorPage;
