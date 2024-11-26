function playToggle(){
    var inputField = document.getElementById("cardidinput");
    var inputFieldBtn = document.getElementById("cardidbtn");
    inputField.classList.toggle("invis");
    inputFieldBtn.classList.toggle("invis");

}

function playBingo(){
    var cardid = document.getElementById("cardidinput");
    // in the future, ask the server if the room exists
    
    /*
    socket.emit("ask if exists", cardidinput.value);

    socket.on("room exists", (id) => {
        window.location.assign(`./play?cardid={id}`);
    });
    */
}

function createBingo(){
    window.location.assign(`./create`);
}