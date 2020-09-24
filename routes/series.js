const express = require("express");
const router = express.Router();
const SeriesService = require("./../services/SeriesService");
const utill = require("./../utill");

router.post("/list", utill.isLoggedin, (req, res, next) => {
  if (req.body.decoded) {
    SeriesService.findAll().then((result) => {
      const series = [];
      for (let i = 0; i < result.length; i++) {
        let temp = {
          ...result[i].dataValues,
          create_dt: utill.convertDate(result[i].create_dt)
        };
        series.push(temp);
      }

      res.json({
        success: true,
        list: series
      });
    });
  } else {
    res.json({
      success: false,
    });
  }
});

router.post("/detail", utill.isLoggedin, (req, res, next) => {
  if (req.body.decoded) {
    const { series_id } = req.body;

    if(series_id) {
      SeriesService.findById(series_id).then(result => {

        if(result.create_dt) {
          result.dataValues.create_dt = utill.convertDate(result.create_dt);
        }

        if(result.update_dt) {
          result.dataValues.update_dt = utill.convertDate(result.update_dt);
        }

        for(let i = 0; i < result.Boards.length; i++) {
          console.log(result.Boards);
          if(result.Boards[i].create_dt) {
            result.Boards[i].dataValues.create_dt = utill.convertDate(result.Boards[i].create_dt);
          }

          if(result.Boards[i].update_dt) {
            result.Boards[i].dataValues.update_dt = utill.convertDate(result.Boards[i].update_dt);
          }
        }

        res.json({
          success: true,
          list: result
        });
      });
    }else {
      res.json({
        success: false
      });
    }

  } else {
    res.json({
      success: false
    });
  }
});

module.exports = router;
