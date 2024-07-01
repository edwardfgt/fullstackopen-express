const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to mongdb");
  })
  .catch((error) => {
    console.log(
      `Error encountered whilst connecting to ${url}: ${error.message}`
    );
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
  },
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
