var canvas = document.getElementById("map");
var ctx = canvas.getContext("2d");

console.clear();

var mouseX = null,
    mouseY = null;
 
var xShift = 0,
	yShift = 0;

var sizeNumber = new Map();
sizeNumber.set("t", 5);
sizeNumber.set("s", 10);
sizeNumber.set("m", 15);
sizeNumber.set("l", 30);
sizeNumber.set("h", 45);

var sizeName = new Map();
sizeNumber.set("t", 5);
sizeNumber.set("s", 10);
sizeNumber.set("m", 15);
sizeNumber.set("l", 30);
sizeNumber.set("h", 45);

function Creature(x, y, color, name, size) {
    this.x = x;
    this.y = y;
    this.xGoal = x;
    this.yGoal = y;
    this.z = 0;
    this.size = size
    this.r = sizeNumber.get(this.size);
    this.rGoal = sizeNumber.get(this.size);
    this.color = color;
    this.name = name;
    this.selected = false;
    this.held = false;
}

Creature.prototype.draw = function() {
    if (this.z > 0) {
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.beginPath();
        ctx.arc(this.x - this.z, this.y + this.z, this.r, Math.PI * 2, false);
        ctx.fill();
    }
    if (this.selected) {
        ctx.strokeStyle = "white";
        if (this.size == "t") {
            ctx.beginPath();
            ctx.moveTo(this.x - 8.75, this.y - 5.75);
            ctx.lineTo(this.x - 8.75, this.y - 8.75);
            ctx.lineTo(this.x - 5.75, this.y - 8.75);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x - 8.75, this.y + 5.75);
            ctx.lineTo(this.x - 8.75, this.y + 8.75);
            ctx.lineTo(this.x - 5.75, this.y + 8.75);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 8.75, this.y - 5.75);
            ctx.lineTo(this.x + 8.75, this.y - 8.75);
            ctx.lineTo(this.x + 5.75, this.y - 8.75);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 8.75, this.y + 5.75);
            ctx.lineTo(this.x + 8.75, this.y + 8.75);
            ctx.lineTo(this.x + 5.75, this.y + 8.75);
            ctx.stroke();
        }
        else if (this.size == "m" || this.size == "s") {
            ctx.beginPath();
            ctx.moveTo(this.x - 17.5, this.y - 10.5);
            ctx.lineTo(this.x - 17.5, this.y - 17.5);
            ctx.lineTo(this.x - 10.5, this.y - 17.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x - 17.5, this.y + 10.5);
            ctx.lineTo(this.x - 17.5, this.y + 17.5);
            ctx.lineTo(this.x - 10.5, this.y + 17.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 17.5, this.y - 10.5);
            ctx.lineTo(this.x + 17.5, this.y - 17.5);
            ctx.lineTo(this.x + 10.5, this.y - 17.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 17.5, this.y + 10.5);
            ctx.lineTo(this.x + 17.5, this.y + 17.5);
            ctx.lineTo(this.x + 10.5, this.y + 17.5);
            ctx.stroke();
        }
        else if (this.size == "l") {
            ctx.beginPath();
            ctx.moveTo(this.x - 35, this.y - 25);
            ctx.lineTo(this.x - 35, this.y - 35);
            ctx.lineTo(this.x - 25, this.y - 35);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x - 35, this.y + 25);
            ctx.lineTo(this.x - 35, this.y + 35);
            ctx.lineTo(this.x - 25, this.y + 35);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 35, this.y - 25);
            ctx.lineTo(this.x + 35, this.y - 35);
            ctx.lineTo(this.x + 25, this.y - 35);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 35, this.y + 25);
            ctx.lineTo(this.x + 35, this.y + 35);
            ctx.lineTo(this.x + 25, this.y + 35);
            ctx.stroke();
        }
        else if (this.size == "h") {
            ctx.beginPath();
            ctx.moveTo(this.x - 52.5, this.y - 37.5);
            ctx.lineTo(this.x - 52.5, this.y - 52.5);
            ctx.lineTo(this.x - 37.5, this.y - 52.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x - 52.5, this.y + 37.5);
            ctx.lineTo(this.x - 52.5, this.y + 52.5);
            ctx.lineTo(this.x - 37.5, this.y + 52.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 52.5, this.y - 37.5);
            ctx.lineTo(this.x + 52.5, this.y - 52.5);
            ctx.lineTo(this.x + 37.5, this.y - 52.5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 52.5, this.y + 37.5);
            ctx.lineTo(this.x + 52.5, this.y + 52.5);
            ctx.lineTo(this.x + 37.5, this.y + 52.5);
            ctx.stroke();
        }
    }
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();
}

