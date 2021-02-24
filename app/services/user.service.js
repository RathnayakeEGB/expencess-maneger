const config = require("../../config.json");
const jwt = require("jsonwebtoken");
const userRepository = require("../dao/user.repository");
const db = require("../models");
const usersMgt = db.users;

module.exports = {
  authenticate,
  registration
};

async function authenticate({ username, password }) {
  let jwtObj = null;

  await userRepository
    .findUserByEmail(username)
    .then((user) => {
      if (user.email !== username || password !== user.password) {
        jwtObj = "Username or password invalid.";
      } else {
        const token = jwt.sign({ sub: user.email }, config.secret, {});

        jwtObj = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          token,
        };
      }
    })
    .catch((err) => {
      // console.log(err);
       jwtObj='Username or Password invalid';
    });

  return jwtObj;
}

async function registration(user) {


  const value = await userRepository .isEmailUsed(user.email).then((count) => {
      
    if (count > 0) {
        return "Email already used.";
      }

      if (!user.userName) {
        return "Username not found.";
      }

      if (!user.email) {
        return "email not found.";
      }
      if (!user.firstName) {
        return "email not found."; 
      }

      if (!user.lastName) {
        return "email not found.";
      }

      const u = {
        userName: user.userName,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        authType: user.authType,
        updatedDate: user.updatedDate,
      };
      return  userRepository.createUser(u);

    }).catch((err) => {
      console.log(err);
      return 500;
    });

    return value;
}
