<template>
    <div>
        <header class="content-header">
            <div class="wrapper">
                <nav class="breadcrumb">
                    <ul>
                        <li class="breadcrumb-item">Users</li>
                    </ul>
                </nav>

                <div class="btn-group">
                    <router-link
                        class="btn btn-cons btn-success"
                        :to="{name: 'user-create'}"
                        v-if="$canAccess('user', 'create')"
                    >
                        <i class="di di-plus"></i>
                        <span class="txt">New User</span>
                    </router-link>
                </div>
            </div>
        </header>

        <inline-loader class="wrapper" ref="inlineLoader">
            <table class="table table-shadowize v-align-middle m-b-20">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <!-- <th>Status</th> -->
                        <th class="min-width">Date modified</th>
                        <th class="min-width"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>
                            <span class="txt">{{ item.username }}</span>
                            <small class="label label-grey m-l-5" v-if="currentUser && currentUser.id == item.id">Current</small>
                        </td>
                        <td>{{ item.email }}</td>
                        <td class="min-width">{{ $formatDate(item.modified) }}</td>
                        <td class="min-width txt-right">
                            <router-link
                                :to="{name: 'user-update', params: {id: item.id}}"
                                class="btn btn-sm btn-primary"
                                v-if="$canAccess('user', 'update')"
                            >
                                <i class="di di-pencil"></i>
                                <span class="txt">Edit</span>
                            </router-link>
                            <button
                                type="button"
                                class="btn btn-sm btn-transp btn-grey txt-danger m-l-10"
                                @click.prevent="onDelete(item.id)"
                                :class="{'btn-disabled': isCurrentUser(item.id)}"
                                v-if="$canAccess('user', 'delete')"
                            >
                                <i class="di di-trash"></i>
                            </button>
                        </td>
                    </tr>

                    <tr v-if="!items.length">
                        <td colspan="5">
                            <span class="txt-hint">Oops, no users were found.</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <paging ref="paging"></paging>
        </inline-loader>
    </div>
</template>

<script src="./index.component.js"></script>
