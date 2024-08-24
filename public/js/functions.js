function buscarPartida(partidas, id) {
    // let tempPartidas
    // let partidas = JSON.parse(sessionStorage.getItem("partidas"));
    // console.log(partidas, id);
    return partidas.find(partida => partida.id == id) || {jugadorUno: {id: null}, jugadorDos: {id: null}};
};

console.log("Holi");

function buscarJugador(jugadores, id) {
    // let jugadores = JSON.parse(sessionStorage.getItem("jugadores"));
    return jugadores.find(jugador => jugador.id == id);
}

function buscarTorneo(tipo) {
    let torneos = JSON.parse(sessionStorage.getItem("data"));
    let torneo = {};
    if (tipo == "master-16") {
        torneo = torneos[tipo];
    } else if (tipo){
        torneo = torneos["12-casas"][tipo];
    }
    return torneo;
}

async function establecerCasaActiva(idCasa, data) {
    let dataActual = data;
    let casasActuales = data["12-casas"];
    Object.values(casasActuales).forEach((casa, i) => {
        if (casa.id < idCasa) {
            casasActuales[Object.keys(casasActuales)[i]].status = 0;
        }
        else if (casa.id == idCasa) {
            casasActuales[Object.keys(casasActuales)[i]].status = 1;
        }
        else if (casa.id > idCasa) {
            casasActuales[Object.keys(casasActuales)[i]].status = 2;
        }
    })
    console.log(casasActuales);
    dataActual["12-casas"] = casasActuales;
    socket.emit("new-content", dataActual);

    sessionStorage.setItem("data",JSON.stringify(dataActual));

    // cargarDoceCasas();

    await fetch('/api/update-match-info',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: JSON.stringify(dataActual)})
    })
}

async function actualizarListaJugadores(jugadores, torneo) {
    let dataActual = JSON.parse(sessionStorage.getItem("data"));
    
    // let playerList = JSON.parse(sessionStorage.getItem("jugadores"));
    let brackets = JSON.parse(sessionStorage.getItem("partidas"));


    let newBrackets = brackets.map(match => {
        match.ganador = null;
        match.jugadorUno = {id: null, score: 0}
        match.jugadorDos = {id: null, score: 0}
        match.caracteristicas.civ_draft = null;
        match.caracteristicas.map_draft = null;
        match.caracteristicas.horario = null;
        return match;
    })

    // console.log(newBrackets);
    if (torneo == "master-16") {
        dataActual["master-16"] = {
            ...dataActual["master-16"],
            teams: jugadores,
            matches: newBrackets
        }
        sessionStorage.setItem("torneo", JSON.stringify(dataActual["master-16"]));
    } else {
        dataActual["12-casas"][torneo] = {
            ...dataActual["12-casas"][torneo],
            players: jugadores,
            matches: newBrackets
        }
        sessionStorage.setItem("torneo", JSON.stringify(dataActual["12-casas"][torneo]));
    }

    // console.log(newBrackets);
    // let data = {
    //     partidas: newBrackets,
    //     jugadores: playerList
    // }

    sessionStorage.setItem("data", JSON.stringify(dataActual));
    // sessionStorage.setItem("jugadores", JSON.stringify(dataActual.jugadores));
    // sessionStorage.setItem("partidas", JSON.stringify(dataActual.partidas));
    // console.log(data);
    cargarTorneo(dataActual, window.location.pathname);

    // sessionStorage.setItem("partidas", data.partidas);
    socket.emit("new-content", dataActual);

    await fetch('/api/update-match-info',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: JSON.stringify(dataActual)})
    })
}

