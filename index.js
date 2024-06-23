const { request } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

require("dotenv").config();

app.use(express.json());

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(express.static("dist"));
app.use(morgan(":method :url :body"));
app.use(cors());

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(`Error ecountered whilst deleting: ${error}`);
    });
});

app.get("/api/info", (request, response) => {
  let time = new Date();
  time = time.toString();
  response.send(
    `<div><p>Phonebook has info for ${Person.length} people</p><p>${time}</p></div>`
  );
});

app.post("/api/persons", (request, response) => {
  console.log(request.body);
  const { name, number } = request.body;

  if (!name || !number) {
    return response
      .status(400)
      .send({ error: "Name and Number must not be empty" });
  }

  // if (persons.find((person) => person.name === name)) {
  //   return response.status(400).send({ error: "Person already exists" });
  // }

  const person = new Person({ name, number });
  person.save().then((person) => {
    response.json(person);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
