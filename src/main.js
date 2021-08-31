import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

/*
function checkHorizontalEmplacement(boardArray, emplacement, joueur){
    
    let y = emplacement[0];
    let x = emplacement[1];
    let xmax = 6-x;
    let xmin = x-3;
    
    if (x<=3)
    {
        let compteur = 0;
        let last = joueur;
        for (var j = 0; j < xmax; j++) 
        {
            if (last === boardArray[y][j]) 
            {
                compteur++;
                if (compteur === 4)
                {
                    return 1;
                }
            }
            else
            {
                compteur = 0;
            }
        }
    }
    else
    {
        let compteur = 0
        let last = joueur
        for (var j = xmin; j < 7; j++) 
        {
            console.log("j = "+j);
            if (last === boardArray[y][j]) 
            {
                compteur++;
                if (compteur === 4)
                {
                    return 1;
                }
            }
            else
            {
                compteur = 0;
            }
        }
    }
    return 0;
}

function checkVerticalLocation(boardArray, position, joueur){
    
    let y = position[0];
    let x = position[1];
    let ymax = y+3;
    let ymin = y-3;
    
    if (y<2)
    {
        let compteur = 0;
        let last = joueur;
        for (var v = 0; v < ymax; v++) 
        {
            if (last === boardArray[v][x]) 
            {
                compteur++;
                if (compteur === 4)
                {
                    return 1;
                }
            }
            else
            {
                compteur = 0;
            }
        }
    }
    else if (y>3)
    {
        let compteur = 0;
        let last = joueur;
        for (var v = ymin; v < 6; v++) 
        {
            if (last === boardArray[v][x]) 
            {
                compteur++;
                if (compteur === 4)
                {
                    return 1;
                }
            }
            else
            {
                compteur = 0;
            }
        }
    }
    else
    {
        let compteur = 0;
        let last = joueur;
        for (var v = 0; v < 6; v++) 
        {
            if (last === boardArray[v][x]) {
                compteur = compteur+1;
                if (compteur === 4){
                    return 1;
                }
            }
            else
            {
                compteur = 0;
            }
        }
    }
    
    return 0;
}

*/

/*
// emplacement du jeton joué sur la colonne columnId
function getNewPawn(boardArray, columnId) {
  ...
  return lineId;

// colonnes jouables
function getPlayableColumns(boardArray) {
  // chaque index de boardArray[0] égal à 0
  // ex: [0, 0, 1, 0, 0, 0, 0] retourne [0, 1, 3, 4, 5, 6]
  return playableColumns

// match nul ?
// peut-être inutile
function isDraw(boardArray) {
  // true si getPlayableColumns(boardArray) retourne un tableau vide
  return bool
}
*/
