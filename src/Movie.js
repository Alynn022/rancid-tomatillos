import React, { Component } from 'react';
import './Movie.css';
import apiCalls from './apiCalls';
import format from './format'

class Movie extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      id: props.id,
      poster: '', 
      title: '',
      rating: null,
      releaseDate: '',
      backdrop: '',
      budget: 0,
      revenue: 0,
      genres: [],
      overview: '',
      runtime: null,
      tagline: '',
      error: false
    }
  }
  
  componentDidMount() {
    apiCalls.getData(`movies/${this.state.id}`)
    .then(data => {
      this.setState({
        id: data.movie.id,
        poster: data.movie.poster_path, 
        title: data.movie.title,
        rating: data.movie.average_rating,
        releaseDate: data.movie.release_date,
        backdrop: data.movie.backdrop_path,
        budget: data.movie.budget,
        revenue: data.movie.revenue,
        genres: data.movie.genres,
        overview: data.movie.overview,
        runtime: data.movie.runtime,
        tagline: data.movie.tagline,
      })
    })
    .catch(error => { 
      this.setState({ error: true })
      this.props.handleError(error)
    })
  }

  render() {
    let dollarUSLocale = Intl.NumberFormat('en-US'); 
    const detailsView = !this.state.error && 
      <section className="movie-details-view" id={this.state.id}>
        <article className="left-side">
          <img className="movie-poster-img" src={this.state.poster} alt={"Poster for " + this.state.title}/>
          <h2 className="title">{this.state.title}</h2>
          <section className="details-box">
            {this.state.tagline.length > 0 && <h3><em>"{this.state.tagline}"</em></h3>}
            {this.state.rating && <p>Rating: {format.rating(this.state.rating)}</p>}
            <p>Release Date: {format.date(this.state.releaseDate)}</p>
            {this.state.genres.length > 0 && <p>Genres: {format.genres(this.state.genres)}</p>}
            {this.state.runtime > 0 && <p>Runtime: {this.state.runtime} minutes</p>}
            {this.state.budget > 0 && <p>Budget: ${format.money(this.state.budget)}</p>}
            {this.state.revenue > 0 && <p>Revenue: ${format.money(this.state.revenue)}</p>}
          </section>
        </article>
        <section className="right-side">
          <img className="backdrop-img" src={this.state.backdrop} alt={"Backdrop Image for " + this.state.title}/>
          <p className="overview-text">{this.state.overview}</p>
        </section>
      </section>
    return (
      <>
        { detailsView }
      </>
    )
  }
};

export default Movie;