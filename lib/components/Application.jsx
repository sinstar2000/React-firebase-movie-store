import React, { Component } from 'react'
import firebase, { signIn, signOut } from '../firebase';
import { pick, split, map } from 'lodash';
import AddMovie from './addMovie'
import MovieCard from './MovieCard'
import logo from '../images/reel.png'

export default class Application extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      movieResults: []
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }

  retrieveMovieSearch(input) {
    const updatedTitle = input.replace('', '+')
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=1500d38f789b9c7a70e564559a8c644d&query=${updatedTitle}`)
    .then((response) => response.json())
    .then(data => this.setState( {movieResults: data.results} ))
  }

  addNewMovie(movie) {
    const { user } = this.state;
    messagesFromDatabase.push({
      user: pick(user, 'displayName', 'email', 'uid'),
      content: movie
    });
  }

  render() {
    const { user } = this.state;
    let currentUser;
    let firstName;
    if (this.state.user !== null) {
      currentUser = this.state.user.displayName
      firstName = split(this.state.user.displayName, ' ')
    }

    return (
      <div className="Application">
        <div className="App-header">
        <div className='active-user'>{user ?
          <p>Logged in as <span className="bold">{firstName[0]}</span> ({user.email})  <button className='auth-button button' onClick={()=> signOut()}>Sign Out</button>
          </p>
          : <button className='auth-button' onClick={() => signIn()}>Sign In</button> }
        </div>
          <img src={logo} className="logo" alt="logo" />
          <h2>Welcome to MovieKeeper</h2>
          <AddMovie retrieveMovieSearch={this.retrieveMovieSearch.bind(this)}/>
        </div>
      <div>
        {this.state.movieResults.map((m, i) =>
          <MovieCard movie={m} key={i} user={this.state.user}/>
        )}
      </div>
      </div>
    )
  }
}
