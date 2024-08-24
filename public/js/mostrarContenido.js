async function loadBrackets(tipo, round = "normal") {
    let list = document.querySelector("#player-list");
    list.innerHTML = "";
    list.classList.remove("m16-octavos");
    list.classList.remove("m16-cuartos");
    list.classList.remove("m16-semis");
    list.classList.remove("m16-final");

    let nextButton = document.querySelector("#next");
    if (round != "normal") {
        nextButton.innerHTML = "Mostrar todo";

        if (round == "normal" || round == "octavos") {
            list.classList.add("m16-octavos");
        } else if (round == "cuartos"){
            list.classList.add("m16-cuartos");
        } else if (round == "semis"){
            list.classList.add("m16-semis");
        } else if (round == "final"){
            list.classList.add("m16-final");
        }
    }




    let octLeft = document.createElement("div");
    if (round == "normal" || round == "octavos") {
        octLeft.classList.add("oct-left");
        list.appendChild(octLeft);

        

        let octLeftTitle = document.createElement("div");
        octLeftTitle.innerHTML = "Octavos";
        octLeftTitle.classList.add("instance-titles");

        octLeftTitle.addEventListener("dblclick",()=>{
            console.log("visualizando octavos");
            loadBrackets("master-16", "octavos");
        })

        octLeft.appendChild(octLeftTitle);
    }

    let quarterLeft = document.createElement("div");
    if (round == "normal" || round == "octavos" || round == "cuartos") {
        quarterLeft.classList.add("quarter-left");
        list.appendChild(quarterLeft);

        
    
        let quarterLeftTitle = document.createElement("div");
        quarterLeftTitle.innerHTML = "Cuartos";
        quarterLeftTitle.classList.add("instance-titles");

        quarterLeftTitle.addEventListener("dblclick",()=>{
            console.log("visualizando cuartos");
            loadBrackets("master-16", "cuartos");
        })

        quarterLeft.appendChild(quarterLeftTitle);
    }

    let semiLeft = document.createElement("div");
    if (round == "normal" || round == "octavos" || round == "cuartos" || round == "semis") {
        semiLeft.classList.add("semi-left");
        list.appendChild(semiLeft);

        
    
        let semiLeftTitle = document.createElement("div");
        semiLeftTitle.innerHTML = "Semis";
        semiLeftTitle.classList.add("instance-titles");

        semiLeftTitle.addEventListener("dblclick",()=>{
            console.log("visualizando semis");
            loadBrackets("master-16", "semis");
        })

        semiLeft.appendChild(semiLeftTitle);
    }

    let final = document.createElement("div");
    if (round == "normal" || round == "octavos" || round == "cuartos" || round == "semis" || round == "final") {
        final.classList.add("final");
        list.appendChild(final);

        
    
        let finalTitle = document.createElement("div");
        finalTitle.innerHTML = "Final";
        finalTitle.classList.add("instance-titles");

        finalTitle.addEventListener("dblclick",()=>{
            console.log("visualizando final");
            loadBrackets("master-16", "final");
        })

        final.appendChild(finalTitle);
    }

    let imgBrackets = document.querySelector("#m16-brackets");
    if (round == "normal" || round == "octavos") {
        imgBrackets.setAttribute("src","/img/brackets-tirex2.png");
    } else if (round == "cuartos") {
        imgBrackets.setAttribute("src","/img/brackets-tirex2-cuartos.png");
    } else if (round == "semis") {
        imgBrackets.setAttribute("src","/img/brackets-tirex2-semis.png");
    } else if (round == "final") {
        imgBrackets.setAttribute("src","/img/brackets-tirex2-final.png");
    }


    let imgPictureLogo = document.createElement("picture");
    imgPictureLogo.classList.add("bracket-m16-logo");

    let imgLogo = document.createElement("img");
    imgLogo.src = "/img/this/master-16-final.png";
    imgLogo.alt = "Master 16";

    imgPictureLogo.appendChild(imgLogo);
    list.appendChild(imgPictureLogo);

    let semiRight = document.createElement("div");
    if (round == "normal" || round == "octavos" || round == "cuartos" || round == "semis") {
        semiRight.classList.add("semi-right");
        list.appendChild(semiRight);

        let semiRightTitle = document.createElement("div");
        semiRightTitle.innerHTML = "Semis";
        semiRightTitle.classList.add("instance-titles");

        semiRightTitle.addEventListener("dblclick",()=>{
            console.log("visualizando semis");
            loadBrackets("master-16", "semis");
        })

        semiRight.appendChild(semiRightTitle);
    }

    let quarterRight = document.createElement("div");
    if (round == "normal" || round == "octavos" || round == "cuartos") {
        quarterRight.classList.add("quarter-right");
        list.appendChild(quarterRight);

        let quarterRightTitle = document.createElement("div");
        quarterRightTitle.innerHTML = "Cuartos";
        quarterRightTitle.classList.add("instance-titles");

        quarterRightTitle.addEventListener("dblclick",()=>{
            console.log("visualizando cuartos");
            loadBrackets("master-16", "cuartos");
        })

        quarterRight.appendChild(quarterRightTitle);
    }

    let octRight = document.createElement("div");
    if (round == "normal" || round == "octavos") {
        octRight.classList.add("oct-right");
        list.appendChild(octRight);
    
        let octRightTitle = document.createElement("div");
        octRightTitle.innerHTML = "Octavos";
        octRightTitle.classList.add("instance-titles");

        octRightTitle.addEventListener("dblclick",()=>{
            console.log("visualizando octavos");
            loadBrackets("master-16", "octavos");
        })

        octRight.appendChild(octRightTitle);
    }

    // console.log(tipo);

    let torneos = JSON.parse(sessionStorage.getItem("data"));
    let torneo = {};
    if (tipo == "master-16") {
        torneo = torneos[tipo];
    } else if (tipo){
        torneo = torneos["12-casas"][tipo];
    }

    // console.log(torneo);

    // function buscarJugador(jugadores, id) {
    //     // let jugadores = JSON.parse(sessionStorage.getItem("jugadores"));
    //     return jugadores.find(jugador => jugador.id == id);
    // }

    

    torneo.matches.forEach(async (match,i) => {
        let matchDiv = document.createElement("div");
        matchDiv.classList.add("bracket-match");
        matchDiv.classList.add("match-"+i);

        // matchDiv.getAttribute

        // console.log(match);
        let span1 = document.createElement("span");
        span1.classList.add("bracket-player");
        span1.innerHTML = buscarJugador(torneo.players || torneo.teams, match.jugadorUno.id) ? buscarJugador(torneo.players || torneo.teams, match.jugadorUno.id).nick || buscarJugador(torneo.players || torneo.teams, match.jugadorUno.id).name : "A DEFINIR";

        if (tipo == "master-16" && match.jugadorUno.id) {
            let picture = document.createElement("picture");
            picture.classList.add("cont-team-logo");

            let logo1 = document.createElement("img");
            logo1.src = "/img/logos/" + (buscarJugador(torneo.teams, match.jugadorUno.id).logo !== null ? buscarJugador(torneo.teams, match.jugadorUno.id).logo : "default.png");
            logo1.classList.add("team-logos-brackets");
            picture.appendChild(logo1);

            span1.appendChild(picture);
        }
        // buscarJugador(torneo.teams, buscarPartida(torneo.matches, 1).jugadorUno.id).name : 1}${buscarPartida(torneo.matches, 1).jugadorUno.id ?  :  ""}

        let span1Result = document.createElement("span");
        span1Result.innerHTML = match.ganador ? match.jugadorUno.score : "-";
        span1Result.classList.add("match-score");
        span1.appendChild(span1Result);

        matchDiv.appendChild(span1);

        let span2 = document.createElement("span");
        span2.classList.add("bracket-player");
        span2.innerHTML = buscarJugador(torneo.players || torneo.teams, match.jugadorDos.id) ? buscarJugador(torneo.players || torneo.teams, match.jugadorDos.id).nick || buscarJugador(torneo.players || torneo.teams, match.jugadorDos.id).name : "A DEFINIR";

        if (tipo == "master-16" && match.jugadorDos.id) {
            let picture = document.createElement("picture");
            picture.classList.add("cont-team-logo");

            let logo2 = document.createElement("img");
            logo2.src = "/img/logos/" + (buscarJugador(torneo.teams, match.jugadorDos.id).logo !== null ? buscarJugador(torneo.teams, match.jugadorDos.id).logo : "default.png");
            logo2.classList.add("team-logos-brackets");
            picture.appendChild(logo2);

            span2.appendChild(picture)
        }

        let span2Result = document.createElement("span");
        span2Result.innerHTML = match.ganador ? match.jugadorDos.score : "-";
        span2Result.classList.add("match-score");
        span2.appendChild(span2Result);

        matchDiv.appendChild(span2);



        if (i < 8) {
            matchDiv.style.height = "16vh";
        } else if (i < 12){
            matchDiv.style.height = "26vh";
        } else if (i < 14){
            matchDiv.style.height = "47vh";
        }

        switch (i) {
            case 0:
            case 1:
            case 2:
            case 3:
                span1.classList.add("left-match");
                span2.classList.add("left-match");
                octLeft.appendChild(matchDiv);
                break;
            case 4:
            case 5:
            case 6:
            case 7:
                span1.classList.add("right-match");
                span2.classList.add("right-match");
                octRight.appendChild(matchDiv);
                break;
            case 8:
            case 9:
                span1.classList.add("left-match");
                span2.classList.add("left-match");
                quarterLeft.appendChild(matchDiv);
                break;
            case 10:
            case 11:
                span1.classList.add("right-match");
                span2.classList.add("right-match");
                quarterRight.appendChild(matchDiv);
                break;
            case 12:
                span1.classList.add("left-match");
                span2.classList.add("left-match");
                semiLeft.appendChild(matchDiv);
                break;
            case 13:
                span1.classList.add("right-match");
                span2.classList.add("right-match");
                semiRight.appendChild(matchDiv);
                break;
            default:
                span1.classList.add("left-match");
                span2.classList.add("right-match");
                final.appendChild(matchDiv);
                break;
        }

        let data = document.createElement("ul");
        let etapa;
        switch (match.etapa) {
            case 1:
                etapa = "OCTAVOS DE FINAL";
                break;
            case 2:
                etapa = "CUARTOS DE FINAL";
                break;
            case 3:
                etapa = "SEMIFINAL";
                break;
            case 4:
                etapa = "FINAL";
                break;
            default:
                break;
        }

        // console.log(etapa);

        // data.innerHTML = `
        //     <li class="title">${etapa}</li>
        //     <li>${verifyAdmin() ? "<i class='fa-solid fa-pen data-edit edit-civdraft-"+match.id+"'></i>" : ""} </li>
        //     <li>${verifyAdmin() ? "<i class='fa-solid fa-pen data-edit edit-mapdraft-"+match.id+"'></i>" : ""} <a href=${"match.caracteristicas}>."map_draftMp_draft+"</a>" || "No hay"}</li>
        //     <li>${verifyAdmin() ? "<i class='fa-solid fa-pen data-edit edit-schedule-"+match.id+"'></i>" : ""} ${scheduleString}</li>
        //     <li class="edit-result-${match.id}">Editar resultado</li>
        // `;

        let firstLi = document.createElement('li');
        firstLi.classList.add("title");
        firstLi.innerHTML += etapa;
        data.appendChild(firstLi);
        
        // let civLi = document.createElement('li');
        // if (verifyAdmin()) {
        //     civLi.addEventListener('dblclick', function() {
        //         // console.log("Click en eso");
        //         console.log("Click");
        //         civLi.innerHTML = "";

        //         let xButton = document.createElement('i');
        //         xButton.classList.add("fa-solid");
        //         xButton.classList.add("fa-times-circle");
        //         xButton.addEventListener('click', ()=>{
        //             civLi.innerHTML = match.caracteristicas.civ_draft ?"<span>Civ draft</span>" : "No hay draft de civs";
        //         });
        //         civLi.appendChild(xButton);
                
        //         let civInput = document.createElement('input');
        //         civLi.appendChild(civInput);

        //         let checkButton = document.createElement('i');
        //         checkButton.classList.add("fa-solid");
        //         checkButton.classList.add("fa-check-square");
        //         checkButton.addEventListener('click', ()=>{
        //             if (civInput.value.includes("https://aoe2cm.net/")) {
        //                 actualizarInfoPartida('civ_draft', civInput.value, match.id);
        //             } else {
        //                 actualizarInfoPartida('civ_draft', '', match.id);
        //             }
        //         });
        //         civLi.appendChild(checkButton);
        //     })
        // }
        // civLi.innerHTML += match.caracteristicas.civ_draft ?"<span>Civ draft</span>" : "No hay draft de civs";
        // if (match.caracteristicas.civ_draft) {
        //     console.log("draft");
        //     let draftId = match.caracteristicas.civ_draft.split("https://aoe2cm.net/draft/")[1].replaceAll("/","");
        //     let draft = await fetch(`https://aoe2cm.net/api/draft/${draftId}`);
        //     draft = await draft.json();
            
        //     let draftResults = {
        //         picks: draft.events.filter(eve => eve.actionType == "pick"),
        //         bans: draft.events.filter(eve => eve.actionType == "ban")
        //     };

        //     civLi.addEventListener("click",async ()=>{
        //         let draftBackground = document.createElement("div");
        //         draftBackground.classList.add("draft-background");
                
        //         let draftBox = document.createElement("div");
        //         draftBox.classList.add("draft-box");
        //         draftBackground.appendChild(draftBox);

        //         let draftTitle = document.createElement("h6");
        //         draftTitle.innerHTML = draft.preset.name;
        //         draftBox.appendChild(draftTitle);

        //         let draftOverlay = document.createElement("div");
        //         draftOverlay.classList.add("draft-overlay");
        //         console.log(draft);


        //         let hostDiv = document.createElement("div");
        //         hostDiv.classList.add("draft-host");
        //         {
        //             let hostName = document.createElement("span");
        //             hostName.classList.add("draft-host-name");
        //             hostName.innerHTML = draft.nameHost;
        //             hostDiv.appendChild(hostName);

        //             let hostPicks = document.createElement("ul");
        //             hostPicks.classList.add("draft-host-picks");
        //             for (let i = 0; i < draftResults.picks.length; i++) {
        //                 const turn = draftResults.picks[i];
        //                 if (turn.player == "HOST") {
        //                     let pickLi = document.createElement("li");

        //                     let pickB = document.createElement("b");
        //                     pickB.innerHTML = i+1;
        //                     pickLi.appendChild(pickB);

        //                     let pickImg = document.createElement("img");
        //                     pickImg.src = `https://aoe2cm.net/images/civemblems/${turn.chosenOptionId.toLowerCase()}.png`;
        //                     pickLi.appendChild(pickImg);

        //                     let pickTitle = document.createElement("span");
        //                     pickTitle.innerHTML = buscarCiv(turn.chosenOptionId);
        //                     pickLi.appendChild(pickTitle);

        //                     hostPicks.appendChild(pickLi);
        //                 }
        //             }
        //             hostDiv.appendChild(hostPicks);

        //             let hostBans = document.createElement("ul");
        //             hostBans.classList.add("draft-host-bans");
        //             for (let i = 0; i < draftResults.bans.length; i++) {
        //                 const turn = draftResults.bans[i];
        //                 if (turn.player == "HOST") {
        //                     let banLi = document.createElement("li");

        //                     let banB = document.createElement("b");
        //                     banB.innerHTML = i+1;
        //                     banLi.appendChild(banB);

        //                     let banImg = document.createElement("img");
        //                     banImg.src = `https://aoe2cm.net/images/civemblems/${turn.chosenOptionId.toLowerCase()}.png`;
        //                     banLi.appendChild(banImg);

        //                     let banTitle = document.createElement("span");
        //                     banTitle.innerHTML = buscarCiv(turn.chosenOptionId);
        //                     banLi.appendChild(banTitle);

        //                     hostBans.appendChild(banLi);
        //                 }
        //             }
        //             hostDiv.appendChild(hostBans);
        //         }
        //         draftOverlay.appendChild(hostDiv);

        //         let guestDiv = document.createElement("div");
        //         guestDiv.classList.add("draft-guest");
        //         {
        //             let guestName = document.createElement("span");
        //             guestName.classList.add("draft-guest-name");
        //             guestName.innerHTML = draft.nameGuest;
        //             guestDiv.appendChild(guestName);

        //             let guestPicks = document.createElement("ul");
        //             guestPicks.classList.add("draft-guest-picks");
        //             for (let i = 0; i < draftResults.picks.length; i++) {
        //                 const turn = draftResults.picks[i];
        //                 if (turn.player == "GUEST") {
        //                     let pickLi = document.createElement("li");

        //                     let pickB = document.createElement("b");
        //                     pickB.innerHTML = i+1;
        //                     pickLi.appendChild(pickB);

        //                     let pickImg = document.createElement("img");
        //                     pickImg.src = `https://aoe2cm.net/images/civemblems/${turn.chosenOptionId.toLowerCase()}.png`;
        //                     pickLi.appendChild(pickImg);

        //                     let pickTitle = document.createElement("span");
        //                     pickTitle.innerHTML = buscarCiv(turn.chosenOptionId);
        //                     pickLi.appendChild(pickTitle);

        //                     guestPicks.appendChild(pickLi);
        //                 }
        //             }
        //             guestDiv.appendChild(guestPicks);

        //             let guestBans = document.createElement("ul");
        //             guestBans.classList.add("draft-guest-bans");
        //             for (let i = 0; i < draftResults.bans.length; i++) {
        //                 const turn = draftResults.bans[i];
        //                 if (turn.player == "GUEST" && turn.actionType == "ban") {
        //                     let banLi = document.createElement("li");

        //                     let banB = document.createElement("b");
        //                     banB.innerHTML = i+1;
        //                     banLi.appendChild(banB);

        //                     let banImg = document.createElement("img");
        //                     banImg.src = `https://aoe2cm.net/images/civemblems/${turn.chosenOptionId.toLowerCase()}.png`;
        //                     banLi.appendChild(banImg);

        //                     let banTitle = document.createElement("span");
        //                     banTitle.innerHTML = buscarCiv(turn.chosenOptionId);
        //                     banLi.appendChild(banTitle);

        //                     guestBans.appendChild(banLi);
        //                 }
        //             }
        //             guestDiv.appendChild(guestBans);
        //         }
        //         draftOverlay.appendChild(guestDiv);

        //         draftBox.appendChild(draftOverlay);

        //         document.getElementById("main-cont").appendChild(draftBackground);
        //         // console.log("Hover");
        //     });
        // }
        // data.appendChild(civLi);
        let civLi = document.createElement('li');
        if (verifyAdmin()) {
            civLi.addEventListener('dblclick', function() {
                // console.log("Click en eso");
                console.log("Click");
                civLi.innerHTML = "";

                let xButton = document.createElement('i');
                xButton.classList.add("fa-solid");
                xButton.classList.add("fa-times-circle");
                xButton.addEventListener('click', ()=>{
                    civLi.innerHTML = match.caracteristicas.civ_draft ?"<a target='_blank' href="+match.caracteristicas.civ_draft+">Civ draft</a>" : "No hay draft de civs";
                });
                civLi.appendChild(xButton);
                
                let civInput = document.createElement('input');
                civLi.appendChild(civInput);

                let checkButton = document.createElement('i');
                checkButton.classList.add("fa-solid");
                checkButton.classList.add("fa-check-square");
                checkButton.addEventListener('click', ()=>{
                    if (civInput.value.includes("https://aoe2cm.net/")) {
                        actualizarInfoPartida('civ_draft', civInput.value, match.id, "leo");
                    } else {
                        actualizarInfoPartida('civ_draft', '', match.id, "leo");
                    }
                });
                civLi.appendChild(checkButton);
            })
        }
        civLi.innerHTML += match.caracteristicas.civ_draft ?"<a target='_blank' href="+match.caracteristicas.civ_draft+">Civ draft</a>" : "No hay draft de civs";
        data.appendChild(civLi);


        // let mapLi = document.createElement('li');
        // if (verifyAdmin()) {
        //     mapLi.addEventListener('dblclick', function() {
        //         // console.log("Click en eso");
        //         console.log("Click");
        //         mapLi.innerHTML = "";

        //         let xButton = document.createElement('i');
        //         xButton.classList.add("fa-solid");
        //         xButton.classList.add("fa-times-circle");
        //         xButton.addEventListener('click', ()=>{
        //             mapLi.innerHTML = match.caracteristicas.map_draft ?"<a target='_blank' href="+match.caracteristicas.map_draft+">Map draft</a>" : "No hay draft de mapas";
        //         })
        //         mapLi.appendChild(xButton);
                
        //         let mapInput = document.createElement('input');
        //         mapLi.appendChild(mapInput);

        //         let checkButton = document.createElement('i');
        //         checkButton.classList.add("fa-solid");
        //         checkButton.classList.add("fa-check-square");
        //         checkButton.addEventListener('click', ()=>{
        //             if (mapInput.value.includes("https://aoe2cm.net/")) {
        //                 actualizarInfoPartida('map_draft', mapInput.value, match.id);
        //             } else {
        //                 actualizarInfoPartida('map_draft', '', match.id);
        //             }
        //         });
        //         mapLi.appendChild(checkButton);
        //     })
        // }
        // mapLi.innerHTML += match.caracteristicas.map_draft ?"<a target='_blank' href="+match.caracteristicas.map_draft+">Map draft</a>" : "No hay draft de mapas";
        // data.appendChild(mapLi);
        let mapLi = document.createElement('li');
        if (verifyAdmin()) {
            mapLi.addEventListener('dblclick', function() {
                // console.log("Click en eso");
                console.log("Click");
                mapLi.innerHTML = "";

                let xButton = document.createElement('i');
                xButton.classList.add("fa-solid");
                xButton.classList.add("fa-times-circle");
                xButton.addEventListener('click', ()=>{
                    mapLi.innerHTML = match.caracteristicas.map_draft ?"<a target='_blank' href="+match.caracteristicas.map_draft+">Map draft</a>" : "No hay draft de mapas";
                })
                mapLi.appendChild(xButton);
                
                let mapInput = document.createElement('input');
                mapLi.appendChild(mapInput);

                let checkButton = document.createElement('i');
                checkButton.classList.add("fa-solid");
                checkButton.classList.add("fa-check-square");
                checkButton.addEventListener('click', ()=>{
                    if (mapInput.value.includes("https://aoe2cm.net/")) {
                        actualizarInfoPartida('map_draft', mapInput.value, match.id, "leo");
                    } else {
                        actualizarInfoPartida('map_draft', '', match.id, "leo");
                    }
                });
                mapLi.appendChild(checkButton);
            })
        }
        mapLi.innerHTML += match.caracteristicas.map_draft ?"<a target='_blank' href="+match.caracteristicas.map_draft+">Map draft</a>" : "No hay draft de mapas";
        data.appendChild(mapLi);

        let scheduleLi = document.createElement('li');
        let scheduleTime
        let scheduleString = "-"

        function obtenerFechaHoraActual() {
            return new Date();
          }
          
          function calcularTiempoTranscurrido(fechaHoraObjetivo) {
            const fechaHoraActual = obtenerFechaHoraActual();
            const diferenciaMilisegundos = fechaHoraObjetivo.getTime() - fechaHoraActual.getTime();
            const segundos = diferenciaMilisegundos / 1000;
            const minutos = segundos / 60;
            const horas = Math.floor(minutos / 60);
            const minutosRestantes = minutos % 60;
          
            if (fechaHoraObjetivo < fechaHoraActual) {
              return {
                transcurrido: {
                  horas,
                  minutos: minutosRestantes
                }
              };
            } else {
              return {
                restante: {
                  horas,
                  minutos: minutosRestantes
                }
              };
            }
          }

        if (match.caracteristicas.horario) {
            scheduleTime = new Date(match.caracteristicas.horario);
            // mes+1 < 10 ? '0'+(mes+1) : mes+1
            // console.log(calcularTiempoTranscurrido(scheduleTime));
            let tiempoPara = calcularTiempoTranscurrido(scheduleTime);
            scheduleString = `${scheduleTime.getDate() < 10 ? '0'+(scheduleTime.getDate()) : scheduleTime.getDate()}-${scheduleTime.getMonth()+1 < 10 ? '0'+(scheduleTime.getMonth()+1) : scheduleTime.getMonth()+1} a las ${scheduleTime.getHours()}:${scheduleTime.getMinutes()}${tiempoPara.restante ? " (En "+Math.trunc(tiempoPara.restante.horas)+":"+(Math.trunc(tiempoPara.restante.minutos) < 10 ? "0"+Math.trunc(tiempoPara.restante.minutos) : Math.trunc(tiempoPara.restante.minutos))+"h"+(Math.trunc(tiempoPara.restante.horas) > 1 ? "s" : "")+")" : ""}`
            // console.log(scheduleString);

            function obtenerDiasSemanaConFecha(fechaObjetivo) {
                // Obtener fecha de inicio (domingo de la semana objetivo)
                const fechaInicio = new Date(fechaObjetivo.getFullYear(), fechaObjetivo.getMonth(), fechaObjetivo.getDate() - (fechaObjetivo.getDay() || 7));
              
                // Crear array para almacenar los días de la semana
                const diasSemana = [];
              
                // Recorrer los 7 días de la semana
                for (let i = 0; i < 7; i++) {
                  const fechaActual = new Date(fechaInicio.getTime() + i * 24 * 60 * 60 * 1000);
                  const dia = {
                    fecha: fechaActual.toLocaleDateString(),
                    diaSemana: fechaActual.toLocaleDateString('es-ES', { weekday: 'long' })
                  };
                  diasSemana.push(dia);
                }
              
                // Devolver array de días de la semana
                return diasSemana;
              }
              
              // Ejemplo de uso
              const fechaObjetivo = scheduleTime; // 7 de Mayo de 2024
              const diasSemana = obtenerDiasSemanaConFecha(fechaObjetivo);
              console.log(diasSemana);
        }
        if (verifyAdmin()) {
            scheduleLi.addEventListener('dblclick', function() {
                // console.log("Click en eso");
                console.log("Click");
                scheduleLi.innerHTML = "";

                let xButton = document.createElement('i');
                xButton.classList.add("fa-solid");
                xButton.classList.add("fa-times-circle");
                xButton.addEventListener('click', ()=>{
                    scheduleLi.innerHTML = `${scheduleString}`;
                })
                scheduleLi.appendChild(xButton);
                
                let scheduleInput = document.createElement('input');
                scheduleInput.type = "datetime-local";
                if (match.caracteristicas.horario) {
                    scheduleInput.value = match.caracteristicas.horario;
                }
                scheduleInput.addEventListener("input", ()=>{
                    console.log(scheduleInput.value);
                })
                scheduleLi.appendChild(scheduleInput);

                let checkButton = document.createElement('i');
                checkButton.classList.add("fa-solid");
                checkButton.classList.add("fa-check-square");
                checkButton.addEventListener('click', ()=>{
                    actualizarInfoPartida('horario', scheduleInput.value, match.id, "leo");
                });
                scheduleLi.appendChild(checkButton);
            })
        }
        scheduleLi.innerHTML += `${scheduleString}`;
        data.appendChild(scheduleLi);

        // function resetSchedule(){
            
        // }

        if (verifyAdmin()) {
            let scoreLi = document.createElement('li');
            scoreLi.innerHTML += `Guardar resultado`;

            let actualScore = {
                jugadorUno: match.jugadorUno.score,
                jugadorDos: match.jugadorDos.score
            }

            function setScore(player, func) {
                if (player == 1) {
                    if (func == "add") {
                        actualScore.jugadorUno++;
                    } else if (func == "remove") {
                        actualScore.jugadorUno--;
                    }
                    span1Result.innerHTML = actualScore.jugadorUno;
                } else if (player == 2) {
                    if (func == "add") {
                        actualScore.jugadorDos++;
                    } else if (func == "remove") {
                        actualScore.jugadorDos--;
                    }
                    span2Result.innerHTML = actualScore.jugadorDos;
                } else {
                    span1Result.innerHTML = actualScore.jugadorUno;
                    span2Result.innerHTML = actualScore.jugadorDos;
                }
            }

            let isActive = false;
            scoreLi.addEventListener('click', function() {
                if (match.jugadorUno.id && match.jugadorDos.id) {
                    if (!isActive) {
                        isActive = true;
                        span1.innerHTML = buscarJugador(torneo.players || torneo.teams, match.jugadorUno.id) ? buscarJugador(torneo.players || torneo.teams, match.jugadorUno.id).nick || buscarJugador(torneo.players || torneo.teams, match.jugadorUno.id).name : "A DEFINIR";
                        span1.appendChild(span1Result);
                        setScore();
                        // console.log("Click en eso");
                        // console.log("Click");
                        // scoreLi.innerHTML = "";
                        console.log({
                            partidas: tempPartidas,
                            jugadores: tempJugadores,
                        });

                        let spanScore1 = document.createElement('span');
                        spanScore1.classList.add("modify-score");
                        let spanScore1ArrowUp = document.createElement('i');
                        spanScore1ArrowUp.classList.add("fa-solid");
                        spanScore1ArrowUp.classList.add("fa-sort-up");
                        spanScore1ArrowUp.addEventListener('click', () => {
                            setScore(1, "add");
                        });
                        spanScore1.appendChild(spanScore1ArrowUp);

                        let spanScore1ArrowDown = document.createElement('i');
                        spanScore1ArrowDown.classList.add("fa-solid");
                        spanScore1ArrowDown.classList.add("fa-sort-down");
                        spanScore1ArrowDown.addEventListener('click', () => {
                            setScore(1, "remove");
                        });
                        spanScore1.appendChild(spanScore1ArrowDown);
                        span1.appendChild(spanScore1);

                        span2.innerHTML = buscarJugador(torneo.players || torneo.teams, match.jugadorDos.id) ? buscarJugador(torneo.players || torneo.teams, match.jugadorDos.id).nick || buscarJugador(torneo.players || torneo.teams, match.jugadorDos.id).name : "A DEFINIR";
                        span2.appendChild(span2Result);
                        setScore();
                        // console.log("Click en eso");
                        // console.log("Click");
                        // scoreLi.innerHTML = "";
                        console.log({
                            partidas: tempPartidas,
                            jugadores: tempJugadores,
                        });

                        let spanScore2 = document.createElement('span');
                        spanScore2.classList.add("modify-score");
                        let spanScore2ArrowUp = document.createElement('i');
                        spanScore2ArrowUp.classList.add("fa-solid");
                        spanScore2ArrowUp.classList.add("fa-sort-up");
                        spanScore2ArrowUp.addEventListener('click', () => {
                            setScore(2, "add");
                        });
                        spanScore2.appendChild(spanScore2ArrowUp);

                        let spanScore2ArrowDown = document.createElement('i');
                        spanScore2ArrowDown.classList.add("fa-solid");
                        spanScore2ArrowDown.classList.add("fa-sort-down");
                        spanScore2ArrowDown.addEventListener('click', () => {
                            setScore(2, "remove");
                        });
                        spanScore2.appendChild(spanScore2ArrowDown);
                        span2.appendChild(spanScore2);
                    } else {
                        isActive = false;
                        actualizarScorePartida(match.id, actualScore, tipo);
                    }
                }
            })

            data.appendChild(scoreLi);
        }

        matchDiv.appendChild(data);

        matchDiv.addEventListener('click', (e) => {
            matchDiv.classList.add("show");
        })

        if (i == torneo.matches.length - 1) {
            let bracketDiv = document.querySelector("#brackets");

            let championDiv = document.createElement("div");
            championDiv.classList.add("final-display");

            let championSpan = document.createElement("span");
            championDiv.appendChild(championSpan);
            
            bracketDiv.appendChild(championDiv);

            championSpan.innerHTML = "asd";

            if (match.ganador) {
                championSpan.innerHTML = buscarJugador(torneo.players || torneo.teams, match.ganador).nick;
                championDiv.classList.add("display-show");
            } else {
                championDiv.classList.remove("display-show");
            }

        }

        // list.appendChild(matchDiv);
    })
}

