import React, { Component } from 'react';
import firebase from '../../firebase';
import { filter } from 'lodash';
import YouTube from 'react-youtube'
import RateMovie from '../RateMovie'
import { ActorCard } from '../ActorCard'
import {YouTubeComp} from '../Helpers/YouTubeComp'
var classNames = require('classnames');

export default class UpcomingMovieModal extends Component {
  constructor() {
    super();
    this.state = {
      showTrailer: false
    };
  }

  componentWillMount() {
    const user = this.props.user;
    const movie = this.props.movie;
    this.setState({ user, movie })
  }

  toggleTrailer() {
    this.setState({ showTrailer: !this.state.showTrailer })
  }

  render() {
    let modalShow = this.props.showModal ? 'show-modal' : 'hide-modal'
    let modal = classNames('modal-false', modalShow)
    const director = filter(this.props.credits.crew, { job: 'Director' }).map(e => e.name).join(', ');
    const directorsArray = filter(this.props.credits.crew, { job: 'Director' });
    const writers = (filter(this.props.credits.crew, { department: 'Writing' })).map(e => e.name).join(', ');
    const writersArray = filter(this.props.credits.crew, { department: 'Writing' });

    return (
      <div className={modal}>
      <div className="modal-background" onClick={() => this.props.close()}></div>
      <div className="modal-container" >
      <img className="modal-backdrop" src={'https://image.tmdb.org/t/p/w500' + this.props.movie.backdrop_path} />
      <div className="modal-header" >
                  <div className="modal-title">{this.props.movie.original_title}</div>
                  </div>
                <div className="modal-body">
                  <div className="modal-movie-deets">
                  <table>
                  <tbody>
                    <tr>
                      <th>{directorsArray.length > 1 ? 'Directors:' : 'Director:'}</th>
                      <td>{director}</td>
                    </tr>
                    <tr>
                      <th>Genre:</th>
                      <td>{this.props.genreNamesArray.join(', ')}</td>
                    </tr>
                    <tr>
                      <th>Runtime:</th>
                      <td>{this.props.minutesConverter(this.props.runtime)}</td>
                    </tr>
                    <tr>
                      <th>{writersArray.length > 1 ? 'Writers:' : 'Writer:'}</th>
                      <td>{writers}</td>
                    </tr>
                    <tr>
                      <th>Plot:</th>
                      <td>{this.props.movie.overview}</td>
                    </tr>
                    </tbody>
                  </table>
                  </div>
                  <div className="upcoming-trailer-container" onClick={() => this.toggleTrailer()}>
                    <img src={`https://img.youtube.com/vi/${this.props.youtubeID}/0.jpg`} className="trailer-link" />
                    <p className="play-trailer">PLAY<br/>TRAILER</p>
                  </div>
                  { this.state.showTrailer ?
                    <YouTubeComp
                    youtubeID={this.props.youtubeID}
                    showTrailer={this.state.showTrailer}
                    toggleTrailer={this.toggleTrailer.bind(this)}
                    />
                    :
                    null
                  }
                  <div className="actor-list">
                    {this.props.cast.map(m =>
                    <ActorCard cast={m} key={m.id}/>
                    )}
                  </div>
                </div>
              </div>
              </div>
    );
  }
}
