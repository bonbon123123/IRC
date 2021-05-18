let button = document.getElementById("submit")
let nick = prompt("give me your nick")
var randomColor = Math.floor(Math.random() * 16777215).toString(16);

let addButton = document.createElement("div")
addButton.addEventListener("click", sendData)
addButton.id = "submit"
document.body.append(addButton)

function sendData() {
    if (document.getElementById("message").value.slice(0, 1) == "/") {
        command()
    }
    else {

        let data = {
            "color": randomColor,
            "nick": nick,
            "message": document.getElementById("message").value
        }

        fetch("/send", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTD-8",
            }
        })
            ``
        document.getElementById("message").value = ""
    }
}

function command() {
    console.log(document.getElementById("message").value.slice(1, 7))
    if (document.getElementById("message").value.slice(1, 7) == "colour") {
        randomColor = document.getElementById("message").value.slice(8)
    }
    if (document.getElementById("message").value.slice(1, 5) == "nick") {
        nick = document.getElementById("message").value.slice(6)
    }
    if (document.getElementById("message").value.slice(1, 11) == "background") {
        let color = document.getElementById("message").value.slice(12)
        if (color.length == 6) {

            if (color == "yellow" || color == "orange" || color == "purple") {
                document.getElementById("chat").style.backgroundColor = color
            }
            else {
                document.getElementById("chat").style.backgroundColor = `#${color}`
            }
        }
        else {
            document.getElementById("chat").style.backgroundColor = color
        }

    }
    document.getElementById("message").value = ""

}


var poll = function () {
    $.ajax({
        url: "http://localhost:8080/poll",
        success: function (data) {
            console.log(data);
            let div = document.createElement("div")
            let nickname = document.createElement("span")
            console.log(data.color.length)
            console.log(data.color)
            if (data.color.length == 6) {
                console.log(1)
                if (data.color == "yellow" || data.color == "orange" || data.color == "purple") {
                    console.log(2)
                    nickname.style.color = `${data.color}`
                }
                else {
                    console.log(3)
                    nickname.style.color = `#${data.color}`
                }
                console.log(4)
            }
            else {
                nickname.style.color = `${data.color}`
            }
            nickname.innerText = data.nick + ": "
            nickname.className = "span"
            let text = document.createElement("span")
            text.innerText = data.message
            text.className = "text"

            div.append(nickname)
            div.append(text)
            document.getElementById("chat").append(div)
            $('.text').emoticonize({
                delay: 100,
                animate: true,
                //exclude: 'pre, code, .no-emoticons'
            });
            poll();
        },
        error: function () {
            poll();
        },
        timeout: 30000 // 30 seconds
    });
};

// Make sure to call it once first,
poll();