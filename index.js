const slackBot = require('slackbots');
const axios = require('axios');

const jbot = new slackBot ({
    token: 'xoxb-307801556068-595528046402-p1rrHm6ij9rwMG0SBbmXSBS3', //get it from https://api.slack.com/apps oauth
    name: 'jokebot-slack'
})

//Start
jbot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    };
    jbot.postMessageToChannel('general', 'Want to hear a joke? add me to your channel!', params);
});

//Error handler
jbot.on('err', (err) => console.log(err));

// Message Handler
jbot.on('message', (data) => {
    if (data.type !== 'message') {  //run a api call from postman or from https://api.slack.com/methods/chat.postMessage/test to get the name/value
        return;
    } 
    handleMessage(data.text);
});

//Response to data.text

function handleMessage(text) {
    if (text.includes(' chuck')) {
        chuckJoke();
    } else if (text.includes(' yomama')) {
        yoMamaJoke();
    } else if (text.includes(' help')) {
        runHelp();
    }
}

function chuckJoke() {
    axios.get('https://api.icndb.com/jokes/random')
    .then(response => {
        const joke = response.data.value.joke;
        const params = {
            icon_emoji: ':pray:'
        };
        jbot.postMessageToChannel('general', `A Random Chuck joke: ${joke}`, params);
    })
    .catch((err) => {
        console.log(err)
    })
}

function yoMamaJoke() {
    axios.get('http://api.yomomma.info/asda')
    .then(response => {
        const joke = response.data.joke;
        const params = {
            icon_emoji: ':laughing:'
        };
        jbot.postMessageToChannel('general', `A Random yomama joke: ${joke}`, params);
    })
    .catch((err) => {
        console.log(err)
    })
}

function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }
    jbot.postMessageToChannel('general', 'Enter @jbot "yomama", "chuck" or "help"', params)
}