async function cargarDoceCasas() {
    let torneos = JSON.parse(sessionStorage.getItem("data"));
    let torneo = {};
    torneo = torneos["12-casas"];
    console.log(torneo);
    let scores = [];
    Object.values(torneo).forEach((minitorneo) => {
        // console.log("Pasando por "+minitorneo.name);
        
        Object.values(minitorneo.prizepool).forEach(prize => {
            // if (prize.player) {
            //     console.log("Tenemos un ganador");
            // } else {
            //     console.log("Nada");
            // }
            
            // scores.forEach((score) => {
                
            // })
            if (prize.player) {
                if (scores.find(scorer => scorer.nick.toLowerCase().replaceAll(" ","") == prize.player.toLowerCase().replaceAll(" ",""))) {
                    scores = scores.map(scorer =>{
                        if (scorer.nick == prize.player) {
                            scorer.points += parseInt(prize.points);
                        } 
                        return scorer;
                    })
                } else {
                    scores.push({
                        nick: prize.player,
                        points: parseInt(prize.points)
                    });
                }
            }
        })
    })
    scores.sort(function(a, b) {
        return b.points - a.points;
    })

    let tabla = document.querySelector(".dc-espacio-usable ul");
    // console.log(scores);
    scores.forEach((score,i) => {
        tabla.innerHTML += `<li><span class="lugar">${i+1}°</span>${score.nick}<span class="puntos">${score.points}</span></li>`;
    })
    
    let enlaces = document.querySelectorAll(".torneo-tarjeta");
    enlaces.forEach((enlace) => {
        enlace.classList.remove("casa-status0");
        enlace.classList.remove("casa-status1");
        enlace.classList.remove("casa-status2");
        if(torneo[enlace.dataset.name]){
            enlace.classList.add(`casa-status${torneo[enlace.dataset.name].status}`);
            if (torneo[enlace.dataset.name].status == 2) {
                enlace.setAttribute("href","#");
            }
        } else {
            enlace.classList.add("casa-status2");
        }

        if (verifyAdmin()) {
            enlace.addEventListener("contextmenu",(e) => {
                // console.log(enlace.dataset.name);
                let torneoSeleccionado = torneo[enlace.dataset.name];
                if (torneoSeleccionado) {
                    establecerCasaActiva(torneoSeleccionado.id, torneos);
                    mostrarContenido('/12-casas');
                }
            })
        }
    })
}