async function asignarJugador(jugador, slot, partida, torneo) {
    // console.log(jugador, slot, partida);
    let dataActual = JSON.parse(sessionStorage.getItem("data"));
    
    let playerList = JSON.parse(sessionStorage.getItem("jugadores"));
    let brackets = JSON.parse(sessionStorage.getItem("partidas"));

    console.log(jugador, slot, partida, torneo);

    let newBrackets = brackets.map(match => {
        // console.log(match.id, partida);
        if (jugador == match.jugadorUno.id) {
            match.jugadorUno.id = null;
        } else if (jugador == match.jugadorDos.id) {
            match.jugadorDos.id = null;
        }
        
        if (match.id == partida){
            // console.log(slot);
            if (slot == "uno") {
                match.jugadorUno.id = jugador;
            } else {
                match.jugadorDos.id = jugador;
            };
        };
        return match;
    })

    if (torneo == "master-16") {
        dataActual["master-16"] = {
            ...dataActual["master-16"],
            teams: playerList,
            matches: newBrackets
        }
        sessionStorage.setItem("torneo", JSON.stringify(dataActual["master-16"]));
    } else {
        dataActual["12-casas"][torneo] = {
            ...dataActual["12-casas"][torneo],
            players: playerList,
            matches: newBrackets
        }
        sessionStorage.setItem("torneo", JSON.stringify(dataActual["12-casas"][torneo]));
    }

    // console.log(newBrackets);
    // let data = {
    //     partidas: newBrackets,
    //     jugadores: playerList
    // }

    sessionStorage.setItem("data", JSON.stringify(dataActual));
    // sessionStorage.setItem("jugadores", JSON.stringify(dataActual.jugadores));
    // sessionStorage.setItem("partidas", JSON.stringify(dataActual.partidas));
    // console.log(data);
    cargarTorneo(dataActual, window.location.pathname);

    // sessionStorage.setItem("partidas", data.partidas);
    socket.emit("new-content", dataActual);

    await fetch('/api/update-match-info',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: JSON.stringify(dataActual)})
    })
}

async function definirJugador(jugador, slot, torneo) {
    // console.log(jugador, slot, partida);
    let dataActual = JSON.parse(sessionStorage.getItem("data"));
    
    let playerList = JSON.parse(sessionStorage.getItem("jugadores"));
    // let brackets = JSON.parse(sessionStorage.getItem("partidas"));

    console.log(jugador, slot, torneo);
    /*
        fase-final
        fase-semis
        fase-cuartos
        fase-octavos
        primer-top
        segundo-top
        tercero-top
        cuarto-top
    */
   if (slot.includes("top-")) {
    dataActual["12-casas"][torneo]["prizepool"][slot.replace("top-","")].player = playerList.find(j => j.id == jugador) ? playerList.find(j => j.id == jugador).nick : null;
    console.log(dataActual);
   } else if (slot.includes("fase-")){
    dataActual["12-casas"][torneo]["vencido"][slot.replace("fase-","")] = playerList.find(j => j.id == jugador) ? playerList.find(j => j.id == jugador).nick : null;
    console.log(dataActual);
   }

    sessionStorage.setItem("torneo", JSON.stringify(dataActual["12-casas"][torneo]));
    
    sessionStorage.setItem("data", JSON.stringify(dataActual));
    sessionStorage.setItem("jugadores", JSON.stringify(dataActual.jugadores));
    sessionStorage.setItem("partidas", JSON.stringify(dataActual.partidas));
    // // console.log(data);
    cargarTorneo(dataActual, window.location.pathname);

    // // sessionStorage.setItem("partidas", data.partidas);
    socket.emit("new-content", dataActual);

    await fetch('/api/update-match-info',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: JSON.stringify(dataActual)})
    })
}

// actualizarNick(player.id,td.querySelector("#update-nick").value);
async function actualizarNick(playerId, newName, type) {
    let newPlayers = playerList.map((player)=>{
        if (player.id == playerId) {
            if (type == "player") {
                player.nick = newName;
            } else {
                player.name = newName;
            }
        };
        return player;
    });

    // console.log(newBrackets);
    let data = {
        partidas: brackets,
        jugadores: newPlayers
    }

    sessionStorage.setItem("jugadores", JSON.stringify(data.jugadores));
    sessionStorage.setItem("partidas", JSON.stringify(data.partidas));
    cargarTorneo(data.data.torneos, window.location.pathname);

    // sessionStorage.setItem("partidas", data.partidas);
    socket.emit("new-content", data);

    await fetch('/api/update-match-info',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: JSON.stringify(data)})
    })

    cargarCategoria(categorySelector.value);
}

