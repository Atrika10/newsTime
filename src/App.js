import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
 apikey = process.env.REACT_APP_NEWS_API;
  state = {
    progress : 10
  }

  setProgress =(progress)=>{
    this.setState({progress : progress});
  }
  render() {
    return (
      <div>
        < Router>
            <LoadingBar
            color='#f11946'
            progress={this.state.progress}
           
          />
            <Navbar/> 
          <Routes> 
            <Route key="general" exact path="/" element={<News setProgress = {this.setProgress} apikey={this.apikey} country="in" pagesize={6} category="general"/>} />
            <Route key="health" exact path="/health" element={<News setProgress = {this.setProgress} apikey={this.apikey} country="in" pagesize={6} category="health"/>} />
            <Route key="business" exact path="/business" element={<News setProgress = {this.setProgress} apikey={this.apikey} country="in" pagesize={6} category="business"/>} />
            <Route key="entertainment" exact path="/entertainment" element={<News setProgress = {this.setProgress} apikey={this.apikey} country="in" pagesize={6} category="entertainment"/>} />
            <Route key="technology" exact path="/technology" element={<News setProgress = {this.setProgress} apikey={this.apikey} country="in" pagesize={6} category="technology"/>} />
            <Route key="science" exact path="/science" element={<News setProgress = {this.setProgress} apikey={this.apikey} country="in" pagesize={6} category="science"/>} />
            <Route key="sports" exact path="/sports" element={<News setProgress = {this.setProgress} apikey={this.apikey} country="in" pagesize={6} category="sports"/>} />
            
        </Routes>
       </Router>
      </div>
    )
  }
}

