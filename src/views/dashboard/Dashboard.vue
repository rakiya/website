<template>
  <div id="dashboard">
    <div id="toolbar"></div>
    <div id="desktop"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class Dashboard extends Vue {}
</script>

<style lang="scss" scoped>
#dashboard {
  display: flex;
}

#toolbar {
  display: flex;
}

#desktop {
  display: grid;
}
</style>
