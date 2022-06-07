<template>
    <div class="text-center" v-scroll-lock="lockScroll">
        <v-overlay
                :absolute="true"
                :value="lockScroll"
        >
            <v-progress-circular
                    indeterminate
                    :color="'black'"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
    export default {
        name: 'Loader',
        data() {
            return {
                lockScroll: true
            }
        },
        beforeDestroy() {
            this.lockScroll = false;
        }
    }
</script>
