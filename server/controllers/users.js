// const logic = require("../logic");
const express = require("express");
const usersLogic = require("../database/users-logic");
const router = express.Router();

// GET http://localhost:3000/api/auth/users
router.get("/users", async (request, response) => {
  try {
    const users = await usersLogic.getAllUsersAsync();
    response.json(users);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
// GET http://localhost:3000/api/auth/users/1
router.get("/users/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const user = await usersLogic.getOneUserAsync(id);
    response.json(user);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/register", async (request, response) => {
  try {
    const user = request.body;
    const newUser = await usersLogic.addUserAsync(user);
    if (newUser === 0) {
      throw "User name already exists";
    }
    if (newUser === 1) {
      throw "Something is missing";
    }
    response.status(201).json(newUser);
  } catch (error) {
    response.status(500).send(error);
  }
});
router.post("/login", async (request, response) => {
  try {
    const credentials = request.body;
    // console.log(credentials);
    if (!credentials.userName || !credentials.password) {
      response.status(401).send("Missing username or password, Try Again");
      return;
    }
    const user = await usersLogic.getOneUserAsync(credentials);
    if (user === 0) {
      response.status(401).send("Incorrect username or password, Try Again");
      return;
    }
    if (user[0].isAdmin == 1) {
      request.session.isLoggedIn = true;
      request.session.isAdmin = true;
      request.session.role = "Admin";
    } else {
      request.session.isLoggedIn = true;
      request.session.isAdmin = false;
      request.session.role = "User";
    }
    response.status(201).send(user[0]);
  } catch (err) {
    response.status(500).send(err);
  }
});

router.post("/logout", (request, response) => {
  request.session.destroy();
  response.send({ value: "Bye Bye" });
});

router.get("/followers", async (request, response) => {
  try {
    const followers = await usersLogic.getAllFollowersAsync();
    response.json(followers);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/follow", async (request, response) => {
  try {
    const lookupUser = await usersLogic.getFollowedVacs(request.body.userID);

    for (const i of lookupUser) {
      if (i.vacationID === request.body.vacationID) {
        // TODO reduce or prevent duplicates!
        // console.log(i.vacationID + " found");
        // console.log(lookupUser, i.vacationID);
        const toggleUser = await usersLogic.removeFollowedVac(
          request.body.userID,
          request.body.vacationID
        );
        response.sendStatus(204).send(toggleUser);
        // return response.status(403).send("user already follows this vacation");
      }
    }
    const addFollowToUser = await usersLogic.addUserFollowAsync(request.body);
    response.status(200).send(addFollowToUser);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/follow/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const vacs = await usersLogic.getFollowedVacs(id);
    const vacsFollowedArr = [];
    // sending only followed vacs to reorder on client:
    for (let i = 0; i < vacs.length; i++) {
      vacsFollowedArr.push(vacs[i].vacationID);
    }
    response.json(vacsFollowedArr);
  } catch (error) {
    response.status(500).send(error);
  }
});
// remove followed vacation
router.delete("/delete/:userID/:vacationID", async (request, response) => {
  try {
    const userID = +request.params.userID;
    const vacationID = +request.params.vacationID;
    await usersLogic.removeFollowedVac(userID, vacationID);
    response.sendStatus(204);
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = router;
