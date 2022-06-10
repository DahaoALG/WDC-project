function manage_user() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vue_info.user_info=JSON.parse(this.responseText);
            // console.log(vue_info.user_info[2].email);
            // console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "/user_info", true);
    xhttp.send();
}

  // function delete_user() {
  //   delete_account();
  //   send_delete_notices;
  // }

  // function send_delete_notices() {
  //   var username=vue_info.picked;
  //   var user_id;
  //   var email_address;
  //   for (var i=0; i<vue_info.user_info.length; i++) {
  //     if (vue_info.user_info[i].username == username) {
  //       user_id=vue_info.user_info[i].user_id;
  //       email_address=vue_info.user_info[i].email;
  //     }
  //   }

  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {

  //     }
  //   };
  //   xhttp.open("POST", "/send_delete_email.ajax", true);
  //   xhttp.setRequestHeader("Content-type", "application/json");
  //   xhttp.send(JSON.stringify({username: username, email_address: email_address}));
  // }

  // function delete_account() {
  //   var username=vue_info.picked;
  //   var user_id;
  //   var email_address;
  //   for (var i=0; i<vue_info.user_info.length; i++) {
  //     if (vue_info.user_info[i].username == username) {
  //       user_id=vue_info.user_info[i].user_id;
  //       email_address=vue_info.user_info[i].email;
  //     }
  //   }

  //   var xhttp = new XMLHttpRequest();
  //   xhttp.onreadystatechange = function() {
  //     if (this.readyState == 4 && this.status == 200) {

  //     }
  //   };
  //   xhttp.open("POST", "/delete_user.ajax", true);
  //   xhttp.setRequestHeader("Content-type", "application/json");
  //   xhttp.send(JSON.stringify({username: username}));
  // }

function add_user() {
    document.getElementById("add_user").style.display="block";
    document.getElementById("main").style.display="none";
}

function create_user() {
    created_user();
    send_add_notice();
}

function created_user() {
    var new_user_id=document.getElementById("new_user_id").value;
    var new_username=document.getElementById("new_username").value;
    var init_password=document.getElementById("init_password").value;
    var new_email=document.getElementById("new_email").value;
    var new_birthday=document.getElementById("new_birthday").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText=="no_user_id" || this.responseText=="no_username"
                || this.responseText=="no_passwords" || this.responseText=="no_email"
                || this.responseText=="no_birthday") {
                alert("The target input cannot be nothing. Please try again.");
            } else if (this.responseText=="user_id_exist") {
                alert("The User ID has already exist");
            } else if (this.responseText=="username_exist") {
                alert("The User Name has alrady exist");
            } else if (this.responseText=="email_exist") {
                alert("The email has already exist");
            } else if (this.responseText=="invaild_input") {
                alert("You typed invaild input like ' ', - , > , < or ; . Please try again");
            }
        }
    };
    xhttp.open("POST", "/add_users.ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({new_user_id: new_user_id, new_username: new_username,
                               init_password:init_password, new_email: new_email,
                               new_birthday: new_birthday }));
}

function send_add_notice() {
    // console.log("get");
    var new_user_id=document.getElementById("new_user_id").value;
    var new_username=document.getElementById("new_username").value;
    var init_password=document.getElementById("init_password").value;
    var new_email=document.getElementById("new_email").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {

    //   }
    };
    xhttp.open("POST", "/send_add_user_email", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({new_user_id: new_user_id, new_username: new_username,
                               init_password:init_password, new_email: new_email}));
}

function back() {
    document.getElementById("add_user").style.display="none";
    document.getElementById("main").style.display="block";
}

var vue_info = new Vue({
    el:"#main",
    data: {
        user_info: [],
        picked: '',
    },
});
