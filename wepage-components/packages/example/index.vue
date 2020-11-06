<script lang="tsx">
import BaseVue from "wepage-components/BaseVue";
import { Component, Prop } from "vue-property-decorator";
@Component({
  name: "RpExample"
})
export default class RpExample extends BaseVue {
  @Prop({
    type: String
  })
  title;

  @Prop({
    type: String
  })
  background;

  created() {
    console.log("mockData", this.$attrs);
  }

  render() {
    return (
      <div class="rp-example" style={{ background: this.background }}>
        <h1>{this.title}</h1>
      </div>
    );
  }
}
</script>
<style lang="scss" scoped>
@include b(example) {
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
</style>
