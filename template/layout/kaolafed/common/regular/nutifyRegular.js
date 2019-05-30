export default function(fn) {
    const originExtend = fn.extend;
    fn.extend = function(...args) {
        const component = originExtend.apply(this, args);

        component.$$nut = function(ctx) {
            let instance

            return {
                beforeEnter({
                    next
                }) {
                    next()
                },

                mount(node) {
                    if (!instance) {
                        instance = new component()
                    }

                    instance.$inject(node)
                },

                unmount(node) {
                    if (!instance) {
                        return
                    }

                    instance.$inject(false)
                },

                destroy() {
                    if (!instance) {
                        return
                    }

                    instance.destroy()
                    instance = null
                }
            }
        };

        return component;
    };
}
