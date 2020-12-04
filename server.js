const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
const express = require('express');
const middleware = require('webpack-dev-middleware');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(middleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.post('/login', (req, res) => {
  const { email, password } = req.body
  if (email === 'testuser@codegrit.jp' && password === 'password') {
    res.status(200).send(JSON.stringify({
      "id": 1,
      "name": "Code Grit",
      "email": "testuser@codegrit.jp",
      "message": "ログイン成功！"
    }));
  } else {
    res.status(401).send(JSON.stringify({
      message: "ログイン失敗"
    }))
  }
});

app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  if (userId === 1) {
    res.send({
      "id": 1,
      "name": "Code Grit",
      "email": "testuser@codegrit.jp"
    });
  } else {
    console.log(userId);
    res.status(403).send({
      error: "No resource found."
    });
  }
});

app.listen(3000, () => console.log('listening on port 3000!'));