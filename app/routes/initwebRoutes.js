const express = require('express');
const router = express.Router();
const apiApp = require('./api.router');
const siteRouter = require('./site.router');
const sachList = require('./sach.router');
const admin = require('./admin.router');
const login = require('./login.router');

let initwebRoutes = (app) => {
  // Api
  app.use('/api', apiApp);
  // Category
  app.use('/sach', sachList);
  // Admin
  app.use('/admin', admin);
  // Login
  app.use('/login', login);
  // Register
  app.use('/register', (req, res) => {
    res.render('register', { title: 'Đăng kí' });
  });
  // Home
  app.use('/', siteRouter);
  // Page 404
  app.use((req, res, next) => {
    res.status(404);
    res.format({
      html: function () {
        res.render('404', { url: req.url });
      },
      json: function () {
        res.json({ error: 'Not found' });
      },
      default: function () {
        res.type('txt').send('Not found');
      },
    });
  });
};
module.exports = initwebRoutes;
