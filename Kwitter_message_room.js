
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
roomname = localStorage.getItem("roomname");

function send() {

    message = document.getElementById("msg").value;
console.log(msg,username, roomname);
    firebase.database().ref(roomname).push({
        name: username,
        msg: message,
        likes: 0
    });



}

function getData() {
    firebase.database().ref("/" + roomname).on('value', function (snapshot) {
        document.getElementById("messages").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['msg'];
                like = message_data['likes'];
                name_with_tag = "<h4> " + name + "<img class='user_tick' src='tick.png'>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("messages").innerHTML += row;
            }
        });
    });
}
getData();

function updateLike(message_id){
console.log("clicked on the like button" + message_id);
button_id = message_id;
likes = document.getElementById("button_id").value ;
updated_likes = Number(likes) + 1;
console.log(updated_likes);
firebase.database().ref(roomname).child(message_id).update({
    likes : updated_likes
}) 
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}