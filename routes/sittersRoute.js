const express = require("express");
const router = express.Router();
const Sitter = require("../models/sitterModel");

router.get("/getallsitters", async (req, res) => {
    try {
      const sitters = await Sitter.find();
      res.send(sitters);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

  module.exports = router;
