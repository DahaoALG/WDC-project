var express = require('express');
var router = express.Router();


var nodemailer = require('nodemailer');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//----------------------------------------------------------------------------------------------------------------------------
function checkif(a) {
    if (a.indexOf(' ') >= 0 || a.indexOf(';') >= 0 || a.indexOf('-') >= 0 || a.indexOf('>') >= 0 || a.indexOf('<') >= 0) {
        return true;
    } else {
        return false;
    }
};

//----------------------------------------------------------------------------------------------------------------------------
router.post('/login.ajax', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var check = req.cookie;
    if (check !== undefined) {
        res.send("find_log");
        return;
    } else if (username == '') {
        res.send("no_username");
        return;
    } else if (password == '') {
        res.send("no_password");
        return;
    } else if (username == '' && password == '') {
        res.send("no_both");
        return;
    } else if (checkif(username) == true || checkif(password) == true) {
        res.send("invaild_input");
        return;
    }
    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }


        var query = "SELECT password FROM user WHERE username = ?;";
        connection.query(query, username, function(error, result, fields) {
            connection.release();
            if (result.length == 0) {
                res.send("no_exist");
                return;
            }
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (result[0].password == password) {
                res.cookie('username', username); //ccccccccccccccccccccoooooooooooooooooooooooooookkkkkkkkkkkkkkkkkkkkkiiiiiiiiiiiiiiiiieeeeeeeeeeeeee
                res.send("true");
            }
            if (result[0].password != password) {
                res.send("false");
            }
        });
    });

});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/signup.ajax', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var conpassword = req.body.conpassword;
    var code = req.body.code;
    var realcode = req.body.realcode;
    var set = req.body.set;
    console.log(set);
    if (username == '') {
        res.send("no_username");
        return;
    } else if (password == '') {
        res.send("no_password");
        return;
    } else if (email == '') {
        res.send("no_email");
        return;
    } else if (conpassword == '') {
        res.send("no_conpassword");
        return;
    } else if (password != conpassword) {
        res.send("no_match");
        return;
    } else if (realcode == '?') {
        res.send("no_code");
        return;
    } else if (realcode != code) {
        res.send("no_code_match");
        return;
    } else if (checkif(username) == true || checkif(password) == true || checkif(conpassword) == true || checkif(email) == true || checkif(code) == true) {
        res.send("invaild_input");
        return;
    }
    console.log("yse");
    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        //1 验证是否重复username
        var query1 = "SELECT username FROM user WHERE username = ?;";
        connection.query(query1, username, function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            if (result && result.length) {
                console.log("found");
                res.send("userfound");
                return;
            } else {
                //2验证是否重复email
                req.pool.getConnection(function(error, connection) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(500);
                        return;
                    }
                    var query2 = "SELECT email FROM user WHERE email = ?;";
                    connection.query(query2, email, function(error, result, fields) {
                        connection.release();
                        if (error) {
                            console.log(error);
                            res.sendStatus(500);
                            return;
                        }
                        if (result && result.length) {
                            console.log("found");
                            res.send("emailfound");
                            return;
                        } else {
                            //3添加到sql

                            var touser_id;

                            req.pool.getConnection(function(error, connection) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(500);
                                    return;
                                }
                                var query3 = "INSERT INTO user VALUES (NULL,?,?,?,NULL,NULL,NULL);";
                                connection.query(query3, [username, password, email], function(error, result, fields) {
                                    connection.release();
                                    if (error) {
                                        console.log(error);
                                        res.sendStatus(500);
                                        return;
                                    }
                                    console.log("user added to database");
                                    touser_id = result.insertId;
                                    console.log("touser_id" + touser_id);
                                    req.pool.getConnection(function(error, connection) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(500);
                                            return;
                                        } else {
                                            if (set == true) {
                                                var query4 = "insert into note values (null,1,1,1,1,?);";
                                                connection.query(query4, touser_id, function(error, fields) {
                                                    connection.release();
                                                    if (error) {
                                                        console.log(error);
                                                        res.sendStatus(500);
                                                        return;
                                                    }
                                                    console.log("done!");
                                                    res.send("yes");
                                                });
                                            } else if (set == false) {
                                                var query5 = "insert into note values (null,0,0,0,0,?);";
                                                connection.query(query5, touser_id, function(error, fields) {
                                                    connection.release();
                                                    if (error) {
                                                        console.log(error);
                                                        res.sendStatus(500);
                                                        return;
                                                    }
                                                    console.log("done!");
                                                    res.send("yes");
                                                });
                                            }
                                        }

                                    });
                                });
                            });

                        };


                    });
                });
            };

        });
    });

});

//nodemailer初始化
//----------------------------------------------------------------------------------------------------------------------------
/*
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
      user: 'tyra.roberts9@ethereal.email',
      pass: '8dEVgtSR7KZdvBpKfV',
  },
  tls:{
    rejectUnauthorized: false //在localhost运行，因为chrome不让用虚拟机发送邮件
  }
});
*/

// Manage user
// nodemailer 初始化
let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'felicita.steuber85@ethereal.email',
        pass: 'pqvJ1Fjc3grkZKG1vq',
    },
    // tls : {
    //   rejectUnauthorized: false
    // }
});




//验证是否是邮箱
//----------------------------------------------------------------------------------------------------------------------------
function validateEmail(email) {
    var keyword = /\S+@\S+\.\S+/;
    return keyword.test(email);
};

