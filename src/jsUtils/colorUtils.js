// Source for color mapping code:
// https://stackoverflow.com/questions/16360533/calculate-color-hex-having-2-colors-and-percent-position

export const rgbToHex = (r, g, b) => {
    return ((1 << 24) + (r << 16) + (g << 8) +b).toString(16).slice(1);
}

export const getComponentFromHexColorCode = (color, component) => {
    if (component === 'r') {
        return color.substring(0, 2);
    }
    else if (component === 'g') {
        return color.substring(2, 4);
    }
    else if (component === 'b') {
        return color.substring(4, 6);
    }
    
    return color;
}

export const findColorComponentRatioBetweenTwoColors = (comp1, comp2, ratio) => {
    return Math.ceil(parseInt(comp1, 16) * ratio + parseInt(comp2, 16) * (1 - ratio));
}

export const findColorRatioBetweenTwoColors = (color1, color2, ratio) => {
    const rComponentColor1 = getComponentFromHexColorCode(color1, 'r');
    const rComponentColor2 = getComponentFromHexColorCode(color2, 'r');
    const gComponentColor1 = getComponentFromHexColorCode(color1, 'g');
    const gComponentColor2 = getComponentFromHexColorCode(color2, 'g');
    const bComponentColor1 = getComponentFromHexColorCode(color1, 'b');
    const bComponentColor2 = getComponentFromHexColorCode(color2, 'b');
    const r = findColorComponentRatioBetweenTwoColors(rComponentColor1, rComponentColor2, ratio);
    const g = findColorComponentRatioBetweenTwoColors(gComponentColor1, gComponentColor2, ratio);
    const b = findColorComponentRatioBetweenTwoColors(bComponentColor1, bComponentColor2, ratio);
    return rgbToHex(r, g, b);
}