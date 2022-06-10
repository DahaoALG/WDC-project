var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function checkif(a){
  if(a.indexOf(' ') >= 0 || a.indexOf(';') >= 0 || a.indexOf('-') >= 0 || a.indexOf('>') >= 0 || a.indexOf('<') >= 0){
    return true;
  }
  else{
    return false;
  }
};


router.get('/checkvisitor.ajax', function(req, res, next) {
  var username = req.cookies.username;
  if(username == undefined){
    res.send("no_log");
    return;
  }
  else{
    res.send(username);
  }
});


// -----------------------------------------------------------------------------
// 用户提交 major和course 选择
router.post('/submit_major', function(req, res, next) {
  var major_id=req.body.major_id;
  var username=req.body.username;
  // console.log(major_id);
  // console.log(username);

  if (major_id == '') {
    res.send("no_major_id");
    return;
  } else if (username == '') {
    res.send("no_username");
    return;
  } if (checkif(major_id)==true || checkif(username)==true) {
    res.send("invaild_input");
    return;
  }


  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var update_query="UPDATE user SET major_id=? WHERE username=?;";
    connection.query(update_query, [major_id, username], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
    });
    res.send();
  });
});

router.post('/submit_course', function(req, res, next) {
  var course_id=req.body.course_id;
  var user_name=req.body.user_name;

  if (course_id=='') {
    res.send("no_course_id");
    return;
  } else if (user_name=='') {
    res.send("no_user_name");
    return;
  }



  // console.log(course_id);
  // console.log(user_name);

  req.pool.getConnection(function(err, connection) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    var update_course_query="UPDATE user SET course_id=? WHERE username=?;";
    connection.query(update_course_query, [course_id, user_name], function(err, rows, fields) {
      connection.release();
      if (err) {
        res.sendStatus(500);
        return;
      }
    });
    res.send();
  });
});

router.post('/search', function(req, res, next) {
  var search_content=req.body.search_content;
  // var content_size=search_content.length();
  // console.log(search_content);

  if (search_content=='') {
    res.send("nothing");
  } else if (search_content.length==1) {
    res.send("only_one");
  } else {
    res.send("GET");
  }
});

module.exports = router;
