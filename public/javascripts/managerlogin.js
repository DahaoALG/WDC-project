var vueinst = new Vue({
    el: '#app',
    data:{
        username: '',
        password: '',

    },
    methods: {
        managerlogin(){
        var ptr = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("send to servere successfully");
                console.log(this.responseText);
                if(this.responseText == "true"){
                    window.open('ManagerHomePage.html');
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
            }
        };
        xhttp.open("POST", "/managerlogin.ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ username: this.username, password: this.password }));
        }
    }
})
