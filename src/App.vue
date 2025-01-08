<template>
    <v-app>
        <!-- App Bar -->
        <v-app-bar app>
            <v-toolbar-title><b>Twix</b> - Every Pixel Says Something</v-toolbar-title>
            <v-spacer></v-spacer>
            <div
                v-if="displayHostname"
                class="hostname padded"
                :title="`Hostname: ${this.displayHostname}`"
                v-text="displayHostname"
            ></div>
            <v-icon
                v-if="!isDemoMode && sockedIsConnected"
                color="green"
                class="padded"
                :title="`Connected to ${this.$socket?.url || ''}`"
            >
                mdi-lan-connect
            </v-icon>
            <v-icon
                v-if="isDemoMode"
                color="green"
                class="padded"
                title="Demo Mode - Connected to demo data source"
            >
                mdi-lan-connect
            </v-icon>
            <v-icon
                v-else-if="!sockedIsConnected && !isDemoMode"
                color="red"
                class="padded"
                title="Disconnected from WebSocket"
            >
                mdi-lan-disconnect
            </v-icon>
            <v-btn icon @click="changeTheme" title="Change Theme">
                <v-icon>{{ darkModeActive ? 'mdi-brightness-4' : 'mdi-brightness-4' }}</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- Main Content -->
        <v-main>
            <v-container>
                <!-- Live View Section -->
                <v-row>
                    <v-col cols="12">
                        <div class="live-view-container">
                            <h2 class="text-center">Live Preview</h2>
                            <Liveview
                                class="text-center"
                                :data="liveview"
                                :options="liveviewCanvasSettings"
                            />
                        </div>
                    </v-col>
                </v-row>

                <!-- Tabs Section (for larger screens) -->
                <v-row class="d-none d-md-flex">
                    <v-col cols="12">
                        <v-tabs v-model="activeTab" align-with-title>
                            <v-tab v-for="tab in tabs" :key="tab.name">
                                {{ tab.label }}
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="activeTab">
                            <v-tab-item v-for="tab in tabs" :key="tab.name">
                                <component :is="currentComponent" />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-col>
                </v-row>

                <!-- Tabs Content Section (for mobile screens) -->
                <v-row class="d-md-none mobile-content">
                    <v-col cols="12">
                        <component :is="currentComponent" />
                    </v-col>
                </v-row>

                <!-- Bottom Navigation (for mobile screens) -->
                <v-bottom-navigation v-model="activeTab" class="d-md-none scrollable-tabs" app>
                    <div class="scrollable-container">
                        <v-btn
                            v-for="(tab, index) in tabs"
                            :key="tab.name"
                            @click="activeTab = index"
                        >
                            <v-icon>{{ tab.icon }}</v-icon>
                        </v-btn>
                    </div>
                </v-bottom-navigation>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Liveview from "./components/Liveview.vue";
import HomeView from './views/Home.vue';
import SettingsView from './views/Options.vue';
import Apps from "./views/Apps.vue";
import SensorsButtonsView from './views/SensorsButtons.vue';

export default {
    name: 'App',
    components: {
        Liveview,
        HomeView,
        Apps,
        SettingsView,
        SensorsButtonsView,
    },
    data: () => ({
        activeTab: 0,
        tabs: [
            { name: 'home', label: 'Home', component: 'HomeView', icon: 'mdi-home' },
            { name: 'apps', label: 'Apps', component: 'Apps', icon: 'mdi-apps' },
            { name: 'settings', label: 'Settings', component: 'SettingsView', icon: 'mdi-cog' },
            { name: 'custom', label: 'Custom', component: 'SensorsButtonsView', icon: 'mdi-wrench' },
        ],
    }),
    computed: {
        sockedIsConnected() {
            return this.isDemoMode || this.$store.state.socket?.isConnected;
        },
        isDemoMode() {
            return this.$demoMode;
        },
        displayHostname() {
            return this.$store.state.displayHostname || (this.isDemoMode ? 'Demo Mode' : '');
        },
        liveview() {
            return this.$store.state.liveviewData || [];
        },
        liveviewCanvasSettings() {
            return this.$store.state.matrixSize || {};
        },
        darkModeActive() {
            return this.$vuetify.theme.dark;
        },
        currentComponent() {
            // Dynamically get the component for the active tab
            return this.tabs[this.activeTab]?.component || 'HomeView';
        },
        apps() {
            return this.$store.state.apps || []; // Default to an empty array if no apps are available
        },
    },
    methods: {
        changeTheme() {
            this.$vuetify.theme.dark = !this.darkModeActive;
            this.$cookies.set('theme_dark', this.darkModeActive);
        },
    },
};
</script>

<style scoped>
.hostname {
    font-size: 14px;
    text-transform: uppercase;
    padding-right: 15px;
}

.live-preview {
    height: 200px;
    background: #e0e0e0;
    border: 1px solid #bdbdbd;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #616161;
}

.v-tabs {
    background-color: #2196f3;
    color: #fff;
}

.mobile-content {
    margin-bottom: 64px; /* Provide space for the bottom navigation */
    padding-bottom: 16px;
}

.scrollable-tabs {
    overflow-x: auto; /* Enable horizontal scrolling */
    white-space: nowrap; /* Prevent wrapping */
}

.scrollable-container {
    display: inline-flex; /* Ensure all buttons are displayed inline */
    width: max-content; /* Ensure the container width matches its content */
}

.scrollable-tabs::-webkit-scrollbar {
    height: 6px; /* Make the scrollbar smaller for better UX */
}

.scrollable-tabs::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.4); /* Styled thumb */
    border-radius: 4px;
}

.scrollable-tabs::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1); /* Styled track */
}
</style>
