function manage_all() {
    manage_major();
    manage_course();
}

function manage_major() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            vue_info.major_info=JSON.parse(this.responseText);
            // console.log(vue_info.user_info[2].email);
            // console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "/major_detail", true);
    xhttp.send();
}

function manage_course() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            course.course_info=JSON.parse(this.responseText);
            // console.log(vue_info.user_info[2].email);
            // console.log(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "/course", true);
    xhttp.send();
}

            // function delete_majors() {
            //   var major_id=vue_info.picked_;
            //   console.log(vue_info.picked_);
            //   var xhttp = new XMLHttpRequest();
            //   xhttp.onreadystatechange = function() {
            //     if (this.readyState == 4 && this.status == 200) {

            //     }
            //   };
            //   xhttp.open("POST", "/delete_major_d.ajax", true);
            //   xhttp.setRequestHeader("Content-type", "application/json");
            //   xhttp.send(JSON.stringify({major_id: major_id}));
            // }

function add_major() {
    document.getElementById("add_major").style.display="block";
    document.getElementById("add_course").style.display="none";
    document.getElementById("main").style.display="none";
    document.getElementById("main_two").style.display="none";
}

function create_major() {
    var new_major_id=document.getElementById("new_major_id").value;
    var new_major_name=document.getElementById("new_major_name").value;
    var new_major_duration=document.getElementById("new_major_duration").value;
    var new_major_sd=document.getElementById("new_major_sd").value;
    var new_major_location=document.getElementById("new_major_location").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "no_new_id" || this.responseText == "no_new_major"
                      || this.responseText == "no_new_d" || this.responseText == "no_new_sd"
                      || this.responseText == "no_new_l") {
                alert("The target input cannot be noting. Please try again.");
            } else if (this.responseText == "major_id_exist") {
                alert("The major id has already exist");
            } else if (this.responseText == "major_name_exist") {
                alert("The major name has already exist");
            } else if (this.responseText == "invaild_input") {
                alert("You typed invaild input like ' ', - , > , < or ; . Please try again");
            }
        }
    };
    xhttp.open("POST", "/create_major.ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({new_major_id: new_major_id, new_major_name: new_major_name,
                                         new_major_duration: new_major_duration, new_major_sd: new_major_sd,
                                         new_major_location: new_major_location }));
}

function delete_course() {
    var course_id=course.course_picked;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        // if (this.readyState == 4 && this.status == 200) {

        // }
    };
    xhttp.open("POST", "/delete_course", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({course_id: course_id}));
}

function add_course() {
    document.getElementById("add_course").style.display="block";
    document.getElementById("add_major").style.display="none";
    document.getElementById("main").style.display="none";
    document.getElementById("main_two").style.display="none";
}

function create_course() {
    var new_course_id=document.getElementById("new_course_id").value;
    var new_course_name=document.getElementById("new_course_name").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "no_course_id" || this.responseText == "no_course_name") {
                alert("The target input cannot be notong. Please try again.");
            } else if (this.responseText == "course_id_exist") {
                alert("The Course ID has already exist.");
            } else if (this.responseText == "course_name_exist") {
                alert("The Course Name has already exist.");
            } else if (this.responseText == "invaild_input") {
                alert("You typed invaild input like ' ', - , > , < or ; . Please try again");
            }
        }
    };
    xhttp.open("POST", "/create_course.ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({new_course_id: new_course_id, new_course_name: new_course_name}));
}

function back() {
    document.getElementById("add_major").style.display="none";
    document.getElementById("add_course").style.display="none";
    document.getElementById("main").style.display="block";
    document.getElementById("main_two").style.display="block";
}

var vue_info = new Vue({
    el:"#main",
    data: {
        major_info: [],
        picked_: '',
    },
});

var course = new Vue({
    el:"#main_two",
    data: {
        course_info: [],
        course_picked: '',
    },
});