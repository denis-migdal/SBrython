type Klass = new(...args:any[]) => any;

function addProps(a: object, b: object) {

    const newProps = Object.getOwnPropertyDescriptors(b);
    const entries  = Object.entries(newProps).filter( ([k]) => !(k in a) );

    Object.defineProperties(a, Object.fromEntries(entries));
}

export default {
    mix: function(base: Klass, ...extensions: Klass[]) {

        class Mix extends base {}

        for(let i = 0; i < extensions.length; ++i) {
            addProps(Mix, extensions[i]);
            addProps(Mix.prototype, extensions[i].prototype);
        }

        return Mix;
    }
}