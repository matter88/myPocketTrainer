import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="guava">
                <Header />
                <Main />
            </div>
        )
    }
}


export default App;