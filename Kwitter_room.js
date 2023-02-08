var firebaseConfig = {
    apiKey: "AIzaSyAjvzaWLoLbGCwebJx-k-HTXwr4ZnftoXg",
    authDomain: "let-s-chat-5822c.firebaseapp.com",
    databaseURL: "https://let-s-chat-5822c-default-rtdb.firebaseio.com",
    projectId: "let-s-chat-5822c",
    storageBucket: "let-s-chat-5822c.appspot.com",
    messagingSenderId: "987534337286",
    appId: "1:987534337286:web:4fe532a54cff8aad8c2a87"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE


username = localStorage.getItem("username");

document.getElementById("userName").innerHTML = "Welcome " + username;

function logout() {
      window.location = "index.html";
}



function addRoom() {

      roomname = document.getElementById("roomName").value;
      localStorage.setItem("roomname", roomname);

      firebase.database().ref("/").child(roomname).update({
            purpose: "to store value"
      });
      window.location = "Kwitter_message_room.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if(childKey != "purpose"){
                  firebase_message_id = childKey;
                  message_data = childData;
                  //Start code
                  console.log(firebase_message_id);
                  console.log(message_data);
                  name = message_data["name"];
                  message = message_data["message"];
                  like = message_data["like"];
                  name_with_tag = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'></h4>";
                  message_with_tag = "<h4 class = 'message_h4'>"+message+"</h4>";
                  like_button = "<button class = 'btn btn-warning' id = "+firebase_message_id+" value = "+like+" onclick = 'updateLike(this.id)>";
                  span_with_tag = "<span class ='glyphicon glyphicon-thumbs-up'> like: "+like+"</span></button><hr>";
           //  var room = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' ># "+ Room_names +"</div><hr>"; 
           row = name_with_tag + message_with_tag + like_button + span_with_tag;
             document.getElementById("output").innerHTML += row; 
                  //End code
        }  });
      });
}
getData();


function redirectToRoomName(name){

console.log(name);
localStorage.setItem("RoomName",  name);

window.location = "Kwitter_message_room.html";
}