import React from "react";
import { Link } from "react-router-dom";

import Header from '../inc/header';
import Footer from '../inc/footer';

import CuriosityImg from "../../assets/curiosity.jpg";
import OpportunityImg from "../../assets/opportunity.jpg";
import SpiritImg from "../../assets/spirit.jpg";

import "./style.css";

export default function Home() {
  setTimeout(function () {
    let el = document.querySelector(".rovers");
    el.classList.add("fade-in");
  }, 500);

  return (
    <>
    <Header />
      <main>
        <h2>Selecione um Rover</h2>
        <div className="rovers">
          <div className="rover-card">
            <Link to="/curiosity">
              <img src={CuriosityImg} alt="Curiosity" />
            </Link>
            <div className="title">Curiosity</div>
          </div>

          <div className="rover-card">
            <Link to="/opportunity">
              <img src={OpportunityImg} alt="Curiosity" />
            </Link>
            <div className="title">Opportunity</div>
          </div>

          <div className="rover-card">
            <Link to="/spirit">
              <img src={SpiritImg} alt="Curiosity" />
            </Link>
            <div className="title">Spirit</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
