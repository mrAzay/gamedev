<template>
    <div class="text-center">
        <v-dialog
                v-model="open"
                width="500"
                @click:outside="closePopup"
        >
            <v-card>
                <v-btn
                        :style="{
                            position: 'absolute',
                            right: 0,
                            top: 0
                        }"
                        icon
                        @click="closePopup"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-card-title class="text-h5">
                    {{packageInfo.name}}
                </v-card-title>

                <v-card-text
                        v-for="(item) in packageInfoArray"
                        :key="item.value"
                >
                    <v-row>
                        <v-col>
                            {{item[0]}}:
                        </v-col>
                        <v-col class="text-right">
                            {{item[1]}}
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: 'PackagePopup',
        data() {
            return {
                open: false
            }
        },
        props: {
            isOpen: {
                type: Boolean,
                default: false,
                required: true
            },
            packageInfo: {
                type: Object,
                default: () => ({}),
                required: true
            }
        },
        computed: {
            packageInfoArray() {
                if (!Object.values(this.packageInfo).length) return
                const maintainers = this.packageInfo?.maintainers.map(item => {
                    return Object.entries(item).map(item => {
                        return `${item[0]}: ${item[1]}`
                    })
                }).join(', ')
                const publisher = Object.entries(this.packageInfo?.publisher).map(item => {
                    return `${item[0]}: ${item[1]}`
                }).join(', ')

                const packageInfo = {
                    publisher,
                    date: this.packageInfo.date,
                    description: this.packageInfo.description,
                    links: Object.values(this.packageInfo.links).join(', '),
                    maintainers,
                    name: this.packageInfo.name,
                    scope: this.packageInfo.scope,
                    version: this.packageInfo.version,
                }
                return Object.entries(packageInfo)
            },
        },
        watch: {
            isOpen(value) {
                this.open = value
            },
        },
        methods: {
            closePopup() {
                this.$emit('closePopup')
            },
        },
    }
</script>
