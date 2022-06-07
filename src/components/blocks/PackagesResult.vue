<template>
    <div>
        <PackagesTable @showPackageInfo="showPackageInfo" :packages="packages"/>
        <Paginations
                class="mt-5"
                :items-length="totalPackages"
                v-if="totalPackages"
                @input="changePage"
        />
    </div>
</template>

<script>
    import PackagesTable from '@/components/blocks/PackagesTable';
    import Paginations from '@/components/ui/Paginations';
    import {mapGetters} from 'vuex';

    export default {
        name: 'PackagesResult',
        components: {Paginations, PackagesTable},
        props: {
            packages: {
                type: Array,
                default: () => [],
                require: true
            },
        },
        computed: {
            ...mapGetters({
                totalPackages: 'packages/totalPackages'
            }),
        },
        methods: {
            changePage(value) {
                this.$emit('changePage', value)
            },
            showPackageInfo(currentPackage)  {
                this.$emit('showPackageInfo', currentPackage)
            }
        },
    }
</script>
