const express = require("express");
const router = express.Router();
const utill = require('./../utill');

const boardService = require("./../services/BoardService");

router.post('/detail', utill.isLoggedin, (req, res, next) => {
  if(req.body.decoded) {
    const { board_id } = req.body;

    if(board_id) {
      boardService.findById(board_id).then(result => {
        if(result.create_dt) {
          result.dataValues.create_dt = utill.convertDate(result.create_dt);
        }

        if(result.update_dt) {
          result.dataValues.update_dt = utill.convertDate(result.update_dt)
        }

        res.json({
          success: true,
          board: result
        })
      });
    }else {
      res.json({
        success: false
      })
    }
  } else {
    res.json({
      success: false
    });
  }
});

module.exports = router;