//!!FIX ASAP **call for assistance

const express = require("express");
const router = express.Router();
const uuid = require("uuid");
// const jwt = require("jsonwebtoken");
// const jwtLogic = require("../business-logic/jwt-logic");

// router.post("/", jwtLogic.verifyToken, (request, response) => {
router.post("/", (request, response) => {
  try {
    if (!request.files) {
      response.status(400).send("No File Sent !");
      return;
    }

    const file = request.files.image;
    const randomName = uuid();
    const extension = file.name.substr(file.name.lastIndexOf("."));
    file.mv(
      "../client/public/assets/images/vacations/" + randomName + extension
    );
    response.status(201).json(randomName + extension);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
