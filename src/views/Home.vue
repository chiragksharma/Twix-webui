<template>
    <v-container class="home">
        <v-row justify="space-between">
            <!-- WiFi Details Card -->
            <v-col cols="12" md="5" lg="4">
                <v-card class="pa-4 custom-card" elevation="4">
                    <v-card-title class="card-title">
                        <h2>WiFi Details</h2>
                    </v-card-title>
                    <v-divider class="light-divider" />
                    <v-card-text class="card-text">
                        <div><strong>SSID:</strong> {{ wifiDetails.ssid }}</div>
                        <div><strong>IP Address:</strong> {{ wifiDetails.ip }}</div>
                        <div><strong>Signal Strength:</strong> {{ wifiDetails.signalStrength }}%</div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="button" @click="openDrawer('wifi')">Change</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <!-- Update Info Card -->
            <v-col cols="12" md="5" lg="4">
                <v-card class="pa-4 custom-card" elevation="4">
                    <v-card-title class="card-title">
                        <h2>Update</h2>
                    </v-card-title>
                    <v-divider class="light-divider" />
                    <v-card-text class="card-text">
                        <div v-if="newVersionAvailable">
                            <strong>Update available!</strong> Current Version: {{ currentVersion }}
                        </div>
                        <div v-else>
                            <strong>Your system is up-to-date.</strong> Version: {{ currentVersion }}
                        </div>
                    </v-card-text>
                    <v-card-actions >
                        <v-btn class="button" color="primary" @click="updateSystem">Update</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <!-- Battery Info Card -->
            <v-col cols="12" md="5" lg="4">
                <v-card class="pa-4 custom-card" elevation="4">
                    <v-card-title class="card-title">
                        <h2>Battery Info</h2>
                    </v-card-title>
                    <v-divider class="light-divider" />
                    <v-card-text class="card-text">
                        <div><strong>Battery Level:</strong> {{ batteryInfo.level }}%</div>
                        <div><strong>Status:</strong> {{ batteryInfo.status }}</div>
                        <div><strong>Charging:</strong> {{ batteryInfo.isCharging ? 'Yes' : 'No' }}</div>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Contact Us Card -->
            <v-col cols="12" md="5" lg="4">
                <v-card class="pa-4 custom-card" elevation="4">
                    <v-card-title class="card-title">
                        <h2>Contact Us</h2>
                    </v-card-title>
                    <v-divider class="light-divider" />
                    <v-card-text class="card-text">
                        <p>If you are facing any issues, feel free to contact us:</p>
                        <div><strong>Email:</strong> support@example.com</div>
                        <div><strong>Phone:</strong> +1-234-567-890</div>
                    </v-card-text>
                </v-card>
            </v-col>

            <!-- Setup Instructions Card -->
            <v-col cols="12" lg="8">
                <v-card class="pa-4 custom-card" elevation="4">
                    <v-card-title class="card-title">
                        <h2>Setup Instructions</h2>
                    </v-card-title>
                    <v-divider class="light-divider" />
                    <v-card-text class="card-text">
                        <ol>
                            <li>Connect the device to power.</li>
                            <li>Configure WiFi settings through the app.</li>
                            <li>Ensure the device is connected to the internet.</li>
                            <li>Follow the on-screen instructions to complete the setup.</li>
                        </ol>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Dynamic Drawer -->
        <v-navigation-drawer
            v-model="drawer"
            app
            right
            temporary
            width="400"
        >
            <v-toolbar flat dense>
                <v-toolbar-title>{{ currentTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="closeDrawer">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider></v-divider>

            <!-- Render the dynamic component -->
            <component :is="currentComponent" />
        </v-navigation-drawer>
    </v-container>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            drawer: false, // Drawer visibility
            currentComponent: null, // Current drawer component
            currentTitle: '', // Current drawer title
            wifiDetails: {
                ssid: 'YourWiFi',
                ip: '192.168.1.100',
                signalStrength: 85,
            },
            batteryInfo: {
                level: 75,
                status: 'Good',
                isCharging: true,
            },
            newVersionAvailable: true, // Simulate version availability
            currentVersion: '1.0.0',
        };
    },
    methods: {
        openDrawer(type) {
            this.drawer = true;
            if (type === 'wifi') {
                this.currentComponent = 'SettingsDrawer'; // Replace with your WiFi settings drawer
                this.currentTitle = 'WiFi Settings';
            }
        },
        closeDrawer() {
            this.drawer = false;
        },
        updateSystem() {
            alert('Update initiated!');
            // Logic for triggering system update
        },
    },
};
</script>

<style scoped>
.custom-card {
    border-radius: 16px;
    border: 5px solid rgba(14, 13, 13, 0.12);
    box-shadow: none !important;
    background-color: #ffffff;
    min-height: 250px; /* Set a consistent height */
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* Ensure content is well spaced */
}
.button{
    width: 100%;
    justify-content: center; 
    background-color: transparent !important;
    padding: 26px !important;
    border: 2px solid rgba(0, 0, 0, 0.1) ;
    border-radius: 5px;
    box-shadow: none !important;
}
.card-title h2 {
    font-size: 1.5rem; /* Increase font size for titles */
    font-weight: bold;
    margin: 0;
}

.card-text {
    font-size: 1.125rem; /* Increase font size for text */
    line-height: 1.5;
}

.light-divider {
    height: 1px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    margin-top: 8px;
    margin-bottom: 16px;
}
</style>
