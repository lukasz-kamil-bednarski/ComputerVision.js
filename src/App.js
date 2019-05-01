import React from 'react';
import './App.scss';
import {Header} from "./view/Header";

class App extends React.Component {

  render(){
      return (
          <div className="root">
              <header>
                <Header />
              </header>

              <main>
                  <div className="content-container">

                  </div>
              </main>

              <footer>

              </footer>
          </div>
      );
  }

}

export default App;
