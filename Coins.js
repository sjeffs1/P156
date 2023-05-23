AFRAME.registerComponent("fish", {
    init: function () {
    for (var i = 1; i <= 10; i++) {
    const id = `coin$(1)`;
    const posX = Math.random() * 100-50;
    const posY= Math.random() * 5+5;
    const posZ = Math.random() * 60 + -40;
    const position = {x: posX, y: posY, z: posZ };
    this.createCoins(id, position);
    }
    },
    createCoins: function (id, position) {
        const treasureEntity = document.querySelector("#treasureCoins");
        var coinEl = document.createElement("a-entity");
        coinEl.setAttribute("id", id);
        coinEl.setAttribute("position", position);
        coinEl.setAttribute("material", "color", "#ff9100");
        coinEl.setAttribute("geometry",{ primitive: "circle", radius: 1 });
        coinEl.setAttribute("animation", {
            property: "rotation",
            to: "0 360 0",
            loop: "true",
            dur: 1000
    });

        
    treasureEntity.appendChild(coinEl);
    },

    startTimer: function (duration, timerEl) {
        var minutes;
        var seconds;

        setInterval(()=> {
        if (duration >= 0) {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            if (minutes < 10) {
            minutes = "0" + minutes;
            }
            if (seconds < 10) {
            seconds = "0" + seconds;
            }

            timerEl.setAttribute("text", {
            value: minutes + ":" + seconds,
            });

            duration -= 1;
        } 
        else {
            this.gameOver()      
        }
        }, 1000)
    },
    isCollided: function (elemntId) {
        const element = document.querySelector(elemntId);
        element.addEventListener("collide", (e) => {
        if (elemntId.includes("#ring")) {
            element.setAttribute("visible", false)
            this.updateScore()
            this.updateTarget()
    
        } else {
            this.gameOver()
        }
        });
    },

    updateTarget: function () {
        var element = document.querySelector("#targets")
        var count = element.getAttribute("text").value
        var currentTargets = parseInt(count)
        currentTargets -= 1
        element.setAttribute("text", {value:currentTargets})
    },

    updateScore: function () {
        var element = document.querySelector("#score")
        var count = element.getAttribute("text").value
        var currentScore = parseInt(count)
        currentScore += 50
        element.setAttribute("text", {value:currentScore})
    },

    gameOver: function () {
        var planeEl = document.querySelector("#plane_model")
        var element = document.querySelector("#game_over_text")
        element.setAttribute("visible", true)
        planeEl.setAttribute("dynamic-body", {mass: 1})
    }
    
    });

