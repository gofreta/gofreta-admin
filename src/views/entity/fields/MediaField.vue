<template>
    <form-field ref="field" class="form-group" :track="data[activeLocale]" :name="activeLocale + '.' + field.key">
        <div class="horizontal-list m-b-small">
            <label class="txt-hint m-b-10" :for="uniqueId">
                <span class="txt v-align-top">{{ field.label }}</span>
                <small class="v-align-top" v-if="field.multilingual">({{activeLocale}})</small>
                <em class="v-align-top" v-if="field.required">*</em>
            </label>

            <div
                class="list-item"
                v-for="(item, index) in data[activeLocale]"
                v-if="item"
            >
                <div class="featured-thumb has-thumb">
                    <div class="thumb-content">
                        <img :src="item.path" :alt="item.title">
                    </div>
                </div>
                <div class="content">{{ item.title }}</div>
                <div class="ctrls">
                    <span class="ctrl-item replace-ctrl" @click.prevent="editItem(index)"><i class="di di-pencil"></i></span>
                    <span class="ctrl-item delete-ctrl" @click.prevent="deleteItem(index)"><i class="di di-cross"></i></span>
                </div>
            </div>

            <div class="block" v-if="enableNewPick">
                <button type="button" class="btn btn-sm full-width btn-transp btn-primary" @click.prevent="openPicker(field)">
                    <i class="di di-plus"></i>
                    <span class="txt">New Media Item</span>
                </button>
            </div>

            <media-picker ref="picker" @hide="onPickerHide" @select="onItemSelect"></media-picker>
        </div>
    </form-field>
</template>

<script>
import MediaPicker      from '@/views/media/MediaPicker'
import ModelPickerMixin from './ModelPickerMixin'
import {MediaModel}     from '@/models/MediaModel'

export default {
    mixins: [ ModelPickerMixin ],
    name: 'media-field',
    components: {
        'media-picker': MediaPicker
    },
    data() {
        return {
            modelClass: MediaModel
        }
    }
};
</script>
