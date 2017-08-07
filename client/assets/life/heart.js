console.log("Adding skeleton");
console.log("Giving shape");
console.log("Adding beauty");
console.log("Initializing heart..");



JARVIS = {
    recognizer: null,
    getRecognizer: function () {
        return this.recognizer;
    },
    speechrecognizerList: null,
    grammar: '#JSGF V1.0;',
    check: function () {
        console.log("check..");
        if ('SpeechRecognition' in window) {
            console.log("Non experimental");
            this.recognizer = new SpeechRecognition();
            this.speechrecognizerList = new SpeechGrammarList();
            return true;
        }

        if ('webkitSpeechRecognition' in window) {
            console.log("experimental");
            this.recognizer = new webkitSpeechRecognition();
            this.speechrecognizerList = new webkitSpeechGrammarList();
            return true;
        }
        return false;
    },
    setOptions: function () {
        this.speechrecognizerList.addFromString(this.grammar, 1);
        this.recognizer.grammars = this.speechrecognizerList;
        //recognizer.continuous = false;
        this.recognizer.lang = 'en-US';
        this.recognizer.interimResults = false;
        this.recognizer.maxAlternatives = 1;
        return this;
    },
    addListeners: function () {
        var jarvis = this;
        var button = document.querySelector('#mic');
        button.onclick = function () {
            jarvis.speechMatch = false;
            jarvis.start();
            console.log('Ready to receive a command.');
        }

        return this;
    },
    process: function (data) {
        var res = data.results[0][0].transcript;
        console.log(data);
        this.display(res);
        this.search(res);
        return this;
    },
    search: function (data) {
        console.log("search :: ", data);
        this.startSearching();
        var jarvis = this;

        if (data.indexOf('volume') > -1) {
            if (data.indexOf('up') > -1) {
                $.ajax({
                    type: "GET",
                    url: "/volume/up",
                    success: function (data) {
                        $("#data").html(data.response);
                    }
                });
            }
            if (data.indexOf('down') > -1) {
                $.ajax({
                    type: "GET",
                    url: "/volume/down",
                    data: {
                        text: data
                    },
                    success: function (data) {
                        $("#data").html(data.response);
                    }
                });
            }
        }


        setTimeout(function () {
            jarvis.stopSearching();
        }, 1000);
    },
    display: function (data) {
        document.querySelector('#speech').value = data;
    },
    start: function () {
        //show loading
        this.recognizer.start();
        document.querySelector('#speech').value = "";
        document.querySelector('#mic').classList.add('heart-beat');
        return this;
    },
    stop: function () {
        // hide loading
        this.recognizer.stop();
        document.querySelector('#mic').classList.remove('heart-beat');
        console.log("stopped");
        return this;
    },
    startSearching: function () {
        console.log("searching start");
        document.querySelector('#searching').style.display = 'block';
    },
    stopSearching: function () {
        console.log("searching stop ");
        document.querySelector('#searching').style.display = 'none';
    },
    init: function (window) {
        var jarvis = this;
        if (jarvis.check()) {
            jarvis.setOptions().addListeners();

            jarvis.recognizer.onresult = function (event) {
                jarvis.speechMatch = true;
                jarvis.process(event).stop();
            }

            jarvis.recognizer.onend = function (e) {
                if (!jarvis.speechMatch) {
                    console.log("no match")
                    jarvis.stop();
                }

            }

        } else {
            console.log('not supported');
        }

    },
    speechMatch: false
}

JARVIS.init(window);

console.log("Heart beating..");