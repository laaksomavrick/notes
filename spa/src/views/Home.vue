<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import axios from 'axios';

// tslint:disable

@Component({
  components: {
    HelloWorld,
  },
  async mounted() {
    console.log('requesting data...');
    // how to handle this in local dev? if prod, domain. if local, localhost
    const response = await axios.get('http://35.203.34.230');
    console.log(response);
  },
})
export default class Home extends Vue {}
</script>
