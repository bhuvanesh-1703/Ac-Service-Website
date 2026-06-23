const express = require('express');
const router = express.Router();
const bookingController = require("../Controller/bookingController")

router.post("/", bookingController.createBooking)
router.get("/", bookingController.getBooking)
router.delete("/:id", bookingController.deleteBooking)

module.exports = router
  