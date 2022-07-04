let setJokeId = 1;
let setJokeType = 2;
let userName = "";
let town = "Hradec_Kralove";
let country = "Czech_Republic"
let jokeId = 1;
let weather_code;
let temperature;
let wind_speed;
let pictureAddress;
let description;
let humidity;
let content;

let ServerAdress = "https://localhost:44397";
//let ServerAdress = "http://petrv.somee.com";

function FcPost() {
    event.preventDefault();
    let User = document.Joke.User.value;
    let TypeOfJoke = document.Joke.TypeOfJoke.value;
    let Password = document.Joke.JokePassword.value;
    let JokeContent = document.Joke.JokeContent.value;
    const JokeJSON = {
        "id": 0,
        "evaluation": 0,
        "evaluationCount": 0,
        "content": JokeContent,
        "userName": User,
        "jokeTypeId": TypeOfJoke,
        "temperature": 0,
        "sunRain": true,
        "wind": 0,
        "snow": true,
        "season": 0
    }

    let xhr = new XMLHttpRequest(); // Creating a XHR object
    let url = ServerAdress + "/Jokes/" + Password;
    console.log(url);
    xhr.open("POST", url, true); // open a connection
    xhr.setRequestHeader("Content-Type", "application/json"); // Set the request header i.e. which type of content you are sending
    xhr.onreadystatechange = function () { // Create a state change callback
        if (xhr.readyState === 4 && xhr.status === 200) {// Alert received data from server
            const obj = JSON.parse(this.responseText);
            alert("Vložen vtip: \n" + obj.content);
            document.Joke.JokePassword.value = "";
            document.Joke.JokeContent.value = "";
        } else if (xhr.readyState === 4 && xhr.status === 401) {
            alert("Zadáno neplatné heslo uživatele.\nHeslo uživatele Návštěvník je \"n\".");
            document.Joke.JokePassword.value = "";
        } else if (xhr.readyState === 4 && xhr.status === 405) {
            alert("Je nutné vyplnit heslo uživatele.\nHeslo uživatele Návštěvník je \"n\".");
        }
    };
    var data = JSON.stringify(JokeJSON); // Converting JSON data to string
    xhr.send(data);// Sending data with the request
}

function EditModal() {
    document.getElementById('Mod1Password').value = "";
    document.getElementById('Mod1Content').value = document.querySelector('[id="JokeText"]').innerHTML;
    document.querySelector('[id="Mod1LabelPassword"]').innerHTML = "Heslo uživatele " + userName;
}
function SaveEditJoke() {
    const JokeJSON = {
        "id": setJokeId,
        "evaluation": 0,
        "evaluationCount": 0,
        "content": document.getElementById('Mod1Content').value,
        "userName": userName,
        "jokeTypeId": setJokeType,
        "temperature": 0,
        "sunRain": true,
        "wind": 0,
        "snow": true,
        "season": 0
    }
    let xhr = new XMLHttpRequest(); // Creating a XHR object
    let url = ServerAdress + "/Jokes/" + document.getElementById('Mod1Password').value;
    xhr.open("PUT", url, true); // open a connection
    xhr.setRequestHeader("Content-Type", "application/json"); // Set the request header i.e. which type of content you are sending
    xhr.onreadystatechange = function () { // Create a state change callback
        if (xhr.readyState === 4 && xhr.status === 200) {// Alert received data from server
            const obj = JSON.parse(this.responseText);
            alert("Vtip uložen: \n" + obj.content);
            $('#edit').modal('hide');
            GetJokeOfId(setJokeId);
        } else if (xhr.readyState === 4 && xhr.status === 401) {
            alert("Zadáno neplatné heslo uživatele, který vtip vložil do databáze.\nHeslo uživatele Návštěvník je \"n\".");
        } else if (xhr.readyState === 4 && xhr.status === 405) {
            alert("Je nutné zadat heslo uživatele, který vtip vložil do databáze.\nHeslo uživatele Návštěvník je \"n\".");
        }
    };
    var data = JSON.stringify(JokeJSON); // Converting JSON data to string
    xhr.send(data);// Sending data with the request
}

function DeleteModal() {
    document.getElementById('Mod2Password').value = "";
    document.querySelector('[id="Mod2LabelPassword"]').innerHTML = "Heslo uživatele " + userName;
}
function DeleteJoke() {
    let xhr = new XMLHttpRequest(); // Creating a XHR object
    let url = ServerAdress + "/Jokes/" + setJokeId + ",%20" + document.querySelector('[id="Mod2Password"]').value;
    xhr.open("DELETE", url, true); // open a connection
    xhr.setRequestHeader("Content-Type", "application/json"); // Set the request header i.e. which type of content you are sending
    xhr.onreadystatechange = function () { // Create a state change callback
        if (xhr.readyState === 4 && xhr.status === 200) {// Alert received data from server
            const obj = JSON.parse(this.responseText);
            alert("Vtip vymazán: \n" + obj.content);
            $('#delete').modal('hide');
            GetPreviousNextJokeOfType("true");
        } else if (xhr.readyState === 4 && xhr.status === 401) {
            alert("Zadáno neplatné heslo uživatele, který vtip vložil do databáze.\nHeslo uživatele Návštěvník je \"n\".");
        } else if (xhr.readyState === 4 && xhr.status === 404) {
            alert("Je nutné zadat heslo uživatele, který vtip vložil do databáze.\nHeslo uživatele Návštěvník je \"n\".");
        }
    };
    xhr.send();// Sending data with the request
}

async function GetFirstJokeOfType(JokeType) {
    const url = ServerAdress + '/Jokes/' + JokeType;
    jSONresponse = await SendGetRequest(url);
    FillJokeForm(jSONresponse);
}

