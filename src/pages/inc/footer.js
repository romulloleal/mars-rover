import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="links">
        <Link target="_blank" to="//api.nasa.gov/">
          API
        </Link>
        <Link to="">Sobre</Link>
      </div>
      <div className="copy">&copy; {new Date().getFullYear()} Mars Rover</div>
    </footer>
  );
}
