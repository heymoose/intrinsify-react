// Use switch functionality with a Map
class SwitchMap extends Map {
    constructor(iterable, def) {
        super(iterable);
        this.default = def;
    }

    switch = (key) => {
        return this.has(key)
            ? this.get(key)
            : this.default;
    }
}

export default SwitchMap;