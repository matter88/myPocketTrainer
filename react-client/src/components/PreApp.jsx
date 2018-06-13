import React from 'react';
import App from './App.jsx';

class PreApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <App/>
            </div>
        )
    }
}