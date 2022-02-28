# Candy

<div align="center">
<img src="https://img.shields.io/github/workflow/status/iminside/candy-loader/Node.js%20CI/master" alt="GitHub Workflow Status (branch)" /> 
<img src="https://img.shields.io/github/languages/top/iminside/candy-loader" alt="language" />
<img src="https://img.shields.io/npm/l/candy-loader" alt="license" />  
</div>

## Install

```bash
npm i candy-loader
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

Import any html tag as jsx-component from css file

```css
// style.css

.message {
    font-size: 16px;
}
.active {
    color: red;
}
```

```tsx
import { Div } from './style.css'

const App = () => {
    return (
        <Div message active={isMessageActive}>
            Hello World
        </Div>
    )
}

render(<App />, document.getElementById('app'))
```
