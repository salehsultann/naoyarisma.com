$.getJSON("post.php", (questions) => {
    v = new Vue({
        el: "#quiz",
        data: {
            name: "",
            lockName: "false",
            index: 0,
            image: config["broken-image"],
            choices: [],
            message: "",
            answer: "",
            registration_end: config["registration-end"],
            registration_start: config["registration-start"],
            start_time: config["start-time"],
            ended: false,
            submitted: false,
        },
        methods: {
            load: function(n) {
                this.image =
                    questions[n]["image-link"] || config["broken-image"];
                //   alert(questions)
                this.choices = questions[n].choices || [];
                this.answer = "";
                if (config.debug)
                    console.log("Loading index: " + n + "\nimage = " + this.image + "\nchoices = " + this.choices);
            },
            send: function() {
                if (this.name) {
                    this.lockName = true;
                    if (this.choices.length > 0) {
                        if (document.querySelector('input.form-check-input:checked') != null) {
                            this.answer = document.querySelector('input.form-check-input:checked').value || ""

                        } else {
                            this.answer = ""
                        }
                    }
                    if (config.debug)
                        console.log("Posting answer " + this.answer + "\nto url = " + config["send-url"] + "\nat index = " + (this.index + 1));
                    try {
                        $.post(config["send-url"], {
                            ad_soyad: this.name,
                            cevap: this.answer,
                            soru: (this.index + 1).toString()
                        });
                    } catch (e) {
                        if (config.debug)
                            console.error(e.message);
                    }
                } else {
                    if (config.debug)
                        console.error("No name given with answer")
                }
            },
        },
    });



    $("form#register").submit(function(e) {
        e.preventDefault();
        if (config.debug)
            console.log($(this).serialize())
        $.post(
            "submit.php",
            $(this).serialize(),
            function(data) {
                v.message = config["registered-text"]
                v.submitted = true;
            }
        );
    });


    document.title = config["page-title"];
    document.querySelector('#title').innerHTML = config["competition-name"];
    document.querySelector("link[rel~='icon']").href = config["page-icon"];
    try {

        let now = ""
        if (new Date(Date.now()) < new Date(config["registration-start"])) {
            now = new Date(config["registration-start"])
            v.message = eval(config['registration-open-text']);
            console.log(1)

        } else if (new Date(Date.now()) < new Date(config["registration-end"])) {
            now = new Date(config["registration-end"])
            v.message = eval(config['registration-text']);

        } else if (new Date(Date.now()) < new Date(config["start-time"])) {
            console.log(3)
            now = new Date(config["start-time"])
            v.message = eval(config['registration-closed-text']) + eval(config['start-text']);
        }
    } catch (e) {
        if (config.debug)
            console.error(e.message);
    }

    // try {
    //   try {
    //   v.message = eval(config['start-text']); 
    //   } catch (e) {
    //     v.message = config['start-text'];
    //   }
    // } catch (e) {
    //   if (config.debug)
    //     console.error(e.message);
    // }

    dateCheck();


    $("body").append('<footer class="footer">\
<div class="container">\
    <span class="text-muted">Bu sistem <img class="icon" src="https://onkayit.nesibeaydin.com.tr/img/logo_mesale.png"\
            style="position: relative; padding-right: 3px; padding-bottom: 3px; width: 20px; height: 20px;"><a\
            href="https://www.ardagurcan.com" target="_blank" class="text-dark">Arda\
            Gurcan ve Saleh Sultan</a> tarafından <a href="https://naoyarisma.com/CC-BY-4.0.txt" target="_blank"\
            class="text-dark">Creative Commons Atıf Lisansı</a> altında kodlanmıştır.</span>\
</div>');

    function dateCheck() {
        $.post("date.php", {}, (currentDate) => {
            if (config.debug) {
                console.log("date loop");
                console.log(currentDate);
            }
            let dateLoop = setTimeout(() => dateCheck(), 1000)
            let diff = new Date(currentDate) - new Date(config["start-time"]);
            if (diff >= 0) {
                clearTimeout(dateLoop);
                mainLoop()
            }
        })

    }

    function mainLoop() {
        if (config.debug)
            console.log("main loop");
        let loop = setTimeout(() => mainLoop(), 1000)
        let diff = Date.now() - new Date(config["start-time"]);
        if (diff - 100 > (config["question-duration"] * 1000 + config["break-duration"] * 1000) * questions.length - (config["break-duration"] * 1000)) {
            v.ended = true
            clearTimeout(loop);

            try {
                try {
                    v.message = eval(config['end-text']);
                } catch (e) {
                    v.message = config['end-text'];
                }
            } catch (e) {
                if (config.debug)
                    console.error(e.message);
            }
        } else {
            let actualIndex = Math.floor((diff + config["break-duration"] * 1000) / (config["question-duration"] * 1000 + config["break-duration"] * 1000));
            if (v.index != actualIndex && actualIndex != 0) {
                v.send()
                v.index = actualIndex;
            }
            if (diff % (config["question-duration"] * 1000 + config["break-duration"] * 1000) < config["question-duration"] * 1000) {
                if (v.message != "") {
                    v.load(v.index)
                    v.message = ""
                }
            } else {
                try {
                    try {
                        v.message = eval(config['break-text']);
                    } catch (e) {
                        v.message = config['break-text'];
                    }
                } catch (e) {
                    if (config.debug)
                        console.error(e.message);
                }
            }
        }
    }
})