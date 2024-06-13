const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

let password = process.argv[2];
let url = `mongodb+srv://edward:${password}@phonebook.87ueq3q.mongodb.net/?retryWrites=true&w=majority&appName=Phonebook`;
console.log(url);

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personScheme = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personScheme);

if (process.argv[3] === undefined) {
  console.log("phonebook:");

  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  });
}