//生成五位随机数
//----------------------------------------------------------------------------------------------------------------------------
function randomcode() {
    var code = '';
    for (var i = 0; i < 5; i++) {
        var num1 = Math.floor(Math.random() * 10);
        code = code + num1.toString();
    }
    return code;
}
//----------------------------------------------------------------------------------------------------------------------------
router.post('/getcode.ajax', function(req, res, next) {
    var code = randomcode();
    var email = req.body.email;
    console.log(code);
    if (!validateEmail(email)) {
        console.log("not email form");
        res.send("not_email");
        return;
    } else if (checkif(email) == true) {
        res.send("not_email");
        return;
    }
    //邮件格式
    var mailcontent = {
            from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
            to: email,
            subject: "Verification code",
            text: "Hi,",
            html: `<h4>Your Aoligei Verification code is: ${code}</h4>`,
        }
        //发出
    transporter.sendMail(mailcontent, function(error, data) {
        if (error) {
            console.log(error);
            res.sendStatus(401);
        } else {
            console.log("send!");
            res.send(code);
        }
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/getdetail.ajax', function(req, res, next) {

    var email = req.body.email;
    var code = req.body.code;
    var realcode = req.body.realcode;

    if (email == '') {
        res.send("no_email");
        return;
    } else if (realcode == '?') {
        res.send("no_code");
        return;
    } else if (realcode != code) {
        res.send("no_code_match");
        return;
    } else if (checkif(email) == true || checkif(code) == true || checkif(realcode) == true) {
        res.send("not_email");
        return;
    }

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        var query = "SELECT username, password FROM user WHERE email = ?"
        connection.query(query, email, function(error, result, fields) {
            connection.release();
            console.log(result);
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (result && result.length) {
                var username = result[0].username;
                var password = result[0].password;
                var mailcontent = {
                    from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                    to: email,
                    subject: "Your details",
                    text: "Hi,",
                    html: `<h4>Your Aoligei username is ${username}</h4>
                <h4>Your Aoligei password is ${password}</h4>`,
                }

                transporter.sendMail(mailcontent, function(error, data) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(401);
                    } else {
                        console.log("send!");
                        res.send("yes");
                    }
                });
            } else {
                console.log("nofound");
                res.send("emailnofound");
                return;
            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/getforgetcode.ajax', function(req, res, next) {
    var code = randomcode();
    console.log(code);
    var email = req.body.email;
    if (!validateEmail(email)) {
        console.log("not email form");
        res.send("not_email");
        return;
    } else if (checkif(email) == true) {
        res.send("not_email");
        return;
    }

    var mailcontent = {
        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
        to: email,
        subject: "Verification code",
        text: "Hi,",
        html: `<h4>Your Aoligei Verification code for get your details is: ${code}</h4>`,
    }

    transporter.sendMail(mailcontent, function(error, data) {
        if (error) {
            console.log(error);
            res.sendStatus(401);
        } else {
            console.log("send!");
            res.send(code);
        }
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.get('/getusername.ajax', function(req, res, next) {
    var username = req.cookies.username;
    if (username == undefined) {
        res.send("no_log");
        return;
    }
    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "select * from user inner join note on user.user_id = note.user_id where username = ?;";
        connection.query(query, username, function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send(result);
            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.get('/logout.ajax', function(req, res, next) {
    res.clearCookie("username");
    res.send("cookiecleared");
});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/changepass.ajax', function(req, res, next) {
    var user_id = req.body.user_id;
    var change_pass = req.body.change_pass;
    var code = req.body.code;
    var realcode = req.body.realcode;

    if (change_pass == '') {
        res.send("no_password");
        return;
    } else if (realcode == '?') {
        res.send("no_code");
        return;
    } else if (realcode != code) {
        res.send("no_code_match");
        return;
    }

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "UPDATE user SET password = ? WHERE user_id = ?;";
        connection.query(query, [change_pass, user_id], function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send("done!");
            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/changenote.ajax', function(req, res, next) {
    var user_id = req.body.user_id;
    var responed = req.body.responed;
    var comfirm = req.body.comfirm;
    var event_finish = req.body.event_finish;
    var event_cancel = req.body.event_cancel;


    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "update note set responed = ?, comfirm = ?, event_finish = ?, event_cancel = ? where user_id = ?;";
        connection.query(query, [responed, comfirm, event_finish, event_cancel, user_id], function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send("done!");
            }
        });
    });
});
//发event----------------------------------------------------------------------------------------------------------------------------
router.post('/posts.ajax', function(req, res, next) {
    console.log(req.body);

    var event_name = req.body.event_name;
    var event_host_id = req.body.event_host_id;
    var event_description = req.body.event_description;
    var event_place = req.body.event_place;
    var event_time = req.body.event_time;
    var event_post_time = req.body.event_post_time;
    var event_situation = req.body.event_situation;
    var email = req.body.email;
    var comfirm = req.body.comfirm;

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "INSERT INTO event VALUES (NULL,?,?,?,?,?,?,?);";
        connection.query(query, [event_name, event_host_id, event_description, event_place, event_time, event_post_time, event_situation], function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                if (comfirm == true) {

                    var mailcontent = {
                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                        to: email,
                        subject: "You have set up an event!",
                        text: "Hi,",
                        html: `<h4>Your Aoligei event title is : ${event_name}</h4>
                    <h4>Your event time is : ${event_time}</h4>
                    <h4>Your event place is : ${event_place}</h4>
                    <h4>Your event is : ${event_description}</h4>
                    <h4>post at : ${event_post_time}</h4>`,
                    }
                    console.log(mailcontent);
                    transporter.sendMail(mailcontent, function(error, data) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(401);
                        } else {
                            console.log("send!");
                            res.send("done!");
                        }
                    });
                } else {
                    res.send("done!");
                }
            }
        });
    });
});
//返回event
router.get('/getevents.ajax', function(req, res, next) {

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "select * from event, user where event.event_host_id = user.user_id";
        connection.query(query, function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send(result);
            }
        });
    });
});
//删除event----------------------------------------------------------------------------------------------------------------------------
router.post('/deletepost.ajax', function(req, res, next) {
    console.log(req.body);
    var target = req.body.event_id;
    var username = req.body.username;
    var email = req.body.email;
    var event_cancel = req.body.event_cancel;

    var event_name = req.body.event_name;
    var event_time = req.body.event_time;
    var event_place = req.body.event_place;
    var event_description = req.body.event_description;
    var event_post_time = req.body.event_post_time;

    var result;

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        } else {
            var query3 = "select username, email from user, note, eventmember where note.event_cancel = 1 and user.user_id = note.user_id and eventmember.user_id = user.user_id and eventmember.event_id = ?;";
            connection.query(query3, target, function(error, reresult, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                } else {
                    result = reresult;
                    console.log("get evevtmembers");
                }
            });
        }
    });

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "delete from eventmember where event_id = ?;";
        connection.query(query, target, function(error, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {

                req.pool.getConnection(function(error, connection) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(500);
                        return;
                    } else {
                        var query2 = "delete from event where event_id = ?;";
                        connection.query(query2, target, function(error, fields) {
                            connection.release();
                            if (error) {
                                console.log(error);
                                res.sendStatus(500);
                                return;
                            } else { /*1*/

                                for (let i = 0; i < result.length; i++) {
                                    var mailcontent1 = {
                                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                                        to: result[i].email,
                                        subject: "Your attend event is deleted!",
                                        text: "Hi",
                                        html: `<h4>Hi ${result[i].username},</h4>
                <p>event : ${event_name} is deleted!</p>
                <p>Here are the details:</p>
                <p>event time : ${event_time}</p>
                <p>event place: ${event_place}</p>
                <p>event description : ${event_description}</p>
                <p>event post at : ${event_post_time}</p>
                <p>please contact manager for further details</p>`,
                                    }
                                    console.log(mailcontent1);
                                    transporter.sendMail(mailcontent1, function(error, data) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(401);
                                        } else {
                                            console.log("send to delete member!");
                                        }
                                    });
                                }; //end for loop

                                if (event_cancel == true) {
                                    var mailcontent = {
                                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                                        to: email,
                                        subject: "You delete an event!",
                                        text: "Hi,",
                                        html: `<h4>Hi ${username},</h4>
                        <p>You just delete a event :${event_name}!</p>
                        <p>Here are the details:</p>
                        <p>event time : ${event_time}</p>
                        <p>event place: ${event_place}</p>
                        <p>event description : ${event_description}</p>
                        <p>event post at : ${event_post_time}</p>
                        <p>please contact manager for further details</p>`,
                                    }
                                    transporter.sendMail(mailcontent, function(error, data) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(401);
                                        } else {
                                            console.log("send to delete host!");
                                            res.send("done!");
                                        }
                                    });
                                } else {
                                    res.send("done!");
                                }


                            } /*1*/
                        });
                    };
                });
            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/quitpost.ajax', function(req, res, next) {
    console.log(req.body);
    var event_id = req.body.event_id;
    var username = req.body.username;
    var email = req.body.email;
    var comfirm = req.body.comfirm;
    var user_id = req.body.user_id;
    var event_name = req.body.event_name;
    var event_time = req.body.event_time;
    var event_place = req.body.event_place;
    var event_description = req.body.event_description;
    var event_post_time = req.body.event_post_time;
    var event_host_id = req.body.event_host_id;

    var result;

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        } else {
            var query = "select username, responed, email from user, note where user.user_id = note.user_id and user.user_id = ?;";
            connection.query(query, event_host_id, function(error, result1, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                } else {
                    result = result1;
                    console.log("get host");
                }
            });
        }
    });

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "delete from eventmember where event_id = ? and user_id = ?;";
        connection.query(query, [event_id, user_id], function(error, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                if (comfirm == true) {
                    var mailcontent = {
                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                        to: email,
                        subject: "You quit an event!",
                        text: "Hi,",
                        html: `<h4>Hi ${username},</h4>
                        <p>You just quit from a event :${event_name}!</p>
                        <p>Here are the details:</p>
                        <p>event time : ${event_time}</p>
                        <p>event place: ${event_place}</p>
                        <p>event description : ${event_description}</p>
                        <p>event post at : ${event_post_time}</p>`,
                    }
                    transporter.sendMail(mailcontent, function(error, data) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(401);
                        } else {
                            console.log("send to quit!");
                            res.send("done!");
                        }
                    });
                } else {
                    res.send("done!");
                }

                if (result[0].responed.includes(1) == true) {
                    var mailcontent = {
                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                        to: result[0].email,
                        subject: "One of your member quit an event!",
                        text: "Hi,",
                        html: `<h4>Hi ${result[0].username},</h4>
                        <p>You just have a member quit from a event :${event_name}!</p>
                        <p>Here are the details:</p>
                        <p>event time : ${event_time}</p>
                        <p>event place: ${event_place}</p>
                        <p>event description : ${event_description}</p>
                        <p>event post at : ${event_post_time}</p>`,
                    }
                    transporter.sendMail(mailcontent, function(error, data) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(401);
                        } else {
                            console.log("send to quit host!");
                            res.send("done!");
                        }
                    });
                } else {
                    res.send("done!");
                }
            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/finishpost.ajax', function(req, res, next) {
    console.log(req.body);
    var target = req.body.event_id;
    var username = req.body.username;
    var email = req.body.email;
    var event_finish = req.body.event_finish;

    var event_name = req.body.event_name;
    var event_time = req.body.event_time;
    var event_place = req.body.event_place;
    var event_description = req.body.event_description;
    var event_post_time = req.body.event_post_time;

    var result;

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        } else {
            var query = "select username, email, event_finish from user, note, eventmember where note.event_finish = 1 and user.user_id = note.user_id and eventmember.user_id = user.user_id and eventmember.event_id = ?;";
            connection.query(query, target, function(error, reresult, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                } else {
                    result = reresult;
                    console.log("get evevtmembers");
                }
            });
        }
    });

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query1 = "update event set event_situation = 1 where event_id = ?";
        connection.query(query1, target, function(error, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {

                for (let i = 0; i < result.length; i++) {
                    var mailcontent1 = {
                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                        to: result[i].email,
                        subject: "Your event is finished!",
                        text: "Hi",
                        html: `<h4>Hi ${result[i].username},</h4>
                <p>event : ${event_name} is finished!</p>
                <p>Here are the details:</p>
                <p>event time : ${event_time}</p>
                <p>event place: ${event_place}</p>
                <p>event description : ${event_description}</p>
                <p>event post at : ${event_post_time}</p>`,
                    }

                    transporter.sendMail(mailcontent1, function(error, data) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(401);
                        } else {
                            console.log("send to finish member!");
                        }
                    });
                }; //end for loop

                if (event_finish == true) {
                    var mailcontent = {
                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                        to: email,
                        subject: "You mark an event as finished!",
                        text: "Hi,",
                        html: `<h4>Hi ${username},</h4>
                        <p>You just mark an event : ${event_name} as finished!</p>
                        <p>Here are the details:</p>
                        <p>event time : ${event_time}</p>
                        <p>event place: ${event_place}</p>
                        <p>event description : ${event_description}</p>
                        <p>event post at : ${event_post_time}</p>`,
                    }
                    transporter.sendMail(mailcontent, function(error, data) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(401);
                        } else {
                            console.log("send to finish host!");
                            res.send("done!");
                        }
                    });
                } else {
                    res.send("done!");
                }


            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/joinevent.ajax', function(req, res, next) {
    var target = req.body.event_id;
    var adduser = req.body.user_id;
    var adduser_email = req.body.email;
    var event_host_id = req.body.event_host_id;
    var addusername = req.body.username;
    var comfirm = req.body.comfirm;

    var event_name = req.body.event_name;
    var event_time = req.body.event_time;
    var event_place = req.body.event_place;
    var event_description = req.body.event_description;
    var event_post_time = req.body.event_post_time;

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        } else {
            var query2 = "insert into eventmember values (NULL,?,?);";
            connection.query(query2, [adduser, target], function(error, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                } else {
                    req.pool.getConnection(function(error, connection) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(500);
                            return;
                        } else {
                            var query = "select username, email, responed from user,note where user.user_id = ? and note.note_id = user.user_id;";
                            connection.query(query, event_host_id, function(error, result, fields) {
                                connection.release();
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(500);
                                    return;
                                } else { /*1 */
                                    if (result[0].responed.includes(1) == true) {
                                        var mailcontent1 = {
                                            from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                                            to: result[0].email,
                                            subject: "Your event has a new member!",
                                            text: "Hi,",
                                            html: `<h4>Hi ${result[0].username},</h4>
                            <p>Your Aoligei event title is : ${event_name}</p>
                            <p>Your event time is : ${event_time}</p>
                            <p>Your event place is : ${event_place}</p>
                            <p>Your event is : ${event_description}</p>
                            <p>post at : ${event_post_time}</p>
                            <p>New event member is : ${addusername}</p>`,
                                        }
                                        transporter.sendMail(mailcontent1, function(error, data) {
                                            if (error) {
                                                console.log(error);
                                                res.sendStatus(401);
                                            } else {
                                                console.log("send to host");
                                            }
                                        });
                                    }

                                    if (comfirm == true) {
                                        var mailcontent2 = {
                                            from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                                            to: adduser_email,
                                            subject: "You join an event!",
                                            text: "Hi,",
                                            html: `<h4>Hi ${addusername},</h4>
                                <p>Your joined event title is : ${event_name}</p>
                                <p>event host is : ${result[0].username}</p>
                                <p>Your joined event time is : ${event_time}</p>
                                <p>Your joined event place is : ${event_place}</p>
                                <p>Your joined event is : ${event_description}</p>`,
                                        }
                                        transporter.sendMail(mailcontent2, function(error, data) {
                                            if (error) {
                                                console.log(error);
                                                res.sendStatus(401);
                                            } else {
                                                console.log("send to adder!");

                                            }
                                        });
                                    }
                                    res.send("done!");
                                }
                            });

                        }
                    });
                };
            });
        };
    });

});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/getjoined.ajax', function(req, res, next) {
    var user_id = req.body.user_id;
    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "select event_id from eventmember where user_id = ?";
        connection.query(query, user_id, function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send(result);
            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.get('/show', function(req, res, next) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }


        var query = "select event_time from event;";

        connection.query(query, function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            } else {
                res.json(rows); //send response


            }
        });
    });

});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/showtext', function(req, res, next) {
    var user_id = req.body.user_id;
    console.log(req.body);
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            console.log(err);
            return;
        }
        var query = "select event.event_id, event.event_name, event.event_time, event.event_description from event,eventmember where eventmember.user_id = ? and event.event_id = eventmember.event_id;"

        connection.query(query, user_id, function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                console.log(err);
                return;
            } else {
                res.send(rows);
            }
        });
    });

});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/showtext2', function(req, res, next) {
    var user_id = req.body.user_id;
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            console.log(err);
            return;
        }
        var query2 = "select event.event_id, event.event_name, event.event_time, event.event_description from event where event_host_id = ?;"

        connection.query(query2, user_id, function(err, rows2, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                console.log(err);
                return;
            } else {
                res.send(rows2);
            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
router.post('/deletepost2.ajax', function(req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var email = req.body.email;
    var event_cancel = req.body.event_cancel;

    var event_name = req.body.event_name;
    var event_time = req.body.event_time;
    var event_place = req.body.event_place;
    var event_description = req.body.event_description;
    var event_post_time = req.body.event_post_time;

    var result;

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        } else {
            var query3 = "select username, email from user, note, eventmember where note.event_cancel = 1 and user.user_id = note.user_id and eventmember.user_id = user.user_id and eventmember.event_id = ?;";
            connection.query(query3, target, function(error, reresult, fields) {
                connection.release();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return;
                } else {
                    result = reresult;
                    console.log("get evevtmembers");
                }
            });
        }
    });

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "delete from eventmember where event_id = ?;";
        connection.query(query, target, function(error, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {

                req.pool.getConnection(function(error, connection) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(500);
                        return;
                    } else {
                        var query2 = "delete from event where event_id = ?;";
                        connection.query(query2, target, function(error, fields) {
                            connection.release();
                            if (error) {
                                console.log(error);
                                res.sendStatus(500);
                                return;
                            } else { /*1*/

                                for (let i = 0; i < result.length; i++) {
                                    var mailcontent1 = {
                                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                                        to: result[i].email,
                                        subject: "Your attend event is deleted!",
                                        text: "Hi",
                                        html: `<h4>Hi ${result[i].username},</h4>
                <p>event : ${event_name} is deleted!</p>
                <p>Here are the details:</p>
                <p>event time : ${event_time}</p>
                <p>event place: ${event_place}</p>
                <p>event description : ${event_description}</p>
                <p>event post at : ${event_post_time}</p>
                <p>please contact manager for further details</p>`,
                                    }
                                    console.log(mailcontent1);
                                    transporter.sendMail(mailcontent1, function(error, data) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(401);
                                        } else {
                                            console.log("send to delete member!");
                                        }
                                    });
                                }; //end for loop

                                if (event_cancel == true) {
                                    var mailcontent = {
                                        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
                                        to: email,
                                        subject: "You delete an event!",
                                        text: "Hi,",
                                        html: `<h4>Hi ${username},</h4>
                        <p>You just delete a event :${event_name}!</p>
                        <p>Here are the details:</p>
                        <p>event time : ${event_time}</p>
                        <p>event place: ${event_place}</p>
                        <p>event description : ${event_description}</p>
                        <p>event post at : ${event_post_time}</p>
                        <p>please contact manager for further details</p>`,
                                    }
                                    transporter.sendMail(mailcontent, function(error, data) {
                                        if (error) {
                                            console.log(error);
                                            res.sendStatus(401);
                                        } else {
                                            console.log("send to delete host!");
                                            res.send("done!");
                                        }
                                    });
                                } else {
                                    res.send("done!");
                                }


                            } /*1*/
                        });
                    };
                });
            }
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------
/*------------------------------------------------------------ */
/* 管理员登陆*/
router.post('/managerlogin.ajax', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if (username == '') {
        res.send("no_username");
        return;
    } else if (password == '') {
        res.send("no_password");
        return;
    } else if (username == '' && password == '') {
        res.send("no_both");
        return;
    }

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var M_query = "SELECT password FROM manager WHERE username = ?;";
        connection.query(M_query, username, function(error, result, fields) {
            connection.release();
            if (result.length == 0) {
                res.send("no_exist");
                return;
            }
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }
            if (result[0].password == password) {
                res.cookie('manager', username); //ccccccccccccccccccccoooooooooooooooooooooooooookkkkkkkkkkkkkkkkkkkkkiiiiiiiiiiiiiiiiieeeeeeeeeeeeee
                res.send("true");
            }
            if (result[0].password != password) {
                res.send("false");
            }
        });
    });
});


