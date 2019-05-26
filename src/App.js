import React from 'react';
import './App.scss';
import {Header} from "./components/Header";
import ToolBox from "./components/ToolBox";
import ImageGallery from "./components/ImageGallery";
import MainContent from "./components/MainContent";
import {connect} from 'react-redux';
import ParametersBox from './components/ParametersBox'

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
                        <ParametersBox/>
                        <ImageGallery/>
                  </div>
              </main>

              <footer>

              </footer>
          </div>
      );
  }

}


export const mapStateToProps = state => {

    return{
        imageGallery: state.imageGallery
    }

};

const mapActionsToProps = {

};
export default connect(mapStateToProps, mapActionsToProps)(App);
