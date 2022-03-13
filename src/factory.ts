import React from 'react'
import { Tag } from './tags'

type Styles = { [k: string]: string }

export const createComponent = (tag: Tag, styles: Styles) => {
    return (props: JSX.IntrinsicAttributes & { [k in keyof Styles]: boolean }) => {
        const attributes = {} as { [k: string]: any }
        const style = {} as { [k: string]: any }
        const classNames = []

        for (const [key, val] of Object.entries(props)) {
            if (key.startsWith('__')) {
                const property = '--' + key.slice(2)

                style[property] = val

                continue
            }

            if (key === 'style') {
                if (typeof val === 'object') {
                    Object.assign(style, val)
                }
                continue
            }

            if (key === 'className') {
                if (!!val) {
                    classNames.push(val)
                }
                continue
            }

            if (key in styles) {
                if (val) {
                    classNames.push(styles[key])
                }
                continue
            }

            attributes[key as string] = val
        }

        if (!!Object.keys(style).length) {
            attributes.style = style
        }

        if (!!classNames.length) {
            attributes.className = classNames.join(' ')
        }

        return React.createElement(tag, attributes)
    }
}
