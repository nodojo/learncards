var http = require("http");
var path = require("path");

var express = require("express");


function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


var root = path.join(__dirname, "..");

var argc = process.argv.length;
if(argc < 3){
    console.error("must provide data file, e.g. \"learncards data.json\"");
    process.exit(1);
}
var data_file = path.join(process.cwd(), process.argv[argc - 1]);
var data = require(data_file);

if(typeof(data) !== "object" || !data.hasOwnProperty("cards")){
    console.error("data file ", data_file, "does not contain \"cards\" property");
    process.exit(1);
}

var num_cards = data.cards.length;
for(var i = 0; i < num_cards; ++i){
    var next = data.cards[i];
    if(!next.hasOwnProperty("question")){
        console.error("card", next, "requires \"question\" property");
        process.exit(1);
    }
    if(!next.hasOwnProperty("answer")){
        console.error("card", next, "requires \"answer\" property");
        process.exit(1);
    }
}

var title = "Learn Cards";
if(data.hasOwnProperty("title")){
    title = data.title + " - Learn Cards";
}

var app = express();
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(root, "views"));
app.set("view engine", "jade");

app.use(express.favicon());
app.use(app.router);
app.use(express.static(path.join(root, "public")));
app.use(express.errorHandler());


app.get("/", function(req, res){
    res.render("index", {title: title});
});

app.get("/card.json", function(req, res){
    var index = 0;
    if(req.query.next){
        index = parseInt(req.query.next);
    } else if(req.query.rand){
        index = Math.floor(Math.random() * num_cards);
    }
    if(index >= num_cards){
        index = 0;
    }
    var card = {};
    card.question = data.cards[index].question;
    card.answer = data.cards[index].answer;
    if(req.query.swap){
        var swap = req.query.swap || "";
        swap = swap.toLowerCase();
        if(Boolean(swap)){
            if(swap == "true" || (swap == "random" && Math.random() < 0.5)){
                var q = card.question;
                card.question = card.answer;
                card.answer = q;
            }
        }
    }
    res.json(200, {index: index, card: card});
});

var server = http.createServer(app);
server.listen(app.get("port"), function(){
    console.log("learncards is listening on port", app.get("port"));
});
