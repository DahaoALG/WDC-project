
var vueinst = new Vue({
    el: '#app',
    data:{
        username: '',
        password: '',

    },
    mounted:
        function(){
        this.check();
    },
    methods: {
        check(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("send to servere successfully");
                    if(this.responseText == "no_log"){
                        console.log("no cookie found");
                    }
                    else{
                        window.open('notlogout.html',"_self");
                    }
                }
            };
            xhttp.open("GET", "/users/checkvisitor.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
        login(){
        var ptr = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("send to servere successfully");
                console.log(this.responseText);
                if(this.responseText == "true"){
                    window.open('idmain.html',"_self");
                }
                else if(this.responseText == "false"){
                    alert("password incorrect, please try again!");
                }
                else if(this.responseText == "no_exist"){
                    alert("username incorrect or account does not exist.");
                }
                else if(this.responseText == "no_username"){
                    alert("username can not be empty");
                }
                else if(this.responseText == "no_password"){
                    alert("password can not be empty");
                }
                else if(this.responseText == "no_both"){
                    alert("username and password can not be empty");
                }
                else if(this.responseText == "invalid_input"){
                    alert("invalid input ' ', - , > , < or ; .");
                }
            }
        };
        xhttp.open("POST", "/login.ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ username: this.username, password: this.password }));
        },
        checkvisitor(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                if(this.responseText == "find_log"){
                    window.open('notlogout.html',"_self");
                }
                else{
                    window.open('visitor.html',"_self");
                }
            }
        };
        xhttp.open("GET", "/users/checkvisitor.ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        }
    }
})
