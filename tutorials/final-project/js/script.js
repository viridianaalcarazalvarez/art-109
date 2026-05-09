const container = document.getElementById("container");

const story = {
    "click me": ["why", "enter", "hello"],
    "why": ["because", "you asked"],
    "enter": ["deeper", "continue"],
    "hello": ["is anyone there?"],

    "because": ["nothing lasts"],
    "you asked": ["you shouldn't have"],

    "deeper": ["almost there"],
    "continue": ["keep going"],

    "is anyone there?": ["i am"],

    "nothing lasts": ["END"],
    "you shouldn't have": ["END"],
    "almost there": ["END"],
    "keep going": ["END"],
    "i am": ["END"]
};

function createWord(text, x, y) {
    const el = document.createElement("div");
    el.className = "word";
    el.innerText = text;

    el.style.left = x + "px";
    el.style.top = y + "px";

    el.addEventListener("click", (e) => {
        e.stopPropagation();

        if (text === "END") {
            el.classList.add("final");
            document.body.style.background = "darkred";
            return;
        }

        const nextWords = story[text];

        if (nextWords) {
            nextWords.forEach(word => {
                createWord(
                    word,
                    x + (Math.random() * 300 - 150),
                    y + (Math.random() * 300 - 150)
                );
            });
        }

        el.remove();
    });

    container.appendChild(el);
}

createWord(
    "click me",
    window.innerWidth / 2 - 50,
    window.innerHeight / 2 - 20
);