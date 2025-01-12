<template>
    <v-container v-if="appsReady" class="apps-container">
      <!-- Apps Section -->
      <v-row>
        <v-col cols="12" md="6" lg="4" v-for="app in apps" :key="app?.name || app?.frameType || app">
          <v-card v-if="app && app.name" class="pa-4 sleek-card" elevation="0">
            <v-card-title class="card-title">
              <div class="icon-and-title">
                <v-icon :color="app.enabled ? 'primary' : 'grey'">{{ app.icon }}</v-icon>
                <h3>{{ app.name }}</h3>
              </div>
              <v-spacer></v-spacer>
              <v-switch v-model="app.enabled" inset color="primary" @change="toggleApp(app)" />
            </v-card-title>
  
            <v-divider class="divider" />
  
            <v-card-text class="card-text">
              <p>{{ app.description }}</p>
            </v-card-text>
  
            <v-card-actions>
              <v-btn color="primary" :disabled="!app.enabled" @click="openConfigureDrawer(app)" block>
                Configure
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Frame Settings Section -->
      <v-card class="pa-4 sleek-card">
        <v-card-title>Frame Settings</v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <!-- Auto-Transition Toggle -->
            <v-col cols="12" md="6">
              <v-switch
                v-model="autoTransition"
                label="Auto-Transition"
                inset
                color="primary"
                @change="onAutoTransitionToggle"
              />
            </v-col>
  
            <!-- Global Frame Duration -->
            <v-col cols="12" md="6" v-if="autoTransition">
              <v-text-field
                v-model="frameSwitchInterval"
                label="Global Frame Duration (Seconds)"
                type="number"
                min="1"
              />
            </v-col>
          </v-row>
  
          <!-- Frame-Specific Settings -->
          <v-row v-if="autoTransition">
            <v-col cols="12">
              <h4>Frame Durations</h4>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Frame</th>
                    <th>Duration (Seconds)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="app in apps" :key="app.name">
                    <td>{{ app.name }}</td>
                    <td>
                      <v-text-field v-model="app.frameDuration" type="number" min="1" />
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
  
         
          <!-- Single Frame Selection -->
          <v-row v-else>
            <v-col cols="12">
              <v-select
                v-model="selectedSingleFrame"
                :items="apps"
                item-text="name"
                label="Select Frame to Display"
                dense
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
  
      <!-- Dynamic Drawer -->
      <v-navigation-drawer v-model="drawer" app right temporary width="400">
        <v-toolbar flat dense>
          <v-toolbar-title>{{ currentApp?.name || "App Configuration" }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeDrawer">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
  
        <!-- Render App-Specific Configuration -->
        <generic-drawer
          v-if="currentAppSchema"
          :schema="currentAppSchema"
          :initialData="currentAppData"
          @save="saveAppConfig"
        />
      </v-navigation-drawer>
    </v-container>
    <div v-else>
      <p>Loading apps...</p>
    </div>
  </template>
  
  <script>
  import GenericDrawer from "../components/drawers/GenericDrawer.vue";
  
  export default {
    name: "Apps",
    components: {
      GenericDrawer,
    },
    data() {
      return {
        drawer: false,
        currentApp: null,
        currentAppSchema: null,
        currentAppData: null,
        autoTransition: true,
        frameSwitchInterval: 10, // Default global frame duration
        selectedSingleFrame: null,
      };
    },
    computed: {
      apps() {
        return this.$store.state.apps || [];
      },
      appsReady() {
        return this.apps.length > 0;
      },
    },
    methods: {
      toggleApp(app) {
        console.log(`Toggled ${app.name}: ${app.enabled}`);
      },
      openConfigureDrawer(app) {
        this.currentApp = app;
        this.currentAppSchema = this.getAppSchema(app.frameType);
        this.currentAppData = app.config;
        this.drawer = true;
      },
      closeDrawer() {
        this.drawer = false;
      },
      saveAppConfig(updatedConfig) {
        console.log("Saved Config:", updatedConfig);
        this.currentApp.config = updatedConfig;
        this.drawer = false;
      },
      getAppSchema(frameType) {
        const schemas = {
          youtube: {
            title: "YouTube Settings",
            fields: [{ key: "youtubeSubs.subscriberCount", label: "Subscriber Count", type: "text" }],
          },
          github: {
            title: "GitHub Settings",
            fields: [
              { key: "githubRepo.name", label: "Repository Name", type: "text" },
              { key: "githubRepo.stars", label: "Stars", type: "number" },
            ],
          },
          localIp: {
            title: "Local IP Settings",
            fields: [{ key: "serverIP", label: "Server IP Address", type: "text" }],
          },
          custom: {
            title: "Custom Frame Settings",
            fields: [
              { key: "name", label: "Frame Name", type: "text" },
              { key: "text", label: "Text", type: "text" },
              { key: "textColor", label: "Text Color", type: "color" },
              { key: "bitmap", label: "Bitmap JSON", type: "textarea" },
            ],
          },
        };
        return schemas[frameType] || {};
      },
      onAutoTransitionToggle() {
        if (!this.autoTransition) {
          this.selectedSingleFrame = this.apps[0];
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .sleek-card {
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: box-shadow 0.3s;
    padding-bottom: 16px;
  }
  
  .sleek-card:hover {
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin-bottom: 8px;
  }
  
  .icon-and-title {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .icon-and-title v-icon {
    font-size: 36px;
  }
  
  .card-title h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
    color: #333;
  }
  
  .divider {
    margin: 12px 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .card-text {
    font-size: 0.9rem;
    color: #555;
  }
  
  .card-text p {
    margin: 0;
  }
  
  .v-btn {
    margin-top: 16px;
  }
  </style>
  