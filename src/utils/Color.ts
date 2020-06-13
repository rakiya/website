export default class Color {
  readonly red!: number
  readonly green!: number
  readonly blue!: number

  constructor(rgb: number) {
    this.red = (rgb & 0xff0000) >> 16
    this.green = (rgb & 0x00ff00) >> 8
    this.blue = rgb & 0x0000ff
  }

  public changeBrightness(scale = 0.95): Color {
    const newRed = Math.min(0xff, this.red * scale)
    const newGreen = Math.min(0xff, this.green * scale)
    const newBlue = Math.min(0xff, this.blue * scale)
    return new Color((newRed << 16) + (newGreen << 8) + newBlue)
  }

  public toString(): string {
    return "#" + this.red.toString(16) + this.green.toString(16) + this.blue.toString(16)
  }
}
