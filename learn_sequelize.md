# Sequelize Learn

## Sequelize

> One-to-One (Một-một)
> BelongsTo: quan hệ một bảng thuộc về một bảng khác
> HasOne: quan hệ một bảng có một bản ghi liên kết đến một bảng khác

> One-to-Many (Một-nhiều)
> HasMany: quan hệ một bảng có nhiều bản ghi liên kết đến một bảng khác
> BelongsTo: quan hệ một bảng thuộc về một bảng khác

> Many-to-Many (Nhiều-nhiều)
> BelongsToMany: quan hệ nhiều-bảng-nhiều, sử dụng một bảng liên kết (thường gọi là bảng trung gian) để liên kết hai bảng khác nhau.

## Squelize Migrations CLI

- [Document Migrations](https://sequelize.org/docs/v6/other-topics/migrations/)

```bash
npx sequelize --help
```

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

> Tạo file Migration:

```bash
npx sequelize migration:create --name 'name migration'
```

> Chạy Migration:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate --name 'name migration'
npx sequelize db:migration --name test.js
```

> Chạy Migration theo tên file:

```bash
npx sequelize-cli db:migrate --to 'name migration'
```

> Hoàn tác migration, hãy sử dụng lệnh:

```bash
npx sequelize-cli db:migrate:undo
```

> Tạo seeders

```bash
npx sequelize-cli seed:generate --name demo-user
```

> Run seeders

```bash
npx sequelize-cli db:seed:all
```

> Hoàn tác seeders

```bash
npx sequelize-cli db:seed:undo
npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
npx sequelize-cli db:seed:undo:all
```
