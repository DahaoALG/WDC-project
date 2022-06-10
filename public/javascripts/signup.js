var realcode = '?';
var ptr2 = this;

var vueinst = new Vue({
    el: '#app',
    data: {
    email: '',
    username: '',
    password: '',
    conpassword: '',
    code: '',
    code_send: false,
    set: false,
},
 methods: {
    Check(){
        var ptr = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("request to servers successfully");
                if(this.responseText == "yes"){
                    ptr.$refs.signup.style.display = "none";
                    ptr.$refs.result.style.display = "block";
                    ptr2.realcode_ = '?';
                    ptr.code_send = false;
                }
                else if(this.responseText == "userfound"){
                    alert("username has been used");
                }
                else if(this.responseText == "emailfound"){
                    alert("email has been used");
                }
                else if(this.responseText == "no_conpassword"){
                    alert("confirm password can not be empty");
                }
                else if(this.responseText == "no_username"){
                    alert("username can not be empty");
                }
                else if(this.responseText == "no_password"){
                    alert("password can not be empty");
                }
                else if(this.responseText == "no_email"){
                    alert("email can not be empty");
                }
                else if(this.responseText == "no_match"){
                    alert("passwords are not the same");
                }
                else if(this.responseText == "no_code"){
                    alert("press button to get verification code that send to your email");
                }
                else if(this.responseText == "no_code_match"){
                    alert("verification code incorrect");
                }
                else if(this.responseText == "invalid_input"){
                    alert("invalid input ' ', - , > , < or ; .");
                }
            }
        };
        xhttp.open("POST", "/signup.ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ username: this.username, password: this.password, email: this.email, conpassword: this.conpassword, code: this.code, realcode:ptr2.realcode, set:this.set}));
        },
        getcode(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if(this.responseText == "not_email"){
                        alert("please type the correct email");
                    }
                    else{
                        ptr2.realcode = this.responseText;
                        ptr.code_send = true;
                    }
                }
            };
        xhttp.open("POST", "/getcode.ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({email: this.email}));
        },
    },
});