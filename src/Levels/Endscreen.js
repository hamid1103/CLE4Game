import * as ex from 'excalibur'
import {PlayerName} from "../Entities/Player.js";
import {variants, labels} from '@catppuccin/palette'


export class Endscreen extends ex.Scene {
    xhttp = new XMLHttpRequest();
    p1Score;
    p2Score;
    ScoresSaved = 0;

    Overlay = document.getElementById('overlay')

    onActivate(_context) {
        this.Overlay.className = 'EndScreen'
    }

    PInput1;
    PInput2;
    ToDBUpdate = false;

    onInitialize(_engine) {
        this.p1Score = _engine.CurrentGameState.P1Score
        this.p2Score = _engine.CurrentGameState.P2Score

        this.PInput1 = new PlayerNameInput(500, 250, PlayerName.Player1, 12, this.p1Score)
        this.add(this.PInput1)

        this.PInput2 = new PlayerNameInput(500, 250, PlayerName.Player2, 12, this.p2Score)
        this.add(this.PInput2)
    }

    UpdatingLabel = document.createElement('label')
    LoaderDiv = document.createElement('div')

    SavingScoresDone = false;
    ShowingEndScreen= false;
    onPreUpdate(_engine, _delta) {
        if ((this.PInput2.confirmed && this.PInput1.confirmed) && !this.ToDBUpdate) {
            this.ToDBUpdate = true
            setTimeout(() => {
                this.Overlay.innerHTML = ''
                this.Overlay.className = 'EndSyncDB'
                this.LoaderDiv.className = 'loading'
                this.UpdatingLabel.id = 'UpdateDBLabel'
                this.UpdatingLabel.innerText = 'Syncing scores to Database'
                this.Overlay.appendChild(this.UpdatingLabel)
                this.Overlay.appendChild(this.LoaderDiv)

                this.xhttp.open("POST", "https://stud.hosted.hr.nl/1062604/", true);

                let data = new FormData()
                data.append('action', 'SaveScore')
                data.append('name', this.PInput1.finalName)
                data.append('score', this.p1Score)
                this.xhttp.send(data)
                setTimeout(()=> {
                    this.xhttp.open("POST", "https://stud.hosted.hr.nl/1062604/", true);
                    let data = new FormData()
                    data.append('action', 'SaveScore')
                    data.append('name', this.PInput2.finalName)
                    data.append('score', this.p2Score)
                    this.xhttp.send(data)
                    this.SavingScoresDone = true
                }, 1000)
            }, 1000)
        }

        if(this.SavingScoresDone && !this.ShowingEndScreen){
            this.ShowingEndScreen = true;
            this.Overlay.innerHTML = ''
            this.xhttp.open("GET", "https://stud.hosted.hr.nl/1062604/?action=GetAllScores", true);
            this.xhttp.send()
            this.xhttp.onload = () =>{
                console.log(JSON.parse(this.xhttp.responseText))
                this.ResultData = JSON.parse(this.xhttp.responseText)
                let goBack = document.createElement('label')
                goBack.innerText = 'Press 2 to go back'
                goBack.id = 'bgend'
                document.addEventListener("joystick0button1", () => {
                    window.location.href = "https://hamid1103.github.io/CLE4Game/";
                });
                document.addEventListener("joystick0button1", () => {
                    window.location.href = "https://hamid1103.github.io/CLE4Game/";
                });
                this.Overlay.appendChild(goBack)
                this.ScoresTable = document.createElement('ul');
                this.Overlay.appendChild(this.ScoresTable)
                for(let row in this.ResultData){
                    let NEWLI = document.createElement('li')
                    NEWLI.classList.add('ScoreLI')
                    let RowData = this.ResultData[row]
                    if(row % 2 === 0) {
                        NEWLI.classList.add('greyLi')
                    }
                    else {
                        NEWLI.classList.add('whiteLi')
                    }
                    let newscoreDiv = document.createElement('div')
                    newscoreDiv.className = 'lidiv'
                    let newscoreScore = document.createElement('label')
                    newscoreScore.innerText = RowData.score
                    let newscoreName = document.createElement('label')
                    newscoreName.innerText = RowData.name
                    this.ScoresTable.appendChild(NEWLI)
                    NEWLI.appendChild(newscoreDiv);
                    newscoreDiv.appendChild(newscoreScore)
                    newscoreDiv.appendChild(newscoreName)

                }
            }
        }
    }

}

export class PlayerNameInput extends ex.Actor {
    PIndex;
    currentnameString = [];
    alphabet = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z'];
    curChar;

    confirmed = false;
    finalName = '';

    Overlay = document.getElementById('overlay');

    constructor(x, y, P1O2 = PlayerName.Player1, length = 10, score) {
        super({
            pos: ex.vec(x, y),
            width: 100,
            height: 50
        });
        this.PIndex = P1O2;
        this.length = length
        this.score = score
        this.x = x;
        this.y = y;
        this.curChar = 0
    }

