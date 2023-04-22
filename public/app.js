/* Vérif si user à un pseudo */

if (localStorage.getItem("username") === null){
  window.location.href = '/welcome';
}

/* Responsive pour petit écran */

if (window.innerWidth <= 768 && window.innerHeight <= 768) {
  document.querySelector('warningmessage').style.display = 'block';
}

/*Menu à gauche + surbrillance*/

function opentab(evt, name) {
  var i, content, navlinks;
  content = document.getElementsByClassName("content");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  navlinks = document.getElementsByClassName("navlinks");
  for (i = 0; i < navlinks.length; i++) {
    navlinks[i].className = navlinks[i].className.replace(" active", "");
  }
  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";
}
document.getElementById("defaultOpen").click();

/*Mode sombre*/

const toggleSwitch = document.querySelector("#switch");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    document.getElementById("logo").src = "src/chat96black.png";
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("logo").src = "src/chat96black.png";
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    document.getElementById("logo").src = "src/chat96white.png";
  }
}
toggleSwitch.addEventListener("change", switchTheme, false);

/*Initialisation de Socket io*/

let socket = io();
const username = localStorage.getItem("username")

/*Socket io pour l'authentification*/

fetch('/api/id')
  .then(response => response.json())
  .then(data => {
    token = data.uuid;
  })

/*Socket io pour le chat*/

function send(){
  let text = document.getElementById("clientmessage").value;
  if (text == ""){
  }
  else{
    socket.emit("chat message",JSON.stringify({message:text,id:token,user:username}));
    document.getElementById("clientmessage").value = "";
  }
}

/* Verif si entrée n'est pas appuyé */

function ifenter(event){
  let x = event.code;
  if (x == "Enter") {
    send();
  }
}

/* Chat socket io */

function receive(msg){
  const li = document.createElement('li');
  const elem = document.createElement("hr");
  const messagesContainer = document.getElementById('main');
  if (JSON.parse(msg).id == token){
    li.innerText = JSON.parse(msg).message;
    li.className = "sender"
    document.getElementById('messages').appendChild(li);
    document.getElementById('messages').appendChild(elem);
  } 
  else{
    if (!JSON.parse(msg).user || JSON.parse(msg).user.trim() === ""){
      li.innerText = "Anonyme : " + JSON.parse(msg).message;
    }
    else {
      li.innerText = JSON.parse(msg).user + " : " + JSON.parse(msg).message;
    }
    li.className = "people"
    document.getElementById('messages').appendChild(li);
    document.getElementById('messages').appendChild(elem);
  }
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/* Scan du serveur */

socket.on("chat message", receive);

/* Futur : Créer une room privée */

function create(){
  alert("Cette fonction est en cours de dévelepement ! Revenez plus tard ;)")
}


