we use few packege:
npm install mysql;
npm install express-session;
npm install nodemailer;



[login.html]
The user login page has two input boxes take in username and password, if they are empty, a sign is provided to
remind the user to type in. username and password has a boundry that will not take in input like --, ; and ' ' to
avoid sql injection.
under the password there is an url link to the [forget.html] by clicking it.
then is the login button will send username and password to service, if find them in sql, will set up a cookie that
identify user to the client side, then jump to the [idmain] page.
below is a signup button link to the [SignUp.html].
and if user want to access as visitor, click access as visitor.
the last url will lead user to the [index.html].


[SignUp.html]
this page allows user to set up an account. if any of the element is empy, the service will tell the user to put in the
value. and if any if invalid like "<,>, ; , ' ', -" which would lead a high risk of sql injection and XSS.
if user want to sign up an account, they have to receive an email which send a 5-digits random code to their email,
type in the correct email will create a new account which is going to save in the sql.
after all type in information, user can choose to accept all 4 kinds of email notification by click "i agree ....", user can
change each kinds of email notification they want in [usersetting.html] (this is the special feature!).
if they sign up successfully, the page will show a button that redirect user to the login page to login with new account
that they created.


[forget.html]
the forget html is for user who forget their login details. the type in input also has a strict scrutiny for characters to
keep database safe. after they type the right email(otherwise they will not receive the code), they can get their
username and password by email on their registered email.



[notlogout.html]
if user visit the [login.html] page but they have already logged in, they will be redirect to this page immediately. user
can choose to login as the account that they have not logged out yet to [idmain.html], or log in with other
accounts to [login.html], signup [SignUp.html] or access as visitor [visitor.html].


[idmain.html]
when user login successfully, they will redirect to this page, i wish to describe it as four part.
the first part is the top row, vue will fill the username with welcome  on the left side, and three button which lead
user to course [courseoverview.html], yourevent which contain user's events for both host and participant[idevent.html]
and the main page which contains all the event post by website user [idmain.html]

then is the second part , the left part. the first row is a button with username on it, click it will redirect the user to
[usersetting.html], which can set almost all of their information like change password or change email notification
(which is the special feature!), then are three buttons that mention before in the first part. the last row is the calendar
redirect to [calendar.html] that contain all the event that user attend or host.

the main part is in the center. the first top div allow user to post their event include the event time, event title, and
event place and event description. when user post it, it will be sent to service(sql) to save it, and return all the events
that print in below order by post time which the lastest in the top.

for each event which is not finished yet, users can choose to join it if they are not one of the member by click the
join button(visible if they did not join before). and they can choose to quit the event if they joined before by click the
join button(visible if they joined before). and if the user is the host of the event, they have two more option visible:
delete and mark the event as finished. For this part, if user join/quit/delete/mark as finish for an event, and they
are agree to receive emails which set in their profile in [usersetting.html] when event has new member(join)/event
member quit an event(quit)/event is delete(cancel)/event is finish(finish), both host and the event member(event
cancel(delete) and event finish for all the joined memeber) will receive if they want to.
on those post, event title, event poster, event time, event place, event description, post time and if event finished is
visible for all users and visitors, if user is one of the member, user would see a paragraph says you are one of the
member, and if user is the host, they will see a p says you are the host.

the right colume which is the last part contains some ads and intersting pictures.


[usersetting.html]
three parts in this page is the same as [idmain.html], but for the  main part, it will show user's email and user's id.
then is a bar for changing password, with a strict scrutiny for characters to keep database safe. after entering the
verification code sent to user's email and submit it, password would be changed. then is a bar for changing email
notification(SPECIAL FEATURES!)， users can change any kinds of notefication they want to receive here. and other
three parts are the same as idmain.html.


[idevent.html]
This page will only show the events that user joined and host, and they can edit the same features like in the main
page[idmain.html]. and other three parts are the same as idmain.html.

[visitor.html]
if visitor want to access out main website, they can check and only check all the public events in the visitor
page, and they can choose to sign up an account or login via the buttons above.

[calendar.hml]
This page allow user to see their calendar and do some change,  user can use the “back” button and “next” button on the  right-top side of the calendar-page to change the different months and years of the calendar, when user click the date on the calendar  it will show a new modal which allow user post event on the calendar, user can input event title,event place and event description,after user finish input and click submit button, all the information about the event will be inserted to the database, and also show on the calendar and there is a email will be sended to the user to remind user about the events.

​​[index.html]
This is the homepage for the whole website. The menu navigation provided a link to [courseoverview] page, [user/student sigin] page, [manager/staff] sigin page, and a search bar. Users can choose to use the menu navigation to catch the related page. Roll down the page, it will show 10 different introduction cards. The first 5 is for introducing the website, and the other 5 is for introducing the course information due to this being a social website based on the university.




[courseoverview.html]
This is a static webpage to show the major names and the course names.


