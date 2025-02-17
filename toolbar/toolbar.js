class Toolbar {
    constructor() {
        this.height = 40;
        this.tools = {
            brushes: new Brushes(),
            eraser: new Eraser()
        };
        this.currentTool = this.tools.brushes;
        
        this.toolButtons = {

            brush: { x: 10, y: 10, width: 60, height: 20 },
            eraser: { x: 80, y: 10, width: 60, height: 20 }
        };
        
        this.clearButton = {
            x: width - 70,
            y: 10,
            width: 60,
            height: 20
        };
        
        this.draw();
        this.updateCursor();
    }

    updateCursor() {
        if (mouseY > this.height) {  // show the tool cursor when below the toolbar
            if (this.currentTool === this.tools.brushes) {
                cursor(pencilCursor, pencilCursor.width/2, pencilCursor.height/2);
            } else if (this.currentTool === this.tools.eraser) {
                cursor(eraserCursor, eraserCursor.width/2, eraserCursor.height/2);
            }
        } else {
            cursor(ARROW); //default cursor in toolbar area
        }
    }

    draw() {

        fill(200);
        noStroke();
        rect(0, 0, width, this.height);
        
        fill(this.currentTool === this.tools.brushes ? '#ADE' : 255);
        rect(this.toolButtons.brush.x, this.toolButtons.brush.y, this.toolButtons.brush.width, this.toolButtons.brush.height);
        fill(this.currentTool === this.tools.eraser ? '#ADE' : 255);
        rect(this.toolButtons.eraser.x, this.toolButtons.eraser.y, this.toolButtons.eraser.width, this.toolButtons.eraser.height);
        

        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);

        text('Brush', this.toolButtons.brush.x + this.toolButtons.brush.width/2,
             this.toolButtons.brush.y + this.toolButtons.brush.height/2);
        text('Eraser', this.toolButtons.eraser.x + this.toolButtons.eraser.width/2,
             this.toolButtons.eraser.y + this.toolButtons.eraser.height/2);
        
        // size options
        this.currentTool.drawToolbar(160, 10);
        
        fill(255);
        rect(this.clearButton.x, this.clearButton.y, this.clearButton.width, this.clearButton.height);
        fill(0);
        text('Clear', this.clearButton.x + this.clearButton.width/2, this.clearButton.y + this.clearButton.height/2);
             
        this.updateCursor(); 
    }

    getCurrentTool() {
        return this.currentTool;
    }

    handleClick(x, y) {
        if (y < this.height) {
            // handle clear
            if (x > this.clearButton.x && x < this.clearButton.x + this.clearButton.width &&
                y > this.clearButton.y && y < this.clearButton.y + this.clearButton.height) {
                background(255);
                this.draw();
                stroke(0);
                strokeWeight(2);
                noFill();
                rect(0, 0, width-1, height-1);
                return;
            }
            
            // tool selection had assistance from chatgpt here
            if (x > this.toolButtons.brush.x && x < this.toolButtons.brush.x + this.toolButtons.brush.width &&
                y > this.toolButtons.brush.y && y < this.toolButtons.brush.y + this.toolButtons.brush.height) {
                this.currentTool = this.tools.brushes;
                this.draw();

            } else if (x > this.toolButtons.eraser.x && x < this.toolButtons.eraser.x + this.toolButtons.eraser.width &&
                       y > this.toolButtons.eraser.y && y < this.toolButtons.eraser.y + this.toolButtons.eraser.height) {
                this.currentTool = this.tools.eraser;
                this.draw();
            }
            
            this.currentTool.handleClick(x, y);
            
            //redraw canvas
            stroke(0);
            strokeWeight(2);
            noFill();
            rect(0, 0, width-1, height-1);
        }
    }
}