function login(){
    username = document.getElementById("userNameInput").value;
    localStorage.setItem("username", username);
    window.location ="Kwitter_room.html";
 }