![](https://habrastorage.org/webt/t2/i8/72/t2i872xwmelpxkvov0be1dgo5-q.png)

<div align="center">
<img src="https://img.shields.io/github/workflow/status/iminside/candy-loader/Node.js%20CI/master" alt="GitHub Workflow Status (branch)" /> 
<img src="https://img.shields.io/github/languages/top/iminside/candy-loader" alt="language" />
<img src="https://img.shields.io/npm/l/candy-loader" alt="license" />  
</div>

# Webpack Candy loader

Load css files as pure react jsx components with classnames as boolean props

## Install

```bash
npm i -D candy-loader
```

## Settings

Update the loaders in your `webpack.config.js` file.

```js
{
    rules: [
        {
            test: /\.css$/,
            use: ['style-loader', 'candy-loader'],
        },
    ],
}
```

## Usage

Use classnames in camelCase mode

```css
/* style.css */

.badge {
    color: white;
}
.coral {
    background-color: coral;
}
.green {
    background-color: green;
}
```

Import any html tag as pure jsx-component from css file

```tsx
import { Div } from './style.css'

interface BadgeProps {
    color: 'coral' | 'green'
}

const Badge = (props: BadgeProps) => {
    const isCoral = props.color === 'coral'
    const isGreen = props.color === 'green'

    return (
        <Div badge coral={isCoral} green={isGreen}>
            Badge
        </Div>
    )
}
```

## Imports

You can include css files and access their styles.

```css
/* styles.css */
@import 'grid.css';

.root {
    /*...*/
}
```

```tsx
import { Div } from './styles.css'

function Component(props) {
    return (
        <Div root col_xs_12 col_sm_8>
            ...
        </Div>
    )
}
```

## Pass css-variables

If a property starts with a double underscore, then its value can be retrieved using `var()` on any class applied to the element.

```tsx
import { Div } from './styles.css'

function Component(props) {
    return (
        <Div name __fontSize="14px">
            John
        </Div>
    )
}
```

```css
.name {
    color: black;
    font-size: var(--fontSize);
}
```

## Get styles like css-modules

```css
.box {
    width: 50px;
    height: 50px;
}
```

```tsx
import styles from './styles.css'

function Box(props) {
    return <div className={styles.box}>...</div>
}
```

## Based on `postcss`

You can use the usual postcss config file

```js
module.exports = {
    plugins: {
        autoprefixer: isProduction,
    },
    processOptions: {
        map: isDevelopment,
    },
}
```

## Intellisense

Use [`typescript-plugin-candy`](https://github.com/iminside/typescript-plugin-candy) for type checking & autocomplete
