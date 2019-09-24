let Vue;

function applyMixin ( Vue, store ) {
    Vue.mixin({
        beforeCreate() {
            if (store) {
                this.$store = typeof store === 'function'
                    ? store()
                    : store;
            }
        }
    });
}

export default function ( _Vue, store ) {
    if ( Vue && _Vue === Vue ) {
        return;
    }
    Vue = _Vue;

    applyMixin(Vue, store);
}
