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
          href="mailto: prakashaditya144@gmail.com"
          className="fa fa-envelope icon-link"
          target = "_blank"
        >
          {""}
        </a>
        <a
          href="https://www.linkedin.com/in/prakashaditya144/"
          className="fa fa-linkedin icon-link"
          target = "_blank"
        >
          {""}
        </a>
        <a
          href="https://twitter.com/_rickaditya_"
          className="fa fa-twitter icon-link"
          target = "_blank"
        >
          {""}
        </a>
        <a
          href="https://www.facebook.com/144ap"
          className="fa fa-facebook icon-link"
          target = "_blank"
        >
          {""}
        </a>
      </p>
      <p className="made-love">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by
        <strong>Aditya Prakash</strong>.
      </p>
      <p className="copyright">
        <span>©Project Ekatra {year}</span>
      </p>
    </div>
  );
}

export default Footer;
