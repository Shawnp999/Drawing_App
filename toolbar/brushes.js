class Brushes {
    constructor() {
        this.sizes = [3, 6, 10]; // Brush sizes
        this.currentSize = 6; // Default brush size
        this.buttonWidth = 30;
        this.buttonHeight = 20;
        this.buttonSpacing = 40;
        this.currentColor = '#000000';
        
        // Create and style the pencil cursor
        this.pencilCursor = document.createElement('img');
        this.pencilCursor.src = 'assets/pencil.png'; 
        this.pencilCursor.style.position = 'absolute';
        this.pencilCursor.style.pointerEvents = 'none';
        this.pencilCursor.style.zIndex = '1000';
        document.body.appendChild(this.pencilCursor);

        // Hide the default cursor
        document.body.style.cursor = 'none';

     

        this.updateCursorSize();
    }

    drawToolbar(x, y) {
        for (let i = 0; i < this.sizes.length; i++) {
            fill(this.currentSize === this.sizes[i] ? '#ADE' : 255);
            rect(x + (i * this.buttonSpacing), y, this.buttonWidth, this.buttonHeight);

            fill(0);
            noStroke();
            ellipse(x + (i * this.buttonSpacing) + this.buttonWidth / 2,
                y + this.buttonHeight / 2,
                this.sizes[i],
                this.sizes[i]);
        }
    }

    handleClick(x, y, toolbarX, toolbar) {
        for (let i = 0; i < this.sizes.length; i++) {
            let buttonX = toolbarX + (i * this.buttonSpacing);

            if (x > buttonX && x < buttonX + this.buttonWidth) {
                this.currentSize = this.sizes[i];
                this.updateCursorSize();
                toolbar.draw();
                break;
            }
        }
    }

    draw() {
        stroke(this.currentColor);
        strokeWeight(this.currentSize);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    setColor(color) {
        this.currentColor = color;
    }

    updateCursorSize() {
        const sizeShiftMap = {
            3: -11,
            6: -22,
            10: -38,
        };
    
        this.pencilCursor.style.width = `${this.currentSize * 4}px`;
        this.pencilCursor.style.height = `${this.currentSize * 4}px`;
    
        const verticalShift = sizeShiftMap[this.currentSize] || 0;
    
        window.addEventListener('mousemove', (e) => {
            this.pencilCursor.style.left = `${e.clientX}px`;
            this.pencilCursor.style.top = `${e.clientY + verticalShift}px`;
        });
    }
    
}
