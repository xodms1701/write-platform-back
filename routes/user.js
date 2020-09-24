const express = require("express");
const router = express.Router();
const userService = require("./../services/UserService");
const membershipService = require("./../services/MembershipService");
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const jwt_secret = require("./../config.json").jwt_secret;
const utill = require("./../utill");

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    userService.findByEmail(email).then((result) => {
      if (result) {
        const db_pw = result.password;

        if (md5(password) === db_pw) {
          const token = jwt.sign({ email: email }, jwt_secret, {
            expiresIn: "7d",
          });
          res.cookie("user", token);

          const user = {
            email: email,
            user_type: result.user_type,
          };

          res.json({ success: true, user: user });
        } else {
          res.json({ success: false });
        }
      } else {
        res.json({ success: false });
      }
    });
  } else {
    res.json({ success: false });
  }
});

router.post("/join", (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = {
      email: email,
      password: md5(password),
      user_type: "B",
      is_delete: false,
      create_dt: new Date(),
    };

    userService.create(user).then((result) => {
      res.json({
        success: true,
      });
    });
  } else {
    res.json({
      success: false,
    });
  }
});

router.post("/is-login", utill.isLoggedin, (req, res, next) => {
  if (req.body.decoded) {
    userService.findByEmail(req.body.decoded.email).then((user) => {
      if (user) {
        res.json({
          success: true,
          user: user,
        });
      } else {
        res.json({
          success: false,
        });
      }
    });
  } else {
    res.json({
      success: false,
    });
  }
});

router.post("/join-writer", (req, res, next) => {
  const { email, content } = req.body;

  if(email) {
    userService.findByEmail(email).then((result) => {
      if (result) {
        const data = {
          user_id: result.no,
          content: content,
          state: 'W',
          is_delete: false,
          create_dt: new Date()
        };

        membershipService.findByUserId(data.user_id).then(membership => {
          if(!membership) {
            membershipService.create(data).then(result => {
              res.json({
                success: true,
              });
            });
          } else {
            res.json({
              success: false,
              message: "이미 신청이 처리 중입니다. 기다려 주세요."
            });
          }
        });
      } else {
        res.json({
          success: false,
          message: "잘못된 회원 정보입니다."
        });
      }
    });
  }else {
    res.json({
      success: false,
      message: "잘못된 회원 정보입니다."
    });
  }
});

module.exports = router;
