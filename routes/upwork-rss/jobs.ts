import axios from "axios";
import express from "express";
import { UpworkRSS } from "../../helpers/upworkRss";

const router = express.Router();

// set job alert
router.post("/set-alert", async (req, res) => {
  // This url shows a users filtered jobs in xml format
  const { rssUrl } = req.body;
  const { title } = req.body;

  try {
    //  call get RSS on an interval of 3 minutes
    setInterval(() => UpworkRSS.getRSS(rssUrl, title), 180000);
    res.status(200).send({
      message: `Alert (${title}) set to run at an interval of 3 minutes if job posts are less than 5 minutes old`,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the RSS feed" });
  }
});

// get job posts
router.post("/get-posts", async (req, res) => {
  const { rssUrl } = req.body;
  const { title } = req.body;

  try {
    const posts = await UpworkRSS.getRSS(rssUrl, title);
    res.status(200).send(posts);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the RSS feed" });
  }
});

export default router;
