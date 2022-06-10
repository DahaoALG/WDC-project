var vueinst = new Vue({
    el:"#intro_course_card",
    data: {
        CS: [
            { title: 'Duration: 3 years full-time'},
            { title: 'Start Dates: February and July'},
            { title: 'Location: North Terrace Campus'}
        ],

        CIVIL: [
            { title: 'Duration: 4 years full-time'},
            { title: 'Start Dates: February and July'},
            { title: 'Location: North Terrace Campus'}
        ],

        MATHS: [
            { title: 'Duration: 3 years full-time'},
            { title: 'Start Dates: February and July'},
            { title: 'Location: North Terrace Campus'}
        ],

        AD: [
            { title: 'Duration: 3 years full-time'},
            { title: 'Start Dates: February and July'},
            { title: 'Location: North Terrace Campus'}
        ],

        ADA: [
            { title: 'Duration: 3 years full-time'},
            { title: 'Start Dates: February and July'},
            { title: 'Location: North Terrace Campus Waite Campus'}
        ],

    },
});

function search() {
    var search_content=document.getElementById('search_content').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          if (this.responseText=="nothing") {
              alert("The search content cannot be null");
          } else if (this.responseText=="only_one") {
              alert("Invoid Enter, Please try again");
          } else {
              alert("Please Login to explor more :)" );
          }


      }
    };
    xhttp.open("POST", "users/search", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({search_content:search_content}));
}