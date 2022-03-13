import React from 'react'
import { Tag } from './tags'

type Styles = { [k: string]: string }

export const createComponent = (tag: Tag, styles: Styles) => {
    return (props: JSX.IntrinsicAttributes & { [k in keyof Styles]: boolean }) => {
        const attributes = {} as { [k: string]: any }
        const classNames = []

        for (const [key, val] of Object.entries(props)) {
            if (key === 'className') {
                if (!!val) {
                    classNames.push(val)
                }
            } else if (key in styles) {
                if (val) {
                    classNames.push(styles[key])
                }
            } else {
                attributes[key as string] = val
            }
        }

        if (!!classNames.length) {
            attributes.className = classNames.join(' ')
        }

        return React.createElement(tag, attributes)
    }
}
