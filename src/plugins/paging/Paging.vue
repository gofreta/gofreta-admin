<template>
    <nav class="paging" v-if="totalPages > 1">
        <ul>
            <!-- <li class="paging-item default-link prev-item" v-if=""> -->
            <li class="paging-item default-link prev-item" :class="{ disabled: currentPage <= 1 }">
                <div class="cursor-pointer" @click.prevent="changePage(currentPage - 1)">
                    <i class="di di-chevron-left"></i>
                </div>
            </li>

            <template v-for="page in pages">
                <li class="paging-item"
                    v-if="page > 0"
                    :class="{ 'active': (currentPage == page) }"
                >
                    <div v-if="currentPage != page" class="cursor-pointer" @click.prevent="changePage(page)">{{ page }}</div>
                    <span class="txt" v-else>{{ page }}</span>
                </li>

                <li class="paging-item" v-else>...</li>
            </template>

            <li class="paging-item default-link next-item" :class="{ disabled: currentPage == totalPages }">
                <div class="cursor-pointer" @click.prevent="changePage(currentPage + 1)">
                    <i class="di di-chevron-right"></i>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script src="./component.js"></script>
