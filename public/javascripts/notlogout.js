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
                    if(this.responseText !== "no_log"){
                        ptr.username = this.responseText;
                    }
                    else{
                        console.log(this.responseText);
                    }
                }
            };
            xhttp.open("GET", "/users/checkvisitor.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
        loginas(){
            window.open('idmain.html','_self');
        },
        login(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if(this.responseText == "cookiecleared"){
                        window.open('login.html','_self');
                    }
                    else{
                        console.log("logoutfall");
                    }
                }
            };
            xhttp.open("GET", "/logout.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
        signup(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if(this.responseText == "cookiecleared"){
                        window.open('SignUp.html','_self');
                    }
                    else{
                        console.log("logoutfall");
                    }
                }
            };
            xhttp.open("GET", "/logout.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
        loginvisitor(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if(this.responseText == "cookiecleared"){
                        window.open('visitor.html','_self');
                    }
                    else{
                        console.log("logoutfall");
                    }
                }
            };
            xhttp.open("GET", "/logout.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
    }
})
