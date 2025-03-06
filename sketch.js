let toolbar;
let pencilCursor;
let eraserCursor;

function preload() {

    pencilCursor = loadImage('assets/pencil.png');
    eraserCursor = loadImage('assets/eraser.png');
}



function setup() {
    createCanvas(1200, 800);
    background(255);
    
    toolbar = new Toolbar();
    
    // Draw canvas border
    stroke(0);
    strokeWeight(2);
    noFill();
    rect(0, 0, width-1, height-1);
}

function draw() {
    if (mouseIsPressed && mouseY > toolbar.height) {
        toolbar.getCurrentTool().draw();
    }
    
    toolbar.updateCursor();
}

function mousePressed() {
	
    toolbar.handleClick(mouseX, mouseY);
}