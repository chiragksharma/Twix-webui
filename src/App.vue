<template>
    <v-app>
        <!-- App Bar -->
        <v-app-bar app>
            <v-toolbar-title><b>Twix</b> - Every Pixel Says Something</v-toolbar-title>
            <v-spacer></v-spacer>
            <div v-if="displayHostname" class="hostname padded" :title="`Hostname: ${this.displayHostname}`" v-text="displayHostname"></div>
            <v-icon v-if="sockedIsConnected" color="green" class="padded" :title="`Connected to ${this.$socket.url}`">mdi-lan-connect</v-icon>
            <v-icon v-else color="red" class="padded" :title="`Disconnected from ${this.$socket.url}`">mdi-lan-disconnect</v-icon>
            <v-btn icon @click="changeTheme" title="Change Theme">
                <v-icon>{{ darkModeActive ? 'mdi-brightness-4' : 'mdi-brightness-4' }}</v-icon>
            </v-btn>
        </v-app-bar>

        <!-- Tabs -->
        <v-tabs v-model="activeTab" align-with-title>
            <v-tab v-for="tab in tabs" :key="tab.name">
                {{ tab.label }}
            </v-tab>
        </v-tabs>

        <!-- Content -->
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <!-- Live Preview Section -->
                        <v-card elevation="4" class="pa-4">
                            <h2 class="text-center">Live Preview</h2>
                            <div class="live-preview">
                                <Liveview class="text-center" :data="liveview" :options="liveviewCanvasSettings" />
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <router-view :key="activeTab"></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>


<script>
import Liveview from './components/Liveview.vue';

export default {
    name: 'App',
    components: { Liveview },
    data: () => ({
        activeTab: 0,
        tabs: [
            { name: 'home', label: 'Home' },
            { name: 'settings', label: 'Settings' },
            { name: 'gallery', label: 'Gallery' },
            { name: 'creator', label: 'Creator' },
        ],
    }),
    computed: {
        sockedIsConnected() {
            return this.$store.state.socket.isConnected;
        },
        displayHostname() {
            return this.$store.state.displayHostname;
        },
        liveview() {
            return this.$store.state.liveviewData;
        },
        liveviewCanvasSettings() {
            return this.$store.state.matrixSize;
        },
        darkModeActive() {
            return this.$vuetify.theme.dark;
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

<style>
::-webkit-scrollbar {
    width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
    background-color: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background-color: #8c8c8c;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background-color: #a8a8a8;
}
</style>

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
</style>
