<template>
  <input
    type="submit"
    :value="this.text"
    class="round colorized clickable"
    :style="this.backgroundColor"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator"
import Color from "@/utils/Color"
import { PropType } from "vue"

@Component
export default class ButtonBase extends Vue {
  @Prop({ type: Object as PropType<Color>, required: true })
  readonly color!: Color

  @Prop()
  readonly text!: string

  @Prop({ default: 0.95 })
  readonly brightnessRate!: number

  get backgroundColor(): object {
    return {
      "--color-original": this.color.toString(),
      "--color-hovered": this.color.changeBrightness(this.brightnessRate).toString()
    }
  }

  @Emit()
  public click() {
    // do nothing
  }
}
</script>

<style scoped lang="scss">
input {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  max-width: 250px;
  padding: 7px 25px;
  outline: none;
  border: none;
  font-size: 1.1em;
  font-weight: bold;
}

.round {
  border-radius: 50px;
}

.colorized {
  background-color: var(--color-original);

  &:hover {
    background-color: var(--color-hovered);
  }
}

.clickable {
  cursor: pointer;
}

img {
  padding: 0 5px;
}

.text {
}
</style>
