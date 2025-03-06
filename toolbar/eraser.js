class Eraser {
    constructor() {
        this.sizes = [10, 20, 30];
        this.currentSize = 20;
        this.buttonWidth = 30;
        this.buttonHeight = 20;
        this.buttonSpacing = 40;
        
        // Create and style the eraser cursor
        this.eraserCursor = document.createElement('img');
        this.eraserCursor.src = 'assets/eraser.png'; 
        this.eraserCursor.style.position = 'absolute';
        this.eraserCursor.style.pointerEvents = 'none';
        this.eraserCursor.style.zIndex = '1000';
        this.eraserCursor.style.display = 'none'; // Initially hidden
        document.body.appendChild(this.eraserCursor);
        
        this.updateCursorSize();
    }

    updateCursorSize() {
        const sizeShiftMap = {
            10: -15,
            20: -30,
            30: -45,
        };
    
        this.eraserCursor.style.width = `${this.currentSize * 2}px`;
        this.eraserCursor.style.height = `${this.currentSize * 2}px`;
    
        const verticalShift = sizeShiftMap[this.currentSize] || 0;
    
        window.addEventListener('mousemove', (e) => {
            this.eraserCursor.style.left = `${e.clientX}px`;
            this.eraserCursor.style.top = `${e.clientY + verticalShift}px`;
        });
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