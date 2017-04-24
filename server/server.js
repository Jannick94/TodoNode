var express    = require('express');
var cors       = require('cors');
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var Sequelize  = require('sequelize')
var sequelize  = new Sequelize('todo', 'homestead', 'secret', {
    host: 'localhost',
    port: 33060
});

var app        = express();

app.use(cors());
app.use(bodyParser());

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

var Todo = sequelize.define('todo', {
    text: Sequelize.STRING,
    date: Sequelize.DATE,
    done: Sequelize.BOOLEAN
});

app.get('/', (req, res) => {
    Todo.all().then(todos => {
        res.json(todos);
    });
});

app.post('/create-todo', (req, res) => {
    let date = req.body.todo.date;
    let text = req.body.todo.text;
    let done = (req.body.todo.done ? 1 : 0);

    Todo.create({
        date: date,
        text: text,
        done: done
    }).then(todo => {
        res.json(todo);
    });
});

app.post('/toggle-state', (req, res) => {
    Todo.update(
        { done: req.body.state },
        { where: { id: req.body.id } }
    ).then(todo => {
        res.json(todo);
    });
});

app.listen(3000, () => {
    console.log('todo api started on port 3000');
});