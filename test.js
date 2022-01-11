window.onload=()=>{



    let btnlist = [ // La liste de boutons de jeu, avec le ID et leur marque correspondante pour le tableau deux dimensions
        {id:"btn1", mark:[0,0]},
        {id:"btn2", mark:[0,1]},
        {id:"btn3", mark:[0,2]},
        {id:"btn4", mark:[1,0]},
        {id:"btn5", mark:[1,1]},
        {id:"btn6", mark:[1,2]},
        {id:"btn7", mark:[2,0]},
        {id:"btn8", mark:[2,1]},
        {id:"btn9", mark:[2,2]},
    ]

    btnlist.forEach(i=>{ // On initialise chaque bouton
        let btn = document.getElementById(i.id)
        btn.onclick=()=>{
            btn.innerText=current.mark
            putMark(i.mark)
        }
    })

    let whowon = ()=>{
        if(player1.score > player2.score){
            alert(`Winner ${player1.mark} : ${player1.score}/${player2.score}`)
        }
        else if(player2.score > player1.score){
            alert(`Winner ${player2.mark} : ${player2.score}/${player1.score}`)
        }
        else{
            alert("Equal !")
        }
    }

   
    let changeColor = ()=>{ // Simple fonction visant à changer la couleur pour mettre en évidence le joueur actuel
        if(current===player1){
            player1.elem.style.color="rgb(32, 117, 187)"
            player2.elem.style.color="black"
        }
        else{
            player2.elem.style.color="rgb(32, 117, 187)"
            player1.elem.style.color="black"
        }
    }


    let checkifwinner = ()=>{ // Savoir si quelqu'un a gagné
        let tocheck = current.mark

        if(
            //Verticales
            game[0][0]===tocheck && game[1][0]===tocheck && game[2][0]===tocheck ||
            game[0][1]===tocheck && game[1][1]===tocheck && game[2][1]===tocheck ||
            game[0][2]===tocheck && game[1][2]===tocheck && game[2][2]===tocheck ||

            //Horizontales
            game[0][0]===tocheck && game[0][1]===tocheck && game[0][2]===tocheck ||
            game[1][0]===tocheck && game[1][1]===tocheck && game[1][2]===tocheck ||
            game[2][0]===tocheck && game[2][1]===tocheck && game[2][2]===tocheck ||

            //Diagonales
            game[0][0]===tocheck && game[1][1]===tocheck && game[2][2]===tocheck ||
            game[0][2]===tocheck && game[1][1]===tocheck && game[2][0]===tocheck 
        )
            return true
        else
            return false
        
    }


    let full = ()=>{ // Fonction pour vérifier si le tableau est plein. Retourne vrai si le tableau n'a aucune place libre.
        let f = true
        game[0].forEach(i=>{if(i===""){f=false}})
        game[1].forEach(i=>{if(i===""){f=false}})
        game[2].forEach(i=>{if(i===""){f=false}})
        return f
    }

    let init = ()=>{ // Initialiser / Reinitialiser le jeu
        let list = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6", "btn7", "btn8", "btn9"]
        list.forEach(i=>{
            document.getElementById(i).innerText=""
        })
        game = [
            ["","",""],
            ["","",""],
            ["","",""]
        ]
    }



    let putMark = (position)=>{ // Fonction pour mettre la marque

        if(game[position[0]][position[1]] ===""){ // Si l'emplacement est libre
            game[position[0]][position[1]] = current.mark
            if(checkifwinner() ===true){ // Si la personne a gagné, on incrémente son score et on réinitialise le jeu
                current.score+=1
                current.elem.innerText = current.name + " : "+current.score
                init()

            }
            else if(full() === true){ // Si aucun gagnant et que le jeu est plein, mettre fin et réinitialiser
                alert("Aucun gagnant")
                init()
            }
            else{ // Si aucun gagnant et que le jeu n'est pas fini, changer de tour et continuer
                current = current ===player1 ? player2:player1
                changeColor()
            }
        }
        else{
            alert("Emplacement déjà utilisé !")
        }
    }

    let game = [ // le jeu est sous forme de tableau à deux dimensions
        ["","",""],
        ["","",""],
        ["","",""]
    ]

    let player1 = { // Les deux joueurs sont représentés par un objet incluant leur nom, élement HTML, score, marque
        name:"Player 1",
        elem:document.getElementById("player1"),
        score:0,
        mark:"x"
    }
    let player2 = {
        name:"Player 2",
        elem:document.getElementById("player2"),
        score:0,
        mark:"o"
    }


    
    let current = player1
    changeColor()

    let time = 180 // Trois minutes
    let countdownelem = document.getElementById("countdown")
    let interval = setInterval(()=>{ // On met en place l'intervalle pour le compte à rebours.
        time -= 1
        // On affiche le compte à rebours actualisé dans la ligne suivante. Il y a une condition linéaire pour ajouter un 0 si les minutes ou secondes sont inférieurs à 10
        countdownelem.innerText = `${Math.floor(time/60) < 10? "0"+Math.floor(time/60) : Math.floor(time/60)} : ${time%60 < 10 ? "0"+time%60 : time%60}`
        if(time===0){
            clearInterval(interval)
            whowon()
        }
    }, 1000)
    
}