function show_user_info() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vue_info.user_info=JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "/all_user", true);
    xhttp.send();
}

function operation() {
    var check_info=vue_info.picked;
    var change_info=vue_info.get;

    if (check_info != 0) {
      document.getElementById('check_page').style.display = "block";
      document.getElementById('main').style.display = "none";
      user_detail_info();
    }
}

function back_main() {
    document.getElementById("check_page").style.display="none";
    document.getElementById("change_user_info").style.display="none";
    document.getElementById("main").style.display="block";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

    };

    xhttp.open("POST", "/delete_index", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function user_detail_info() {
    related_user();
    user_detail();
}


function related_user() {
    var user_id=vue_info.picked;
    var username=vue_info.user_info[user_id-1].username;
    var password=vue_info.user_info[user_id-1].password;
    var email=vue_info.user_info[user_id-1].email;
    var birthday_date=vue_info.user_info[user_id-1].birthday_date;

    var course_id=vue_info.user_info[user_id-1].course_id;
    var major_id=vue_info.user_info[user_id-1].major_id;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {

    //   }
    };

    xhttp.open("POST", "/related_user", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({user_id: user_id, username: username,
                              password: password, birthday_date: birthday_date,
                              email: email, course_id: course_id, major_id: major_id}));
}


  function user_detail() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        user.user_detail=JSON.parse(this.responseText);
      }
    };
    xhttp.open("GET", "/users_details", true);
    xhttp.send();

  }

  // change User Information
  function change_info() {
    document.getElementById("change_user_info").style.display="block";
  }

  function a() {
    document.getElementById("change_user").style.display="block";
    document.getElementById("change_user_major").style.display="none";
    document.getElementById("change_user_course").style.display="none";

  }

  // change user major
  function b() {
    document.getElementById("change_user").style.display="none";
    document.getElementById("change_user_major").style.display="block";
    document.getElementById("change_user_course").style.display="none";
    show_major_detail();
  }

  function show_major_detail() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        user.major_view=JSON.parse(this.responseText);
      }
    };
    xhttp.open("GET", "/major", true);
    xhttp.send();
  }

  function change_major() {
    changed_major();
    send_change_notice();
  }

  function changed_major() {
    var username=document.getElementById('username').value;
    var selection=document.getElementById('selection').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText == "no_major_id" || this.responseText == "no_username") {
          alert("The target input cannot be nothing. Please try again");
        }

      }
    };
    xhttp.open("POST", "users/submit_major", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({major_id: selection, username: username}));
  }




  // change user course
  function c() {
    document.getElementById("change_user").style.display="none";
    document.getElementById("change_user_major").style.display="none";
    document.getElementById("change_user_course").style.display="block";
    show_courses();
  }

  function show_courses() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        user.course_detail=JSON.parse(this.responseText);
      }
    };
    xhttp.open("GET", "/course", true);
    xhttp.send();
  }

  function change_courses() {
    changed_courses();
    send_change_notice();
  }

  function changed_courses() {
    var user_name=document.getElementById('user_name').value;
    var course_select=document.getElementById('course_select').value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText == "no_course_id" || this.responseText == "no_user_name") {
          alert("The target input cannot be nothing. Please try again");
        }

      }
    };
    xhttp.open("POST", "users/submit_course", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({course_id: course_select, user_name: user_name}));
  }


  // change username
  function d() {
    document.getElementById("change_name").style.display="block";
    document.getElementById("change_email").style.display="none";
    document.getElementById("change_birthday").style.display="none";
  }

  function change_username() {
    changed_username();
    send_change_notice();
  }

  function changed_username() {
    var user_id=document.getElementById("user_id_").value;
    var new_username=document.getElementById("new_username").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText == "no_user_id" || this.responseText == "no_new_username") {
          alert("The target input cannot be nothing. Please try again");
        } else if (this.responseText == "username_exist") {
          alert("The User Name has already exist.");
        } else if (this.responseText == "invaild_input") {
          alert("You typed invaild input like ' ', - , > , < or ; . Please try again");
        }
      }
    };
    xhttp.open("POST", "/change_username", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({user_id:user_id, new_username:new_username}));

  }

  // change new email
  function e() {
    document.getElementById("change_name").style.display="none";
    document.getElementById("change_email").style.display="block";
    document.getElementById("change_birthday").style.display="none";
  }

  function change_email() {
    changed_email();
    send_change_notice();
  }
  function changed_email() {
    var user_id=document.getElementById("user_id_e").value;
    var new_email=document.getElementById("new_email").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (this.responseText=="no_user_id" || this.responseText=="no_email") {
          alert("The target input cannot be nothing. Please try again");
        } else if (this.responseText=="email_exist") {
          alert("The Email Address has already exist");
        } else if (this.responseText == "invaild_input") {
          alert("You typed invaild input like ' ', - , > , < or ; . Please try again");
        }

      }
    };
    xhttp.open("POST", "/change_email", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({user_id:user_id, new_email:new_email}));

  }

  // change new birthday
  function f() {
    document.getElementById("change_name").style.display="none";
    document.getElementById("change_email").style.display="none";
    document.getElementById("change_birthday").style.display="block";
  }

  function change_birthday() {
    changed_birthday();
    send_change_notice();
  }
  function changed_birthday() {
    var user_id=document.getElementById("user_id_b").value;
    var new_birthday=document.getElementById("new_birthday").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if(this.responseText=="no_user_id" || this.responseText == "no_bd") {
          alert("The target input cannot be nothing. Please try again");
        } else if (this.responseText == "invaild_input") {
          alert("You typed invaild input like ' ', - , > , < or ; . Please try again");
        }

      }
    };
    xhttp.open("POST", "/change_birthday", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({user_id:user_id, new_birthday:new_birthday}));
  }

function send_change_notice() {
    var user_id=vue_info.picked;
    var username=vue_info.user_info[user_id-1].username;
    // console.log(user_id);
    var email_address=vue_info.user_info[user_id-1].email;
    // console.log(email_address);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    //   if (this.readyState == 4 && this.status == 200) {

    //   }
    };
    xhttp.open("POST", "/send_change_email", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({user_id: user_id, username: username, email_address: email_address}));
}

var vue_info = new Vue({
    el:"#main",
    data: {
        user_info: [],
        picked: '',
        user_course_detail: [],
    },
});

var user = new Vue ({
    el: "#check_page",
    data: {
      user_detail: [],
      course_detail:[],
      major_view: [],
    }
});