<!-- Main page -->
<template>
  <div class="d-flex flex-column justify-content-between min-vh-100">
    <div>
      <BaseNavbar></BaseNavbar>
      <b-container fluid>
        <b-row>
          <b-col>
            <nuxt />
          </b-col>
         </b-row>
      </b-container>
    </div>
    <div class="d-flex flex-column justify-content-end">
      <BaseSnackbar></BaseSnackbar>
      <BaseFooter :appVersion="appVersion"></BaseFooter>
    </div>
  </div>
</template>

<script>

import { version } from '../package.json';

export default {
  name: "DefaultLayout",

  data: () => ({
    appVersion: version
  }),

  created() {
    console.debug("appVersion:"+this.appVersion)
  },
};
</script>
