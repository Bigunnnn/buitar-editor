import { FC, HTMLProps, ReactNode } from 'react'
import cx from 'classnames'
import './list-item.scss'
import { Icon } from '~common';

interface ListItemProps extends HTMLProps<HTMLDivElement> {
  item: { title?: string; desc?: string; icon?: string }
  left?: ReactNode
  right?: ReactNode
}

export const ListItem: FC<ListItemProps> = ({ item, left, right, ...attrs }) => {
  const { title, desc, icon } = item
  return (
    <div {...attrs} className={cx('toolbar-chord-item', attrs.className)}>
      {left ||
        (icon && (
          <div className="toolbar-chord-item--left flex-center">
            <Icon name={icon} />
          </div>
        ))}
      <div className="toolbar-chord-middle">
        <div className="toolbar-chord-item--title">{title}</div>
        <div className="toolbar-chord-item--desc">{desc}</div>
      </div>
      {right}
    </div>
  )
}
