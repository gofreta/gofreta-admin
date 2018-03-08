<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">Keys</li>
                    </ul>
                </nav>

                <div class="btn-group">
                    <router-link
                        class="btn btn-cons btn-success"
                        :to="{name: 'key-create'}"
                        v-if="$canAccess('key', 'create')"
                    >
                        <i class="di di-plus"></i>
                        <span class="txt">New Key</span>
                    </router-link>
                </div>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <table class="table table-shadowize v-align-middle m-b-20">
                <thead>
                    <tr>
                        <th style="width: 15%">Title</th>
                        <th>Token</th>
                        <th class="min-width">Date modified</th>
                        <th class="min-width"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.title }}</td>
                        <td class="txt-break"><small>{{ item.token }}</small></td>
                        <td class="min-width">{{ $formatDate(item.modified) }}</td>
                        <td class="min-width txt-right">
                            <router-link
                                :to="{name: 'key-update', params: {id: item.id}}"
                                class="btn btn-sm btn-primary"
                                v-if="$canAccess('key', 'update')"
                            >
                                <i class="di di-pencil"></i>
                                <span class="txt">Edit</span>
                            </router-link>
                            <button
                                type="button"
                                class="btn btn-sm btn-transp btn-grey txt-danger m-l-10"
                                @click.prevent="onDelete(item.id)"
                                v-if="$canAccess('key', 'delete')"
                            >
                                <i class="di di-trash"></i>
                            </button>
                        </td>
                    </tr>

                    <tr v-if="!items.length">
                        <td colspan="4">
                            <span class="txt-hint">Oops, no keys were found.</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <paging ref="paging"></paging>
        </inline-loader>
    </div>
</template>

<script src="./index.component.js"></script>
