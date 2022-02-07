let rooter = router({
    "": div(
        h1("Hello"),
        p("Test test test"),
        a("Go to the bad place").attr("href", "#bad").attr("style", "display:block"),
        a("Go to the good place").attr("href", "#good").attr("style", "display:block"),
        h2("Header 1"),
        p("Test test test"),
        input("text"),
        input("date"),
        p("Here's a random value: ", span(() => Math.floor(Math.random() * 1e9))),
        h2("Header 2"),
        p("Test test test"),
        p("Another paragraph"),
        input("button").attr("value", "Update").click(() => update(rooter)),
        p("Here is a select with a random number of options:"),
        () => {
            let options = [];
            let n = Math.random() * 20;
            for (let i = 0; i < n; i++)
                options.push(option(Math.floor(Math.random() * 30), i));
            return select(...options);
        },
        p("Yay!"),
        img("https://c.tenor.com/r6HKpp3o7EcAAAAC/pogchamp-triggered.gif")
    ),
    "bad": div(
        h1("Bad website!"),
        p("There is some really bad content here"),
        a("Go back").attr("href", "#"),
        select(option("asdf"), optgroup("faafaa", option("foofoo"), option("feefee")))
    ),
    "good": div(
        h1("Good website!"),
        p("There is some great content here"),
        a("Go back").attr("href", "#")
    ),
}, () => window.location.hash.split("#")[1] || "");
window.onhashchange = () => update(rooter);

document.body.appendChild(rooter);

