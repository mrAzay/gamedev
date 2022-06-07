<template>
    <v-content :tag="'section'" style="min-height: 100%">
        <v-container pb-5>
            <v-row no-gutters>
                <v-col>
                    <Search v-model="searchValue"/>
                </v-col>
            </v-row>
            <v-row mt-3 no-gutters>
                <v-col>
                    <PackagesResult
                            v-if="packages.length"
                            :packages="packages"
                            class="w-100"
                            @changePage="nextPage"
                            @showPackageInfo="showPackageInfo"
                    />
                    <v-flex d-flex justify-center align-center v-else>
                        <span>Nothing</span>
                    </v-flex>
                </v-col>
            </v-row>
        </v-container>
        <Loader class="loader" v-if="showLoader"/>
        <PackagePopup
                :package-info="currentPackage"
                :is-open="openedPopup"
                @closePopup="closePopup"
        />
    </v-content>
</template>

<script>
    import Search from '@/components/ui/Search';
    import PackagesResult from '@/components/blocks/PackagesResult';
    import Loader from '@/components/ui/Loader';
    import PackagePopup from '@/components/popups/PackagePopup';

    import debounce from 'lodash/debounce'
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'Main',
        components: {PackagePopup, Loader, PackagesResult, Search},
        data() {
            return {
                searchValue: '',
                showLoader: false,
                openedPopup: false,
                currentPackage: {}
            }
        },
        computed: {
            ...mapGetters({
                packages: 'packages/packages',
            })
        },
        watch: {
            searchValue() {
                this.searchPackages()
            }
        },
        methods: {
            ...mapActions({
                addPackages: 'packages/addPackages',
                getInfoPackage: 'packages/getInfoPackage',
                deleteInfoPackage: 'packages/deleteInfoPackage',
            }),
            searchPackages: debounce(
                function () {
                    this.getPackages(0)
                    this.changeQuery()
                }, 800),
            showPackageInfo(currentPackage) {
                this.currentPackage = currentPackage
                this.openedPopup = true
            },
            closePopup() {
                this.openedPopup = false
            },
            nextPage(value) {
                this.getPackages((value - 1) * 10)
            },
            getPackages(from) {
                this.showLoader = true
                this.addPackages({
                    data: this.searchValue,
                    from
                }).finally(() => {
                    this.showLoader = false
                })
            },
            changeQuery() {
                if (this.$route.query.package === this.searchValue) return

                this.$router.replace({ query: { package: this.searchValue } })
            }
        },
        mounted() {
            if (this.$route.query.package) {
                this.searchValue = this.$route.query.package
            }
        }
    };
</script>
