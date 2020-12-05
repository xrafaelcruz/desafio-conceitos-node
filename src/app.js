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

  return response.json(newRepository).status(201);
});

app.put("/repositories/:id", (request, response) => {
  const foundIndex = repositories.findIndex(repo => repo.id === request.params.id);

  repositories[foundIndex] = {
    ...repositories[foundIndex],
    ...request.body
  }

  return response.json(repositories[foundIndex])
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
