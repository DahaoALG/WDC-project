var realcode = '?';
var user_id;
var ptr2 = this;

var vueinst = new Vue({
    el: '#app',
    data: {
        email: '',
        username: '',
        user_id: '',
        change_pass: '',
        code: '',
        code_send: false,
        responed: false,
        comfirm: false,
        event_finish: false,
        event_cancel: false,
        date: '',
        event: {
            event_name: '',
            event_host_id: '',
            event_description: '',
            event_time: '',
            event_place: '',
            event_post_time: '',
            event_situation: false,
        },
        list: [{
            event_name: '抽烟',
            event_host_id: '顶针',
            event_description: '来一根',
            event_time: '6-6-2022',
            event_place: '理塘',
            event_post_time: 'now',
            event_situation: false,
        }],
        joined_event: [],
    },
    mounted: function() {
        this.get();
    },
    methods: {
        closead() {
            this.$refs.ads.style.display = "none";
        },
        get() {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "no_log") {
                        window.open('visitor.html', "_self");
                        return;
                    }
                    var res = JSON.parse(this.responseText);
                    console.log(res);
                    var check = JSON.stringify(this.responseText).includes("username");
                    console.log(this.responseText);
                    if (check) {
                        console.log(this.responseText);
                        ptr2.user_id = res[0].user_id
                        ptr.username = res[0].username;
                        ptr.email = res[0].email;
                        ptr.user_id = res[0].user_id;
                        ptr.responed = res[0].responed.data[0];
                        ptr.comfirm = res[0].comfirm.data[0];
                        ptr.event_finish = res[0].event_finish.data[0];
                        ptr.event_cancel = res[0].event_cancel.data[0];
                        ptr.getevent();
                        ptr.getjoined();
                    } else {
                        console.log(this.responseText);
                        console.log("have no username");
                        alert("Please login");
                        //window.open('login.html');
                        //window.close();
                    }
                }
            };
            xhttp.open("GET", "/getusername.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
        getevent() {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.responseText);
                    ptr.list = res;
                }
            };
            xhttp.open("GET", "/getevents.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },

        getjoined() {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.responseText);
                    console.log(res);
                    ptr.joined_event = [];
                    for (let i = 0; i < res.length; i++) {
                        ptr.joined_event.push(res[i].event_id);
                    }
                }
            };
            xhttp.open("POST", "/getjoined.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ user_id: this.user_id }));
        },
        logout() {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "cookiecleared") {
                        window.open('login.html', '_self');
                        ptr.username = '';
                        ptr.email = '';
                        ptr.user_id = '';
                    } else {
                        console.log("logoutfall");
                    }
                }
            };
            xhttp.open("GET", "/logout.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
        login() {
            window.open('login.html', '_self');
        },
        getcode() {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "not_email") {
                        alert("please type the correct email");
                    } else {
                        ptr2.realcode = this.responseText;
                        ptr.code_send = true;
                    }
                }
            };
            xhttp.open("POST", "/getcode.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ email: this.email }));
        },
        submit() {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "no_password") {
                        alert("please type the password that you want to change");
                    } else if (this.responseText == "no_code") {
                        alert("please type the verification code");
                    } else if (this.responseText == "no_code_match") {
                        alert(`please check the verification code in your email: ${email} then type the correct code`);
                    } else {
                        console.log("you finished");
                        ptr.logout();
                    }
                }
            };
            xhttp.open("POST", "/changepass.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ user_id: this.user_id, change_pass: this.change_pass, code: this.code, realcode: ptr2.realcode }));
        },
        submit2() {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "done!") {
                        alert("changed done!");
                    } else {
                        alert("changed fall!");
                    }
                }
            };
            xhttp.open("POST", "/changenote.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ user_id: this.user_id, responed: this.responed, comfirm: this.comfirm, event_finish: this.event_finish, event_cancel: this.event_cancel }));
        },
        post() {
            var ptr = this;
            var year = `${this.date[0]}${this.date[1]}${this.date[2]}${this.date[3]}`;
            var month = `${this.date[5]}${this.date[6]}`;
            var day = `${this.date[8]}${this.date[9]}`;
            this.event.event_time = `${Number(month)}/${Number(day)}/${Number(year)}`;
            this.event.event_post_time = new Date();

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "done!") {
                        ptr.getevent();
                    } else {
                        alert("fall!");
                    }
                }
            };
            xhttp.open("POST", "/posts.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ event_name: this.event.event_name, event_host_id: this.user_id, event_description: this.event.event_description, event_place: this.event.event_place, event_time: this.event.event_time, event_post_time: this.event.event_post_time, event_situation: this.event.event_situation, email: this.email, comfirm: this.comfirm }));
        },
        deletepost(a, b, c, d, e, f, g) {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "done!") {
                        console.log("delete!");
                        ptr.getevent();
                        ptr.getjoined();
                    } else {
                        console.log("delete fall!");
                    }
                }
            };
            xhttp.open("POST", "/deletepost.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ event_id: a, event_host_id: b, event_name: c, event_time: d, event_place: e, event_description: f, event_post_time: g, email: this.email, event_cancel: this.event_cancel, username: this.username }));
        },
        quitevent(a, b, c, d, e, f, g) {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "done!") {
                        console.log("quit!");
                        ptr.getevent();
                        ptr.getjoined();
                    } else {
                        console.log("quit fall!");
                    }
                }
            };
            xhttp.open("POST", "/quitpost.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ event_id: a, event_host_id: b, event_name: c, event_time: d, event_place: e, event_description: f, event_post_time: g, email: this.email, comfirm: this.comfirm, username: this.username, user_id: this.user_id }));
        },
        finishpost(a, b, c, d, e, f, g) {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "done!") {
                        console.log("finished!");
                        ptr.getevent();
                        ptr.getjoined();
                    } else {
                        console.log("finished fall!");
                    }
                }
            };
            xhttp.open("POST", "/finishpost.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ event_id: a, event_host_id: b, event_name: c, event_time: d, event_place: e, event_description: f, event_post_time: g, email: this.email, event_finish: this.event_finish, username: this.username }));
        },
        joinevent(a, b, c, d, e, f, g) {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "done!") {
                        console.log("join!");
                        ptr.getjoined();
                    } else {
                        console.log("join fall!");
                    }
                }
            };
            xhttp.open("POST", "/joinevent.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ event_id: a, event_host_id: b, event_name: c, event_time: d, event_place: e, event_description: f, event_post_time: g, user_id: this.user_id, username: this.username, email: this.email, comfirm: this.comfirm }));
        },
    },
});
const modbutton = document.getElementById("toggle");
const body = document.querySelector("body");
const img = document.querySelector("img");
var changeimg = false;
modbutton.onclick = function() {
    modbutton.classList.toggle('dark');
    body.classList.toggle('dark');

    if (changeimg) {
        img.src = "stylesheets/ashwini-chaudhary-monty-MxxqkMLJmL4-unsplash.jpg";
        changeimg = false;

    } else {
        img.src = ""
        changeimg = true;
    }

}