const express = require("express");
const cors = require("cors");
const instagram = require("instatouch");
const {
  getStories,
  getUserByUsername,
  getUserHighlights,
} = require("instagram-stories");
require("dotenv").config();
const helmet = require("helmet");

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const options = {
  session: `sessionid=${process.env.IG_SESSION_ID}`,
  proxy: `http://${process.env.USER_NAME_PW}@${process.env.URL_PROXY}`,
};

app.get("/", (req, res) => {
  res.json("Hello");
});

app.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await instagram.getUserMeta(username, { options });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.get("/posts/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const posts = await instagram.user(username, { options });
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
      { options }
    );
    res.json(post);
  } catch (error) {
    console.log(error);
  }
});

app.get("/stories/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await getStories({
      id: userId,
      userid: 45484162383,
      sessionid: process.env.IG_SESSION_ID,
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

app.get("/user-data/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await getUserByUsername({
      username: username,
      userid: 45484162383,
      sessionid: process.env.IG_SESSION_ID,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
