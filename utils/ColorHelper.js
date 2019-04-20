class Color {
    constructor(options) {
        if (options['hex']) {
            this.hex = options['hex'];
            this.hexToRGB();
        } else if (options['rgb']) {
            this.r = options['rgb']['r'];
            this.g = options['rgb']['g'];
            this.b = options['rgb']['b'];
            this.hex = Color.rgbToHex(this.r, this.g, this.b)
        } else {
            console.log('Set some Color');
        }
    }

    setHex(hex) {
        this.hex = hex;
        this.hexToRGB();
    }

    static rgbToHex(r, g, b) {
        let red = this.valueToHex(r);
        let green = this.valueToHex(g);
        let blue = this.valueToHex(b);
        return `#${red}${green}${blue}`;
    }

    static valueToHex(value, width = 2) {
        let hex = parseInt(Math.round(value).toString(), 16);
        while (hex.size() < width) {
            hex = "0" + hex;
        }
        return hex;
    }

    hexToRGB() {
        if (this.hasHex()) {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.hex);
            if (result) {
                this.r = parseInt(result[1], 16);
                this.g = parseInt(result[1], 16);
                this.b = parseInt(result[1], 16);
            }
        } else {
            console.log('Set a Hex');
        }
    }

    hasHex() {
        return !!this.hex;
    }

    getR() {
        return this.r;
    }

    getG() {
        return this.g;
    }

    getB() {
        return this.b;
    }

    static generateSmartThingsCommands(redLevel = 10, greenLevel = 10, blueLevel = 10) {
        return [Color.getRedCommand(redLevel), Color.getGreenCommand(greenLevel), Color.getBlueCommand(blueLevel)];
    }

    static getRedCommand(level = 10) {
        return {
            "component": "ep07",
            "capability": "switchLevel",
            "command": "setLevel",
            "arguments": [
                level
            ]
        }
    }

    static getGreenCommand(level = 10) {
        return {
            "component": "ep08",
            "capability": "switchLevel",
            "command": "setLevel",
            "arguments": [
                level
            ]
        }
    }

    static getBlueCommand(level = 10) {
        return {
            "component": "ep09",
            "capability": "switchLevel",
            "command": "setLevel",
            "arguments": [
                level
            ]
        }
    }

    // https://gist.github.com/mjackson/5311256
    rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return [h, s, v];
    }

    rgbFromHSV(h, s, v) {
        /**
         * I: An array of three elements hue (h) ∈ [0, 360], and saturation (s) and value (v) which are ∈ [0, 1]
         * O: An array of red (r), green (g), blue (b), all ∈ [0, 255]
         * Derived from https://en.wikipedia.org/wiki/HSL_and_HSV
         * This stackexchange was the clearest derivation I found to reimplement https://cs.stackexchange.com/questions/64549/convert-hsv-to-rgb-colors
         */

        let hprime = h / 60;
        const c = v * s;
        const x = c * (1 - Math.abs(hprime % 2 - 1));
        const m = v - c;
        let r, g, b;
        if (!hprime) {
            r = 0;
            g = 0;
            b = 0;
        }
        if (hprime >= 0 && hprime < 1) {
            r = c;
            g = x;
            b = 0
        }
        if (hprime >= 1 && hprime < 2) {
            r = x;
            g = c;
            b = 0
        }
        if (hprime >= 2 && hprime < 3) {
            r = 0;
            g = c;
            b = x
        }
        if (hprime >= 3 && hprime < 4) {
            r = 0;
            g = x;
            b = c
        }
        if (hprime >= 4 && hprime < 5) {
            r = x;
            g = 0;
            b = c
        }
        if (hprime >= 5 && hprime < 6) {
            r = c;
            g = 0;
            b = x
        }

        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return [r, g, b]
    }
}

module.exports = {Color};
