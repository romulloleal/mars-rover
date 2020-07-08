import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegQuestionCircle } from "react-icons/fa";
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import Paginator from "react-hooks-paginator";

import Header from "../inc/header";
import Footer from "../inc/footer";

import api from "../../services/api";

import "./style.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Rover() {
  const apiKey = "ryH2gxsC6WeQFR3lkTzeupZtNU2A4n7gbcQ8ZAxM";

  // pega o nome da rover passado pela URL
  const { rover } = useParams();

  // retorna a imagem do rover selecionado
  const RoverImg = require(`../../assets/${rover}.jpg`);

  // loading da api
  const [loading, setLoading] = useState(false);

  // array contendo os dados da rover selecionada
  const [roversData, setRoversData] = useState([]);

  // maximo de dias da rover em marte
  const [maxSol, setMaxSol] = useState();

  // constantes usadas nos filtros e na paginação
  const [sol, setSol] = useState(); // sol é o dia da foto tirada em marte
  const [camera, setCamera] = useState(); // camera do robô
  const [pages, setPages] = useState(0); // quantidade de paginas das fotos (cada pagina contem 25 paginas)
  const [offset, setOffset] = useState(0);
  const [actualPage, setActualPage] = useState(1); // pagina atual das fotos (padrão 1)

  // array com as fotos
  const [photos, setPhotos] = useState([]);

  // retorna dados da api da rover selecionada
  useEffect(() => {
    api.get(`manifests/${rover}?api_key=${apiKey}`).then((response) => {
      setRoversData([response.data]);
      setMaxSol(response.data.photo_manifest.max_sol);
    });
  }, []);

  async function handlePhotos() {
    setLoading(true);
    // retorna as fotos de acordo com o filtro
    await api
      .get(
        `rovers/${rover}/photos?sol=${sol}&camera=${camera}&page=${actualPage}&api_key=${apiKey}`
      )
      .then((response) => {
        setPhotos([response.data]);
      });

    // api utilzada apenas para saber quantos resultados foram obtidos e paginar
    await api
      .get(
        `rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${apiKey}`
      )
      .then((response) => {
        setPages(response.data.photos.length);
      });

    setLoading(false);
  }

  setTimeout(function () {
    let el = document.querySelector(".content-rovers");
    el.classList.add("fade-in");
  }, 500);
  return (
    <>
      <Header />
      <main>
        <h2 className="title">Rover {rover}</h2>
        <div className="content-rovers">
          {roversData.map((roversInfo) => (
            <div className="rover-info" key={roversInfo.photo_manifest.name}>
              <img
                src={RoverImg}
                alt={roversInfo.photo_manifest.name}
                width="300"
              />
              <ul>
                <li>
                  <b>Data de lançamento: </b>
                  {roversInfo.photo_manifest.launch_date}
                </li>
                <li>
                  <b>Data de aterrissagem: </b>
                  {roversInfo.photo_manifest.landing_date}
                </li>
                <li>
                  <b>Status:</b> {roversInfo.photo_manifest.status}
                </li>
                <li>
                  <b>Fotos tiradas: </b>
                  {roversInfo.photo_manifest.total_photos}
                </li>
                <li>
                  <b>Dias em marte: </b>
                  {roversInfo.photo_manifest.max_sol}
                </li>
                <li>Obs: caso o dia não retorne nem uma camera significa que não foram tiradas fotos neste dia</li>
              </ul>
            </div>
          ))}
          <div className="filter">
            {/* <select name="date" onChange={(e) => setSol(e.target.value)}>
              <option>Selecione um dia</option>
              {roversData.map((filterDate) =>
                filterDate.photo_manifest.photos.map((filtered) => (
                  <option value={filtered.sol} key={filtered.sol}>
                    Dia {filtered.sol}
                  </option>
                ))
              )}
            </select> */}
            <input
              type="text"
              onChange={(e) => setSol(e.target.value)}
              placeholder={`Informe um dia de 0 a ${maxSol}`}
            />
            <select name="camera" onChange={(e) => setCamera(e.target.value)}>
              <option>Selecione uma camera</option>
              {roversData.map((filterCamera) =>
                filterCamera.photo_manifest.photos
                  .filter((filteredDate) => filteredDate.sol == sol)
                  .map((filtereds) =>
                    filtereds.cameras.map((cameras) => (
                      <option value={cameras} key={cameras}>
                        {cameras}
                      </option>
                    ))
                  )
              )}
            </select>
            <div className="tooltip">
              <FaRegQuestionCircle />
              <span className="tooltiptext">
                <h3>Descrição das câmeras:</h3>
                <ul>
                  <li>FHAZ - Câmera de prevenção de riscos dianteiros</li>
                  <li>RHAZ - Câmera de prevenção de riscos traseiros</li>
                  <li>MAST - Câmera de mastro</li>
                  <li>CHEMCAM - Complexo de Química e Câmera</li>
                  <li>MAHLI - Mars Imager Lente de Mão</li>
                  <li>MARDI - Mars Descent Imager</li>
                  <li>NAVCAM - Câmera de Navegação</li>
                  <li>PANCAM - Câmera Panorâmica</li>
                  <li>
                    MINITES - Espectrômetro de emissão térmica em miniatura
                  </li>
                </ul>
              </span>
            </div>
            <button className="btn btn-confirm" onClick={() => handlePhotos()}>
              Filtrar
            </button>
            <Link to="/" className="btn btn-cancel">
              Voltar
            </Link>
          </div>
        </div>

        {loading ? (
          <BeatLoader
            css={override}
            size={30}
            color={"#708090"}
            loading={loading}
          />
        ) : (
          <div className="photos">
            {photos.map((photo) =>
              photo.photos.map((filteredPhotos) => (
                <div className="camera-photo" key={filteredPhotos.id}>
                  <img src={filteredPhotos.img_src} alt="" />
                </div>
              ))
            )}
          </div>
        )}
        <div className="pagination">
          <Paginator
            totalRecords={pages}
            pageLimit={25}
            pageNeighbours={1}
            setOffset={(setOffset, () => handlePhotos())}
            currentPage={actualPage}
            setCurrentPage={setActualPage}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