/*管理员注册*/

router.post('/managersignup.ajax', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var conpassword = req.body.conpassword;
    var code = req.body.code;
    var invite_code = req.body.invite_code;
    var realcode = req.body.realcode;
    var set = req.body.set;
    if (username == '') {
        res.send("no_username");
        return;
    } else if (password == '') {
        res.send("no_password");
        return;
    } else if (email == '') {
        res.send("no_email");
        return;
    } else if (conpassword == '') {
        res.send("no_conpassword");
        return;
    } else if (password != conpassword) {
        res.send("no_match");
        return;
    } else if (realcode == '?') {
        res.send("no_code");
        return;
    } else if (invite_code == '') {
        res.send("no_invite_code");
        return
    } else if (realcode != code) {
        res.send("no_code_match");
        return;
    }
    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        //1 验证是否重复username

        var M_query1 = "SELECT username FROM manager WHERE username = ?;";
        connection.query(M_query1, username, function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            if (result && result.length) {
                console.log("found");
                res.send("userfound");
                return;
            } else {
                //2验证是否重复email
                req.pool.getConnection(function(error, connection) {
                    if (error) {
                        console.log(error);
                        res.sendStatus(500);
                        return;
                    }
                    var M_query2 = "SELECT email FROM manager WHERE email = ?;";
                    connection.query(M_query2, email, function(error, result, fields) {
                        connection.release();
                        if (error) {
                            console.log(error);
                            res.sendStatus(500);
                            return;
                        }
                        if (result && result.length) {
                            console.log("found");
                            res.send("emailfound");
                            return;
                        } else {
                            //3添加到sql

                            var M_touser_id;

                            req.pool.getConnection(function(error, connection) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(500);
                                    return;
                                }
                                var M_query3 = "INSERT INTO manager VALUES (NULL,?,?,?);";
                                connection.query(M_query3, [username, password, email], function(error, result, fields) {
                                    connection.release();
                                    if (error) {
                                        console.log(error);
                                        res.sendStatus(500);
                                        return;
                                    }
                                    console.log("user added to database");
                                    M_touser_id = result.insertId;
                                    console.log("touser_id" + M_touser_id);
                                    res.send("yes");
                                });
                            });

                        };


                    });
                });
            };

        });
    })
});

