var topics = [
  "Art and Design",
  "Fashion",
  "Food and Drink",
  "Life",
  "Sport",
  "Technology",
  "Travel and Tourism"
];

var users = {
  "admin":["admin", 1],
  "joeBloggs1":["myBirthday", 0],
  "builderBob":["myFavouritePet", 0],
  "jollyJanet53":["ilovecats", 0]
};

window.onload=function() {
  populateTopics();
  populateUsers();
  document.getElementById("addTopicButton").addEventListener("click", addTopic);
  document.getElementById("addUserButton").addEventListener("click", addUser);
}

// populates the topics list with values from the topics array
function populateTopics() {
  var topicList = document.getElementById("topicList");
  topicList.innerHTML = '';
  var i;
  for (i=0; i < topics.length; i++) {
    topic = "<input id='topic" + i + "' value='" + topics[i] + "' placeholder='Topic'>";
    newEditButton = "<button name='topic" + i + "' class='topicEditButton'>Edit</button>"
    newDeleteButton = "<button name='topic" + i + "' class='topicDeleteButton'>Delete</button>"
    newListElement = "<li name='topic" + i + "'>" + topic + newDeleteButton + newEditButton + "</li>";
    topicList.insertAdjacentHTML('beforeend', newListElement);
  }
  document.querySelectorAll('.topicEditButton').forEach(item => {
    item.addEventListener("click", editTopic);
  });
  document.querySelectorAll('.topicDeleteButton').forEach(item => {
    item.addEventListener("click", deleteTopic);
  });
}

// populates the users list using the users dictionary
function populateUsers() {
  var i;
  var userList = document.getElementById("userList");
  userList.innerHTML = '';
  for (i=0; i < Object.keys(users).length; i++) {
      username = "<input id='username" + i + "' name='username' class='user" + i + "' value='" + Object.keys(users)[i] + "' readonly>";
      password = "<input id='password" + i + "' ' name='password' class='user" + i + "' value='" + users[Object.keys(users)[i]][0] + "' placeholder='Password'>";
      privilegeDropDown = "<select id='privilege" + i +  "' name='privilege' class='user" + i + "'><option value=0>Non-Admin</option><option value=1>Admin</option></select>"
      newEditButton = "<button name='user" + i + "' class='userEditButton'>Edit</button>";
      newDeleteButton = "<button name='user" + i + "' class='userDeleteButton'>Delete</button>";
      newListElement = "<li name='user" + i + "'>" + username + "<br>" + password + "<br>" + privilegeDropDown + newDeleteButton + newEditButton + "</li>";
      userList.insertAdjacentHTML('beforeend', newListElement);
      document.getElementById('privilege' + i).value = users[Object.keys(users)[i]][1];
  }
  document.querySelectorAll('.userEditButton').forEach(item => {
    item.addEventListener("click", editUser);
  });
  document.querySelectorAll('.userDeleteButton').forEach(item => {
    item.addEventListener("click", deleteUser);
  });
}

// appends a new topic to the topics array and reloads the contents of the
// topics list on the page, this can only occur if the new topic input is
// unique and the value is not null
function addTopic() {
  newTopic = document.getElementById("newTopicInput");
  if (newTopic.value === "") {
    alert("Please enter topic");
  }
  else if (topics.includes(newTopic.value)) {
    alert("Topic already exists");
  }
  else {
    topics.push(newTopic.value);
    newTopic.value = "";
    populateTopics();
    console.log("server request: add topic");
  }
}

// appends a new user to the user dictionary and reloads the user list, this
// can only occur if the values in the input boxes aren't null and the username
// is unique
function addUser() {
  newUsername = document.getElementById("newUsernameInput");
  newPassword = document.getElementById("newPasswordInput");
  if (newUsername.value === "") {
    alert("Please enter a username")
  }
  else if (newPassword.value === "") {
    alert("Please enter a password")
  }
  else if (newUsername.value in users) {
    alert("Username is already taken");
  }
  else {
    newPrivilege = document.getElementById("newPrivilegeSelect");
    users[newUsername.value] = [newPassword.value, newPrivilege.value];
    populateUsers();
    newUsername.value = "";
    newPassword.value = "";
    newPrivilege.selectedIndex = 0;
    console.log("server request: add user");
  }
}

// allows the topic to be edited in the topics array and reloads the topics
// list only if the edited topic is unique and new
function editTopic() {
  var newTopic = document.getElementById(this.name).value;
  if (topics.includes(newTopic)) {
    alert("Topic already exists");
  }
  else {
    populateTopics();
    var oldTopic = document.getElementById(this.name).value;
    topics[topics.indexOf(oldTopic)] = newTopic;
    populateTopics();
    console.log("server request: edit topic");
    alert("edit topic successful");
  }
}

// reference start
// with help from
// https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
// deletes a topic from the topic array and reloads the topics list only if the
// user confirms the deletion
function deleteTopic() {
  populateTopics();
  itemToDelete = document.getElementById(this.name).value;
  if (confirm("Are you sure want to delete the topic: " + itemToDelete + "?")) {
    topics = topics.filter(item => item !== itemToDelete);
    populateTopics();
    console.log("server request: delete topic");
  }
  else {
    console.log("topic deletion cancelled");
  }
}
// reference end

// allows a users password and privilege to be edited and reloads the users
// list
function editUser() {
  console.log("server request: edit user");
  var username = document.getElementsByClassName(this.name)[0].value;
  var newPassword = document.getElementsByClassName(this.name)[1].value;
  var newPrivilege = document.getElementsByClassName(this.name)[2].value;
  users[username] = [newPassword, newPrivilege];
  populateUsers();
  alert("edit user successful");
}

// deletes a user from the user dictionary and reloads the user list only if
// the deletion is confirmed by the user
function deleteUser() {
  populateUsers();
  var username = document.getElementsByClassName(this.name)[0].value;
  if (confirm("Are you sure want to delete the user: " + username + "?")) {
    delete users[username];
    populateUsers();
    console.log("server request: delete user");
  }
  else {
    console.log("user deletion cancelled");
  }
}
