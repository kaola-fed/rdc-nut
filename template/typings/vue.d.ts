import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $Message: any;
        $Modal: any;
        $dialog: any;
        $preview: any;
        $import: any;
    }
}
