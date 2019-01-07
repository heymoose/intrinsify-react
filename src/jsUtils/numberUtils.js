
export const randIntegerInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randFloatInRange = (min, max, numDec) => {
    const num = Math.random() * (max - min + 1) + min; 
    return num.toFixed(numDec);
}

export const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}