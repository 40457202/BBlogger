var users = {
  "admin":["admin", 1],
  "joeBloggs1":["myBirthday", 0],
  "builderBob":["myFavouritePet", 0],
  "jollyJanet53":["ilovecats", 0]
};

var topics = [
  "Art and Design",
  "Fashion",
  "Food and Drink",
  "Life",
  "Sport",
  "Technology",
  "Travel and Tourism"
];

window.onload=function() {
  document.getElementById("contentFonts").addEventListener("change", function() {
    changeFont("contentEditor", "contentFonts");
  });
  document.getElementById("contentImage").addEventListener("click", function() {
    insertImage("contentEditor");
  });
  document.getElementById("contentLink").addEventListener("click", function() {
    insertLink("contentEditor");
  });
  document.getElementById("submitButton").addEventListener("click", postSubmition);
  document.getElementById("cancelButton").addEventListener("click", cancelEdit);
  document.querySelectorAll('.editButton').forEach(item => {
    item.addEventListener("click", prepareEdit);
  });
  document.querySelectorAll('.removeButton').forEach(item => {
    item.addEventListener("click", removePost);
  });
  document.getElementById('signupButton').addEventListener("click", function() {
    openBox("signupBox");
  });
  document.getElementById('closeSignupButton').addEventListener("click", function() {
    closeBox("signupBox");
  });
  document.getElementById('loginButton').addEventListener("click", function() {
    openBox("loginBox");
  });
  document.getElementById('closeLoginButton').addEventListener("click", function() {
    closeBox("loginBox");
  });
  document.getElementById('loginSubmit').addEventListener("click", login);
  document.getElementById('signupSubmit').addEventListener("click", signup);
  document.getElementById('logoutButton').addEventListener("click", logout);
  populateTopicDropdown();
}

// populates the topic dropdown element by using the topics list
function populateTopicDropdown() {
  var topicList = document.getElementById("topicsDropdown");
  var i;
  for (i=0; i < topics.length; i++) {
    topic = "<option value='" + topics[i] + "'>" + topics[i] + "</option>";
    topicList.insertAdjacentHTML('beforeend', topic);
  }
}

// opens either the login box or sign up box and blurring the background and
// and prevents interaction with blurred areas
function openBox(boxId) {
  document.getElementsByTagName("main")[0].style.filter = "blur(4px)";
  document.getElementsByTagName("main")[0].style.pointerEvents = "none";
  document.getElementsByTagName("header")[0].style.filter = "blur(4px)";
  document.getElementsByTagName("header")[0].style.pointerEvents = "none";
  document.getElementById(boxId).style.display = "block";
}

// closes the sign in or login box and makes areas unblurred and interactable
// again
function closeBox(boxId) {
  document.getElementsByTagName("main")[0].style.filter = "none";
  document.getElementsByTagName("main")[0].style.pointerEvents = "all";
  document.getElementsByTagName("header")[0].style.filter = "none";
  document.getElementsByTagName("header")[0].style.pointerEvents = "all";
  document.getElementById(boxId).style.display = "none";
}

// checks if the username and password exist in the users dictionary and if the
// user is an admin the admin button will be displayed, it should also close
// the login box
function login() {
  username = document.getElementById("loginUsernameInput").value;
  password = document.getElementById("loginPasswordInput").value;
  if (!(username in users)) {
    alert("incorrect username");
  }
  else if (users[username][0] !== password) {
    alert("incorrect password");
  }
  else if (users[username][1] === 1) {
    document.getElementById("adminLink").style.display = "block";
    closeBox("loginBox");
    continueLogin(username);
  }
  else {
    closeBox("loginBox");
    continueLogin(username);
  }
}

// welcomes the user and hides the sign in and log in buttons replacing them
// with the log out and the username that is signed in, it should also clear
// the login and sign up input boxes
function continueLogin(username) {
  console.log(username + " logged in")
  alert("Welcome " + username);
  document.getElementById("loginUsernameInput").value = "";
  document.getElementById("loginPasswordInput").value = "";
  document.getElementById("signupUsernameInput").value = "";
  document.getElementById("signupPasswordInput").value = "";
  document.getElementById("signupButton").style.display = "none";
  document.getElementById("loginButton").style.display = "none";
  document.getElementById("logoutButton").style.display = "block";
  document.getElementById("accountUsername").value = username;
  document.getElementById("accountUsername").style.display = "block";
}

// checks if the username is unique and if the passwords match then creates a
// user account which is appended to the users dictionary the login process
// is then run
function signup() {
  console.log("server request: add user");
  newUsername = document.getElementById("signupUsernameInput").value;
  newPassword = document.getElementById("signupPasswordInput").value;
  checkPassword = document.getElementById("signupRetypeInput").value;
  if (newPassword !== checkPassword) {
    alert("The passwords do not match!");
  }
  else if (newUsername in users) {
    alert("The username already exists!");
  }
  else {
    users[newUsername] = [newPassword, 0];
    closeBox("signupBox");
    continueLogin(newUsername);
  }
}

