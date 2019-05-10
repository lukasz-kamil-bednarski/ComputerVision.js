import React from 'react';
import './App.scss';
import {Header} from "./view/Header";
import ToolBox from "./view/ToolBox";
import ImageGallery from "./view/ImageGallery";
import MainContent from "./view/MainContent";
import {connect} from 'react-redux';

class App extends React.Component {

  render(){
      console.log(this.props);
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


export const mapStateToProps = state => {

    return{
        imageGallery: state.imageGallery
    }

};

const mapActionsToProps = {

};
export default connect(mapStateToProps, mapActionsToProps)(App);
