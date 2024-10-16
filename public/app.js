var factor = 4;
var next_index = 0;
var swap = false;

var resize = function(name){
    var node = document.getElementById(name);
    node.style.width = window.innerWidth + "px";
    node.style.height = window.innerHeight + "px";
    // node.childNodes[0].style["font-size"] = Math.round(window.innerHeight / factor) + "px";
    // node.childNodes[0].style["margin-top"] = Math.round(-node.childNodes[0].clientHeight / 2) + "px";
};

var resize_buttons = function(){
    var new_height = Math.round(window.innerHeight / (factor * 3));
    var middle = window.innerWidth / 2;

    var options = document.getElementById("options");
    options.style["font-size"] = Math.round(new_height / 2) + "px";
    options.style.left = Math.round(middle - (options.clientWidth / 2)) + "px";
};

var toggle = function(name, visibility){
    var node = document.getElementById(name);
    if(visibility === undefined){
        visibility = node.style.display === "none" ? "block" : "none";
    }

    node.style.display = visibility;
    resize(name);
};

var set_text = function(name, text){
    var node = document.getElementById(name);
    node.childNodes[0].innerText = text;
    resize(name);
};

var next_card = function(random){
    random = random || false;
    var req = new XMLHttpRequest();
    var url = "/card.json?next=" + next_index;
    if(random){
        url = "/card.json?rand=true";
    }
    url += "&swap=" + swap;
    req.open("GET", url, true);
    req.onreadystatechange = function () {
        if(req.readyState != 4 || req.status != 200) return;
        var response = JSON.parse(req.responseText);
        toggle("question", "block");
        toggle("answer", "none");
        set_text("question", response.card.question);
        set_text("answer", response.card.answer);
        next_index = response.index;
    };
    req.send();
};


window.onresize = function(){
    resize("question");
    resize("answer");
    resize_buttons();
}
window.onresize();
next_card();

$(document).click(function(){
    toggle("question");
    toggle("answer");
});

$("#next").click(function(evt){
    evt.stopPropagation();
    next_index += 1;
    next_card();
});

$("#last").click(function(evt){
    evt.stopPropagation();
    next_index -= 1;
    if(next_index < 0){
        next_index = 0;
    }
    next_card();
});

$("#random").click(function(evt){
    evt.stopPropagation();
    next_card(true);
});

$("#swap").click(function(evt){
    evt.stopPropagation();
    var self = $(this);
    if(self.hasClass("normal")){
        swap = true;
        self.removeClass("normal");
        self.addClass("swap");
        self.text("Swap");
    } else if(self.hasClass("swap")){
        swap = "random";
        self.removeClass("swap");
        self.addClass("random");
        self.text("Random");
    } else{
        swap = false;
        self.removeClass("swap");
        self.removeClass("random");
        self.addClass("normal");
        self.text("Normal");
    }
});
