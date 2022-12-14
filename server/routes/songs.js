const song = require("../models/song");
const { isObjectIdOrHexString } = require("mongoose");

const router = require("express").Router();

router.get("/getAll", async (req, res) => {
  const options = {
    sort: { createdAt: 1 },
  };

  const data = await song.find(options);
  if (data) {
    res.status(200).send({ success: true, data: data });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

router.get("/getOne/:getOne", async (req, res) => {
  try {
    const filter = { _id: req.params.getOne };

    const data = await song.findOne(filter);
    console.log(data);

    if (data) {
      res.status(200).send({ success: true, data: data });
    } else {
      res.status(404).send({ success: false, msg: "No Data Found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
});

router.post("/save", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songUrl: req.body.songUrl,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });
  try {
    const savedSong = await newSong.save();
    res.status(200).send({ song: savedSong });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.put("/update/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );
    res.status(200).send({ artist: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await song.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

router.get("/getFavouritesSongs", async (req, res) => {
  try {
    const songId = req.query.songId;
    console.log("query ", songId);

    const data = await song.find({_id : {$in : songId}});
    console.log("data" , data);
    if (data) {
      res.status(200).send({ success: true, data: data });
    } else {
      res.status(404).send({ success: false, msg: "No Data Found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
});

module.exports = router;
