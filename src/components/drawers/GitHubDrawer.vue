<template>
    <div>
      <h3>GitHub Settings</h3>
      <v-text-field v-model="repository" label="Repository Name" outlined />
      <v-btn color="primary" @click="saveSettings">Save Settings</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: "GitHubDrawer",
    data: () => ({
      repository: "my-repo",
    }),
    methods: {
      saveSettings() {
        console.log("GitHub settings saved:", { repository: this.repository });
      },
    },
  };
  </script>
  