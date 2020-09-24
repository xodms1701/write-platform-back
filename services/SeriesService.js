const Series = require("../models/Series");
const Board = require("../models/Board");

module.exports = {
  findAll: () => {
    return Series.findAll({
      where: {
        is_delete: false,
      },
    });
  },
  findById: (series_id) => {
    return Series.findOne({
      where: {
        no: series_id,
        is_delete: false,
      },
      attributes: [
        "name",
        "content",
        "cover_img",
        "create_dt",
        "update_dt",
        "state",
      ],
      include: [
        {
          model: Board,
          where: {
            is_delete: false,
          },
          attributes: [
            "no",
            "title",
            "sub_title",
            "content",
            "notice_yn",
            "secret_yn",
            "create_dt",
            "update_dt",
          ],
          required: false,
        },
      ],
    });
  },
};
