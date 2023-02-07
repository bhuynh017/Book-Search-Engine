const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// importing schema from book.js
const bookSchema = require("./Book");

// defining mongoose schema for userSchema.
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    // adding bcrypt
    password: {
      type: String,
      required: true,
    },
    savedBooks: [bookSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hashing the users password before saving it to the db.
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    // specifying the number of rounds
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// creating bookCount and returning the length of saved books.
userSchema.virtual("bookCount").get(function () {
  return this.savedBooks.length;
});

const User = model("User", userSchema);

module.exports = User;
