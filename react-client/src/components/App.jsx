import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import { withAuthenticator } from 'aws-amplify-react';


class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <Header/>
                <Main/>
                <Footer/>
            </div>
        )
    }
}

export default withAuthenticator(App,{ includeGreetings: false });