<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import Dialog from "./Dialog";
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  components = {
    Dialog
  };

  @Prop({
    type: String,
    default: "123"
  })
  private readonly msg!: string;

  @PropSync("show", {
    type: Boolean,
    default: false
  })
  private readonly showSync!: string;

  message1 = "";
  message2 = "";
  message3 = "";

  mounted() {
    console.log("");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
