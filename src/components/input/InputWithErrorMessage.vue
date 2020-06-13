<template>
  <div>
    <label v-if="this.label">{{ this.label }}</label>
    <div id="input-window" :style="errorColor">
      <img v-if="this.icon" :src="this.icon" width="20" height="auto" />
      <input
        :type="this.type"
        spellcheck="false"
        :value="value"
        @input="input($event.target.value)"
        @blur="blur()"
      />
    </div>
    <div id="error-message" :style="errorColor">{{ errorMessage }}</div>
  </div>
</template>

<script lang="ts">
import { Prop, Component } from "vue-property-decorator"
import InputBase from "@/components/input/InputBase.vue"

interface ValidationResult {
  [key: string]: boolean
}

interface ErrorMessages {
  [key: string]: string
}

@Component
export default class InputWithErrorMessage extends InputBase {
  @Prop({ required: true })
  readonly validationResult!: ValidationResult

  @Prop({ required: true })
  readonly clientSideErrorMessage!: ErrorMessages

  @Prop({ default: undefined })
  readonly serverSideErrorMessage!: string[] | undefined

  get errorMessage(): string | null {
    if (!this.validationResult.$error && !this.serverSideErrorMessage) {
      return null
    }

    if (this.serverSideErrorMessage !== undefined) {
      return this.serverSideErrorMessage[0]
    }

    for (const item in this.validationResult) {
      if (!this.validationResult[item]) {
        return this.clientSideErrorMessage[item]
      }
    }

    return null
  }

  get errorColor(): object {
    const color =
      this.errorMessage === null ? "#1b1f36" : this.MAIN_COLOR.changeBrightness(0.9).toString()
    return {
      "--error-color": color
    }
  }
}
</script>

<style lang="scss" scoped>
#input-window {
  background-color: white;
  display: flex;
  flex-flow: row nowrap;
  border: solid 1px var(--error-color);
  border-radius: 8px;
  min-width: 300px;
  overflow: hidden;

  @media screen and (max-width: 450px) {
    width: 90vw;
  }
}

#error-message {
  margin: 3px 0 0 8px;
  font-size: 0.7em;
  color: var(--error-color);
  height: 0.7em;
}

img {
  margin: 0 5px 0 0;
  padding: 8px;
}

input {
  outline: none;
  border: none;
  font-size: 1.1em;
  width: 80%;
}

label {
  margin: 0 0 0 8px;
  font-size: 0.8em;
  font-weight: bold;
}
</style>
