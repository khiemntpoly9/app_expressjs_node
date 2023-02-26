# Hô hô hô

- Đây là bản Nodejs API nâng cấp của Khiêm
- Lưu ý nên đọc file này trước khi sử dụng

## RUN APP

- npm start

- Sử dụng NPX để sử dụng với các câu lệnh của Sequezile-cli

- Tạo file Migration:
  // npx sequelize migration: create --name 'tên migration'

- Chạy Migration:
  // npx sequelize-cli db:migrate
  // npx sequelize-cli db:migrate --name 'tên migration' --config 'config db'

  // npx sequelize db:migration --name test.js --config connectDB.js

- Chạy Migration theo tên file:
  // npx sequelize-cli db:migrate --to 'tên migration'

- Hoàn tác migration, hãy sử dụng lệnh:
  // npx sequelize-cli db:migrate:undo

- Xem trợ giúp: npx sequelize-cli --help
