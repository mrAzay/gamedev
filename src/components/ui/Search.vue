<template>
    <v-text-field :placeholder="'Search'" class="search px-2" v-model="localValue">
        <v-icon
                slot="append"
        >
            mdi-magnify
        </v-icon>
    </v-text-field>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                localValue: ''
            }
        },
        props: {
            value: {
                type: String,
                default: '',
                required: true
            },
        },
        watch: {
            value(value) {
                this.localValue = value
            },
            localValue(value) {
                this.$emit('input', value)
            }
        },
    }
</script>