    PlayerDiv = document.createElement('div')
    NameDiv = document.createElement('div')
    PlayerLabel = document.createElement('label')
    ScoreLabel = document.createElement('label')

    onInitialize(_engine) {
        this.PlayerLabel.innerText = this.PIndex
        this.PlayerLabel.className = 'PlayerLabel'
        this.ScoreLabel.innerText = this.score
        this.ScoreLabel.className = 'PlayerScore'
        this.PlayerDiv.className = "PlayerDataDiv"
        this.NameDiv.className = "PlayerNameInput";
        switch (this.PIndex) {
            case PlayerName.Player1:
                document.addEventListener("joystick0button5", () => this.Confirm());
                document.addEventListener("joystick0left", () => this.left());
                document.addEventListener("joystick0right", () => this.right());
                document.addEventListener("joystick0up", () => this.up())
                document.addEventListener("joystick0down", () => this.down())
                this.NameDiv.id = 'P1'
                this.PlayerDiv.id = 'PD1'
                break;
            case PlayerName.Player2:
                document.addEventListener("joystick1button5", () => this.Confirm());
                document.addEventListener("joystick1left", () => this.left());
                document.addEventListener("joystick1right", () => this.right());
                document.addEventListener("joystick1up", () => this.up())
                document.addEventListener("joystick1down", () => this.down())
                this.NameDiv.id = 'P2'
                this.PlayerDiv.id = 'PD2'
                break;
        }
        this.Overlay.appendChild(this.PlayerDiv)
        this.PlayerDiv.appendChild(this.PlayerLabel)
        this.PlayerDiv.appendChild(this.ScoreLabel)
        this.PlayerDiv.appendChild(this.NameDiv)
        for (let i = 0; i < this.length - 1; i++) {
            let newNameChar = document.createElement('label')
            this.NameDiv.appendChild(newNameChar)
            let newChar = {
                char: '',
                chardex: 1,
                label: newNameChar
            }
            console.log(newChar)
            this.currentnameString.push(newChar)
        }
        this.updateChars();

    }

    WaitText = document.createElement('label')
    spinner = document.createElement('div')

    Confirm() {
        let finalString = '';
        for (let char in this.currentnameString) {
            finalString += this.currentnameString[char].char
        }
        this.finalName = finalString;

        this.confirmed = true
        this.PlayerDiv.innerHTML = ''
        this.WaitText.className = 'WaitText'
        this.WaitText.innerText = 'Waiting for other player to finish'
        this.PlayerDiv.appendChild(this.WaitText)
        this.spinner.className = 'loading';
        this.PlayerDiv.appendChild(this.spinner)
    }

    SelectCurEditChar(numb) {
        switch (numb) {
            case 1:
                if (this.curChar === this.currentnameString.length - 1) {
                    this.curChar = 0
                } else {
                    this.curChar += 1;
                }
                break;
            case -1:
                if (this.curChar === 0) {
                    this.curChar = this.currentnameString.length - 1
                } else {
                    this.curChar -= 1;
                }
                break;
        }
        this.updateChars()
    }

    EditChar(numb) {
        let thischar = this.currentnameString[this.curChar]
        if (numb < 0) {
            if (thischar.chardex === 0) {
                thischar.chardex = this.alphabet.length - 1;
            } else {
                thischar.chardex -= 1;
            }
        } else {
            if (thischar.chardex === this.alphabet.length - 1) {
                thischar.chardex = 0;
            } else {
                thischar.chardex += 1;
            }
        }
        this.updateChars();
    }

    updateChars() {
        for (let char in this.currentnameString) {
            this.currentnameString[char].char = this.alphabet[this.currentnameString[char].chardex]
            this.currentnameString[char].label.innerText = this.currentnameString[char].char
            this.currentnameString[char].label.style.color = labels.text.mocha.hex
            this.currentnameString[char].label.style.backgroundColor = ""
        }
        if (this.currentnameString[this.curChar].char === ' ') {
            this.currentnameString[this.curChar].label.style.backgroundColor = labels.red.mocha.hex
        } else
            this.currentnameString[this.curChar].label.style.color = labels.red.mocha.hex

    }

    up() {
        this.EditChar(1)
    }

    down() {
        this.EditChar(-1)
    }

    left() {
        this.SelectCurEditChar(-1)
    }

    right() {
        this.SelectCurEditChar(1)
    }

    update(engine, delta) {
        this.onPreUpdate(engine, delta)
    }

    onPreUpdate(_engine, _delta) {
        switch (this.PIndex) {
            case PlayerName.Player1:
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.Left)) {
                    this.left();
                }
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.Right)) {
                    this.right();
                }
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.Up)) {
                    this.up();
                }
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.Down)) {
                    this.down();
                }
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.Enter)) {
                    this.Confirm();
                }
                break;
            case PlayerName.Player2:
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.A)) {
                    this.left();
                }
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.D)) {
                    this.right();
                }
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.W)) {
                    this.up();
                }
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.S)) {
                    this.down();
                }
                if (_engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
                    this.Confirm();
                }
                break;
        }

    }


}