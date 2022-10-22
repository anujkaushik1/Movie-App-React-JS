import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Movies extends Component {
    render() {

        let movieResult = movies.results;

        return (

            <>
                {
                    movieResult.length == 0 ?
                    // Spinner
                        <div>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        :

                        // Movies Cardsc
                        <div>
                            <h3 style={{ fontWeight: 'bold' }} className='text-center'>Trending</h3>
                            <div className='movies-list'>
                                {
                                    movieResult.map((movie) => (
                                        <div className="card movies-card">
                                            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} className='card-img-top movies-img'/>
                                            <h5 className="card-title movies-title">{movie.original_title}</h5>
                                            {/* <p className="card-text movies-text">{movie.overview}</p> */}
                                            <div className="button-wrapper" style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                                <a href="#" className="btn btn-primary movies-button">Add to Favourites</a>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* Pagination */}
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                        </ul>
                                    </nav>
                            </div>
                           

                        </div>

                }

            </>

        )
    }
}
