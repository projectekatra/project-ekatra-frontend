import React from "react";

function Footer() {
  var year = new Date().getFullYear();
  return (
    <div style={{background: "#d7fbe8", margin: "0", padding: "10px 10px 10px 10px",textAlign: "center"}}>
      <p className="p1">
        Have Suggestions, feel free to contact through any of these.
      </p>
      <p>
        <a
          href="mailto: projectekatraofficial@gmail.com"
          className="fa fa-envelope icon-link"
          target = "_blank"
        >
          {""}
        </a>
        <a
          href="https://github.com/projectekatra"
          className="fa fa-github icon-link"
          target = "_blank"
        >
          {""}
        </a>
      </p>
      <p className="copyright">
        <span>©Project Ekatra {year}</span>
      </p>
    </div>
  );
}

export default Footer;
