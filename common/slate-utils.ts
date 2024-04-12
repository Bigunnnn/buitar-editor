import { CustomTypes, Range, Editor, Element as SlateElement, Text } from 'slate'
import { ReactEditor } from 'slate-react'

type TextFormat = keyof Omit<CustomTypes['Text'], 'text'>

export const isMarkActive = (editor: Editor, format: TextFormat) => {
  const marks = Editor.marks(editor)
  return marks ? !!marks[format] : false
}

export const isBlockActive = (editor: Editor, format: SlateElement['type']) => {
  return !!getSelectedBlockActive(editor, format)
}

/**
 * 获取当前 selection 中符合format的block
 * @param editor
 * @param format
 * @returns
 */
export const getSelectedBlockActive = (editor: Editor, format: SlateElement['type']) => {
  const { selection } = editor
  if (!selection) {
    return null
  }

  const nodes = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => {
        return (
          !Editor.isEditor(n) && SlateElement.isElement(n)
          // &&
          // n.type !== 'paragraph' &&
          // n.type !== 'list-item'
        )
      },
    })
  )

  const match = nodes.find(([node]) => (node as SlateElement).type === format)
  return match
}

/**
 * 自顶而下获取当前 selection 最后一层的block
 * @param editor
 * @returns
 */
export const getSelectedBlock = (editor: Editor) => {
  // 获取当前选区的位置
  const { selection } = editor

  if (!selection) {
    return null
  }

  // // 自顶而下获取当前选区的所有Element（paragraph与list-item除外）
  // const nodes = Array.from(
  //   Editor.nodes(editor, {
  //     // at: selection,
  //     at: Editor.unhangRange(editor, selection),
  //     match: (n) => {
  //       return (
  //         !Editor.isEditor(n) &&
  //         SlateElement.isElement(n) &&
  //         n.type !== 'paragraph' &&
  //         n.type !== 'list-item'
  //       )
  //     },
  //   })
  // )

  // /**
  //  * 默认选择当前最后一位有效element
  //  * @todo 多个类型element被选中时，获取最后一个显然是不可靠的（return null ?）
  //  */
  // if (nodes.length && nodes[nodes.length - 1]?.[0]) {
  //   return nodes[nodes.length - 1][0] as SlateElement
  // }

  const match = Editor.above(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      Editor.isBlock(editor, n) &&
      n.type !== 'paragraph' &&
      n.type !== 'list-item',
  })

  if (match) {
    return match[0] as SlateElement
  }

  return null
}

/**
 * 根据 selection 获取 选中的所有匹配 format 的 leaf
 * @param editor
 * @param format
 * @returns
 */
export const getSelectedLeavesFormat = (
  editor: CustomTypes['Editor'],
  format: keyof Omit<CustomTypes['Text'], 'text'>
) => {
  const { selection } = editor
  if (!selection) {
    return []
  }

  const leaves = []
  const range = Editor.range(editor, selection)

  for (const [node] of Editor.nodes(editor, { at: range, match: Text.isText })) {
    if (node[format]) {
      leaves.push(node)
    }
  }
  return leaves
}

/**
 * 根据 selection 获取选中的 DOMRect
 * @param editor
 * @returns
 */
export const getSelectedRect = (editor: CustomTypes['Editor']) => {
  const { selection } = editor
  if (!selection || Range.isCollapsed(selection)) {
    return null
  }

  const range = ReactEditor.toDOMRange(editor, selection)
  return range.getBoundingClientRect()
}