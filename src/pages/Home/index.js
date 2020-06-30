import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api'

import CuriosityImg from '../../assets/curiosity.jpg';
import OpportunityImg from '../../assets/opportunity.jpg';
import SpiritImg from '../../assets/spirit.jpg';

import './style.css';

export default function Home() {
  const apiKey = 'ryH2gxsC6WeQFR3lkTzeupZtNU2A4n7gbcQ8ZAxM'

  const [curiosity, setCuriosity] = useState([])
  const [opportunity, setOpportunity] = useState([])
  const [spirit, setSpirit] = useState([])

  useEffect(() => {
    api.get(`manifests/curiosity?api_key=${apiKey}`).then(response => {
      setCuriosity([response.data]);
    });
    api.get(`manifests/opportunity?api_key=${apiKey}`).then(response => {
      setOpportunity([response.data]);
    });
    api.get(`manifests/spirit?api_key=${apiKey}`).then(response => {
      setSpirit([response.data]);
    });
  }, []);

  setTimeout(function () {
    let el = document.querySelector('.rovers');
    el.classList.add('fade-in');
  }, 1000);

  return (
    <>
      <div className="header">
        <div className="desc">
          <h1>Mars Rover</h1>
          <h3>
            Fotos tiradas pelos Rovers nas missões em Marte
        </h3>
        </div>
      </div>

      <div className="content">
        <h2>Selecione um Rover</h2>
        <div className="rovers">

          {curiosity.map(curio => (
            <div key={curio.photo_manifest.name} className="rover-card">
              <div className="rover">
                <Link to="/curiosity"><img src={CuriosityImg} alt="Curiosity" /></Link>
                <div className="title">{curio.photo_manifest.name}</div>
              </div>
              <ul className="desc">
                  <li><b>Lançamento: </b>{curio.photo_manifest.launch_date}</li>
                  <li><b>Aterrissagem: </b>{curio.photo_manifest.landing_date}</li>
                  <li><b>Sóis(dias): </b>{curio.photo_manifest.max_sol}</li>
                  <li><b>Última foto : </b>{curio.photo_manifest.max_date}</li>
                  <li><b>Status: </b>{curio.photo_manifest.status}</li>
                  <li><b>Fotos: </b>{curio.photo_manifest.total_photos}</li>
                </ul>
            </div>
          ))}

          {opportunity.map(oppor => (
            <div key={oppor.photo_manifest.name} className="rover-card">
              <div className="rover">
                <Link to="/opportunity"><img src={OpportunityImg} alt="Curiosity" /></Link>
                <div className="title">{oppor.photo_manifest.name}</div>
              </div>
                <ul className="desc">
                  <li><b>Lançamento: </b>{oppor.photo_manifest.launch_date}</li>
                  <li><b>Aterrissagem: </b>{oppor.photo_manifest.landing_date}</li>
                  <li><b>Sóis(dias): </b>{oppor.photo_manifest.max_sol}</li>
                  <li><b>Última foto : </b>{oppor.photo_manifest.max_date}</li>
                  <li><b>Status: </b>{oppor.photo_manifest.status}</li>
                  <li><b>Fotos: </b>{oppor.photo_manifest.total_photos}</li>
                </ul>
            </div>
          ))}

          {spirit.map(spiri => (
            <div key={spiri.photo_manifest.name} className="rover-card">
              <div className="rover">
                <Link to="/spirit"><img src={SpiritImg} alt="Curiosity" /></Link>
                <div className="title">{spiri.photo_manifest.name}</div>
              </div>
              <ul className="desc">
                  <li><b>Lançamento: </b>{spiri.photo_manifest.launch_date}</li>
                  <li><b>Aterrissagem: </b>{spiri.photo_manifest.landing_date}</li>
                  <li><b>Sóis(dias): </b>{spiri.photo_manifest.max_sol}</li>
                  <li><b>Última foto : </b>{spiri.photo_manifest.max_date}</li>
                  <li><b>Status: </b>{spiri.photo_manifest.status}</li>
                  <li><b>Fotos: </b>{spiri.photo_manifest.total_photos}</li>
                </ul>
            </div>
          ))}

        </div>
      </div >
    </>
  );
}