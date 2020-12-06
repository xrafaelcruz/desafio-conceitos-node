const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const newRepository = {
    id: uuid(),
    likes: 0,
    ...request.body
  }

  repositories.push(newRepository)

  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const foundIndex = repositories.findIndex(repo => repo.id === request.params.id);

  if (foundIndex < 0) {
    return response.status(400).json({ error: 'repository not found!' })
  }

  repositories[foundIndex] = {
    ...repositories[foundIndex],
    ...request.body,
    likes: repositories[foundIndex].likes
  }

  return response.json(repositories[foundIndex])
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
  // TODO
});

module.exports = app;
