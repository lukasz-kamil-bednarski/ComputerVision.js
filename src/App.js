import React from 'react';
import './App.scss';
import {Header} from "./view/Header";
import {ToolBox} from "./view/ToolBox";

class App extends React.Component {

  render(){
      return (
          <div className="root">
              <header>
                <Header />
              </header>

              <main>
                  <div className="content-container">
                        <ToolBox/>
                  </div>
              </main>

              <footer>

              </footer>
          </div>
      );
  }

}

export default App;