[major_course.html]
This page is for users to choose their major and course in the user page. It will show all major information first in a table. Then if the user would like to choose a major, she/he will need to type the username first, and then choose the related major in the select form, after clicking the submit major button, the user has selected the major successfully. Then the page will show the course information for the user to choose. The same as above, the user needs to type the username first, and then choose the related course in the select form. However, the target input cannot be the nothing or other invalid input, if the username input is nothing or like ‘ ’, ‘;’, ‘-’, ‘>’, ‘<’ or the selected nothing. It will send a notice for users on the page. Moreover, the user can only choose one major and course, that means if the user had already chosen the major and course, if she/he chose the different one, the related information will be updated.


[manage_major_course.html]
This page is for managers to manage the major and course in the manage page. The manager can check the detailed information about the major and course. Moreover, in major modules, the manager can click the add button and then add the related major by typing the major ID, major name, major duration, major start date, and the major location. The website will change the input, especially checking the major id, and whether major names already existed or not. In the course modules, the manager can delete the course by choosing the related course in the selected form, and after clicking the delete button. Moreover, the manager can add the new course by clicking the add button and type the course ID and course name. Same as before, the website will check the input first. If the condition arrives, the new course information will be inserted to the database, and the users can see it later.


[manage_user.html]
This page is for managers to manage the users. First, the website will show the enrolled user information. Moreover, if the user would like to join the website, but they do not know how to, they can ask the manager for help. The manager will create a new account for them if they provide the username, user email, and user birthday. After clicking the Submit button in the add user page, if the user information is available, the manager will send an ‘create successfully’ email to tell the user about the account user id, and initial password. As shown above, the website will check the input first, and if the input is nothing or other invalid input, the website will send the notice to the manager.


[manage_user_info.html]
This page is for managers to manage the user information. After selecting the operation, and clicking the submit operation button, the website will display the related user page (only one user). Then the check detail information modulus will display the user info, what major and course the user chose. Moreover, in this modulus, the manager can change the user information. For example, if the users would like to change the username by manager, they can provide the user id, username, user email or user birthday, and then the manager can change the related information. If the information is valid, then the user will receive an email which is about the information being changed successfully. What’s more, the major and course can also be changed if the user provides the correct user ID, and if changed successfully, the user will also receive an email.

s
[ManagerHomePage.html]
As soon as the manager login successfully, they will enter their own homepage. The first part is the top row, vue will fill the manager username with welcome on the left side, and two buttons which lead the user to manage course and manage user information.

The left part of the page contains four buttons which lead the user to manager setting, manage course, manage user and manage event. Managers can access settings through their username button. Which will lead to [managersetting.html]. Manager can click the manager event button to access the event list to manage those events including delete the post. Manager also can access the management course. When the manager is on login status, then there is a logout button for them to log out. Otherwise, if no manager login, then there is a login button for them to login and be able to manage.

The main part on the middle page is a posting area. The first top div allows users to post their event including the event time, event title, and event place and event description. It will be sent to the database to save it, and return all the events that print in below order by post time which is the latest in the top. Manager has the right to delete those posts if the posts are illegal.

The right part of the page contains some advertisements and interesting pictures throughout the division.


[ManagerLogin.html]
The manager login page is similar to normal user login. It has two input boxes that take in username and password, it cannot be empty, as soon as the manager presses the button with the empty input box, the webpage will alert that it cannot be empty. Username and password has a boundary that will not accept special characters such as --, ; and ‘ ’ to avoid sql error.
After two input boxes, there are two buttons which are login and sign-up buttons. If system find the corresponding username and correct password in database, then the manager is able to login to [ManagerHomePage.html]. It also sets up a cookie that identifies the manager on the client side. Sign-up button will lead manager to register a new account, is a link to [ManagerSignUp.html].


[ManagerSignUp.html]
This page is for managers to register a new account. If any of the elements are empty, the service will alert the manager to input the value. If any invalid character like ‘’ <,>,” which would lead to a high risk of sql injection and XSS.
After the manager input the username and password, they need to input the password once again for confirmation purposes. Then the service would require email to register and send the verification code to the manager. As you know, not everyone is eligible to be a manager, they need the invite code to register. The invite code can only be told by other managers.
As long as all the input boxes are filled in correctly, once the manager presses the sign-up button, the page will show a button that redirects the manager to the [ManagerLogin.html] to login.

[managersetting.html]
The outline of the manager setting page remains the same as [ManagerHomePage.html] except the main part in the middle. It will show the manager's email and manager’s id. Then it is a bar for changing passwords, with a strict security for characters to keep the database safe. After entering the verification code that sent it to the manager's email and submitting it, the password would be changed in the database. then is a bar for changing email
notification (SPECIAL FEATURES!) ， users can change any kinds of notification they want to
receive here. and the other three parts are the same as [ManagerHomePage.html].
