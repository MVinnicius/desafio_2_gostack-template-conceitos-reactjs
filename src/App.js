import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", 
      {
        title : `gostack-template-conceitos ${Date.now()}`, 
        url : "rocketseat-education/gostack-template-conceitos-nodejs", 	
        techs : [
          "ReactJS",
          "NodeJS",
          ".NET"
        ]
      }
    )

    const repository = response.data;

    setRepositories([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    const index = repositories.findIndex(repo => repo.id === id);

    console.log(index);

    repositories.splice(index, 1);

    console.log(repositories);

    setRepositories([...repositories]);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(repo => 
          <li key={repo.id}>{repo.title} 
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