async function mostrarContenido(ruta) {    
    let mainLogo = document.querySelector("#main-logo");
    mainLogo.style.opacity = 1;

    let modifiedBackground = document.querySelector(".modified-background");

    let backButton = document.querySelector("#back");
    let nextButton = document.querySelector("#next");

    let header = document.querySelector("header");

    let matches;

    let contenido = ``;
    // cargarTorneo(data.data.torneos, window.location.pathname);
    console.log("Entraste a...", ruta);
    switch (ruta) {
        case "/":
            // console.log("Ruta principal");
            modifiedBackground.classList.remove("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.classList.remove("doce-casas-simple");
            modifiedBackground.innerHTML = "";
            header.classList.remove("master-16");
            header.classList.remove("doce-casas");
            

            let homeDiv = document.createElement("div");
            homeDiv.classList.add("home-div");

            backButton.innerHTML = "";
            backButton.setAttribute("href","/");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/");

            let enlacePrincipal = document.createElement("a");
            enlacePrincipal.classList.add("main-link-a");
            enlacePrincipal.classList.add("main-link-tirex");
            enlacePrincipal.setAttribute("href", "/");
            
            let logoPrincipal = document.createElement("img");
            logoPrincipal.classList.add("homepage-nav-logo");
            logoPrincipal.classList.add("homepage-main-logo");
            logoPrincipal.setAttribute("src","/img/this/ti-rex-final.png");
            enlacePrincipal.appendChild(logoPrincipal);

            homeDiv.appendChild(enlacePrincipal);
            
            let enlace12Casas = document.createElement("a");
            enlace12Casas.classList.add("main-link-12-casas");
            enlace12Casas.classList.add("main-link-a");
            enlace12Casas.setAttribute("title", "Proximamente...");
            if (verifyAdmin()) {
                enlace12Casas.setAttribute("href", "/12-casas");
            }
            
            let logo12Casas = document.createElement("img");
            logo12Casas.classList.add("homepage-nav-logo");
            logo12Casas.setAttribute("src","/img/this/12-casas-final-prox.png");
            enlace12Casas.appendChild(logo12Casas);

            homeDiv.appendChild(enlace12Casas);

            let enlaceMaster16 = document.createElement("a");
            enlaceMaster16.classList.add("main-link-master-16");
            enlaceMaster16.classList.add("main-link-a");
            enlaceMaster16.setAttribute("href", "/master-16");

            let logoMaster16 = document.createElement("img");
            logoMaster16.classList.add("homepage-nav-logo");
            logoMaster16.setAttribute("src","/img/this/master-16-final.png");
            enlaceMaster16.appendChild(logoMaster16);
            
            homeDiv.appendChild(enlaceMaster16);
            
            mainLogo.style.opacity = 0;
            document.getElementById("main-cont").innerHTML = homeDiv.outerHTML;

            let contSpan = document.createElement("span");
            contSpan.classList.add("publi");

            let firstText = document.createElement("span");
            firstText.innerHTML = "Página web creada por ";
            contSpan.appendChild(firstText);

            let secondText = document.createElement("a");
            secondText.innerHTML = "Aylen Martinez";
            secondText.href = "https://linktr.ee/LuluAylen00";
            secondText.classList.add("main-links");
            secondText.setAttribute("target","_blank");
            contSpan.appendChild(secondText);

            let thirdText = document.createElement("span");
            thirdText.innerHTML = " | Diseños realizados por ";
            contSpan.appendChild(thirdText);

            let fourthText = document.createElement("a");
            fourthText.innerHTML = "Conci Disegno";
            fourthText.href = "https://www.instagram.com/conci_disegno_/";
            fourthText.classList.add("main-links");
            fourthText.setAttribute("target","_blank");
            contSpan.appendChild(fourthText);
            document.getElementById("main-cont").appendChild(contSpan);

            actualizarLinks();
            break;
        case "/master-16":{
            modifiedBackground.classList.add("active");
            header.classList.add("master-16");
            modifiedBackground.classList.add("master-16");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.classList.remove("doce-casas-simple");
            modifiedBackground.innerHTML = "";
            mainLogo.style.opacity = 1;
            let tipo = "master-16";
    
            let torneo = buscarTorneo(tipo);
            
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/");

            nextButton.innerHTML = "Brackets >";
            nextButton.setAttribute("href","/master-16/brackets");

            contenido = `
            <div id="left-bar" class="table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                    <div id="table-space">
                        <table id="seed-table" class="table table-striped"></table>
                    </div>
                </div>
                <div id="main">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">1${buscarPartida(torneo.matches, 1).jugadorUno.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 1).jugadorUno.id).name : ""}${buscarPartida(torneo.matches, 1).jugadorUno.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 1).jugadorUno.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 1).jugadorUno.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                            <span id="slot-9">16${buscarPartida(torneo.matches, 1).jugadorDos.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 1).jugadorDos.id).name : ""}${buscarPartida(torneo.matches, 1).jugadorDos.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 1).jugadorDos.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 1).jugadorDos.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">9${buscarPartida(torneo.matches, 2).jugadorUno.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 2).jugadorUno.id).name : ""}${buscarPartida(torneo.matches, 2).jugadorUno.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 2).jugadorUno.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 2).jugadorUno.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                            <span id="slot-13">8${buscarPartida(torneo.matches, 2).jugadorDos.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 2).jugadorDos.id).name : ""}${buscarPartida(torneo.matches, 2).jugadorDos.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 2).jugadorDos.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 2).jugadorDos.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">5${buscarPartida(torneo.matches, 3).jugadorUno.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 3).jugadorUno.id).name : ""}${buscarPartida(torneo.matches, 3).jugadorUno.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 3).jugadorUno.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 3).jugadorUno.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                            <span id="slot-11">12${buscarPartida(torneo.matches, 3).jugadorDos.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 3).jugadorDos.id).name : ""}${buscarPartida(torneo.matches, 3).jugadorDos.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 3).jugadorDos.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 3).jugadorDos.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">13${buscarPartida(torneo.matches, 4).jugadorUno.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 4).jugadorUno.id).name : ""}${buscarPartida(torneo.matches, 4).jugadorUno.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 4).jugadorUno.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 4).jugadorUno.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                            <span id="slot-15">4${buscarPartida(torneo.matches, 4).jugadorDos.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 4).jugadorDos.id).name : ""}${buscarPartida(torneo.matches, 4).jugadorDos.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 4).jugadorDos.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 4).jugadorDos.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                        </div>
                    </div>
                    
                    <picture class="picture-main-master-16">
                        <img class="logo-main-master-16" src="/img/this/master-16-final.png" />
                    </picture>
                    <img src="/img/this/fondo-master16-bracket.png" />
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">3${buscarPartida(torneo.matches, 5).jugadorUno.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 5).jugadorUno.id).name : ""}${buscarPartida(torneo.matches, 5).jugadorUno.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 5).jugadorUno.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 5).jugadorUno.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                            <span id="slot-10">14${buscarPartida(torneo.matches, 5).jugadorDos.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 5).jugadorDos.id).name : ""}${buscarPartida(torneo.matches, 5).jugadorDos.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 5).jugadorDos.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 5).jugadorDos.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">6${buscarPartida(torneo.matches, 6).jugadorUno.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 6).jugadorUno.id).name : ""}${buscarPartida(torneo.matches, 6).jugadorUno.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 6).jugadorUno.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 6).jugadorUno.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                            <span id="slot-14">11${buscarPartida(torneo.matches, 6).jugadorDos.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 6).jugadorDos.id).name : ""}${buscarPartida(torneo.matches, 6).jugadorDos.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 6).jugadorDos.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 6).jugadorDos.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">7${buscarPartida(torneo.matches, 7).jugadorUno.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 7).jugadorUno.id).name : ""}${buscarPartida(torneo.matches, 7).jugadorUno.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 7).jugadorUno.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 7).jugadorUno.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                            <span id="slot-12">10${buscarPartida(torneo.matches, 7).jugadorDos.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 7).jugadorDos.id).name : ""}${buscarPartida(torneo.matches, 7).jugadorDos.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 7).jugadorDos.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 7).jugadorDos.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">15${buscarPartida(torneo.matches, 8).jugadorUno.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 8).jugadorUno.id).name : ""}${buscarPartida(torneo.matches, 8).jugadorUno.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 8).jugadorUno.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 8).jugadorUno.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                            <span id="slot-16">2${buscarPartida(torneo.matches, 8).jugadorDos.id ? " - " + buscarJugador(torneo.teams, buscarPartida(torneo.matches, 8).jugadorDos.id).name : ""}${buscarPartida(torneo.matches, 8).jugadorDos.id ? "<img src='/img/logos/"+ `${ buscarJugador(torneo.teams, buscarPartida(torneo.matches, 8).jugadorDos.id).logo ? buscarJugador(torneo.teams, buscarPartida(torneo.matches, 8).jugadorDos.id).logo : 'default.png'}` + "'></img>" :  ""}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.classList.add("master-16");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);
    
                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.teams, rival).name : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.name.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.name}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "master-16")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.teams.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.name}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "master-16");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })
    
            loadLeftBar(torneo.teams, "master-16");
    
            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")
    
                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);
    
                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");

                            let image = "default.png";

                            if (actual[0].toLowerCase().includes("xever")) {
                                image = "xever.png";
                            } else if (actual[0].toLowerCase().includes("darkside")) {
                                image = "ds.png";
                            } else if (actual[0].toLowerCase().includes("dumbo")) {
                                image = "dumbo.png";
                            } else if (actual[0].toLowerCase().includes("zz")) {
                                image = "zz.png";
                            } else if (actual[0].toLowerCase().includes("dghir")) {
                                image = "dghir.png";
                            } else if (actual[0].toLowerCase().includes("tm")) {
                                image = "tm.png";
                            } else if (actual[0].toLowerCase().includes("solido")) {
                                image = "s2.png";
                            } else if (actual[0].toLowerCase().includes("neolib")) {
                                image = "neo.png";
                            } else if (actual[0].toLowerCase().includes("corp")) {
                                image = "corp.png";
                            } else if (actual[0].toLowerCase().includes("arg")) {
                                image = "arg.png";
                            } else if (actual[0].toLowerCase().includes("golpe bajo")) {
                                image = "golpebajo.png";
                            };

                            return {
                                "id": i+1,
                                "name": actual[0],
                                "elo": actual[1],
                                "players": [],
                                "logo": image,
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        if (newList.length > 15) {
                            newList = newList.slice(0,16);
                        }
                        actualizarListaJugadores(newList, "master-16");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);
    
                    document.getElementById("main-cont").appendChild(loadPlayersDiv);
    
                })
                
            }
            actualizarLinks();
            break;
            // Final master-16
            
        }
        case "/master-16/brackets":{
            // console.log("12 Casas - Leo");
            header.classList.add("master-16");
            modifiedBackground.classList.add("active");
            modifiedBackground.classList.add("master-16");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.classList.remove("doce-casas-simple");
            modifiedBackground.innerHTML = "";
            mainLogo.style.opacity = 1;

            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/master-16");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/master-16/brackets");
            
            contenido = `
                <div id="brackets">
                    <img id="m16-brackets" src="/img/brackets-tirex2.png">
                    <div id="player-list">
                    </div>
                    <!-- <a id="edit-bracket" href="/master-16"><i class="fa-solid fa-pen"></i></a> -->
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("master-16");
            actualizarLinks();
            break;
        }
        case "/12-casas":
            // console.log("12 Casas");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.remove("doce-casas-simple");
            modifiedBackground.innerHTML = "";

            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            let torneos = JSON.parse(sessionStorage.getItem("data"));
            let torneo = {};
            torneo = torneos["12-casas"];
            // console.log(torneo);
            

            contenido = `
            <div id="doce-casas-general">
                <div id="doce-casas-lista">
                    <div class="tabla-dentro">
                        <h3>Casa actual</h3>
                        <div class="dc-espacio-usable">
                            <h4>Tabla general</h4>
                            <ul>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="torneos-12casas">
                    <a href='/12-casas/aries' class='casa-de-aries torneo-tarjeta' data-name="aries"><img src='/img/this/fondos12casas/aries.png'></a>
                    <a href='/12-casas/tauro' class='casa-de-tauro torneo-tarjeta' data-name="tauro"><img src='/img/this/fondos12casas/tauro.png'></a>
                    <a href='/12-casas/geminis' class='casa-de-geminis torneo-tarjeta' data-name="geminis"><img src='/img/this/fondos12casas/geminis.png'></a>
                    <a href='/12-casas/cancer' class='casa-de-cancer torneo-tarjeta' data-name="cancer"><img src='/img/this/fondos12casas/cancer.png'></a>
                    <a href='/12-casas/leo' class='casa-de-leo torneo-tarjeta' data-name="leo"><img src='/img/this/fondos12casas/leo.png'></a>
                    <a href='/12-casas/virgo' class='casa-de-virgo torneo-tarjeta' data-name="virgo"><img src='/img/this/fondos12casas/virgo.png'></a>
                    <a href='/12-casas/libra' class='casa-de-libra torneo-tarjeta' data-name="libra"><img src='/img/this/fondos12casas/libra.png'></a>
                    <a href='/12-casas/escorpio' class='casa-de-escorpio torneo-tarjeta' data-name="escorpio"><img src='/img/this/fondos12casas/escorpio.png'></a>
                    <a href='/12-casas/sagitario' class='casa-de-sagitario torneo-tarjeta' data-name="sagitario"><img src='/img/this/fondos12casas/sagitario.png'></a>
                    <a href='/12-casas/capricornio' class='casa-de-capricornio torneo-tarjeta' data-name="capricornio"><img src='/img/this/fondos12casas/capricornio.png'></a>
                    <a href='/12-casas/acuario' class='casa-de-acuario torneo-tarjeta' data-name="acuario"><img src='/img/this/fondos12casas/acuario.png'></a>
                    <a href='/12-casas/piscis' class='casa-de-piscis torneo-tarjeta' data-name="piscis"><img src='/img/this/fondos12casas/piscis.png'></a>
                    <a href='#' class='casa-general torneo-tarjeta casa-status2'><img src='/img/this/fondos12casas/final.png'></a>
                </div>
            </div>
            `;
            mainLogo.style.opacity = 1;
            document.getElementById("main-cont").innerHTML = contenido;
            cargarDoceCasas();


            // console.log("Viendo fondo");
            // <div class="fondo-12casas-nuevo"></div>

            let fondo = document.createElement("div");
            fondo.classList.add("fondo-12casas-nuevo");
            

            let fondo1 = document.createElement("div");
            fondo1.classList.add("docecasas-fondo-final1");
            fondo1.classList.add("wh100v");
            fondo.appendChild(fondo1);

            let fondo2 = document.createElement("div");
            fondo2.classList.add("docecasas-fondo-final2");
            fondo2.classList.add("wh100v");
            fondo.appendChild(fondo2);

            let contenedorDeLogos = document.createElement("div");
            contenedorDeLogos.classList.add("contenedor-de-logos-12-casas");
            contenedorDeLogos.classList.add("wh100v");
            fondo.appendChild(contenedorDeLogos);
            {
                let tirriCont = document.createElement("div");
                tirriCont.classList.add("dc-cont-tirri");

                let logoTirri = document.createElement("img");
                logoTirri.src = "/img/this/ti-rex-final.png";
                logoTirri.classList.add("logo-12casas-final-tirri");

                tirriCont.appendChild(logoTirri);
                contenedorDeLogos.appendChild(tirriCont);

                let docecasasCont = document.createElement("div");
                docecasasCont.classList.add("dc-cont-docecasas");

                let logoDoceCasas = document.createElement("img");
                logoDoceCasas.src = "/img/this/12casas-final.png";
                logoDoceCasas.classList.add("logo-12casas-final");

                docecasasCont.appendChild(logoDoceCasas);
                contenedorDeLogos.appendChild(docecasasCont);
            }
            fondo.appendChild(contenedorDeLogos);
            
            modifiedBackground.appendChild(fondo);

            actualizarLinks();
            break;
        case "/12-casas/acuario":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("acuario");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/acuario/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("acuario");
            actualizarLinks();
            break;
        }
        case "/12-casas/acuario/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("acuario");
            mainLogo.style.opacity = 1;
            let tipo = "acuario";

            let torneo = buscarTorneo(tipo);

            let campeon;
            console.log(torneo);
            
            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                <table id="seed-table" class="table table-striped"></table>
            </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "acuario")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "acuario");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);



            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                // console.log(loadPlayers);
                
                loadPlayers.addEventListener("dblclick", () => {
                    // console.log("Modificando..");
                    
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "acuario");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })

                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
                
            }
            actualizarLinks();
            break;
            // Final acuario
        }
        case "/12-casas/aries":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("aries");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/aries/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("aries");
            actualizarLinks();
            break;
        }
        case "/12-casas/aries/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("aries");
            mainLogo.style.opacity = 1;
            let tipo = "aries";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "aries")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "aries");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "aries");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final aries
        }
        case "/12-casas/cancer":{
            // console.log("12 Casas - cancer");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("cancer");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/cancer/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("cancer");
            actualizarLinks();
            break;
        }
        case "/12-casas/cancer/editar":{ */
            // console.log("12 Casas - cancer");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("cancer");
            mainLogo.style.opacity = 1;
            let tipo = "cancer";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "cancer")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "cancer");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "cancer");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final cancer
        }
        case "/12-casas/capricornio":{
            // console.log("12 Casas - capricornio");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("capricornio");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/capricornio/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("capricornio");
            actualizarLinks();
            break;
        }
        case "/12-casas/capricornio/editar":{ */
            // console.log("12 Casas - capricornio");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("capricornio");
            mainLogo.style.opacity = 1;
            let tipo = "capricornio";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "capricornio")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "capricornio");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "capricornio");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final capricornio
        }
        case "/12-casas/escorpio":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("escorpio");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/escorpio/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("escorpio");
            actualizarLinks();
            break;
        }
        case "/12-casas/escorpio/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("escorpio");
            mainLogo.style.opacity = 1;
            let tipo = "escorpio";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "escorpio")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "escorpio");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "escorpio");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final escorpio
        }
        case "/12-casas/geminis":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("geminis");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/geminis/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("geminis");
            actualizarLinks();
            break;
        }
        case "/12-casas/geminis/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("geminis");
            mainLogo.style.opacity = 1;
            let tipo = "geminis";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "geminis")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "geminis");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "geminis");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final geminis
        }
        case "/12-casas/leo":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("leo");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/leo/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("leo");
            actualizarLinks();
            break;
        }
        case "/12-casas/leo/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("leo");
            mainLogo.style.opacity = 1;
            let tipo = "leo";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "leo")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "leo");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "leo");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final leo
        }
        case "/12-casas/libra":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("libra");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/libra/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("libra");
            actualizarLinks();
            break;
        }
        case "/12-casas/libra/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("libra");
            mainLogo.style.opacity = 1;
            let tipo = "libra";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "libra")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "libra");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "libra");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final libra
        }
        case "/12-casas/piscis":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("piscis");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/piscis/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("piscis");
            actualizarLinks();
            break;
        }
        case "/12-casas/piscis/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("piscis");
            mainLogo.style.opacity = 1;
            let tipo = "piscis";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "piscis")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "piscis");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "piscis");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final piscis
        }
        case "/12-casas/sagitario":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("sagitario");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/sagitario/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("sagitario");
            actualizarLinks();
            break;
        }
        case "/12-casas/sagitario/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("sagitario");
            mainLogo.style.opacity = 1;
            let tipo = "sagitario";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "sagitario")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "sagitario");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "sagitario");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final sagitario
        }
        case "/12-casas/tauro":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("tauro");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/tauro/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("tauro");
            actualizarLinks();
            break;
        }
        case "/12-casas/tauro/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("tauro");
            mainLogo.style.opacity = 1;
            let tipo = "tauro";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "tauro")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "tauro");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "tauro");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final tauro
        }
        case "/12-casas/virgo":{
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            modifiedBackground.classList.add("doce-casas-simple");
            modifiedBackground.classList.remove("doce-casas");
            modifiedBackground.innerHTML = "";
            /* modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("virgo");
            mainLogo.style.opacity = 1;
            
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets-tirex.png">
                    <div id="player-list">
                    </div>
                    <a id="edit-bracket" href="/12-casas/virgo/editar"><i class="fa-solid fa-pen"></i></a>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets("virgo");
            actualizarLinks();
            break;
        }
        case "/12-casas/virgo/editar":{ */
            // console.log("12 Casas - Leo");
            header.classList.add("doce-casas");
            backButton.innerHTML = "< Volver";
            backButton.setAttribute("href","/12-casas");

            nextButton.innerHTML = "";
            nextButton.setAttribute("href","/12-casas");

            modifiedBackground.classList.add("active");
            modifiedBackground.classList.remove("master-16");
            modifiedBackground.classList.add("doce-casas");
            modifiedBackground.classList.add("virgo");
            mainLogo.style.opacity = 1;
            let tipo = "virgo";

            let torneo = buscarTorneo(tipo);

            let campeon;

            if (torneo.matches[torneo.matches.length - 1].ganador) {
                campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            } else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
                campeon = torneo.prizepool["1"].player;
            };
            contenido = `
            <div id="left-bar" class="doce-casas table-cont">
                <h3 id="seed-table-header">Clasificacion</h3>
                <div class="left-bar-rest">
                        <h3>${campeon || "A definir"}</h3>
                        <div class="resultados">
                            
                            ${
                                campeon 
                                ?
                                `
                                <div class="resultados-left">
                                    <h6>Vencidos por el campeon</h6>
                                    <span class="seleccionador-docecasas" data-place="fase-final" data-name="${tipo}">Final -> ${torneo.vencido.final || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-semis" data-name="${tipo}">Semis -> ${torneo.vencido.semis || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-cuartos" data-name="${tipo}">Ro8 -> ${torneo.vencido.cuartos || "---"}</span>
                                    <span class="seleccionador-docecasas" data-place="fase-octavos" data-name="${tipo}">Ro16 -> ${torneo.vencido.octavos || "---"}</span>
                                </div>
                                `
                                :
                                ''
                            }
                            <div class="resultados-right">
                                <h6>Top 4</h6>
                                <span class="seleccionador-docecasas" data-place="top-1" data-name="${tipo}">1° -> ${torneo.prizepool["1"].player||"A definir"} (12pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-2" data-name="${tipo}">2° -> ${torneo.prizepool["2"].player||"A definir"} (6pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-3" data-name="${tipo}">3° -> ${torneo.prizepool["3"].player||"A definir"} (3pts)</span>
                                <span class="seleccionador-docecasas" data-place="top-4" data-name="${tipo}">4° -> ${torneo.prizepool["4"].player||"A definir"} (1pt)</span>
                            </div>
                        </div>
                    <picture>
                        <img src="/img/this/fondos12casas/${tipo}.png" />
                    </picture>
                </div>
                    <table id="seed-table" class="table table-striped"></table>
                </div>
                <div id="main" class="doce-casas">
                    <div id="left-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 1).id}" id="first-match" class="match">
                            <span id="slot-1">${buscarPartida(torneo.matches, 1).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorUno.id).nick : 1}</span>
                            <span id="slot-9">${buscarPartida(torneo.matches, 1).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 1).jugadorDos.id).nick : 9}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 2).id}" id="second-match" class="match">
                            <span id="slot-5">${buscarPartida(torneo.matches, 2).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorUno.id).nick : 5}</span>
                            <span id="slot-13">${buscarPartida(torneo.matches, 2).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 2).jugadorDos.id).nick : 13}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 3).id}" id="third-match" class="match">
                            <span id="slot-3">${buscarPartida(torneo.matches, 3).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorUno.id).nick : 3}</span>
                            <span id="slot-11">${buscarPartida(torneo.matches, 3).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 3).jugadorDos.id).nick : 11}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 4).id}" id="fourth-match" class="match">
                            <span id="slot-7">${buscarPartida(torneo.matches, 4).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorUno.id).nick : 7}</span>
                            <span id="slot-15">${buscarPartida(torneo.matches, 4).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 4).jugadorDos.id).nick : 15}</span>
                        </div>
                    </div>
                    <img src="/img/this/fondo-12casas-bracket.png" />
                    <picture class="doce-casas-bracket-logo">
                        <img src="/img/this/12-casas-final.png" />
                    </picture>
                    <picture class="doce-casas-map-logo">
                        <img src="/img/this/fondos12casas/mapas/${tipo}.png" />
                    </picture>
                    <div id="right-brackets">
                        <div data-match="${buscarPartida(torneo.matches, 5).id}" id="fifth-match" class="match">
                            <span id="slot-2">${buscarPartida(torneo.matches, 5).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorUno.id).nick : 2}</span>
                            <span id="slot-10">${buscarPartida(torneo.matches, 5).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 5).jugadorDos.id).nick : 10}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 6).id}" id="sixth-match" class="match">
                            <span id="slot-6">${buscarPartida(torneo.matches, 6).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorUno.id).nick : 6}</span>
                            <span id="slot-14">${buscarPartida(torneo.matches, 6).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 6).jugadorDos.id).nick : 14}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 7).id}" id="seventh-match" class="match">
                            <span id="slot-4">${buscarPartida(torneo.matches, 7).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorUno.id).nick : 4}</span>
                            <span id="slot-12">${buscarPartida(torneo.matches, 7).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 7).jugadorDos.id).nick : 12}</span>
                        </div>
                        <div data-match="${buscarPartida(torneo.matches, 8).id}" id="eight-match" class="match">
                            <span id="slot-8">${buscarPartida(torneo.matches, 8).jugadorUno.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorUno.id).nick : 8}</span>
                            <span id="slot-16">${buscarPartida(torneo.matches, 8).jugadorDos.id ? buscarJugador(torneo.players, buscarPartida(torneo.matches, 8).jugadorDos.id).nick : 16}</span>
                        </div>
                    </div>
                </div>
                <div id="inv"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        console.log("id",e.target.parentNode.getAttribute("data-match"));
                        console.log("partidas", torneo);

                        let partida = buscarPartida(torneo.matches, e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(torneo.players, rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id, "virgo")
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id, "virgo");
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(torneo.players);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList, "virgo");
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                seleccionadores = document.querySelectorAll(".seleccionador-docecasas");
                seleccionadores.forEach(seleccionador => {
                    seleccionador.addEventListener("dblclick", () => {
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador fue ${seleccionador.dataset.place.replace("fase-","vencido en ").replace("top-","top ").toUpperCase()}`;
                        span.appendChild(p1);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            torneo.players.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        definirJugador(jugador.id, seleccionador.dataset.place, tipo)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                            {
                                let li = document.createElement("li");
                                li.innerHTML = `<p>${null}</p>`;
        
                                // <i class="fas fa-share"></i>
                                let submitButton = document.createElement("i");
                                submitButton.classList.add("fas");
                                submitButton.classList.add("fa-share");

                                
                                submitButton.addEventListener("click", () =>{
                                    definirJugador(null, seleccionador.dataset.place, tipo)
                                    div.remove();
                                })
                                li.appendChild(submitButton);

                                ul.appendChild(li);
                            }
                        })
    
                        span.appendChild(ul);
    
                        torneo.players.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(jugador.id, seleccionador.dataset.place,tipo);
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
                        {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${null}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");

                            
                            submitButton.addEventListener("click", () =>{
                                definirJugador(null, seleccionador.dataset.place, tipo)
                                div.remove();
                            })
                            li.appendChild(submitButton);

                            ul.appendChild(li);
                        }
    
                        document.body.appendChild(div);
                    })
                })
            }
            actualizarLinks();
            break;
            // Final virgo
        }
        case "/sorteo":
            // console.log(tempPartidas);
            
            let campeon;
            // conso
            // if (torneo.matches[torneo.matches.length - 1].ganador) {
            //     campeon = buscarJugador(torneo.players, torneo.matches[torneo.matches.length - 1].ganador);
            // }le.lo else if (torneo.prizepool["1"] && torneo.prizepool["1"].player) {
            //     campeon = torneo.prizepool["1"].player;
            // }g(buscarPartida(1).id);;
            contenido = `
                <div class="fondo-12casas-nuevo"></div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            matches = document.querySelectorAll(".match > span");
            matches.forEach(match => {
                match.addEventListener("dblclick", (e) => {
                        if (verifyAdmin()) {
                        // console.log(`Click en el slot ${e.target.id.replace("slot-","")}`);
                        let div = document.createElement("div");
                        div.classList.add("popup-background");
                        div.addEventListener("click", (event) => {
                            if (event.target === div) {
                                div.remove();
                            }
                        })
    
                        let span = document.createElement("span");
                        span.classList.add("popup-overlay");
                        div.appendChild(span);
    
                        let p1 = document.createElement("p");
                        p1.innerText = `Que jugador ocupará el slot ${e.target.id.replace("slot-","")}`;
                        span.appendChild(p1);
    
                        let p2 = document.createElement("p");
                        let partida = buscarPartida(e.target.parentNode.getAttribute("data-match"))
                        // console.log(partida);
                        let rival = e.target.id.replace("slot-","") <= 8 ? partida.jugadorDos.id : partida.jugadorUno.id;
                        // console.log(rival);
                        
                        p2.innerText = `(Actualmente ${rival ? "rival de "+buscarJugador(rival).nick : "sin rival"})`;
                        span.appendChild(p2);
    
                        let input = document.createElement("input");
                        span.appendChild(input);
    
                        let ul = document.createElement("ul");
    
                        input.addEventListener("input", ()=>{
                            // console.log();
                            ul.innerHTML = "";
                            tempJugadores.forEach(jugador => {
                                if (jugador.nick.toLowerCase().trim().replaceAll(" ", "").includes(input.value.toLowerCase().trim().replaceAll(" ", ""))) {
                                    let li = document.createElement("li");
                                    li.innerHTML = `<p>${jugador.nick}</p>`;
            
                                    // <i class="fas fa-share"></i>
                                    let submitButton = document.createElement("i");
                                    submitButton.classList.add("fas");
                                    submitButton.classList.add("fa-share");
    
                                    
                                    submitButton.addEventListener("click", () =>{
                                        asignarJugador(jugador.id, e.target.id.replace("slot-","") >= 8 ? "dos" : "uno", partida.id)
                                        div.remove();
                                    })
                                    li.appendChild(submitButton);
    
                                    ul.appendChild(li);
                                }
                            })
                        })
    
                        span.appendChild(ul);
    
                        tempJugadores.forEach(jugador => {
                            let li = document.createElement("li");
                            li.innerHTML = `<p>${jugador.nick}</p>`;
    
                            // <i class="fas fa-share"></i>
                            let submitButton = document.createElement("i");
                            submitButton.classList.add("fas");
                            submitButton.classList.add("fa-share");
    
                            
                            submitButton.addEventListener("click", () =>{
                                asignarJugador(jugador.id, e.target.id.replace("slot-","") > 8 ? "dos" : "uno", partida.id)
                                div.remove();
                            });
                            li.appendChild(submitButton);
    
                            ul.appendChild(li);
                        })
    
                        document.body.appendChild(div);
                    }
                    })
            })

            loadLeftBar(tempJugadores);

            if (verifyAdmin()) {
                let loadPlayers = document.querySelector("#seed-table-header");
                loadPlayers.addEventListener("dblclick", () => {
                    let loadPlayersDiv = document.createElement("div");
                    loadPlayersDiv.classList.add("load-players")

                    let loadPlayersSpan = document.createElement("span");
                    loadPlayersDiv.appendChild(loadPlayersSpan);

                    let loadPlayersTitle = document.createElement("h4");
                    loadPlayersTitle.innerHTML = "¿Deseas sobreescribir los jugadores actuales?"
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
                        let newList = loadPlayersInput.value.split(`/`);
                        newList = newList.map((actual,i) => {
                            actual = actual.trim().split("\t");
                            return {
                                "id": i+1,
                                "nick": actual[0],
                                "elo": actual[3],
                                "semilla": i+1
                                // "categoria": i < 16 ? 1 : i < 32 ? 2 : i < 48 ? 3 : 4
                            }
                        })
                        actualizarListaJugadores(newList);
                        // console.log(newList);
                    })
                    loadPlayersSpan.appendChild(loadPlayersAccept);

                    document.getElementById("main-cont").appendChild(loadPlayersDiv);

                })
                
            }
            break;
        case "/brackets":
            contenido = `
                <div id="brackets">
                    <img src="/img/brackets.png"> 
                    <div id="player-list">
                    </div>
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadBrackets(tempPartidas);
            break;
        case "/calendario":
            contenido = `
                <div id="calendar">
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            loadCalendar(brackets,playerList);
            break;
        case "/handbook":
            contenido = `
                <div id="div-handbook">
                    <iframe id="handbook" src="/pdf/Argenleague_3_Handbook.pdf">
                </div>
            `;
            document.getElementById("main-cont").innerHTML = contenido;

            // document.getElementById("div-handbook").appendChild(spects);
            break;
        default:
            cambiarRuta("/");
            break;
    }
    // cargarCategoria(categorySelector.value);
    // document.getElementById("main-cont").innerHTML = ``;
    // document.getElementById("main-cont").innerHTML = contenido;
  }