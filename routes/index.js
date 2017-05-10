var express = require('express');
var router = express.Router();
const debug = require('debug')('users');
const dataMgr = require('../bin/dataMgr');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.username !== undefined) {
    debug(`logged in with profile`);
    let pList = [];
    pList.push(dataMgr.getUser(req.cookies.username));
    pList.push(dataMgr.listRooms());
    Promise.all(pList).then(function(data) {
      res.render('index', {
        title: 'Super Chat',
        username: req.cookies.username,
        greeting: data[0].firstname + ' ' + data[0].lastname,
        firstname: data[0].firstname,
        lastname: data[0].lastname,
        rooms: data[1]
      });

    });
  } else {
    debug(`not logged in`);
    res.render('index', {
      title: 'Super Chat',
      username: null,
      greeting: null,
      firstname: null,
      lastname: null
    });
  }

});

module.exports = router;
