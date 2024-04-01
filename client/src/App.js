import './App.css';
import React, { Component } from 'react';
import { Navbar } from "./components/Navbar";
import { News } from './components/News';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import Login from './components/Login';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SignUp from './components/SignUp';



export default class App extends Component {

  apikey = "3e0e3909d4b34d3f93d275e7812f4be1"
  state = {
    progress: 0,
    searchQuery: "",
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  }

  // Function to handle search button click
  handleSearch = () => {
    // Redirect to the search page when the search button is clicked
    if (this.state.searchQuery.trim() !== "") {
      window.location.href = `/search/${encodeURIComponent(this.state.searchQuery)}`;
    }
  }

  render() {
    return (
      <div>

        <Navbar />

        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />

        <div onSubmit={this.handleSearch} className='search-bar'>
        
          <div className='search-input'>
            <input
              type="text"
              placeholder="Search news articles..."
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
            />
          </div>

          <div className='search-button'>
            <button onClick={this.handleSearch} type='submit'>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<News setProgress={this.setProgress} key="general" apikey={this.apikey} category="general" />}></Route>
          <Route path="/business" element={<News setProgress={this.setProgress} key="business" apikey={this.apikey} category="business" />}></Route>
          <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" apikey={this.apikey} category="entertainment" />}></Route>
          <Route path="/health" element={<News setProgress={this.setProgress} key="health" apikey={this.apikey} category="health" />}></Route>
          <Route path="/science" element={<News setProgress={this.setProgress} key="science" apikey={this.apikey} category="science" />}></Route>
          <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" apikey={this.apikey} category="sports" />}></Route>
          <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" apikey={this.apikey} category="technology" />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

        </Routes>

      </div>
    )
  }
}

