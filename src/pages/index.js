import React, { useState, useEffect } from 'react';

import api from './services/api';

function Home() {
  const apiKey = 'ryH2gxsC6WeQFR3lkTzeupZtNU2A4n7gbcQ8ZAxM'

  // estado que armazena camera selecionada (padrão: todas)
  const [camera, setCamera] = useState('all')

  // retorna api com informações da rover 'curiosiy'
  useEffect(() => {
    api.get(`manifests/Curiosity?api_key=${apiKey}`).then(response => {
      setProjetos(response.data);
    });
  }, []);

  // armazena dados e fotos retornadas pelo filtro
  const [marsPhotos, setMarsPhotos] = useState([])
  function handleSearch() {
    // retorna dados e fotos da mars rover 'curiosity'
    let apiUrl = `rovers/curiosity/photos?api_key=${apiKey}&sol=15`;
    if (camera !== 'all') {
      apiUrl = `rovers/curiosity/photos?api_key=${apiKey}&sol=15&camera=${camera}`
    }
    api.get(apiUrl).then(response => {
      setMarsPhotos(response.data);
    });
  }
  console.log(marsPhotos)
    return (
    <div className="App">
      <h1>Mars Rover Curiosity</h1>
      Camera
      <select name="filters" defaultValue="all" onChange={e => setCamera(e.target.value)}>
        <option value="all">Todas</option>
        <option value="fhaz">Câmera de prevenção de riscos dianteiros</option>
        <option value="rhaz">Câmera de prevenção de riscos traseiros</option>
        <option value="mast">Câmera de mastro</option>
        <option value="chemcam">Complexo de Química e Câmera	</option>
        <option value="mahli">Mars Lente de Mão</option>
        <option value="mardi">Mars Descida</option>
        <option value="navcam">Câmera de Navegação</option>
      </select>
      <button onClick={handleSearch}>Procurar</button>
    </div>
  );
}

export default Home;
