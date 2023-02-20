const { DataTypes } = require('sequelize');
const sequelize = require('../config/connectDB');

// 1 Model tương đương với 1 bảng cơ sở dữ liệu
// Ta sử dụng phương thức define() của đối tượng sequelize để định nghĩa model này.

// Lưu ý CỰC CAO: HÃY BACKUP DỮ LIỆU TRƯỢC KHI CHẠY CODE, NẾU KHÔNG SẼ BỊ DROP TABLE VÌ KHÔNG ĐÚNG KIỂU DỮ LIỆU

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Nếu bật động bộ Models, sẽ tự tạo database theo mẫu của Models
// Kiểu Number không được hỗ trợ trên Mysql, hãy dùng kiểu Integer

// Bố m commet lại :)
// async function syncModels() {
//   await sequelize.sync({ force: true });
//   console.log('Models synced successfully.');
// }
// syncModels();

// Hãy thêm dòng này để Sequelize tự tạo 2 cột createdAt và updatedAt
// {
//      timestamps: true,
// }
// Cột createdAt, updateAt là 2 cột mặc định của sequelize
// {
//      timestamps: false // Vô hiệu hóa createdAt và updatedAt
// }
// or đổi tên 2 côt này
// {
//      createdAt: 'created', // Đổi tên cột createdAt thành created
//      updatedAt: 'updated'  // Đổi tên cột updatedAt thành updated
// }

module.exports = User;
