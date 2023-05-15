import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default function App() {
 const apikey = process.env.REACT_APP_NEWS_API;
 console.log(apikey);
  // state = {
  //   progress : 10
  // }
  const [progress, setProgress] = useState(0)

    return (
      <div>
        < Router>
            <LoadingBar
            color='#f11946'
            progress={progress}
           
          />
            <Navbar/> 
          <Routes> 
            <Route exact path="/" element={<News setProgress = {setProgress} apikey={apikey} country="in" key="general" pagesize={6} category="general"/>} />
            <Route exact path="/health" element={<News setProgress = {setProgress} apikey={apikey} country="in" key="health" pagesize={6} category="health"/>} />
            <Route exact path="/business" element={<News setProgress = {setProgress} apikey={apikey} country="in" key="business" pagesize={6} category="business"/>} />
            <Route exact path="/entertainment" element={<News setProgress = {setProgress} apikey={apikey} country="in" key="entertainment" pagesize={6} category="entertainment"/>} />
            <Route exact path="/technology" element={<News setProgress = {setProgress} apikey={apikey} country="in" key="technology" pagesize={6} category="technology"/>} />
            <Route exact path="/science" element={<News setProgress = {setProgress} apikey={apikey} country="in"  key="science" pagesize={6} category="science"/>} />
            <Route exact path="/sports" element={<News setProgress = {setProgress} apikey={apikey} country="in" key="sports" pagesize={6} category="sports"/>} />
            
        </Routes>
       </Router>
      </div>
    )
  
}

