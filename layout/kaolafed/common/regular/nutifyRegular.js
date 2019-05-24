export default function(fn) {
    fn.extends = function(...args) {
        const component = fn.extend.apply(this, args);

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