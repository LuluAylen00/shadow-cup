let socket = io();

// let spects = document.createElement("div");
// spects.classList.add("spect-list");


// function verifyAdmin() {
//     let data = getCookie("user");
//     return data == "$2a$10$S71t6BVaKWDDPEmietxwme0dN81mzhz5M0mL0LUUA6LqohqfV0Cmq";
// }

document.addEventListener("contextmenu", (e) => {
    resetBrackets(e);
    e.preventDefault();
});

document.addEventListener("click", (e) => {
    // console.log(e.target);
    resetBrackets(e);
});

function resetBrackets(e) {
    if (!e.target.classList.contains("fa-times-circle") && !e.target.classList.contains("fa-check-square")) {
        let matches = document.querySelectorAll(".show");
        matches.forEach((match) => {
            if (e.target != match && !match.contains(e.target) ) {
                match.classList.remove('show');
            }
        });
    }
}



window.addEventListener("load", async function(){

    
    // await fetch('https://aoe2cm.net/api/draft/aGMCW')
    // .then(resp => resp.json())
    // .then(data => {
    //     console.log(data);
    // })

    socket.emit('new-guest');

    let validator = document.querySelector("#validator");
    // let admin = false;
    validator.addEventListener("dblclick", ()=> {
        // if (!verifyAdmin()) {
            toggleAdminLogin()
        // }
        
    })

    let tournaments 
    // if (!sessionStorage.getItem("tournaments")) {
    tournaments = await fetch(`/api/show-data`);
    tournaments = await tournaments.json();
    // sessionStorage.setItem("data", JSON.stringify(tournaments.data.torneos));

    // console.log("61",tournaments.data);
    if (verifyAdmin()) {
    }

    // let brackets = playerList.data.partidas;
    // let tempPartidas = [];

    // playerList = playerList.data.jugadores;
    // let tempJugadores = [];

    // console.log(playerList);

    

    

    

    // categorySelector.addEventListener("change",() => {
    //     cargarCategoria(categorySelector.value);
    // })
    // cargarCategoria(categorySelector.value);

    // console.log("Fgh");
    let data = await fetch("/api/show-data");
    data = await data.json();
    // sessionStorage.setItem("data", JSON.stringify(data.data.torneos));
    socket.emit("new-content", data.data.torneos);
    // console.log(data.data.torneos);
    // data = data.json();
    // console.log(data);
    
  
  // Función para cambiar de ruta
  
  
  // Función para mostrar el contenido correspondiente a la ruta
  
  
    
    actualizarLinks();
  
    socket.on("new-content", (data) => {
        // console.log("906",data);
        
        let torneo;
        
        if (data && data.data) {
            // console.log(data);
            
            torneo = cargarTorneo(data.data.torneos, window.location.pathname);
        } else if (data) {
            torneo = cargarTorneo(data, window.location.pathname);
        }
        
        console.log(torneo);
        if (torneo) {
            // sessionStorage.setItem("jugadores", JSON.stringify(data.jugadores));
            playerList = data.jugadores;
    
            // sessionStorage.setItem("partidas", JSON.stringify(data.partidas));
            brackets = data.partidas;
        }
        // cargarTorneo(data.data.torneos, window.location.pathname);
    })

    cargarTorneo(data.data.torneos, window.location.pathname);
    
    socket.on("guest-list", (data) => {
        // console.log("Asd");
        if (verifyAdmin()) {
            let date = new Date(data.max.time);
            // console.log(date);
            console.log(`Tenemos un total de ${data.total} visitantes, actualmente son ${data.actual}. La vez que mas han habido al mismo tiempo fue el ${date} que hubieron ${data.max.count}`);
        }
    });

    
    

    
});



