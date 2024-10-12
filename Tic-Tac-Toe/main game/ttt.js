
let currentPlayer = 'X';
let validBox = 0;
window.onload = function() {
    render();
};


function checkGameWin() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]             // Diagonals
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination.map(i => document.getElementById(i.toString()));
        if (a.classList.contains('X') && b.classList.contains('X') && c.classList.contains('X')) {
            console.log("game over");
            endpage(`x`);
            return 'x';
        }
        
        if (a.classList.contains('O') && b.classList.contains('O') && c.classList.contains('O')) {
            console.log("game over");
            confetti();
            endpage(`o`);
            return 'o';
        }
    }

    return false;
}

function checkBoxWin(outerGridId) {
    const cells = [
        document.getElementById(`${outerGridId.id}.1`).textContent,
        document.getElementById(`${outerGridId.id}.2`).textContent,
        document.getElementById(`${outerGridId.id}.3`).textContent,
        document.getElementById(`${outerGridId.id}.4`).textContent,
        document.getElementById(`${outerGridId.id}.5`).textContent,
        document.getElementById(`${outerGridId.id}.6`).textContent,
        document.getElementById(`${outerGridId.id}.7`).textContent,
        document.getElementById(`${outerGridId.id}.8`).textContent,
        document.getElementById(`${outerGridId.id}.9`).textContent
    ];

    // Check rows
    if ((cells[0] === cells[1] && cells[1] === cells[2] && cells[0] !== '') ||
        (cells[3] === cells[4] && cells[4] === cells[5] && cells[3] !== '') ||
        (cells[6] === cells[7] && cells[7] === cells[8] && cells[6] !== '')) {
        return true;
    }

    // Check columns
    if ((cells[0] === cells[3] && cells[3] === cells[6] && cells[0] !== '') ||
        (cells[1] === cells[4] && cells[4] === cells[7] && cells[1] !== '') ||
        (cells[2] === cells[5] && cells[5] === cells[8] && cells[2] !== '')) {
        return true;
    }

    // Check diagonals
    if ((cells[0] === cells[4] && cells[4] === cells[8] && cells[0] !== '') ||
        (cells[2] === cells[4] && cells[4] === cells[6] && cells[2] !== '')) {
        return true;
    }

    return false;
}

function render() {
    const container = document.getElementById('board');

    for (let outerGridId = 1; outerGridId <= 9; outerGridId++) {
        const outerGrid = document.createElement('div');
        outerGrid.className = 'OuterGrid';
        outerGrid.id = outerGridId;
        outerGrid.setAttribute('isComplete','false');   
        console.log(outerGrid);

        for (let num = 1; num <= 9; num++) {

                const innerGrid = document.createElement('div');
                innerGrid.className = 'InnerGrid';
                innerGrid.id = `${outerGridId}.${num}`;
                innerGrid.textContent='';
                innerGrid.addEventListener('click', checker);
                outerGrid.appendChild(innerGrid);
            }
        container.appendChild(outerGrid);
    }
}
function startpage(){}
function endpage(winner){
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2; 
    confetti(options={
        particleCount: 100, 
        angle: 90,         
        spread: 360,
        gravity: 0.9  ,
        startVelocity :45,
        decay:0.9,
    }
    );
    console.log(winner)
    const container = document.body;

    gray=document.createElement('div');
    gray.id=`gray`
    gray.classList.add('gray');
    add_rainbow1(gray);

    win=document.createElement('div');
    win.classList.add('winner');
    win.textContent=`${winner} wins`

    button=document.createElement('div');
    button.classList.add(`restartButton`);
    button.innerHTML=`<button id = "restart" onclick="restart()">restart</button>`
    gray.appendChild(win)
    add_rainbow2(gray);
    gray.appendChild(button)

    container.appendChild(gray)



}
function restart(){
    const container = document.getElementById(`gray`)
    container.remove()
    document.getElementById(`board`).innerHTML='';
    render();
}
document.addEventListener('keydown', function(event) {
    if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        location.reload();
    }
});