async function GetJokeOfId(EditJokeId) {
    const url = ServerAdress + '/Edit/' + EditJokeId;
    jSONresponse = await SendGetRequest(url);
    FillJokeForm(jSONresponse);
}

async function GetPreviousNextJokeOfType(PrevNext) {
    const url = ServerAdress + '/Jokes/' + setJokeId + ',%20' + setJokeType + ',%20' + PrevNext;
    jSONresponse = await SendGetRequest(url);
    FillJokeForm(jSONresponse);
}

function FillJokeForm(jSONresponse) {
    content = jSONresponse.content;
    userName = jSONresponse.userName;
    setJokeId = jSONresponse.id;
    setJokeType = jSONresponse.jokeTypeId;
    document.querySelector('[id="JokeText"]').innerHTML = content;
    document.querySelector('[id="UserText"]').innerHTML = "Vtip vložil uživatel: " + userName;
}

async function GetWeatherAndJokeForCity() {
    let townId;
    town = document.getElementById('selTown').value;
    let selTown = document.getElementById('selTown');
    townId = selTown.options[selTown.selectedIndex].getAttribute('townId');
    switch (townId) {
        case "Hk": document.getElementById('spanDescription').innerHTML = "<strong>Průměrná roční teplota 9, 2 °C.<br />Průměrné srážky za rok cca. 630 mm.</strong><br />Země: Česká republika, počet obyvatel: 92 763<br />"
            ; country = "Czech_Republic"; break;
        case "Pr": document.getElementById('spanDescription').innerHTML = "<strong>Průměrná roční teplota 10, 8 °C.<br />Průměrné srážky za rok cca. 500 mm.</strong > <br />Země: Česká republika, počet obyvatel: 1 275 406 <br />"
            ; country = "Czech_Republic"; break;
        case "Me": document.getElementById('spanDescription').innerHTML = "<strong>Město s jednou z nejvyšších průměrných teplot v Asii.<br />Průměrná roční teplota je kolem 29 °C (dle zdroje).</strong > <br />Země: Království Saúdská Arábie, počet obyvatel: 2 000 000"
            ; country = "Saudi_Arabia"; break;
        // case "Oj": document.getElementById('spanDescription').innerHTML = "<strong>Jendo z nejchladnějších trvale obydlených míst na zemi.<br /> Průměrná teplota za leden, únor a prosinec zůstává pod –40 °C.</strong > <br />Země: Ruská federace, počet obyvatel: 550"; country = "Russia"; break;
        case "Qu": document.getElementById('spanDescription').innerHTML = "<strong> Nejdeštivější město na světě.<br /> Průměrné srážky za rok jsou 7 000 mm - 8 000 mm (dle zdroje)</strong > <br />Země: Kolumbie, počet obyvatel: 129 237"; country = "Choco"; break;
        case "We": document.getElementById('spanDescription').innerHTML = "<strong>Největrnější město na světě.<br /> Průměrná rychlost větru za celý rok je 22 km/h a za září téměř 27 km/h.</strong > <br />Země: Nový Zéland, počet obyvatel: 180 000<br />"
            ; country = "New_Zealand"; break;
        case "Bo": document.getElementById('spanDescription').innerHTML = "<strong>Jedno z měst s nejvyšším výskytem bouřek na světě.<br />Město leží na úpatí sopky, na které bývá cca. 320 dní s bouřkou v roce.</strong > <br />Země: Indonésie, počet obyvatel: 1 091 396"; country = "Indonesia"; break;
    }

    const url = ServerAdress + '/weather/WeatherStack/' + town + ',%20' + country;
    jSONresponse = await SendGetRequest(url);
    FillWeatherJokeForm(jSONresponse);
}
async function TestWeatherAndJokeForCity() {
    let jSONresponse;
    weather_code = document.getElementById("checkWeatherCode").value;
    const url = ServerAdress + '/weather/WeatherTest/' + weather_code;
    jSONresponse = await SendGetRequest(url);
    FillWeatherJokeForm(jSONresponse);
}

async function GetPreviousNextWeatherJoke(PrevNext) {
    let jSONresponse;
    const url = ServerAdress + '/weather/WeatherStackPreviousNext/' + weather_code + ',%20' + temperature + ',%20' + wind_speed + ',%20' + jokeId + ',%20' + PrevNext;
    jSONresponse = await SendGetRequest(url);
    content = jSONresponse.Content;
    jokeId = jSONresponse.Id;
    document.querySelector('[id="JokeText"]').innerText = jSONresponse.Content;
    document.querySelector('[id="UserText"]').innerText = "Vtip vložil uživatel: Petr";
}

async function SendGetRequest(url) {
    const response = await fetch(url);
    const jSONresponse = await response.json();
    console.log(jSONresponse);
    return jSONresponse;
}

function FillWeatherJokeForm(jSONresponse) {
    weather_code = jSONresponse.Weather_code;
    temperature = jSONresponse.Temperature;
    wind_speed = jSONresponse.WindSpeed;
    pictureAddress = jSONresponse.PictureAddress;
    description = jSONresponse.Description;
    humidity = jSONresponse.Humidity;
    content = jSONresponse.Content;
    jokeId = jSONresponse.Id;
    document.querySelector('[id="divPicture"]').innerHTML = '<img src="' + pictureAddress + '" class="img-responsive rounded" temp="Weather picture" />';
    document.getElementById('description').innerText = description;
    document.getElementById('temperature').innerText = temperature + " °C";
    document.getElementById('windSpeed').innerText = wind_speed + " km/h";
    document.getElementById('humidity').innerText = humidity + " %";
    document.querySelector('[id="JokeText"]').innerText = content;
    document.querySelector('[id="UserText"]').innerText = "Vtip vložil uživatel: Petr";
}

window.onload = function () {
    GetWeatherAndJokeForCity();
}