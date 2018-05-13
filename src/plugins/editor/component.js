/**
 * ===================================================================
 * WYSIWYG + Markdown editor wrapper component.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 * ===================================================================
 */

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import turndown        from 'turndown'
import marked          from 'marked'

// quill editor options
const editorConfig = {
    theme: 'snow',
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['link', 'image'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'align': []}],
            [{'script': 'sub'}, {'script': 'super'}],
            ['blockquote', 'code-block'],
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'color': []}, { 'background': []}]
        ]
    }
};

// create TurndownService instance
const turndownInst = new turndown({
    headingStyle: 'atx',
    hr:           '---'
});

export default {
    name: 'rich-editor',
    props: ['value'],
    components: {
        'quill-editor': quillEditor
    },
    watch: {
        value: function () {
            this.load(this.value);
        }
    },
    data() {
        return {
            mode:            'editor', // editor || md
            htmlContent:     '',
            markdownContent: '',
            editorConfig:    Object.assign({}, editorConfig)
        }
    },
    created() {
        this.load(this.value);
    },
    mounted: function() {
        this.changeMode(this.mode);
    },
    methods: {
        /**
         * @param  {Mixed} val
         * @return {String}
         */
        normalizeString(val) {
            if (typeof val !== 'string') {
                return '';
            }

            return val;
        },

        /**
         * @param {String} htmlContent
         */
        load(htmlContent) {
            this.htmlContent = this.normalizeString(htmlContent);

            this.reloadMarkdownContent();
        },

        /**
         * @param {String} mode ('editor' or 'md')
         */
        changeMode(mode) {
            if (mode == 'md' && this.mode !== 'md') {
                this.mode = 'md';
                this.reloadMarkdownContent();
            } else if (this.mode !== 'editor') {
                this.mode = 'editor';
                this.reloadHtmlContent();
            }
        },

        /**
         * Loads `markdownContent` by converting `htmlContent` into markdown.
         */
        reloadMarkdownContent() {
            if (!turndownInst) {
                return;
            }

            this.markdownContent = turndownInst.turndown(
                this.normalizeString(this.htmlContent)
            );
        },

        /**
         * Loads `htmlContent` by converting `markdownContent` into html.
         */
        reloadHtmlContent() {
            if (!marked) {
                return;
            }

            this.htmlContent = marked(
                this.normalizeString(this.markdownContent)
            );
        },

        /**
         * Triggers content change events.
         */
        fireChangeEvents() {
            this.$emit('input', this.htmlContent);
            this.$emit('change', this.htmlContent);
        },

        /**
         * Handles markdown input changes.
         */
        markdownContentChanged() {
            this.reloadHtmlContent();

            this.fireChangeEvents();
        },

        /**
         * Handles rich editor input changes.
         */
        editorContentChanged() {
            this.reloadMarkdownContent();

            this.fireChangeEvents();
        }
    }
};
