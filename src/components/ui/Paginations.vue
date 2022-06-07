<template>
    <div class="text-center">
        <v-pagination
                v-model="page"
                :length="maxPages"
                :total-visible="7"
        ></v-pagination>
    </div>
</template>

<script>
    export default {
        name: 'Paginations',
        data() {
            return {
                page: 1
            }
        },
        props: {
            value: {
                type: Number,
                default: 1,
                required: false
            },
            itemsLength: {
                type: Number,
                default: 0,
                required: true,
            },
        },
        watch: {
            page(value) {
                this.$emit('input', value)
            },
        },
        computed: {
            maxPages() {
                return Math.ceil(this.itemsLength / 10)
            }
        },
    }
</script>
