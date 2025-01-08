<template>
    <div>
      <h3>{{ title }}</h3>
      <div v-for="(field, index) in schema.fields" :key="index">

        <v-text-field
          v-if="field.type === 'text'"
          v-model="formData[field.key]"
          :label="field.label"
          :outlined="true"
        />
        <v-switch
          v-else-if="field.type === 'switch'"
          v-model="formData[field.key]"
          :label="field.label"
        />
        <v-select
          v-else-if="field.type === 'select'"
          v-model="formData[field.key]"
          :items="field.options"
          :label="field.label"
          outlined
        />
        <!-- Add more input types as needed -->
      </div>
      <v-btn color="primary" @click="saveSettings">Save Settings</v-btn>
    </div>
  </template>
  
  <script>
  export default {
    name: "GenericDrawer",
    props: {
      title: String, // Drawer title
      schema: Object, // JSON schema for fields
      initialData: Object, // Pre-filled data
    },
    data() {
      return {
        formData: { ...this.initialData }, // Initialize form data
      };
    },
    methods: {
      saveSettings() {
        this.$emit("save", this.formData); // Emit save event with form data
      },
    },
  };
  </script>
  