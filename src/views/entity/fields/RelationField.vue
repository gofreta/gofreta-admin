<template>
    <form-field ref="field" class="form-group" :track="data[activeLocale]" :name="activeLocale + '.' + field.key">
        <div class="horizontal-list m-b-small">
            <label class="txt-hint m-b-10" :for="uniqueId">
                <span class="txt v-align-top">{{ field.label }}</span>
                <small class="v-align-top" v-if="field.multilingual">({{activeLocale}})</small>
                <em class="v-align-top" v-if="field.required">*</em>
            </label>

            <div class="block m-b-10" v-for="(item, index) in data[activeLocale]" v-if="item.id">
                <div class="list-item m-b-0 ">
                    <div class="content content-link p-10" :class="{'active': codeBlocks[index]}" @click.prevent="toggleCodeBlock(index)">
                        <span class="txt">ID: {{ item.id }}</span>
                        <span class="txt v-align-top toggle-handle">
                            <i class="di di-chevron-right" v-show="!codeBlocks[index]"></i>
                            <i class="di di-chevron-down" v-show="codeBlocks[index]"></i>
                        </span>
                    </div>

                    <div class="ctrls">
                        <span class="ctrl-item replace-ctrl" @click.prevent="editItem(index)"><i class="di di-pencil"></i></span>
                        <span class="ctrl-item delete-ctrl" @click.prevent="deleteItem(index)"><i class="di di-cross"></i></span>
                    </div>
                </div>

                <code class="code-block m-b-10" v-show="codeBlocks[index]">
                    <pre>{{ item }}</pre>
                </code>
            </div>

            <div class="block" v-if="enableNewPick">
                <button type="button" class="btn btn-sm full-width btn-transp btn-primary" @click.prevent="openPicker(field)">
                    <i class="di di-plus"></i>
                    <span class="txt">New Relation Item</span>
                </button>
            </div>

            <entities-picker ref="picker" :cid="field.meta.collection_id" @hide="onPickerHide" @select="onItemSelect"></entities-picker>
        </div>
    </form-field>
</template>

<script>
import ModelPickerMixin from './ModelPickerMixin'
import CommonHelper    from '@/utils/CommonHelper'
import Picker           from '@/views/entity/Picker'

export default {
    mixins: [ ModelPickerMixin ],
    name: 'relation-field',
    components: {
        'entities-picker': Picker
    },
    data() {
        return {
            codeBlocks: {}
        }
    },
    methods: {
        /**
         * Toggles selected entity item info container.
         *
         * @param {Number} index
         */
        toggleCodeBlock(index) {
            if (this.codeBlocks[index]) {
                this.$set(this.codeBlocks, index, false);
            } else {
                this.$set(this.codeBlocks, index, true);
            }
        }
    }
};
</script>
