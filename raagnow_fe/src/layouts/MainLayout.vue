<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> RaagNow </q-toolbar-title>
        <div>version 0.1</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
/* eslint-disable */

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    return {
      data: "Moshe",
    };
  },
});
</script>
