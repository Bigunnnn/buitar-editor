import { useEffect, useState } from 'react'
import { flatTypeArr, ToolType } from '../tools.config'
import { useSlateStatic } from 'slate-react'
import { getSelectedBlock } from '~common'

export const useBlockType = () => {
  const editor = useSlateStatic()
  const { selection } = editor
  const [blockType, setBlockType] = useState<ToolType>(flatTypeArr[0])

  useEffect(() => {
    const block = getSelectedBlock(editor)
    const format = block?.type || 'paragraph'
    const blockType = flatTypeArr.find((item) => item.key === format)
    if (blockType) {
      setBlockType(blockType)
    }
  }, [editor, selection])

  return blockType
}
