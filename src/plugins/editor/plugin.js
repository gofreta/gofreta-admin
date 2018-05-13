import Editor from './Editor.vue'

export default {
    install(Vue, options = {}) {
        if (this.installed) {
            return;
        }

        this.installed = true;

        Vue.component('rich-editor', Editor);
    }
}
