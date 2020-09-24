const Board = require("../models/Board");
const Series = require("../models/Series");

module.exports = {
  findById: (board_id) => {
    return Board.findOne({
      where: {
        no: board_id,
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
      include: [
        {
          model: Series,
          where: {
            is_delete: false,
          },
          attributes: [
            "name",
            "no"
          ],
          required: false
        }
      ]
    });
  },
};