async function actualizarInfoPartida(clave, valor, partida, torneo) {
    let dataActual = JSON.parse(sessionStorage.getItem("data"));
    
    let playerList = JSON.parse(sessionStorage.getItem("jugadores"));
    let brackets = JSON.parse(sessionStorage.getItem("partidas"));

    // console.log(jugador, slot, partida);
    let newBrackets = brackets.map(match => {
        if(match.id == partida){
            console.log(match.id, "encontrada");
            match.caracteristicas[clave] = valor;
        };
        return match;
    })

    if (torneo == "master-16") {
        dataActual["master-16"] = {
            ...dataActual["master-16"],
            teams: playerList,
            matches: newBrackets
        }
        sessionStorage.setItem("torneo", JSON.stringify(dataActual["master-16"]));
    } else {
        dataActual["12-casas"][torneo] = {
            ...dataActual["12-casas"][torneo],
            players: playerList,
            matches: newBrackets
        }
        sessionStorage.setItem("torneo", JSON.stringify(dataActual["12-casas"][torneo]));
    }

    // console.log(newBrackets);
    // let data = {
    //     partidas: newBrackets,
    //     jugadores: playerList
    // }

    sessionStorage.setItem("data", JSON.stringify(dataActual));
    // sessionStorage.setItem("jugadores", JSON.stringify(dataActual.jugadores));
    // sessionStorage.setItem("partidas", JSON.stringify(dataActual.partidas));
    // console.log(data);
    cargarTorneo(dataActual, window.location.pathname);

    // sessionStorage.setItem("partidas", data.partidas);
    socket.emit("new-content", dataActual);

    await fetch('/api/update-match-info',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: JSON.stringify(dataActual)})
    })
}

async function actualizarScorePartida(partida, scores, tipo) {
    let dataActual = JSON.parse(sessionStorage.getItem("data"));
    let torneo = JSON.parse(sessionStorage.getItem("torneo"));
    
    let playerList = torneo.players || torneo.teams;
    let brackets = torneo.matches;

    console.log("203",partida, scores);
    let winner;
    let newBrackets = brackets.map(match => {
        if(match.id == partida){
            if (scores.jugadorUno == scores.jugadorDos) {
                match.jugadorUno.score = 0;
                match.jugadorDos.score = 0;
            } else {
                match.jugadorUno.score = scores.jugadorUno;
                match.jugadorDos.score = scores.jugadorDos;
            }
            if (scores.jugadorUno > scores.jugadorDos) {
                match.ganador = match.jugadorUno.id;
                winner = match.jugadorUno.id;
            } else if (scores.jugadorDos > scores.jugadorUno) {
                match.ganador = match.jugadorDos.id;
                winner = match.jugadorDos.id;
            } else {
                match.ganador = null;
            }
        };
        return match;
    })

    // console.log("newBrackets", newBrackets);
    
    // Si etapa == 1 
    // Debo buscar el índice dentro de tempPartidas de la partida actual
    // Si el índice es 0, a la partida con índice 8, jugadorUno, le corresponde el ganador
    // Si el índice es 1, a la partida con índice 8, jugadorDos, le corresponde el ganador
    // Si el índice es 2, a la partida con índice 9, jugadorUno, le corresponde el ganador
    // Si el índice es 3, a la partida con índice 9, jugadorDos, le corresponde el ganador
    // let partidaIndice = partida < 17 ? partida : partida < 33 ? partida-15 : partida < 49 ? partida-30 :  partida-45 
    let estaPartida = tempPartidas.find(match => partida == match.id);
    // console.log(partidaIndice);
    let result = 8 + (((partida) * 0.5)-0.5);
    console.log("Debería editarse la partida número "+result+" en la cual ganó el jugador "+ winner);
    newBrackets = newBrackets.map(match => {
        if (!match.jugadorUno.id || !match.jugadorDos.id) {
            match.ganador = null;
            match.jugadorUno.score = 0;
            match.jugadorDos.score = 0;
            // console.log(`El match ${match.id} no tiene jugador 1 ni 2`);
        }

        // console.log(match.id,/*  brackets[brackets.length - 1].id, */ Math.trunc(result));
        // console.log(tempPartidas);
        console.log(result);
        console.log(Math.trunc(result));
        if (/* match.id != brackets[brackets.length - 1].id */Math.trunc(result) != 0 && match.id == brackets[Math.trunc(result) /* / match.categoria */].id) {
            
            if (result % 1 == 0) {
                match.jugadorUno.id = winner;
            } else {
                match.jugadorDos.id = winner;
            }
        }
        return match;
    })
    // function deducirMatch(num) {
        
    //     // if () {
            
    //     // }

    // }

    // deducirMatch(partida);
    

    // let data = {
    //     partidas: newBrackets,
    //     jugadores: playerList
    // }

    console.log("dataActual", dataActual);
    if (tipo == "master-16") {
        dataActual["master-16"] = {
            ...dataActual["master-16"],
            teams: playerList,
            matches: newBrackets
        }
        sessionStorage.setItem("torneo", JSON.stringify(dataActual["master-16"]));
    } else {
        dataActual["12-casas"][tipo] = {
            ...dataActual["12-casas"][tipo],
            players: playerList,
            matches: newBrackets
        }
        sessionStorage.setItem("torneo", JSON.stringify(dataActual["12-casas"][tipo]));
    }
    
    sessionStorage.setItem("data", JSON.stringify(dataActual));

    // sessionStorage.setItem("jugadores", JSON.stringify(data.jugadores));
    // sessionStorage.setItem("partidas", JSON.stringify(data.partidas));
    cargarTorneo(dataActual, window.location.pathname);

    // sessionStorage.setItem("partidas", data.partidas);
    socket.emit("new-content", dataActual);

    // console.log(clave, valor, partida);
    await fetch('/api/update-match-info',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: JSON.stringify(dataActual)})
    })
}