Creature.prototype.align = function() {
    if (this.size == "t") {
        this.xGoal = Math.round((this.x - 8.75) / 17.5) * 17.5 + 8.75;
        this.yGoal = Math.round((this.y - 8.75) / 17.5) * 17.5 + 8.75;
    } else if (this.size == "l") {
        this.xGoal = Math.round(this.x / 35) * 35;
        this.yGoal = Math.round(this.y / 35) * 35;
    } else {
        this.xGoal = Math.round((this.x - 17.5) / 35) * 35 + 17.5;
        this.yGoal = Math.round((this.y - 17.5) / 35) * 35 + 17.5;
    }
}

Creature.prototype.update = function() {
    if (this.x != this.xGoal) {
        this.x -= 5 * Math.cos(Math.atan2(this.y - this.yGoal, this.x - this.xGoal));
        this.y -= 5 * Math.sin(Math.atan2(this.y - this.yGoal, this.x - this.xGoal));
        if (Math.pow(Math.pow(this.x - this.xGoal, 2) + Math.pow(this.y - this.yGoal, 2), 0.5) < 3) {
            this.x = this.xGoal;
            this.y = this.yGoal;
        }
    }
    if (this.z > 0) this.z--;
    if (this.r > this.rGoal) this.r--;
    else if (this.r < this.rGoal) this.r++;
}

Creature.prototype.display = function() {
	document.getElementById("name").innerHTML = this.name;
	document.getElementById("size").value = this.size;
}

Creature.prototype.resize = function() {
	this.size = document.getElementById('size').value;
    this.rGoal = sizeNumber.get(this.size);
    this.align();
}

var test1 = new Creature(332.5, 332.5, "red", "Player 1", "m");
var test2 = new Creature(367.5, 332.5, "green", "Player 2", "m");
var test3 = new Creature(332.5, 367.5, "blue", "Player 3", "m");
var test4 = new Creature(367.5, 367.5, "yellow", "Player 4", "m");

var players = [test1, test2, test3, test4];

var selected = null;
var held = null;

setInterval(draw, 40);

function draw() {
    //Draw background
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, 700, 700);

    //Draw grid
    ctx.strokeStyle = "black";
    for (i = 0; i < 19; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 35 + i * 35);
        ctx.lineTo(700, 35 + i * 35);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(35 + i * 35, 0);
        ctx.lineTo(35 + i * 35, 700);
        ctx.stroke();
    }

    //Draw creatures
    for (i = 0; i < players.length; i++) {
        players[i].draw();
        if (players[i].held) {
            players[i].x = mouseX - xShift;
            players[i].y = mouseY - yShift;
            if (players[i].z < 5) players[i].z++;
        } else {
            players[i].update();
        }
    }
}

document.onmousemove = function(e) {
    e = window.event || e;

    rect = canvas.getBoundingClientRect();
    mouseX = Math.round((e.clientX - rect.left));
    mouseY = Math.round((e.clientY - rect.top));
}

document.onmousedown = function(e) {
    e = window.event || e;

    for (i = 0; i < players.length; i++) {
        if (Math.pow(Math.pow(mouseX - players[i].x, 2) + Math.pow(mouseY - players[i].y, 2), 0.5) < players[i].r) {
            if (selected != null) players[selected].selected = false;
            players[i].selected = true;
            players[i].held = true;
            players[i].display();
            selected = i;
            held = i;
            xShift = mouseX - players[i].x;
            yShift = mouseY - players[i].y;
            break;
        }
    }
}

document.onmouseup = function(e) {
    e = window.event || e;

    if (held != null) {
        players[held].align();
        players[held].held = false;
        held = null;
    }
}
