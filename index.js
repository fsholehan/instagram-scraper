const express = require("express");
const cors = require("cors");
const instagram = require("instatouch");
const { getStories } = require("instagram-stories");
require("dotenv").config();
const app = express();

const port = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await instagram.getUserMeta(username, {});
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/posts/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const posts = await instagram.user(username, {});
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await instagram.getPostMeta(
      `https://www.instagram.com/p/${id}/`,
      {}
    );
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

app.get("/stories", async (req, res) => {
  try {
    const posts = await getStories({
      id: 2246858295,
      userid: 45484162383,
      sessionid: process.env.IG_SESSION_ID,
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
