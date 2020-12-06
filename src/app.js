const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (_, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const newRepository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }

  repositories.push(newRepository)

  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const foundIndex = repositories.findIndex(repo => repo.id === id);

  if (foundIndex < 0) {
    return response.status(400).json({ error: 'repository not found!' })
  }

  const { url, title, techs } = request.body

  const updatedRepo = {
    id,
    url,
    title,
    techs,
    likes: repositories[foundIndex].likes
  }

  repositories[foundIndex] = updatedRepo

  return response.json(updatedRepo)
});

app.delete("/repositories/:id", (request, response) => {
  const foundIndex = repositories.findIndex(repo => repo.id === request.params.id);
  
  if (foundIndex < 0) {
    return response.status(400).json({ error: 'repository not found!' })
  }

  repositories.splice(foundIndex, 1)

  return response.status(204).json()
});

app.post("/repositories/:id/like", (request, response) => {
  const foundIndex = repositories.findIndex(repo => repo.id === request.params.id);

  if (foundIndex < 0) {
    return response.status(400).json({ error: 'repository not found!' })
  }
  
  repositories[foundIndex].likes += 1

  return response.json(repositories[foundIndex])
});

module.exports = app;
