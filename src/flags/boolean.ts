import { BooleanFlagToken, ParsingToken } from '../parse'
import { Flag, IFlagBase, IFlagOptions } from './base'

export interface IBooleanFlag extends IFlagBase<boolean> {
  type: 'boolean'
}

export class BooleanFlag extends Flag<boolean> implements IBooleanFlag {
  public readonly type: 'boolean' = 'boolean'
  public input: string[] = []
  constructor(options: IFlagOptions = {}) {
    super(options)
  }
  public get value() {
    return this.input.length > 0
  }
  public handleInput(argv: string[]): ParsingToken | undefined {
    const argv0 = argv.shift()
    if (!argv0) {
      return
    }
    if (argv0 !== `--${this.name}`) {
      argv.unshift(argv0)
      return
    }
    this.input.push(argv0)
    const input = argv0
    return { type: 'boolean', flag: this.name!, input } as BooleanFlagToken
  }
}
