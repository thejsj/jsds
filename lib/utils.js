export const clone = function clone (value) {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value;
    if (value === null) return value;
    if (value === undefined) return value;
    if (Array.isArray(value)) return value.map(clone);
    let new_val= {};
    for(let i in value) {
        if(typeof(value[i]) === 'object' && value[i] !== null)
            new_val[i] = clone(value[i]);
        else
            new_val[i] = value[i];
    }
    return new_val;
};

