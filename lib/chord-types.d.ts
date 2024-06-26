import type { BoardChord } from '@buitar/to-guitar'
import type { TablatureInstrument } from 'abcjs'
import type { Text } from 'slate'

type CustomChordType = {
  taps: BoardChord
  concise?: boolean
  popover?: boolean
}

export type CustomInlineChordElement = {
  type: 'inline-chord'
  children?: Descendant[]
} & CustomChordType

export type ABCTablatureElement = {
  type: 'abc-tablature'
  instrument?: TablatureInstrument
  children?: Descendant[]
}

export type GTPPreviewerElement = {
  type: 'gtp-previewer'
  children?: Descendant[]
}

export type CustomChordText = {
  text: string
  chord?: CustomChordType
}

export type ChordEditor = {
  insertInlineChord?: (taps: BoardChord, concise?: boolean) => void
  insertFixedChord?: (text: string, chord: CustomChordType) => void
}
