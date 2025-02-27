class Eraser {
    constructor() {
        this.sizes = [10, 20, 30];
        this.currentSize = 20;
        this.buttonWidth = 30;
        this.buttonHeight = 20;
        this.buttonSpacing = 40;
    }

    drawToolbar(x, y) {

        for (let i = 0; i < this.sizes.length; i++) {

            fill(this.currentSize === this.sizes[i] ? '#ADE' : 255);
            rect(x + (i * this.buttonSpacing), y, this.buttonWidth, this.buttonHeight);
            
            stroke(0);
            noFill();
            strokeWeight(1);
            ellipse(x + (i * this.buttonSpacing) + this.buttonWidth/2, 
                   y + this.buttonHeight/2,  
                   this.sizes[i]/2, 
                   this.sizes[i]/2);
        }
    }

    handleClick(x, y, toolbarX, toolbar) { 

        for (let i = 0; i < this.sizes.length; i++) {
            
            let buttonX = toolbarX + (i * this.buttonSpacing);
            
            if (x > buttonX && x < buttonX + this.buttonWidth) {
                this.currentSize = this.sizes[i];
                // redraw toolbar immediately after state change
                toolbar.draw();
                break;
            }
        }
    }

    draw() {
        stroke(255);
        strokeWeight(this.currentSize);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}