// clears all edit boxes and reverts the page back to its orignal state when
// no user was logged in
function logout() {
  cancelEdit();
  var username = document.getElementById("accountUsername");
  document.getElementById("signupButton").style.display = "block";
  document.getElementById("loginButton").style.display = "block";
  document.getElementById("logoutButton").style.display = "none";
  document.getElementById("adminLink").style.display = "none";
  username.style.display = "none";
  console.log(username.value + " logged out");
  alert("Goodbye " + username.value);
  username.value = "";
}

// changes the font in the content editor depending on what is selected in the
// font dropdown menu
function changeFont(editorId, fontId) {
  var fontType = document.getElementById(fontId).value;
  document.getElementById(editorId).style.fontFamily = fontType;
}

// prompts a user for the url and text that they would like to make a link then
// inserts it into the content editor
function insertLink(editorId) {
  var linkInput = prompt("Enter a url:");
  if (linkInput) {
    var linkContent = prompt("Enter the link text:");
    var editor = document.getElementById(editorId);
    var newLink = "<a href="+linkInput+">"+linkContent+"</a>";
    editor.insertAdjacentHTML("beforeend", newLink);
  } else if (linkInput === "") {
    console.log("link input not populated");
    alert("Nice, a link to nothing...");
  } else {
    console.log("link input cancelled");
  }
}

// prompts a user for an image url/path the width and height of the image and
// a description of the image this image will then be added to the content
// editor
function insertImage(editorId) {
  var imagePath = prompt("Enter Image Path:");
  var imageWidth = prompt("Enter Image Width:");
  var imageHeight = prompt("Enter Image Height:");
  var imageDescription = prompt("Enter Image Description:");
  if (imagePath) {
    var editor = document.getElementById(editorId);
    var newImage = "<img src='" + imagePath + "' width='" + imageWidth + "' height='" + imageHeight + "' alt='" + imageDescription +"' onerror='imgError()'>";
    editor.insertAdjacentHTML('beforeend', newImage);
  } else if (imagePath === ""){
    console.log("image input not populated");
  } else {
    console.log("image input cancelled");
  }
}

// alerts the user and the console when an image error occurs
function imgError() {
  alert("Image couldn't be loaded");
  console.log("error when loading image path");
}

// global variable for how many posts there are so that they all have a unique
// identifier
var postAmount = 1;

// appends a post to the posted section once the post has a name, topic and
// content
function postSubmition() {
  var nameInput = document.getElementById("nameEditor");
  var topicInput = document.getElementById("topicsDropdown");
  var contentInput = document.getElementById("contentEditor");
  if (document.getElementById("accountUsername").value === "") {
    alert("To create a post you must be logged in!")
  }
  else if (nameInput.value === "") {
    alert("Please give your post a name");
  }
  else if (topicInput.value === "default") {
    alert("Please choose a post topic");
  }
  else if (contentInput.innerHTML === "") {
    alert("Please write some post content");
  }
  else {
    var newPostAmount = "#" + (postAmount + 1);
    var newEditButton = "<button name='" + newPostAmount + "' class='editButton'>Edit Post</button>";
    var newDeleteButton = "<button name='" + newPostAmount + "' class='removeButton'>Remove Post</button>";
    var newName = "<h4 class='postHeader'>" + nameInput.value + "</h4>";
    var author = document.getElementById("accountUsername").value;
    var authorString = "<h4 class='authorString'>Author: </h4>";
    var authorTag = "<h4 class='authorName'>" + author + "</h4><br><br>"
    var topicString = "<h4 class='topicString'>Topic: </h4>";
    var postTopic = "<h4 class='topic'>" + topicInput.value + "</h4>";
    var dateNow = new Date();
    var date = dateNow.getDate() + "/" + (dateNow.getMonth()+1) + '/' + dateNow.getFullYear();
    var time = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
    var postDateTime = date + " " + time;
    var postTime = "<h4 class='postedTime'>Posted: " + postDateTime + "</h4>";
    var edit = "<h4 class='editedTime'>Edited: Never</h4>";
    var clonedContent = contentInput.cloneNode(true);
    postAmount++;
    clonedContent.setAttribute("id", postAmount);
    clonedContent.setAttribute("class", "postedContent");
    clonedContent.setAttribute("contenteditable", "false");
    var newContent = clonedContent.outerHTML;
    var fullPost = newName + authorString + authorTag + topicString + postTopic + postTime + edit + newContent + newEditButton + newDeleteButton;
    var newPost = "<div id='" + newPostAmount + "' class='card'>" + fullPost + "</div>";
    var submitted = document.getElementById("posts");
    submitted.insertAdjacentHTML('afterbegin', newPost);
    document.getElementsByName(newPostAmount)[0].addEventListener("click", prepareEdit);
    document.getElementsByName(newPostAmount)[1].addEventListener("click", removePost);
    document.getElementById("contentFonts").selectedIndex = "0";
    nameInput.value = "";
    topicInput.selectedIndex = "0";
    contentInput.style.fontFamily = "arial";
    contentInput.innerHTML = "";
  }
}

