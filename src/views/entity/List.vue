<template>
    <div class="block">
        <table class="table table-shadowize v-align-middle" v-if="activeLocale">
            <thead>
                <tr>
                    <th v-for="col in orderedActiveListingCols"
                        :style="col.type == 'field' ? 'width: 40%' : ''"
                        :class="{'min-width': col.type == 'prop'}"
                    >
                        <span class="txt">{{ col.label }}</span>
                        <span class="txt" v-if="col.type == 'field'">({{ activeLocale }})</span>
                    </th>

                    <th class="min-width txt-right">
                        <div class="header-handle" title="Filters" :class="{'active': showFilters}" @click.prevent="toggleFilter">
                            <span class="header-icon filter-icon">
                                <i class="di di-experiment"></i>
                            </span>
                        </div>

                        <div class="header-handle" title="Options" @click.stop="toggleTableOptions">
                            <span class="header-icon options-icon">
                                <i class="di di-dots-3"></i>
                            </span>

                            <dropdown class="dropdown-compact" ref="tableOptions">
                                <div class="dropdown-item bg-grey">
                                    <div class="form-group form-group-sm">
                                        <select v-model="activeLocale">
                                            <option v-for="lang in languages" :value="lang.locale">
                                                {{ lang.title }} ({{ lang.locale }})
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="list fields-list">
                                    <div class="dropdown-item" v-for="col in listingCols">
                                        <div class="form-group form-group-sm form-group-color-success form-group-switch">
                                            <input type="checkbox"
                                                :value="col.type + '.' + col.name"
                                                v-model="selectedCols"
                                                :id="'toggle_' + col.type + col.name"
                                                @change="updateSelectedColsStorage"
                                            >
                                            <label :for="'toggle_' + col.type + col.name">{{ col.label }}</label>
                                        </div>
                                    </div>
                                </div>
                            </dropdown>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- Filters START -->
                <tr v-show="showFilters" v-if="activeLocale !== '' && activeLocale !== null">
                    <td class="bg-light-grey p-10" v-for="col in orderedActiveListingCols">
                        <template v-if="col.type == 'field'">
                            <date-filter
                                v-if="col.meta.type == 'date'"
                                ref="filters"
                                :name="'q[data.' + activeLocale + '.' + (col.meta.filter_alias || col.meta.key) + ']'"
                                @change="onFilterChange"
                            ></date-filter>
                            <select-filter
                                v-else-if="col.meta.type == 'switch'"
                                ref="filters"
                                :name="'q[data.' + activeLocale + '.' + (col.meta.filter_alias || col.meta.key) + ']'"
                                :options="[{name: 'True', value: true}, {name: 'False', value: false}]"
                                @change="onFilterChange"
                            ></select-filter>
                            <input-filter
                                v-else
                                ref="filters"
                                :name="'q[data.' + activeLocale + '.' + (col.meta.filter_alias || col.meta.key) + ']'"
                                @change="onFilterChange"
                            ></input-filter>
                        </template>
                        <template v-else>
                            <select-filter
                                v-if="col.name == 'status'"
                                ref="filters"
                                :name="'q[' + (col.meta.filter_alias || col.name) + ']'"
                                @change="onFilterChange"
                                :options="[{name: 'Active', value: 'active'}, {name: 'Inactive', value: 'inactive'}]"
                            ></select-filter>
                            <date-filter
                                v-else-if="col.name == 'modified'"
                                ref="filters"
                                :name="'q[' + (col.meta.filter_alias || col.name) + ']'"
                                @change="onFilterChange"
                            ></date-filter>
                            <input-filter
                                v-else
                                ref="filters"
                                :raw="col.name == 'id'"
                                :name="'q[' + (col.meta.filter_alias || col.name) + ']'"
                                @change="onFilterChange"
                            ></input-filter>
                        </template>
                    </td>

                    <td class="min-width bg-light-grey p-10">
                        <button
                            class="btn btn-sm btn-cons-sm block"
                            :class="hasActiveFilters ? 'btn-warning' : 'btn-disabled'"
                            @click.prevent="resetFilters"
                        >
                            <div class="txt">Reset filters</div>
                        </button>
                    </td>
                </tr>
                <!-- Filters END -->

                <!-- Border style fix -->
                <tr><td class="p-0" colspan="100"></td></tr>

                <!-- Items START -->
                <tr class="record-row b-t" v-for="entity, i in entities" :key="entity.id" :data-id="entity.id">
                    <template v-for="col in orderedActiveListingCols">
                        <td v-if="col.type == 'field'">
                            <span class="txt" v-if="col.meta && entity.data[activeLocale]">
                                <template v-if="col.meta.type == 'date'">
                                    {{ $formatDate(entity.data[activeLocale][col.meta.key]) }}
                                </template>
                                <template v-else-if="col.meta.type == 'switch'">
                                    <small class="label label-grey">{{ entity.data[activeLocale][col.meta.key] ? 'True' : 'False' }}</small>
                                </template>
                                <template v-else>
                                    {{ entity.data[activeLocale][col.meta.key] }}
                                </template>
                            </span>
                        </td>
                        <td v-else class="min-width">
                            <template v-if="col.name == 'status'">
                                <small class="label" :class="entity.status == 'active' ? 'label-success' : 'label-danger'">{{ $humanize(entity.status) }}</small>
                            </template>
                            <template v-else-if="col.name == 'modified'">
                                {{ $formatDate(entity.modified) }}
                            </template>
                            <template v-else>
                                {{ entity[col.name] }}
                            </template>
                        </td>
                    </template>

                    <td class="min-width txt-right">
                        <slot name="actions" :collection="collection" :entity="entity"></slot>
                    </td>
                </tr>
                <!-- Items END -->

                <tr v-if="!entities.length">
                    <td colspan="100"><span class="txt-hint">No items were found.</span></td>
                </tr>
            </tbody>
        </table>

        <paging class="m-t-20" ref="paging" :updateRoute="syncQueryPage"></paging>
    </div>
</template>

<script src="./list.component.js"></script>
