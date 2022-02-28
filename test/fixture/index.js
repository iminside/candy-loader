import React from 'react'
import { render } from 'react-dom'
import { Section, Div, H1, P } from './style.css'

const App = () => {
    return (
        <Section>
            <H1>Title</H1>
            <Div user>
                <Div avatar />
                <Div name>User name</Div>
            </Div>
            <P message>Message One</P>
            <P message active>
                Message Two
            </P>
        </Section>
    )
}

const root = document.getElementById('root')

render(<App />, root)