/* 管理员邮箱验证码*/
router.post('/managergetcode.ajax', function(req, res, next) {
    var code = randomcode();
    var email = req.body.email;
    console.log(code);
    if (!validateEmail(email)) {
        console.log("not email form");
        res.send("not_email");
        return;
    }
    //邮件格式
    var mailcontent = {
            from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
            to: email,
            subject: "Verification code",
            text: "Hi,",
            html: `<h4>Your Aoligei Verification code is: ${code}</h4>`,
        }
        //发出
    transporter.sendMail(mailcontent, function(error, data) {
        if (error) {
            console.log(error);
            res.sendStatus(401);
        } else {
            console.log("send!");
            res.send(code);
        }
    });
});

router.get('/getM_username.ajax', function(req, res, next) {
    var username = req.cookies.manager;
    console.log(username);
    if (username == undefined) {
        res.send("no_log");
        return;
    }
    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "select * from manager where username = ?;";
        connection.query(query, username, function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send(result);
            }
        });
    });
});


/*管理员更改密码 */
router.post('/M_changepass.ajax', function(req, res, next) {
    var user_id = req.body.user_id;
    var change_pass = req.body.change_pass;
    var code = req.body.code;
    var realcode = req.body.realcode;

    if (change_pass == '') {
        res.send("no_password");
        return;
    } else if (realcode == '?') {
        res.send("no_code");
        return;
    } else if (realcode != code) {
        res.send("no_code_match");
        return;
    }

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "UPDATE manager SET password = ? WHERE user_id = ?;";
        connection.query(query, [change_pass, user_id], function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send("done!");
            }
        });
    });
});

