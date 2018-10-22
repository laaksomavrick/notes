<template>
  <div class="home">
    <div>
      Hello from Vue
    </div>
    <div>
      Hello from nest: {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
// tslint:disable
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  message: string = '';

  async mounted() {
    console.log('requesting data...');
    const response = await axios.get(process.env.VUE_APP_API_HOST);
    this.message = response.data.message;
  }
}
</script>
