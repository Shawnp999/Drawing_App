class Brushes {
    constructor() {
        this.sizes = [2, 5, 10];
        this.currentSize = 5;
        this.buttonWidth = 30;
        this.buttonHeight = 20;
        this.buttonSpacing = 40;
        this.currentColor = '#000000';
    }

    drawToolbar(x, y) {
        for (let i = 0; i < this.sizes.length; i++) {
            fill(this.currentSize === this.sizes[i] ? '#ADE' : 255);
            rect(x + (i * this.buttonSpacing), y, this.buttonWidth, this.buttonHeight);
            
            fill(0);
            noStroke();
            ellipse(x + (i * this.buttonSpacing) + this.buttonWidth/2, 
                   y + this.buttonHeight/2, 
                   this.sizes[i], 
                   this.sizes[i]); 
        }
    }

    handleClick(x, y, toolbarX) {  // Added toolbarX parameter
        for (let i = 0; i < this.sizes.length; i++) {
            let buttonX = toolbarX + (i * this.buttonSpacing);
            
            if (x > buttonX && x < buttonX + this.buttonWidth) {
                this.currentSize = this.sizes[i];
                break;
            }
        }
    }

    draw() {
        stroke(this.currentColor);  // Use current color instead of black
        strokeWeight(this.currentSize);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    setColor(color) {  // Add this method
        this.currentColor = color;
    }
}