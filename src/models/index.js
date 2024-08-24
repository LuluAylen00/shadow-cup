const fs = require('fs');
const path = require('path');
const ftp = require('../modules/ftp');

let fileDataPath = path.resolve(__dirname, '../data/shadowcup-data.json')
let fileData = JSON.parse(fs.readFileSync(fileDataPath, 'utf8')); 

function save(d,path) {
    fs.writeFileSync(path, JSON.stringify(d,null,2));
    return;
}

const model = {
    setMatchWinner: async (matchId, winner) => {
        // console.log("j",matchId);
        // let d = await model.bringGroupMatches();
        // let matchesAcc = []
        await db.Partida.update({ganador: winner},{where: {id: matchId}})
        let data = await db.Partida.findOne({where: {id: matchId}});
        let players = [data.jugadorUnoId, data.jugadorDosId]
        // console.log(winner, winner != null);
        switch (matchId % 5) {
            case 1:
                await db.Partida.update({jugadorUnoId: winner != null ? players[winner] : null},{where: {id: matchId+2}});
                await db.Partida.update({jugadorUnoId: winner != null ? players.find((p,i) => i != winner) : null},{where: {id: matchId+3}});
                break;
            case 2:
                await db.Partida.update({jugadorDosId: winner != null ? players[winner] : null},{where: {id: matchId+1}});
                await db.Partida.update({jugadorDosId: winner != null ? players.find((p,i) => i != winner) : null},{where: {id: matchId+2}});
                break;
            case 3:
                await db.Partida.update(
                    {
                        jugadorUnoId: winner != null ? players.find((p,i) => i != winner) : null
                    },{
                        where: {id: matchId+2}
                    }
                );
                break;
            case 4:
                await db.Partida.update(
                    {
                        jugadorDosId: winner != null ? players.find((p,i) => i == winner) : null
                    },{
                        where: {id: matchId+1}
                    }
                );
                break;
            default:
                break;
        }
        // d[tier].map(j => {
        //     // matchesAcc = [...matchesAcc, ...j[0], ...j[1], ...j[2], ...j[3], ...j[4]]
        //     for (let i = 0; i < j.length; i++) {
        //         const m = j[i];
        //         // console.log("m",j);
        //         if (m[0].id == matchId) {
        //             m[0].winner = winner
        //         }else if (m[1] && m[1].id == matchId){
        //             m[1].winner = winner
        //         }
        //     }
        //     return j;
        // });
        // // console.log(d[tier][0]);
        // console.log(matchesAcc);
        
        // await model.createGroupMatches();
        return;
    },
    setMatchInfo: async (body) => {
        // console.log(JSON.parse(body.data));
        // let data = JSON.parse(body.data)
        try {
            ftp.uploadFile(JSON.parse(body.data));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
        // console.log("j",matchId);
        // let d = model.bringGroupMatches();
        // // let matchesAcc = []
        // d[tier].map(j => {
        //     // console.log("asd");
        //     // matchesAcc = [...matchesAcc, ...j[i]]
        //     for (let i = 0; i < j.length; i++) {
        //         const m = j[i];
        //         // console.log("m",j);
        //         if (m[0].id == matchId) {
        //             m[0].matchInfo = matchInfo
        //         }else if (m[1] && m[1].id == matchId){
        //             m[1].matchInfo = matchInfo
        //         }
        //     }
        //     return j;
        // });
        // // console.log(d[tier][0]);
        // // console.log(matchesAcc);
        
        // model.createGroupMatches(d,tier, matchId/* , matches */);
        
    },
    updatePlayer: async function (body){
        try {
            await db.Jugador.update({nick: nick},{where: {id: id}})
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    insertPlayers: async function (body){

    },
    listData: async function (){
        try {
            return await ftp.readFile("shadowcup-data.json");
        } catch (error) {
            console.log(error);
        }
    },
    create: async function (){
        try {
            await ftp.deleteFile("shadowcup-data.json");
            await ftp.uploadFile(fileData);
        } catch (error) {
            console.log(error);
        }
    }
}

// model.setWinner(1,1,0);
// model.createGroupMatches(1)
// model.createGroupMatches(2)
// model.createGroupMatches(3)


module.exports = model;