# Webpack Candy loader

Load css files as pure react jsx components with classnames as boolean props

<div align="center">
<img src="https://img.shields.io/github/workflow/status/iminside/candy-loader/Node.js%20CI/master" alt="GitHub Workflow Status (branch)" /> 
<img src="https://img.shields.io/github/languages/top/iminside/candy-loader" alt="language" />
<img src="https://img.shields.io/npm/l/candy-loader" alt="license" />  
</div>

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

.message {
    font-size: 16px;
}
.active {
    color: red;
}
```

Import any html tag as pure jsx-component from css file

```tsx
import { Div } from './style.css'

const App = () => {
    return (
        <Div message active={true}>
            Hello World
        </Div>
    )
}

render(<App />, document.getElementById('app'))
```

## Based on `postcss`

You can use the usual postcss config file

```js
module.exports = {
    plugins: {
        // enable autoprefixer plugin
        autoprefixer: false,
    },
    processOptions: {
        // enable sourcemaps
        map: true,
    },
}
```

## Intellisense

Use [`typescript-plugin-candy`](https://github.com/iminside/typescript-plugin-candy) for type checking & autocomplete
