<template>
    <div>
        <h3>Clock Settings</h3>
        <v-switch v-model="automaticTimezone" label="Automatic Timezone" />
        <v-select
            v-model="clockface"
            :items="clockfaceOptions"
            label="Clockface"
            outlined
        />
        <v-switch v-model="show24Hours" label="24-Hour Format" />
        <v-switch v-model="showSeconds" label="Show Seconds" />
        <v-switch v-model="showDayOfWeek" label="Day of the Week" />
    </div>
</template>

<script>
export default {
    name: 'ClockDrawer',
    data: () => ({
        automaticTimezone: false,
        clockface: null,
        clockfaceOptions: ['Digital', 'Analog', 'None'],
        show24Hours: true,
        showSeconds: true,
        showDayOfWeek: true,
    }),
};
</script>

<style scoped>

</style>
