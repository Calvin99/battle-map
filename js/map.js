var canvas = document.getElementById("map");
var ctx = canvas.getContext("2d");

console.clear();

var mouseX = null,
    mouseY = null;
 
var xShift = 0,
	yShift = 0;
	
var hover = false;
	
var mode = "move";

var brush = false;

var sizeNumber = new Map();
sizeNumber.set("t", 5);
sizeNumber.set("s", 10);
sizeNumber.set("m", 15);
sizeNumber.set("l", 30);
sizeNumber.set("h", 45);
sizeNumber.set("g", 65);

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
    this.notes = "";
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
        ctx.lineWidth = 2;
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
        else if (this.size == "g") {
            ctx.beginPath();
            ctx.moveTo(this.x - 70, this.y - 50);
            ctx.lineTo(this.x - 70, this.y - 70);
            ctx.lineTo(this.x - 50, this.y - 70);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x - 70, this.y + 50);
            ctx.lineTo(this.x - 70, this.y + 70);
            ctx.lineTo(this.x - 50, this.y + 70);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 70, this.y - 50);
            ctx.lineTo(this.x + 70, this.y - 70);
            ctx.lineTo(this.x + 50, this.y - 70);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x + 70, this.y + 50);
            ctx.lineTo(this.x + 70, this.y + 70);
            ctx.lineTo(this.x + 50, this.y + 70);
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
    } else if (this.size == "l" || this.size == "g") {
        this.xGoal = Math.round(this.x / 35) * 35;
        this.yGoal = Math.round(this.y / 35) * 35;
    } else {
        this.xGoal = Math.round((this.x - 17.5) / 35) * 35 + 17.5;
        this.yGoal = Math.round((this.y - 17.5) / 35) * 35 + 17.5;
    }
}

Creature.prototype.update = function() {
    if (this.x != this.xGoal || this.y != this.yGoal) {
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
	document.getElementById("name").value = this.name;
	document.getElementById("size").value = this.size;
	document.getElementById("color").value = this.color;
	document.getElementById("notes").value = this.notes;
}

Creature.prototype.resize = function() {
	this.size = document.getElementById('size').value;
    this.rGoal = sizeNumber.get(this.size);
    this.align();
}

Creature.prototype.recolor = function() {
	this.color = document.getElementById('color').value;
}

var test1 = new Creature(332.5, 332.5, "red", "Player 1", "m");
var test2 = new Creature(367.5, 332.5, "lime", "Player 2", "m");
var test3 = new Creature(332.5, 367.5, "blue", "Player 3", "m");
var test4 = new Creature(367.5, 367.5, "yellow", "Player 4", "m");

var players = [test1, test2, test3, test4];

function addCreature () {
	players[players.length] = new Creature(17.5, 17.5, "red", "New Creature", "m");
}

function deleteCreature () {
	players.splice(selected,1);
	if (selected == players.length) selected--;
}

var selected = null;
var held = null;

function swapMode() {
	if (mode == "move") {
		if (selected != null) players[selected].selected = false;
		selected = null;
		document.getElementById("name").value = "None selected";
		document.getElementById("size").value = "t";
		document.getElementById("color").value = "white";
		document.getElementById("notes").innerHTML = "";
		mode = "paint";
		document.getElementById("mode").innerHTML = "Mode: Paint";
		document.getElementById("modeButton").innerHTML = "Mode Mode";
	} else {
		mode = "move";
		brush = false;
		document.getElementById("mode").innerHTML = "Mode: Move";
		document.getElementById("modeButton").innerHTML = "Paint Mode";
	}
}

var paint = [];

setInterval(draw, 40);

function draw() {
    //Draw background
    ctx.fillStyle = "#555";
    ctx.fillRect(0, 0, 700, 700);
    
    //Paint
    for (i = 0; i < paint.length; i++) {
        ctx.fillStyle = paint[i][3];
        ctx.beginPath();
        ctx.arc(paint[i][0], paint[i][1], paint[i][2], Math.PI * 2, false);
        ctx.fill();
    }

    //Draw grid
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
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
        if (players[i].held) {
            players[i].x = mouseX - xShift;
            players[i].y = mouseY - yShift;
            if (players[i].z < 5) players[i].z++;
        } else {
            players[i].update();
        }
        players[i].draw();
    }
    if (selected != null) players[selected].draw();
}

document.onmousemove = function(e) {
    e = window.event || e;

    rect = canvas.getBoundingClientRect();
    mouseX = Math.round((e.clientX - rect.left));
    mouseY = Math.round((e.clientY - rect.top));
    
    if (mode == "paint" && brush) {
    	paint[paint.length] = [mouseX, mouseY, document.getElementById("paintSize").value, document.getElementById("paintColor").value];
    }
}

document.onmousedown = function(e) {
    e = window.event || e;
	
	if (hover) {
		if (mode == "move") {
			var playerClicked = false;
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
					playerClicked = true;
					break;
				}
			}
			if (!playerClicked) {
				players[selected].selected = false;
				selected = null;
				document.getElementById("name").value = "None selected";
				document.getElementById("size").value = "t";
				document.getElementById("color").value = "white";
				document.getElementById("notes").innerHtml = "";
			}
		} else {
			brush = true;
		}
    }
}

document.onmouseup = function(e) {
    e = window.event || e;

	if (hover) {
		if (mode == "move") {
			if (held != null) {
				players[held].align();
				players[held].held = false;
				held = null;
			}
		} else {
			brush = false;
		}
    }
}
