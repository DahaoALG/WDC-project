var realcode = '?';
var ptr2 = this;

var vueinst = new Vue({
    el: '#app',
    data: {
    email: '',
    code: '',
    code_send: false,
},
 methods: {
    Check(){
        var ptr = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log("request to servers successfully");
                console.log(this.responseText);
                if(this.responseText == "yes"){
                    ptr.$refs.forget.style.display = "none";
                    ptr.$refs.result.style.display = "block";
                    ptr2.realcode_ = '?';
                    ptr.code_send = false;
                }
                else if(this.responseText == "emailnofound"){
                    alert("The type-in email is not in our system");
                }
                else if(this.responseText == "no_email"){
                    alert("email can not be umpty");
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
        xhttp.open("POST", "/getdetail.ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({email: this.email, code: this.code, realcode:ptr2.realcode}));
        },
        getcode(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if(this.responseText == "not_email"){
                        alert("please type the correct email");
                    }
                    else if(this.responseText == "invalid_input"){
                        alert("invalid input ' ', - , > , < or ; .");
                    }
                    else{
                        ptr2.realcode_ = this.responseText;
                        ptr.code_send = true;
                    }
                }
            };
        xhttp.open("POST", "/getforgetcode.ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({email: this.email}));
        },
    },
});