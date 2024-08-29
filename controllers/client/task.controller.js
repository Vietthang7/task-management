const Task = require("../../models/task.model");
const User = require("../../models/user.model");

// [GET]/tasks
module.exports.index = async (req, res) => {
  const find = {
    $or: [
      {
        createdBy: req.user.id
      },
      {
        listUser: req.user.id
      }
    ],
    deleted: false
  };
  // Lọc theo trạng thái
  const status = req.query.status;
  if (status) {
    find.status = status;
  }
  // Hết lọc theo trạng thái

  // Sắp xếp
  const sort = {};
  const sortKey = req.query.sortKey;
  const sortValue = req.query.sortValue;
  if (sortKey && sortValue) {
    sort[sortKey] = sortValue;
  }
  // End Sắp xếp


  // Phân trang
  let limitItems = 2;
  if (req.query.limitItems) {
    limitItems = parseInt(req.query.limitItems);
  }
  let page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }
  const skip = (page - 1) * limitItems;
  // Hết Phân trang
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }
  // Hết Tìm kiếm
  const tasks = await Task
    .find(find)
    .sort(sort)
    .limit(limitItems)
    .skip(skip);

  res.json(tasks);
};
// [GET]/tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false
    });
    res.json(task);
  } catch (error) {
    res.json({
      message: "Not Found"
    });
  }
};
// [PATCH] /tasks/change-status
module.exports.changeStatus = async (req, res) => {
  try {
    const ids = req.body.ids;
    const status = req.body.status;

    await Task.updateMany({
      _id: { $in: ids }
    }, {
      status: status
    });

    res.json({
      message: "Cập nhật dữ liệu thành công!"
    });
  } catch (error) {
    res.json({
      message: "Not Found"
    });
  }
}
// [POST] /tasks/create
module.exports.create = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const listUser = req.body.listUser;
    const users = await User.find({
      _id: {
        $in: listUser
      }
    }).select("_id");
    if (listUser.length !== users.length) {
      res.json({
        code: 400,
        message: "Người tham gia task không hợp lệ"
      });
      return;
    }
    const parentTask = req.body.parentId;
    const existparentTask = await Task.findOne({
      _id: parentTask,
    });
    if (!existparentTask) {
      res.json({
        code: 400,
        message: "Không tồn tại task cha trong hệ thống !"
      });
      return;
    }
    const task = new Task(req.body);
    await task.save();
    res.json({
      message: "Tạo mới công việc thành công!",
      task: task
    });
  } catch (error) {
    res.json({
      message: "Not Found"
    });
  }
}
// [PATCH] /tasks/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.updateOne({
      _id: id
    }, req.body);

    res.json({
      message: "Cập nhật công việc thành công!"
    });
  } catch (error) {
    res.json({
      message: "Not Found"
    });
  }
}
// [PATCH] /tasks/delete
module.exports.delete = async (req, res) => {
  try {
    const ids = req.body.ids;

    await Task.updateMany({
      _id: { $in: ids }
    }, {
      deleted: true
    });

    res.json({
      message: "Xóa công việc thành công!"
    });
  } catch (error) {
    res.json({
      message: "Not Found"
    });
  }
}