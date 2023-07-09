const audioElement = document.querySelector("#audio");
const button = document.querySelector("#button");


function tellMe(joke) {
    console.log("tell me:", joke);

    VoiceRSS.speech({
        key: '11026494443b4ced8c03500a4ff7210e',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

async function getJokes() {
    let joke = "";
    const apiUrl = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke
        }
        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log(error);
    }
}

function toggleButton() {
    button.disabled = !button.disabled;
}

button.addEventListener("click",getJokes);

audioElement.addEventListener("ended", toggleButton)

