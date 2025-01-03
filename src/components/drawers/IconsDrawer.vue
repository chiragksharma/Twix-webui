<template>
    <div>
        <h3>Select Icon</h3>
        <v-container>
            <v-row>
                <v-col cols="3" v-for="icon in icons" :key="icon">
                    <v-btn icon @click="selectIcon(icon)">
                        <v-icon>{{ icon }}</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'IconsDrawer',
    data: () => ({
        icons: ['mdi-home', 'mdi-star', 'mdi-heart', 'mdi-settings', 'mdi-bell'],
    }),
    methods: {
        selectIcon(icon) {
            console.log(`Icon selected: ${icon}`);
        },
    },
};
</script>

<style scoped>
/* Custom styles for IconsDrawer */
</style>
