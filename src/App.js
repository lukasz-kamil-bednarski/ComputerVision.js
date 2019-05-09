import React from 'react';
import './App.scss';
import {Header} from "./view/Header";
import {ToolBox} from "./view/ToolBox";
import {ImageGallery} from "./view/ImageGallery";
import MainContent from "./view/MainContent";

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
                        <MainContent/>
                        <ImageGallery/>
                  </div>
              </main>

              <footer>

              </footer>
          </div>
      );
  }

}

export default App;