function isBoxValid(boxId){

    if (validBox!==0){
        if (document.getElementById(validBox).getAttribute('isComplete')==="true"){
            console.log(1);
            validBox=0;
            console.log(`validBox id${validBox}`)
        }
    }
    if(validBox===0 && document.getElementById(boxId).getAttribute('isComplete')==="false"){
        return true;

    }
    if (boxId===validBox && document.getElementById(boxId).getAttribute('isComplete')==="false"){
        return true;
    }
    else
    {
        console.log("here");
        return false;

    }
}
function blockInvalidBoxes(validBox) {
    const boxes = document.querySelectorAll('.OuterGrid'); 
    console.log("is compplete")
    console.log(document.getElementById(validBox).getAttribute("isComplete"))
    boxes.forEach(box => {
        if (document.getElementById(validBox).getAttribute("isComplete")==="true"){
            console.log(9999999999)
            const a = document.querySelectorAll('.OuterGrid');
               a.forEach(b => {
                   b.classList.remove('isBlocked');
                    
             });
        
        }

        else if (box.id !== validBox) {
            console.log(1234556666)

            box.classList.add('isBlocked');
        } else {
            box.classList.remove('isBlocked');
        }
    });
}

let dynamicAudios = [];
function music(){
    dynamicAudios.forEach(audio => {
        audio.pause();
    });
    dynamicAudios = [];
    x = document.getElementById("background_theme");
    x.pause();
    var audio = new Audio("../Wallpaper/i-just-want-to-be-part-of-your-symphony!-made-with-Voicemod-[AudioTrimmer.com].mp3");
    audio.volume = 0.3;
    audio.addEventListener('ended', () => { 
        x.play(); 
    });
    audio.play();
    dynamicAudios.push(audio);
}

function confettee(event){
    music();
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2; 
    confetti(options={
        particleCount: 100, 
        angle: 90,         
        spread: 360,
        gravity: 0.6  ,
        startVelocity :35,
        decay:0.75,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight }
    }
    );
}
function checker(event) { 
    confettee(event)
    endpage("n")
    innerGrid = event.target.id;
    outerGridId = event.target.parentElement;
    innerGridId = document.getElementById(`${innerGrid}`)
    console.log(outerGridId.getAttribute('isComplete'))
    // endpage(`hhh`)
    if (innerGridId.textContent === '' && isBoxValid(outerGridId.id)) { // Check if cell is empty
        innerGridId.textContent = currentPlayer; // Place the current player's mark
        validBox = innerGrid.slice(2);
        console.log("validBox")
        console.log(validBox);
        console.log(outerGridId)
        if (checkBoxWin(outerGridId)) {
            // if (outerGridId.id=validBox){
            //     const boxes = document.querySelectorAll('.OuterGrid');
            //     boxes.forEach(box => {
              
            //             box.classList.remove('isBlocked');
                    
            //     });
            // }
      
        
            outerGridId.setAttribute('isComplete', 'true');
            console.log(outerGridId)
            
            if (currentPlayer === 'X') {
                outerGridId.classList.add('X');
            } else {
                outerGridId.classList.add('O');
            }
            checkGameWin() ;
            // Add grey out class to all inner grids in the completed outer grid
            const innerGrids = outerGridId.querySelectorAll('.InnerGrid');
            innerGrids.forEach(cell => {
                cell.classList.add('isBlocked');
            });
  
            

        }
        blockInvalidBoxes(validBox);

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
}

function add_rainbow1(greybox){
    const newDiv1 = document.createElement('div');
    newDiv1.classList.add('rainbow-rectangle-top');
    greybox.appendChild(newDiv1);

    const track = document.createElement('div');
    track.classList.add('track2');
    greybox.appendChild(track);
    
    const img = document.createElement('img');
    img.src = "../Wallpaper/Cow.png"; 
    img.classList.add('moving-image-right');
    track.appendChild(img);

    setTimeout(() => {
        newDiv1.style.width = '100%'; 
        img.style.animation = 'moveRight 5s ease-out forwards'; 
    }, 500); 
}
function add_rainbow2(greybox){
    const newDiv2 = document.createElement('div');
    newDiv2.classList.add('rainbow-rectangle-bottom');
    greybox.appendChild(newDiv2);

    const track = document.createElement('div');
    track.classList.add('track1');
    greybox.appendChild(track);

    const img = document.createElement('img');
    img.src = "../Wallpaper/Dolphin.png"; 
    img.classList.add('moving-image-left');
    track.appendChild(img);

    setTimeout(() => {
        newDiv2.style.width = '100%'; 
        img.style.animation = 'moveLeft 5s ease-out forwards'; 
    }, 500); 

}