<template>
    <div class="form-group form-group-sm m-0">
        <select v-model="value" @change="onChange">
            <option value="">All</option>

            <option :value="option.value" v-for="option in options">{{ option.name }}</option>
        </select>
    </div>
</template>

<script>
import BaseFilterMixin from './BaseFilterMixin';

export default {
    mixins: [ BaseFilterMixin ],
    name: 'select-filter',
    props: {
        options: {
            type:     Array,
            required: true
        }
    }
}
</script>