router.post('/managerposts.ajax', function(req, res, next) {
    console.log(req.body);

    var event_name = req.body.event_name;
    var event_host_id = req.body.event_host_id;
    var event_description = req.body.event_description;
    var event_place = req.body.event_place;
    var event_time = req.body.event_time;
    var event_post_time = req.body.event_post_time;
    var event_situation = req.body.event_situation;

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "INSERT INTO managerevent VALUES (NULL,?,?,?,?,?,?,?);";
        connection.query(query, [event_name, event_host_id, event_description, event_place, event_time, event_post_time, event_situation], function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send("done!");
            }
        });
    });
});

router.get('/managergetevents.ajax', function(req, res, next) {

    req.pool.getConnection(function(error, connection) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        var query = "select * from managerevent, manager where managerevent.event_host_id = manager.user_id";
        connection.query(query, function(error, result, fields) {
            connection.release();
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            } else {
                res.send(result);
            }
        });
    });
});
// --------------------------------------------------------------------------------------------------------------
//用户添加 major 和 course
router.get('/major_detail', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        // var query="SELECT major_name, major_duration, major_start_date, major_location FROM major;";
        var query = "SELECT * FROM major";
        connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

router.get('/major', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT major_id, major_name FROM major;";
        connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

router.get('/course', function(req, res) {
    console.log("get course");
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var course_query = "SELECT course_id, course_name FROM course;";
        connection.query(course_query, function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});


router.get('/user_info', function(req, res) {
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var user_query = "SELECT user_id, username, email, birthday_date FROM user;";
        connection.query(user_query, function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});


// router.post('/send_delete_email.ajax', function(req, res,next) {
//   console.log("get");
//   // var user_id=req.body.user_id;
//   var username=req.body.username;
//   var email_address=req.body.email_address;
//   // console.log(user_id);
//   console.log(username);
//   console.log(email_address);

//   var mailcontent = {
//     from: '"Aoligei Group" <prudence.mcglynn97@ethereal.email>',
//     to: email_address,
//     subject: "Violations",
//     // text: "Hi,",
//     html: ` <h2> Hi ${username}, </h2>
//            <p> This is a notice if violation.</p>
//            <p> The manager will delete your account due to your unacceptable behavior. </p>
//            <p> You can SIGN UP for a new account. But PLEASE pay attention to your behavior or language. </p>
//            <p> Looking forward to seeing you again. </p>
//            <p> Have a good day. </p>
//            <p></p>
//            <p></p>
//            <p> Best wishes, </p>
//            <p> Aoligei Group </p>`,
//   };

//   transporter.sendMail(mailcontent, function(err, data) {
//     if (err) {
//       console.log(err);
//       res.sendStatus(401);
//     } else {
//       console.log("send!");
//       // res.send();
//     }
//   });
// });



// router.post('/delete_user.ajax', function(req, res, next) {

//   req.pool.getConnection(function(err, connection) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }

//     var delete_query="DELETE FROM user WHERE username=?;";
//     connection.query(delete_query, [username], function(err, rows, fields) {
//       connection.release();
//       if (err) {
//         res.sendStatus(500);
//         return;
//       }
//     });
//     res.send();
//   });
// });

router.post('/add_users.ajax', function(req, res, next) {

    var new_user_id = req.body.new_user_id;
    var new_username = req.body.new_username;
    var init_password = req.body.init_password;
    var new_email = req.body.new_email;
    var new_birthday = req.body.new_birthday;


    if (new_user_id == '') {
        res.send("no_user_id");
        return;
    } else if (new_username == '') {
        res.send("no_username");
        return;
    } else if (init_password == '') {
        res.send("no_passwords");
        return;
    } else if (new_email == '') {
        res.send("no_email");
        return;
    } else if (new_birthday == '') {
        res.send("no_birthday");
        return;
    } else if (checkif(new_user_id) == true || checkif(new_username) == true || checkif(init_password) == true || checkif(new_email) == true || checkif(new_birthday) == true) {
        res.send("invaild_input");
        return;
    }


    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        var search_id_query = "SELECT user_id FROM user WHERE user_id=?;";
        connection.query(search_id_query, [new_user_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            if (rows && rows.length) {
                console.log(rows);
                res.send("user_id_exist");
                return;
            } else {
                req.pool.getConnection(function(err, connection) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    var search_username_query = "SELECT username FROM user WHERE username=?;";
                    connection.query(search_username_query, [new_username], function(err, rows, fields) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }

                        if (rows && rows.length) {
                            console.log(rows);
                            res.send("username_exist");
                            return;
                        } else {
                            req.pool.getConnection(function(err, connection) {
                                if (err) {
                                    res.sendStatus(500);
                                    return;
                                }

                                var search_email_query = "SELECT email FROM user WHERE email=?;";
                                connection.query(search_email_query, [new_email], function(err, rows, fields) {
                                    connection.release();
                                    if (err) {
                                        console.log(err);
                                        res.sendStatus(500);
                                        return;
                                    }
                                    if (rows && rows.length) {
                                        console.log(rows);
                                        res.send("email_exist");
                                        return;
                                    } else {
                                        req.pool.getConnection(function(err, connection) {
                                            if (err) {
                                                res.sendStatus(500);
                                                return;
                                            }
                                            var add_query = "INSERT INTO user (user_id, username, password, email, birthday_date) VALUES (?, ?, ?, ?, ?)";
                                            connection.query(add_query, [new_user_id, new_username, init_password, new_email, new_birthday], function(err, rows, fields) {
                                                connection.release();
                                                if (err) {
                                                    res.sendStatus(500);
                                                    return;
                                                }
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    });
});


// Send add user email
router.post('/send_add_user_email', function(req, res, next) {
    var new_user_id = req.body.new_user_id;
    var new_username = req.body.new_username;
    var init_password = req.body.init_password;
    var new_email = req.body.new_email;

    var mailcontent = {
        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
        to: new_email,
        subject: "Create Account Successfully by manager",
        // text: "Hi,",
        html: ` <h2> Hi ${new_username}, </h2>
           <p> This is a notice if the user account created successfully by manager.</p>
           <p> The manager has created your user account by your provided.</p>
           <p> The User id for you is ${new_user_id} </p>
           <p> The initialized password is ${init_password} </p>
           <p> Please login your account to check the detail and change the password ASAP. </p>
           <p> Have a good day. </p>
           <p></p>
           <p></p>
           <p> Best wishes, </p>
           <p> Aoligei Group </p>`,
    };

    transporter.sendMail(mailcontent, function(err, data) {
        if (err) {
            // console.log(err);
            res.sendStatus(401);
        } else {
            console.log("send!");
            res.send();
        }
    });

});

// Manage user information
router.get('/all_user', function(req, res, next) {

    console.log("1: get");
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var user_query = "SELECT * FROM user;";
        connection.query(user_query, function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });

});


router.post('/related_user', function(req, res, next) {
    console.log("2: get");
    var user_id = req.body.user_id;
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var birthday_date = req.body.birthday_date;

    var course_id = req.body.course_id;
    var major_id = req.body.major_id;

    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        var related_query = "INSERT INTO index_user (index_user_id, index_username, index_password, index_email, index_birthday_date, index_course_id, index_major_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        connection.query(related_query, [user_id, username, password, email, birthday_date, course_id, major_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
        });
        res.send();
    });
});


router.get('/users_details', function(req, res, next) {
    console.log("3: get");

    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var user_query = "SELECT * FROM index_user;";
        connection.query(user_query, function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

router.post('/delete_index', function(req, res, next) {
    console.log("4: get");
    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var user_query = "DELETE FROM index_user;";
        connection.query(user_query, function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

router.post('/change_username', function(req, res, next) {

    var user_id = req.body.user_id;
    var new_username = req.body.new_username;

    if (user_id == '') {
        res.send("no_user_id");
        return;
    } else if (new_username == '') {
        res.send("no_new_username");
        return;
    } else if (checkif(user_id) == true || checkif(new_username) == true) {
        res.send("invaild_input");
        return;
    }

    req.pool.getConnection(function(err, connection) {
        if (err) {
            // console.log(err);
            res.sendStatus(500);
            return;
        }

        var search_name_query = "SELECT username FROM user WHERE username = ?;";
        connection.query(search_name_query, [new_username], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            if (rows && rows.length) {
                console.log(rows);
                res.send("username_exist");
                return;
            } else {
                req.pool.getConnection(function(err, connection) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    var update_query = "UPDATE user SET username=? WHERE user_id=?;";
                    connection.query(update_query, [new_username, user_id], function(err, rows, fields) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                    });
                });
            }
        });
    });
});


router.post('/change_email', function(req, res, next) {

    var user_id = req.body.user_id;
    var new_email = req.body.new_email;

    if (user_id == '') {
        res.send("no_user_id");
        return
    } else if (new_email == '') {
        res.send("no_email");
        return;
    } else if (checkif(user_id) == true || checkif(new_email) == true) {
        res.send("invaild_input");
        return;
    }

    req.pool.getConnection(function(err, connection) {
        if (err) {
            // console.log(err);
            res.sendStatus(500);
            return;
        }

        var search_email_query = "SELECT email FROM user WHERE email = ?;";
        connection.query(search_email_query, [new_email], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            if (rows && rows.length) {
                console.log(rows);
                res.send("email_exist");
                return;
            } else {
                req.pool.getConnection(function(err, connection) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }
                    var update_query = "UPDATE user SET email=? WHERE user_id=?;";
                    connection.query(update_query, [new_email, user_id], function(err, rows, fields) {
                        connection.release();
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                            return;
                        }
                    });
                });
            }
        });
    });
});

router.post('/change_birthday', function(req, res, next) {

    var user_id = req.body.user_id;
    var new_birthday = req.body.new_birthday;

    if (user_id == '') {
        res.send("no_user_id");
        return;
    } else if (new_birthday == '') {
        res.send("no_bd");
        return;
    } else if (checkif(user_id) == true || checkif(new_birthday) == true) {
        res.send("invaild_input");
        return;
    }

    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var update_query = "UPDATE user SET birthday_date=? WHERE user_id=?;";
        connection.query(update_query, [new_birthday, user_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});


// Manage major info
// router.post('/delete_major_d.ajax', function(req, res, next) {

//   var major_id=req.body.major_id;
//   console.log(major_id);
//   req.pool.getConnection(function(err, connection) {
//     console.log("get here");
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }

//     var delete_query="DELETE FROM major WHERE major_id=?;";
//     connection.query(delete_query, [major_id], function(err, rows, fields) {
//       connection.release();
//       if (err) {
//         res.sendStatus(500);
//         return;
//       }
//     });
//     res.send();
//   });
// });

router.post('/create_major.ajax', function(req, res, next) {

    var new_major_id = req.body.new_major_id;
    var new_major_name = req.body.new_major_name;
    var new_major_duration = req.body.new_major_duration;
    var new_major_sd = req.body.new_major_sd;
    var new_major_location = req.body.new_major_location;

    if (new_major_id == '') {
        res.send("no_new_id");
        return;
    } else if (new_major_name == '') {
        res.send("no_new_major");
        return;
    } else if (new_major_duration == '') {
        res.send("no_new_d");
        return;
    } else if (new_major_sd == '') {
        res.send("no_new_sd");
        return;
    } else if (new_major_location == '') {
        res.send("no_new_l");
        return;
    } else if (checkif(new_major_id) == true || checkif(new_major_name) == true || checkif(new_major_duration) == true || checkif(new_major_sd) == true || checkif(new_major_location) == true) {
        res.send("invaild_input");
        return;
    }

    req.pool.getConnection(function(err, connection) {
        if (err) {
            // console.log(err);
            res.sendStatus(500);
            return;
        }

        var search_id_query = "SELECT major_id FROM major WHERE major_id = ?;";
        connection.query(search_id_query, [new_major_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            if (rows && rows.length) {
                console.log(rows);
                res.send("major_id_exist");
                return;
            } else {

                req.pool.getConnection(function(err, connection) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    var search_major_query = "SELECT major_name FROM major WHERE major_name = ?;";
                    connection.query(search_major_query, [new_major_name], function(err, rows, fields) {
                        connection.release();
                        if (err) {
                            res.sendStatus(500);
                            return;
                        }

                        if (rows && rows.length) {
                            console.log(rows);
                            res.send("major_name_exist");
                            return;
                        } else {
                            req.pool.getConnection(function(err, connection) {
                                if (err) {
                                    res.sendStatus(500);
                                    return;
                                }

                                var add_query = "INSERT INTO major (major_id, major_name, major_duration, major_start_date, major_location) VALUES (?, ?, ?, ?, ?)";
                                connection.query(add_query, [new_major_id, new_major_name, new_major_duration, new_major_sd, new_major_location], function(err, rows, fields) {
                                    connection.release();
                                    if (err) {
                                        res.sendStatus(500);
                                        return;
                                    }
                                });
                                // res.send();
                            });
                        }
                    });
                });
            }
        });
    });
});

// Manage course info
router.post('/delete_course', function(req, res, next) {

    var course_id = req.body.course_id;

    req.pool.getConnection(function(err, connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        var delete_query = "DELETE FROM course WHERE course_id=?;";
        connection.query(delete_query, [course_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(500);
                return;
            }
        });
        res.send();
    });
});

router.post('/create_course.ajax', function(req, res, next) {
    var new_course_id = req.body.new_course_id;
    var new_course_name = req.body.new_course_name;

    if (new_course_id == '') {
        console.log("noting");
        res.send("no_course_id");
        return;
    } else if (new_course_name == '') {
        res.send("no_course_name");
        return;
    } else if (checkif(new_course_id) == true || checkif(new_course_name) == true) {
        res.send("invaild_input");
        return;
    }

    req.pool.getConnection(function(err, connection) {
        if (err) {
            // console.log(err);
            res.sendStatus(500);
            return;
        }

        var search_id_query = "SELECT course_id FROM course WHERE course_id = ?;";
        connection.query(search_id_query, [new_course_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }

            if (rows && rows.length) {
                console.log(rows);
                res.send("course_id_exist");
                return;
            } else {

                req.pool.getConnection(function(err, connection) {
                    if (err) {
                        res.sendStatus(500);
                        return;
                    }

                    var search_course_query = "SELECT course_name FROM course WHERE course_name = ?;";
                    connection.query(search_course_query, [new_course_name], function(err, rows, fields) {
                        connection.release();
                        if (err) {
                            res.sendStatus(500);
                            return;
                        }

                        if (rows && rows.length) {
                            console.log(rows);
                            res.send("course_name_exist");
                            return;
                        } else {
                            req.pool.getConnection(function(err, connection) {
                                if (err) {
                                    res.sendStatus(500);
                                    return;
                                }

                                var add_query = "INSERT INTO course (course_id, course_name) VALUES (?, ?)";
                                connection.query(add_query, [new_course_id, new_course_name], function(err, rows, fields) {
                                    connection.release();
                                    if (err) {
                                        res.sendStatus(500);
                                        return;
                                    }
                                });
                                // res.send();
                            });
                        }
                    });
                });
            }
        });
    });
});

// Send change email
router.post('/send_change_email', function(req, res, next) {
    console.log("get");
    var user_id_ = req.body.user_id;
    var username = req.body.username;
    var email_address = req.body.email_address;
    // console.log(user_id);
    // console.log(username);
    // console.log(email_address);

    var mailcontent = {
        from: '"Aoligei Group" <felicita.steuber85@ethereal.email>',
        to: email_address,
        subject: "Change user information",
        // text: "Hi,",
        html: ` <h2> Hi ${username}, </h2>
           <p> This is a notice if the related information is changed by manager.</p>
           <p> The manager has changed your user information by your provided.</p>
           <p> Please login your account to check the detail </p>
           <p> Have a good day. </p>
           <p></p>
           <p></p>
           <p> Best wishes, </p>
           <p> Aoligei Group </p>`,
    };

    transporter.sendMail(mailcontent, function(err, data) {
        if (err) {
            // console.log(err);
            res.sendStatus(401);
        } else {
            console.log("send!");
            res.send();
        }
    });

});

module.exports = router;