async function loadLeftBar(players, type = "casas") {

    // console.log(players);
    // console.log(document.body);
    // console.log(document.querySelector("#main-cont #seed-table"));
    let leftTable = document.querySelector("#main-cont #seed-table");
    // console.log(leftTable);

    if (type == "master-16") {
        leftTable.classList.add("master-16");
    }

    // console.log(document.querySelector("#main-cont #seed-table"));
    leftTable.innerHTML = `
    <thead class="thead-dark">
        <tr>
            <th id="hide" scope="col"><span>Seed</span></th>
            ${type == "master-16" ? '<th scope="col" class="logo"><span>Logo</span></th>' : "" }
            <th scope="col" class="df-fdc"><span>${type == "master-16" ? 'Equipo' : "Jugador" }</span></th>
            <th scope="col"><span>Elo</span></th>
        </tr>
    </thead>
    `;
    // console.log(leftTable);
    
    // let hide = document.getElementById("hide");
    // hide.addEventListener("dblclick", () => toggleAdminLogin())
    let body = document.createElement("tbody");
    // console.log(players);
    let inv = document.getElementById("inv");
    let acc = [];
    // console.log(players);
    players.forEach((player, i) => {
        // console.log(player);
        acc.push(player.semilla);
        let tr = document.createElement("tr");
        tr.classList.add("seed"+player.semilla);
        tr.classList.add("player");
        tr.classList.add("asd");

        if (type == "master-16") {
            function displayTeamPopUp(){
                let playersHTML = ``;

                player.players.forEach((pl, x) => {
                    playersHTML += `
                        <li class="team-player">
                            <span class="team-seed">${pl.semilla}</span>
                            <span class="team-nick">
                                ${pl.nick}
                                ${
                                    pl.elo ? 
                                    `
                                        <i class="blue">(</i>
                                            ${pl.elo}
                                        <i class="blue">)</i>
                                    ` : 
                                    ""
                                }
                            </span>
                        </li>
                    `
                })

                // let titleLi = document.createElement("li");
                // 

                // titleLi.classList.add("team-players-title");
                // titleLi.classList.add("blue");
                // titleLi.innerHTML = "Jugadores";

                Swal.fire({
                    html: `
                        <div class="master-16-team">
                            <div class="team-left">
                                <picture>
                                    <img src="/img/logos/${player.logo || "default.png"}" alt="${player.name}">
                                </picture>
                                <section>
                                    <h4 class="team-seed"><i class="blue">Seed</i> ${player.semilla}</h4>
                                    <h4 class="team-name"><i class="blue">Equipo</i> ${player.name}</h4>
                                    <h4 class="team-elo"><i class="blue">Elo prom.</i> ${player.elo || 2000-player.id}</h4>
                                </section>
                            </div>
                            <ul class="team-right">
                                <li class="team-players-title blue">Jugadores</li>
                                ${playersHTML}
                            </ul>
                        </div>
                    `,
                    showClass: {
                        popup: `
                          animate__animated
                          animate__fadeIn
                          animate__faster
                        `
                      },
                      hideClass: {
                        popup: `
                          animate__animated
                          animate__fadeOut
                          animate__faster
                        `
                      },
                    showCloseButton: true,
                    showConfirmButton: false
                    // confirmButtonAriaLabel: "Thumbs up, great!",
                    // cancelButtonText: `
                    //   <i class="fa fa-thumbs-down"></i>
                    // `,
                    // cancelButtonAriaLabel: "Thumbs down"
                  });
                  let titleLi = document.querySelector(".team-players-title");
                  if(verifyAdmin()){
                    titleLi.addEventListener("dblclick", () => {
                        let loadPlayersDiv = document.createElement("div");
                        loadPlayersDiv.classList.add("load-players")
        
                        let loadPlayersSpan = document.createElement("span");
                        loadPlayersDiv.appendChild(loadPlayersSpan);
        
                        let loadPlayersTitle = document.createElement("h4");
                        loadPlayersTitle.innerHTML = `¿Deseas sobreescribir los jugadores de ${player.name}?`
                        loadPlayersSpan.appendChild(loadPlayersTitle);
        
                        let loadPlayersCancel = document.createElement("button");
                        loadPlayersCancel.classList.add("cancel-button");
                        loadPlayersCancel.innerHTML = "Cancelar";
                        loadPlayersCancel.addEventListener("click",()=>{
                            loadPlayersDiv.remove();
                        })
                        loadPlayersSpan.appendChild(loadPlayersCancel);
        
                        let loadPlayersInput = document.createElement("input");
                        loadPlayersSpan.appendChild(loadPlayersInput);
        
                        let loadPlayersAccept = document.createElement("button");
                        loadPlayersAccept.classList.add("accept-button");
                        loadPlayersAccept.innerHTML = "Aceptar";
                        loadPlayersAccept.addEventListener("click",()=>{
                            // console.log(players);
                            players = players.map(pl => {

                                
                                if(pl.id == player.id) {
                                    // console.log(pl, player);
                                    let newList = loadPlayersInput.value.split(`/`);
                                    newList = newList.map((actual,i) => {
                                        actual = actual.trim().split("\t");
                                        // console.log(actual);
                                        actual = actual.filter(el => {
                                            // console.log(el, String(el).length > 0);
                                            return String(el).length > 0;
                                        });
                                        // console.log(actual);
                                        return {
                                            "id": i+1,
                                            "nick": actual[1],
                                            "elo": actual[2] || null,
                                            "semilla": actual[0],
                                        }
                                    });
                                    // console.log("new1",newList);
                                    newList = newList.filter(pl => pl.nick && pl.nick.trim().length > 0);
                                    // console.log("new2",newList);
                                    // pl.id = player.id;
                                    // pl.name = player.name;
                                    // pl.logo = player.logo;
                                    // pl.semilla = player.semilla;
                                    pl.players = newList;
                                    // console.log("Final", pl);
                                };

                                return pl;
                            })
                            
                            actualizarListaJugadores(players, "master-16");
                            // loadLeftBar(players, "master-16");
                            // console.log(newList);
                            displayTeamPopUp();
                        })
                        loadPlayersSpan.appendChild(loadPlayersAccept);
        
                        document.getElementById("main-cont").appendChild(loadPlayersDiv);
        
                    })
                  }
            }

            tr.addEventListener("dblclick", displayTeamPopUp);
        }

        let seed = document.createElement("th");
        seed.setAttribute("scope", "row")
        seed.innerHTML = player.semilla;
        tr.appendChild(seed);

        if (type == "master-16") {
            let logo = document.createElement("td");
            logo.classList.add("logo")

            let logoImg = document.createElement("img");
            if (player.logo) {
                logoImg.setAttribute("src","/img/logos/"+player.logo);
            } else {
                logoImg.setAttribute("src","/img/logos/default.png");
            }
            logo.appendChild(logoImg);

            tr.appendChild(logo);
        }

        let td = document.createElement("td");
        // console.log(player);
        td.innerHTML = `
            <div class="bold">${type == "casas" ? player.nick : player.name}</div>
        `;
        // td.addEventListener("dblclick", () => {
        //         if (verifyAdmin()) {
        //         td.innerHTML = `
        //             <div id="update-div">
        //                 <input type="hidden" id="update-id" name="nick" value="${player.id}"/>
        //                 <i class="fas fa-times-circle"></i>
        //                 <input type="text" id="update-nick" name="nick" autocomplete="off" value="${type == "casas" ? player.nick : player.name}"/>
        //                 <i class="fas fa-check-square"></i>
        //             </div>
        //         `
                
        //         td.querySelector("i.fa-check-square").addEventListener("click", async function(){
        //             await actualizarNick(player.id,td.querySelector("#update-nick").value, type == "casas" ? "player" : "team");
        //             td.innerHTML = td.querySelector("#update-nick").value;
        //         })

        //         td.querySelector("i.fa-times-circle").addEventListener("click", async function(){
        //             td.innerHTML = type == "casas" ? player.nick : player.name;
        //         })
        //     }
        //     })
        tr.appendChild(td);

        let eloTd = document.createElement("td");
        eloTd.innerHTML = player.elo || 2000-player.id;
        tr.appendChild(eloTd);

        body.appendChild(tr);
    })
    inv.textContent = acc.toString();
    leftTable.appendChild(body);
    // console.log(leftTable);
    // leftTable.innerHTML += "Holi";
    // console.log(leftTable);
}