class ColorPalette {
    constructor() {
        this.colors = [
            '#000000', // Black
            '#FF0000', // Red
            '#00FF00', // Green
            '#0000FF', // Blue
            '#FFFF00', // Yellow
            '#FF00FF', // Magenta
            '#00FFFF', // Cyan
            '#FFA500', // Orange
            '#800080', // Purple
            '#964B00'  // Brown
        ];
        
        this.currentColor = '#000000';
        this.swatchSize = 20;
        this.swatchSpacing = 30;
        this.paletteY = 10;
    }

    drawPalette(x) {
        push();
        for (let i = 0; i < this.colors.length; i++) {

            strokeWeight(1);
            fill(this.colors[i]);
            
            if (this.currentColor === this.colors[i]) {

                // larger square for selected state
                rect(x + (i * this.swatchSpacing), 
                     this.paletteY - 2, 
                     this.swatchSize + 4, 
                     this.swatchSize + 4);
            }
            
            rect(x + (i * this.swatchSpacing), 
                 this.paletteY, 
                 this.swatchSize, 
                 this.swatchSize);
        }
        pop();
    }

    handleClick(x, y, paletteX) {

        if (y >= this.paletteY && y <= this.paletteY + this.swatchSize) {

            for (let i = 0; i < this.colors.length; i++) {

                let swatchX = paletteX + (i * this.swatchSpacing);

                if (x >= swatchX && x <= swatchX + this.swatchSize) {
                    this.currentColor = this.colors[i];
                    return true;
                }
            }
        }
        return false;
    }

    getCurrentColor() {
        return this.currentColor;
    }
}