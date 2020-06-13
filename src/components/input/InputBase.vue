<template>
  <div>
    <label v-if="this.label">{{ this.label }}</label>
    <div id="input-window">
      <img v-if="this.icon" :src="this.icon" width="20" height="auto" />
      <input
        :type="this.type"
        spellcheck="false"
        :value="value"
        @input="input($event.target.value)"
        @blur="blur()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Prop, Component, Emit } from "vue-property-decorator"
import DefaultColors from "@/mixins/DefaultColors"

@Component
export default class InputBase extends Mixins(DefaultColors) {
  @Prop()
  readonly icon?: string

  @Prop()
  readonly label?: string

  @Prop({ required: true })
  readonly type!: string

  @Prop({ default: "" })
  readonly value!: string

  @Emit()
  public input(value: string) {
    return value
  }

  @Emit()
  blur() {
    // do nothing
  }
}
</script>

<style lang="scss" scoped>
#input-window {
  background-color: white;
  display: flex;
  flex-flow: row nowrap;
  border: solid 1px #1b1f36;
  border-radius: 50px;
  min-width: 300px;
  overflow: hidden;

  @media screen and (max-width: 450px) {
    width: 90vw;
  }
}

img {
  margin: 0 5px 0 0;
  padding: 8px;
}

input {
  width: 80%;
  outline: none;
  border: none;
  font-size: 1.1em;
}

label {
  font-size: 0.8em;
  font-weight: bold;
}
</style>
