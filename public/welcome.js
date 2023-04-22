let username = null

/* Enregistrement du pseudonyme */

function save(){
    username = document.getElementById("username").value 
    localStorage.setItem('username', username);
    window.location.href = '/';
}

/* Verif si entrée n'est pas appuyé */

function ifenter(event){
    let x = event.code;
    if (x == "Enter") {
      save();
    }
}
