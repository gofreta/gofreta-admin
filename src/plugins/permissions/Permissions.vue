<template>
    <div class="permissions-list">
        <span class="txt-hint" v-if="!isReady">Loading...</span>

        <template v-else>
            <div class="list-item" v-for="(actions, group) in groups">
                <div class="form-group form-group-sm form-group-color-primary form-group-switch">
                    <p><strong>{{ resolveGroupName(group) }}</strong> (<small class="link-primary" @click.prevent="toggleAll(group)">Toggle All</small>)</p>

                    <div class="block m-b-10" v-for="action in actions">
                        <input
                            type="checkbox"
                            :id="'access_' + group + '_' + action"
                            :value="action"
                            v-model="selected[group]"
                        >
                        <label :for="'access_' + group + '_' + action">
                            <span class="txt" v-if="action == 'index'">Listing</span>
                            <span class="txt" v-else>{{ $humanize(action) }}</span>
                        </label>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script src="./component.js"></script>
