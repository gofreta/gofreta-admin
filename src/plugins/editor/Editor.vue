<template>
    <div class="rich-editor">
        <textarea
            v-if="mode == 'md'"
            ref="md"
            class="markdown-textarea"
            v-model="markdownContent"
            @change="markdownContentChanged"
        ></textarea>

        <quill-editor
            v-else
            ref="quill"
            v-model="htmlContent"
            :options="editorConfig"
            @change="editorContentChanged"
        ></quill-editor>

        <footer class="status-bar">
            <span class="mode-ctrl editor-ctrl" :class="{'active': mode == 'editor'}" @click="changeMode('editor')">Rich Editor</span>
            <span class="mode-ctrl md-ctrl" :class="{'active': mode == 'md'}" @click="changeMode('md')">Markdown</span>
        </footer>
    </div>
</template>

<script src="./component.js"></script>
