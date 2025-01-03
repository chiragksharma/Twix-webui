<template>
    <div>
        <h3>Brightness Settings</h3>
        <v-slider
            v-model="brightness"
            min="0"
            max="100"
            step="1"
            label="Brightness"
            class="mt-4"
        ></v-slider>
        <v-switch v-model="autoBrightness" label="Automatic Brightness" />
    </div>
</template>

<script>
export default {
    name: 'BrightnessDrawer',
    data: () => ({
        brightness: 50,
        autoBrightness: false,
    }),
};
</script>

<style scoped>
/* Custom styles for BrightnessDrawer */
</style>