// edit identifier keeps track of what element is being edited at the current
// time
editId = 0;

// when an edit button is clicked the post information that it is linked to
// will be copied over to the editor so that it can be edited, it also replaces
// the submit post button functionality with the edit post function and makes
// the cancel edit button appear, this can only happen if the user is an admin
// or the owner of the post
function prepareEdit() {
  var post = document.getElementById(this.name);
  var authorName = post.getElementsByClassName("authorName")[0].innerHTML;
  var accountName = document.getElementById("accountUsername").value;
  if (accountName === "") {
    alert("You need to sign in to edit posts!");
  }
  else if (authorName === accountName || users[accountName][1] === 1 ) {
    var selectedContent = post.getElementsByClassName("postedContent")[0];
    var selectedFont = selectedContent.style.fontFamily;
    var submitButton = document.getElementById("submitButton");
    var content = document.getElementById("contentEditor");
    content.innerHTML = selectedContent.innerHTML;
    content.style.fontFamily = selectedFont;
    document.getElementById("nameEditor").value = post.getElementsByClassName("postHeader")[0].innerHTML;
    document.getElementById("topicsDropdown").value = post.getElementsByClassName("topic")[0].innerHTML;
    document.getElementById("contentFonts").value = selectedFont;
    document.getElementById("cancelButton").style.display = "inline-block";
    submitButton.removeEventListener("click", postSubmition);
    submitButton.addEventListener("click", editPost);
    submitButton.innerHTML = "Finish Editing";
    editId = this.name;
  }
  else {
    alert("You don't have permission to edit this post!");
  }
}

// submits the edit made to a post and updates it on the page then reverts the
// edit post value back to 0 and reverts the editor back to normal
function editPost() {
  var post = document.getElementById(editId);
  var selectedContent = post.getElementsByClassName("postedContent")[0];
  var nameInput = document.getElementById("nameEditor");
  var topicInput = document.getElementById("topicsDropdown");
  var contentInput = document.getElementById("contentEditor");
  if (nameInput.value === "") {
    alert("Please give your post a name");
  }
  else if (topicInput.value === "default") {
    alert("Please choose a post topic");
  }
  else if (contentInput.innerHTML === "") {
    alert("Please write some post content");
  }
  else {
    var submitButton = document.getElementById("submitButton");
    var dateNow = new Date();
    var date = dateNow.getDate() + "/" + (dateNow.getMonth()+1) + '/' + dateNow.getFullYear();
    var time = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
    var editDateTime = date + " " + time;
    post.getElementsByClassName("postHeader")[0].innerHTML = nameInput.value;
    post.getElementsByClassName("topic")[0].innerHTML = topicInput.value;
    post.getElementsByClassName("editedTime")[0].innerHTML = "Edited: " + editDateTime;
    selectedContent.innerHTML = contentInput.innerHTML;
    selectedContent.style.fontFamily = contentInput.style.fontFamily;
    document.getElementById("cancelButton").style.display = "none";
    document.getElementById("contentFonts").selectedIndex = "0";
    submitButton.removeEventListener("click", editPost);
    submitButton.addEventListener("click", postSubmition);
    submitButton.innerHTML = "Submit Post";
    contentInput.style.fontFamily = "arial";
    nameInput.value = "";
    topicInput.selectedIndex = "0";
    contentInput.innerHTML = "";
    editId = 0;
    console.log("post edited");
  }
}

// clears the edit boxes and reverts the editor back to normal along with the
// edit id value
function cancelEdit() {
  var submitButton = document.getElementById("submitButton");
  submitButton.removeEventListener("click", editPost);
  submitButton.addEventListener("click", postSubmition);
  submitButton.innerHTML = "Submit Post";
  document.getElementById("contentEditor").style.fontFamily = "arial";
  document.getElementById("cancelButton").style.display = "none";
  document.getElementById("nameEditor").value = "";
  document.getElementById("topicsDropdown").selectedIndex = "0";
  document.getElementById("contentFonts").selectedIndex = "0";
  document.getElementById("contentEditor").innerHTML = "";
  editId = 0;
  console.log("edit cancelled")
}

// allows the user to delete a post only if they are an admin or the owner of
// the post
function removePost() {
  var post = document.getElementById(this.name);
  var authorName = post.getElementsByClassName("authorName")[0].innerHTML;
  var accountName = document.getElementById("accountUsername").value;
  var confirmation = confirm("Are you sure you want to delete this post?");
  if (accountName === "") {
    alert("You need to sign in to delete posts!");
  }
  else if (!confirmation) {
    console.log("post removal cancelled")
  }
  else if (confirmation && (authorName === accountName || users[accountName][1] === 1 )) {
    post.parentNode.removeChild(post);
    console.log("post deleted");
  }
  else {
    alert("You don't have permission to delete this post!");
  }
}
