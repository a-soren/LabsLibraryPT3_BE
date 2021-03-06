const express = require("express");
const router = express.Router();
const db = require("../DATA/helpers/booksDb");
const restricted = require("../middleware/restricted");

router.get("/", async (req, res) => {
  try {
    const user = await db.get(req.query);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});
router.get("/books", async (req, res) => {
  console.log(req.query, "this is in  the mybooks components for a comparison");
  try {
    const user = await db.getById(req.query.user_id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});
router.get("/mybooks", restricted, async (req, res) => {
  const enter = req.userId;

  try {
    const user = await db.getById(enter);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});
router.get("/userbooks", async (req, res) => {
  console.log(req.body);

  try {
    const user = await db.getById(enter);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving the Users"
    });
  }
});
router.post("/", restricted, async (req, res) => {
  const newObj = {
    title: req.body.title,
    authors: req.body.authors,
    // ISBN: req.body.ISBN,
    cover: req.body.cover,
    user_id: req.userId //comes from restricted middleware, don't change to req.body.userId. not being passed from FE in the same way as the rest of the data
  };

  try {
    const user = await db.insert(newObj);
    res.status(201).json(newObj);
  } catch (error) {
    res.status(500).json({
      message: "Error adding the book"
    });
  }
});

router.delete("/", restricted, async (req, res) => {
  const user = await db.remove(req.headers.params);
});

module.exports = router;
