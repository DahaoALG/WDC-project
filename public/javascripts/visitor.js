var vueinst = new Vue({
    el: '#app',
    data:{
        username:'Visitor',
        event: {
            event_name :'',
            event_host_id: '',
            event_description: '',
            event_time:'',
            event_place: '',
            event_post_time: '',
            event_situation: false,
        },
        list: [{
            event_name :'抽烟',
            event_host_id: '顶针',
            event_description: '来一根',
            event_time:'6-6-2022',
            event_place: '理塘',
            event_post_time: 'now',
            event_situation: false,
        }],
    },
    mounted:
        function(){
        this.getevent();
    },
    methods: {
        closead(){
            this.$refs.ads.style.display = "none";
        },
        getevent(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.responseText);
                    console.log(res);
                    ptr.list = res;
                }
            };
            xhttp.open("GET", "/getevents.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },

        getjoined(){
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.responseText);
                    console.log(res);
                    for(let i = 0; i < res.length; i++){
                        ptr.joined_event.push(res[i].event_id);
                    }
                }
            };
            xhttp.open("POST", "/getjoined.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({user_id: this.user_id}));
        },
        login(){
            window.open('login.html','_self');
        }
},
});