<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">Languages</li>
                    </ul>
                </nav>

                <div class="btn-group">
                    <router-link
                        class="btn btn-cons btn-success"
                        :to="{name: 'language-create'}"
                        v-if="$canAccess('language', 'create')"
                    >
                        <i class="di di-plus"></i>
                        <span class="txt">New Language</span>
                    </router-link>
                </div>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <table class="table table-shadowize m-b-20">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Locale</th>
                        <th class="min-width">Date modified</th>
                        <th class="min-width"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.title }}</td>
                        <td>{{ item.locale }}</td>
                        <td class="min-width">{{ $formatDate(item.modified) }}</td>
                        <td class="min-width txt-right">
                            <router-link
                                :to="{name: 'language-update', params: {id: item.id}}"
                                class="btn btn-sm btn-primary"
                                v-if="$canAccess('language', 'update')"
                            >
                                <i class="di di-pencil"></i>
                                <span class="txt">Edit</span>
                            </router-link>
                            <button
                                type="button"
                                class="btn btn-sm btn-transp btn-grey txt-danger m-l-10"
                                :class="{'btn-disabled': items.length == 1}"
                                @click.prevent="onDelete(item.id)"
                                v-if="$canAccess('language', 'delete')"
                            >
                                <i class="di di-trash"></i>
                            </button>
                        </td>
                    </tr>

                    <tr v-if="!items.length">
                        <td colspan="4">
                            <span class="txt-hint">Oops, no language items were found.</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <paging ref="paging"></paging>
        </inline-loader>
    </div>
</template>

<script src="./index.component.js"></script>
