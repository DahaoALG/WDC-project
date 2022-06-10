var realcode = '?';
var user_id;
var email;
var comfirm;
var ptr2 = this;
var www;

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
        date: www,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
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
                        //window.open('visitor.html', "_self");
                        return;
                    }
                    var res = JSON.parse(this.responseText);
                    console.log(res);
                    var check = JSON.stringify(this.responseText).includes("username");
                    if (check) {
                        console.log(this.responseText);
                        ptr2.user_id = res[0].user_id;
                        ptr2.email = res[0].email;
                        ptr2.comfirm = res[0].comfirm.data[0];
                        ptr.username = res[0].username;
                        ptr.email = res[0].email;
                        ptr.user_id = res[0].user_id;
                        ptr.responed = res[0].responed.data[0];
                        ptr.comfirm = res[0].comfirm.data[0];
                        ptr.event_finish = res[0].event_finish.data[0];
                        ptr.event_cancel = res[0].event_cancel.data[0];
                        ptr.getevent();
                        ptr.getjoined();
                        ptr2.initButtons();
                        ptr2.load();
                        console.log(`user_id is ${ptr2.user_id}`);
                    } else {
                        console.log(this.responseText);
                        console.log("have no username");
                        alert("Please login");
                    }
                }
            };
            xhttp.open("GET", "/getusername.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send();
        },
        getnext(){
            if(this.month == 12){
                this.year++;
            }
            else{
                this.month++;
                console.log(this.month);
            }
        },
        getback(){
            if(this.month == 0){
                this.year--;
            }
            else{
                this.month--;
            }
        },
        getevent() {
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

        getjoined() {
            var ptr = this;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var res = JSON.parse(this.responseText);
                    console.log(res);
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

        postca() {
            var ptr = this;
            this.event.event_time = ptr2.www;
            console.log(this.event.event_time);
            this.event.event_post_time = new Date();
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if (this.responseText == "done!") {
                        ptr2.load();
                        ptr2.closeModal();
                        ptr.getevent();
                    } else {
                        alert("fall!");
                    }
                }
            };
            xhttp.open("POST", "/posts.ajax", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ event_name: this.event.event_name, event_host_id: this.user_id, event_description: this.event.event_description, event_place: this.event.event_place, event_time: ptr2.www, event_post_time: this.event.event_post_time, event_situation: this.event.event_situation, email: this.email, comfirm: this.comfirm }));
        },
    },
});

//日历从这里开始写
let nav = 0;
let clicked = null;
let events = [];
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const eventPostInput =  document.getElementById('eventPostInput');
const eventPlaceInput =  document.getElementById('eventPlaceInput');


function openModal(date) {
    clicked = date;
    console.log(`date is ${date}`);
    www = date;
    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = `Title: ${eventForDay.name}`;
        document.getElementById('eventTime').innerText = `Date: ${eventForDay.date}`;
        document.getElementById('eventDes').innerText = `Details: ${eventForDay.title}`;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
};



function load() {
    var text1;
    var ptr = this;
    get2();
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var text = JSON.parse(this.responseText);
            console.log(`this is ${ptr.text1}`);
            var text2 = text.concat(ptr.text1);
            events = [];
            for (let u = 0; u < text2.length; u++) {
                events.push({
                    date: text2[u].event_time,
                    title: text2[u].event_description,
                    name: text2[u].event_name,
                });

            }
            const dt = new Date();

            if (nav !== 0) {
                dt.setMonth(new Date().getMonth() + nav);
            }

            const day = dt.getDate();
            const month = dt.getMonth();
            const year = dt.getFullYear();

            const firstDayOfMonth = new Date(year, month, 1);
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
                weekday: 'long',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
            const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

            document.getElementById('monthDisplay').innerText =
                `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

            calendar.innerHTML = '';
            for (let i = 1; i <= paddingDays + daysInMonth; i++) {
                var sads = 0
                const daySquare = document.createElement('div');
                daySquare.classList.add('day');

                const dayString = `${month + 1}/${i - paddingDays}/${year}`;
                if (i > paddingDays) {
                    daySquare.innerText = i - paddingDays;
                    const eventForDay = events.find(e => e.date === dayString);
                    ptr2.www = dayString;

                    if (i - paddingDays === day && nav === 0) {
                        daySquare.id = 'currentDay';
                    }

                    if (eventForDay) {
                        for (let g = 0; g < text2.length; g++) {
                            if (dayString == text2[g].event_time) {
                                const eventDiv = document.createElement('div');
                                eventDiv.classList.add('event');

                                eventDiv.innerText = text2[g].event_name;
                                daySquare.appendChild(eventDiv);

                            }
                        }
                    }
                    daySquare.addEventListener('click', () => openModal(dayString));
                } else {
                    daySquare.classList.add('padding');
                }

                calendar.appendChild(daySquare);
            }
        }
    };

    xhttp2.open("POST", "/showtext", true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send(JSON.stringify({ user_id: ptr2.user_id}));



}

function get2() {
    var ptr = this;
    var text;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ptr2.text1 = JSON.parse(this.responseText);
            console.log(ptr2.text1);
            return ptr2.text1;
        }
    };
    xhttp.open("POST", "/showtext2", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({ user_id: ptr2.user_id}));
}

function closeModal() {
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    clicked = null;
    load();
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}
