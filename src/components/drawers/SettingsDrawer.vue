<template>
    <div>
        <h3>System Settings</h3>
        <v-text-field v-model="hostname" label="Hostname" outlined />
        <v-switch v-model="enableUpdates" label="Enable Automatic Updates" />
        <v-btn color="primary" @click="saveSettings">Save Settings</v-btn>
    </div>
</template>

<script>
export default {
    name: 'SettingsDrawer',
    data: () => ({
        hostname: 'TwixDevice',
        enableUpdates: true,
    }),
    methods: {
        saveSettings() {
            console.log('Settings saved:', { hostname: this.hostname, enableUpdates: this.enableUpdates });
        },
    },
};
</script>

<style scoped>
/* Custom styles for SettingsDrawer */
</style>
