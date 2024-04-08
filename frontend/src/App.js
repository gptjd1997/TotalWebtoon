import React from 'react'
import { Route } from 'react-router-dom'
import { Index } from './pages/pages'
import 'semantic-ui-css/semantic.min.css'

function App() {
    return (
        <div div className="App">
            <Route exact path="/" component={Index} />
        </div>
    )
}

export default App
