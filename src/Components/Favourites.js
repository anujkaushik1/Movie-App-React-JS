import React, { Component } from "react";
import { movies } from "./getMovies";

export default class Favourites extends Component {

    constructor() {
        super();
        this.state = {
            genres: [],
            currGenre: 'All Geners',
            movies: [],
            currText: '',
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount() {
        let data = JSON.parse(localStorage.getItem("movies") || "[]");

        const movie = movies.results;
        let temp = [];

        let genreids = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };

        movie.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        })

        temp.unshift("All Geners")

        this.setState({
            movies: [...data],
            genres: [...temp]
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currGenre: genre
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return b.popularity - a.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortPopularityAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return a.popularity - b.popularity;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return b.vote_average - a.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return a.vote_average - b.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    handlePageChange = (page) => {
        this.setState({
            currPage: page
        })
    }

    deleteMovie = (movie) => {

        let moviesArr = this.state.movies.filter((movieObj) => {
            if(movieObj !== movie){
                return movieObj;
            }
        })

        localStorage.setItem("movies", JSON.stringify(moviesArr));

        this.setState({
            movies : [...moviesArr]
        })

    }


    render() {

        let genreids = {
            28: "Action",
            12: "Adventure",
            16: "Animation",
            35: "Comedy",
            80: "Crime",
            99: "Documentary",
            18: "Drama",
            10751: "Family",
            14: "Fantasy",
            36: "History",
            27: "Horror",
            10402: "Music",
            9648: "Mystery",
            10749: "Romance",
            878: "Sci-fi",
            10770: "TV",
            53: "Thriller",
            10752: "War",
            37: "Western",
        };

        let filterArr = [];

        if (this.state.currText !== '') {
            filterArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.title.toLowerCase();

                if (title.includes(this.state.currText.toLowerCase())) {
                    return title.includes(this.state.currText.toLowerCase());
                }
            })
        }
        else {
            filterArr = [...this.state.movies];
        }

        console.log(filterArr);

        if (this.state.currGenre !== 'All Geners') {
            filterArr = this.state.movies.filter((movieObj) => {
                if (genreids[movieObj.genre_ids[0]] === this.state.currGenre) {
                    return this.state.currGenre;
                }
            })
        }

        let pages = Math.ceil(filterArr.length / this.state.limit);
        let pagesArr = [];

        for (let i = 1; i <= pages; i++) {
            pagesArr.push(i);
        }

        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit;
        filterArr = filterArr.slice(si, ei);


        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-3">
                            <ul class="list-group favourites-genres">

                                {
                                    this.state.genres.map((genre) => (

                                        this.state.currGenre == genre ?
                                            <li class="list-group-item" style={{ background: '#3f51b5', color: 'white', fontWeight: 'bold' }} >{genre}</li>

                                            :

                                            <li class="list-group-item" style={{ background: 'white', color: '#3f51b5' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>

                                    ))
                                }

                            </ul>
                        </div>

                        <div className="col-9 favourites-table">
                            <div className="row">
                                <input type="text" className="input-group-text col" placeholder="Search" value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })} />
                                <input type="number" className="input-group-text col" placeholder="Rows Count" value={this.state.limit} onChange = {(e) => this.setState({limit : e.target.value})}/>
                            </div>

                            <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc} />Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}> </i></th>
                                            <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc} />Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}> </i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map((movieObj) => (
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} />{movieObj.original_title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={() => this.deleteMovie(movieObj)}>Delete</button></td>

                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {
                                        pagesArr.map((page) => (
                                            <li class="page-item"><a class="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                        ))
                                    }

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
