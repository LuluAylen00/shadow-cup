function cargarTorneo(data, torneo) {

    // console.log(sessionStorage.getItem("data"))
    // console.log("316",data);
    if(sessionStorage.getItem("data") != "undefined"){
        data = JSON.parse(sessionStorage.getItem("data"));
    }
    // console.log("317",data);
    // console.log("318",torneo);
    let rutaDividida = torneo.replace("/editar","").split("/");
    // console.log("320", rutaDividida);
    let tipoDeTorneo = torneo.includes("12-casas/") ? rutaDividida && rutaDividida[rutaDividida.length - 1] : torneo.includes("master-16") ? "master-16" : null;
    // console.log(data);
    if (tipoDeTorneo == "master-16") {
        // console.log("322",data[tipoDeTorneo]);
        tempJugadores = data[tipoDeTorneo].teams;
        tempPartidas = data[tipoDeTorneo].matches;
        
        sessionStorage.setItem("jugadores", JSON.stringify(tempJugadores));
        sessionStorage.setItem("partidas", JSON.stringify(tempPartidas));
        sessionStorage.setItem("torneo", JSON.stringify(data[tipoDeTorneo]));

        mostrarContenido(window.location.pathname);
        return {
            players: tempJugadores,
            matches: tempPartidas,
        }
    } else if (tipoDeTorneo) {
        // console.log("333",data);
        // console.log("334",tipoDeTorneo);
        // console.log("335",data["12-casas"][tipoDeTorneo]);
        tempJugadores = data["12-casas"][tipoDeTorneo].players;
        tempPartidas = data["12-casas"][tipoDeTorneo].matches;
        
        sessionStorage.setItem("jugadores", JSON.stringify(tempJugadores));
        sessionStorage.setItem("partidas", JSON.stringify(tempPartidas));
        sessionStorage.setItem("torneo", JSON.stringify(data["12-casas"][tipoDeTorneo]));

        mostrarContenido(window.location.pathname);
        return {
            players: tempJugadores,
            matches: tempPartidas,
        }
    } else {
        sessionStorage.setItem("jugadores", JSON.stringify({}));
        sessionStorage.setItem("partidas", JSON.stringify({}));
        sessionStorage.setItem("torneo", JSON.stringify({}));

        mostrarContenido(window.location.pathname);
        return null;
    }

    // if (tipoDeTorneo == "master-16") {
    // } else if (tipoDeTorneo.includes("12-casas")){
    //     tempJugadores = data["12-casas"][tipoDeTorneo.split("12-casas-")[1]].players;
    //     tempPartidas = data["12-casas"][tipoDeTorneo.split("12-casas-")[1]].matches;
    // }
    // tempJugadores = playerList.slice((numero - 1) * 16, ((numero - 1) * 16) + 16);
    // console.log(tempJugadores);

    // tempPartidas = brackets.slice((numero - 1) * 15, ((numero - 1) * 15) + 15);
    // console.log(tempPartidas);

    // loadLeftBar(tempJugadores);
}