function get_major_overview() {
    show_major_detail();
    show_major_choice();
}

function show_major_detail() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vue_info.major_detail = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "/major_detail", true);
    xhttp.send();
}

function show_major_choice() {
    // console.log("GET");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vue_info.major_view = JSON.parse(this.responseText);
            // console.log(JSON.parse(this.responseText));
            // console.log(vue_info.major_view);
        }
    };
    xhttp.open("GET", "/major", true);
    xhttp.send();
}

function update_info() {
    update_major();
    show_courses();
}

function update_major() {
    var username = document.getElementById('username').value;
    var selection = document.getElementById('selection').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "no_major_id" || this.responseText == "no_username") {
                alert("The target input cannot be nothing. Please try again");
            }
            // } else if (this.responseText=="get") {
            //     alert("Choose major successfully!");
            // } else {
            //     alert("Cannot choose the major");
            // }
        }
    };
    xhttp.open("POST", "users/submit_major", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ major_id: selection, username: username }));
}


function show_courses() {
    var xhttp = new XMLHttpRequest();
    var course_div = document.getElementById('course');
    var ask_div = document.getElementById('ask');
    course_div.style.display = "block";
    ask_div.style.display = "block";

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vue_info.course_detail = JSON.parse(this.responseText);
            // console.log(vue_info.course_detail);
        }
    };

    xhttp.open("GET", "/course", true);
    xhttp.send();
}

function update_course() {
    var user_name = document.getElementById('user_name').value;
    // var username=document.getElementById('username').value;
    var course_select = document.getElementById('course_select').value;
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
    xhttp.send(JSON.stringify({ course_id: course_select, user_name: user_name }));
}
// } else if (this.responseText=="invaild_input") {
//   alert("You typed invaild input like ' ', - , > , < or ; . ");
// }

var vue_info = new Vue({
    el: "#main",
    data: {
        major_view: [],
        major_detail: [],
        course_detail: [],
    },
});