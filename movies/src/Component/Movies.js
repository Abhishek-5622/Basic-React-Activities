// import react
import React, { Component } from 'react'
// import css file
import './movies.css'
// import image
import Image from "./logo.jpg"
// import axios => for fetch data
import axios from 'axios'

export default class Movies extends Component {
    // constructor call
    constructor(props) {
        // call parent constructor
        super(props);
        // create state
        this.state = {
            // movies array
            movies: [],
            //search text
            currSearchText: '',
            // limit of movie on a page
            limit: 4,
            // current page
            currPage: 1,
            // current genre
            cGenre: 'All Genres',
            // genres array that contains all genres
            genres: [{ _id: 'abcd', name: 'All Genres' }]
        }
    }

    // async function
    // life cycle =>  render -> component Did Mount 
    async componentDidMount() {
        // Create promise (Network call)
        let promise = axios.get('https://backend-react-movie.herokuapp.com/movies');
        let promise2 = axios.get('https://backend-react-movie.herokuapp.com/genres');
        // wait until promise complete
        let data = await promise;
        let data2 = await promise2;
        // set state
        this.setState({
            // set movies array
            movies: data.data.movies,
            // add genres array from network call and state
            genres: [...this.state.genres, ...data2.data.genres]
        })
    }

    // function that is used to delete movies from movies array
    onDelete = (id) => {
        // create new array => apply filter => compare id of movie 
        let newMovies = this.state.movies.filter(movieObj => {
            return movieObj._id != id
        })
        // update state => render call
        this.setState({
            // set movies array to new movies array
            movies: newMovies
        })
    }
    //  function is call when we change in search box
    handleChange = (e) => {
        // get current search box value
        let task = e.target.value;
        // set state => call render
        this.setState({ currSearchText: task });
    }

    // sort stock in ascending order
    sortUpStock = (e) => {
        let mov = this.state.movies.sort((a, b) => {
            return a.numberInStock - b.numberInStock;
        });
        this.setState({
            movies: mov
        });
    }

    // sort stock in decending order
    sortDownStock = (e) => {

        let mov = this.state.movies.sort((a, b) => {
            return b.numberInStock - a.numberInStock;
        });
        this.setState({
            movies: mov
        });
    }

    // sort rate in ascending order
    sortUpRate = (e) => {
        let mov = this.state.movies.sort((a, b) => {
            return a.dailyRentalRate - b.dailyRentalRate;
        });
        this.setState({
            movies: mov
        });
    }

    // sort rate in desending order
    sortDownRate = (e) => {

        let mov = this.state.movies.sort((a, b) => {
            return b.dailyRentalRate - a.dailyRentalRate;
        });
        this.setState({
            movies: mov
        });
    }

    // when we change limit then state limit is also change
    handleLimit = (e) => {
        // convert into number
        let num = Number(e.target.value);
        // setstate => render call
        this.setState({
            limit: num
        })
    }
    // when we click on page button
    handlePageChange = (pageNumber) => {
        // set state =>render call
        this.setState({ currPage: pageNumber });
    }
    // click on any genre => current genre change
    handleGenreChange = (genre) => {
        this.setState({
            cGenre: genre
        })
    }

    // render part
    render() {
        // get movies and currSearchText from state
        let { movies, currSearchText, currPage, limit, cGenre, genres } = this.state;
        // create empty array
        let filterMovies = [];
        // if search box is not empty => filtering 
        if (currSearchText != '') {
            // create filtermovie array 
            filterMovies = movies.filter(movieObj => {
                // get title of movies => trim() + tolower()
                let title = movieObj.title.trim().toLowerCase();
                //  return those movies that contains currsearchText 
                // convert currSearchText to lowercase
                return title.includes(currSearchText.toLowerCase())
            })
        }
        // if search box is empty => No filtering 
        else {
            // set filtermovie to movies array
            filterMovies = movies;
        }
        // if current genres is not equal to All Genres
        if (cGenre != 'All Genres') {
            // apply filter
            filterMovies = filterMovies.filter(function (movieObj) {
                // return those movies that genre is current genre
                return movieObj.genre.name == cGenre;
            })
        }

        // number of page = movies.length / limit of pages display on screen
        let numberofPages = Math.ceil(filterMovies.length / limit);
        // create empty array
        let pageNumberArr = [];
        // add page number in pageNumberArr
        for (let i = 0; i < numberofPages; i++) {
            pageNumberArr.push(i + 1);
        }

        // get starting index
        let si = (currPage - 1) * limit;
        // get end index
        let li = si + limit;
        // slice filter movie array
        filterMovies = filterMovies.slice(si, li);

        // return => UI of app
        // create table 
        return (
            <>
                {
                    this.state.movies.length == 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :

                        <div className="parent_container">
                            <div className="heading">
                                <div className="head_container">
                                    <img src={Image}></img>
                                    <h1>Movie Night</h1>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3'>
                                    <ul className="list-group">
                                        {
                                            genres.map((genreObj) => (
                                                <li onClick={() => this.handleGenreChange(genreObj.name)} key={genreObj._id} className='list-group-item'>
                                                    {genreObj.name}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                    <h5>Current Genre :{cGenre}</h5>
                                </div>
                                <div className='col-9'>
                                    <input value={this.state.currSearchText} placeholder="Enter Movie Name" className="input_box" onChange={this.handleChange} type='text'></input>
                                    <br></br>
                                    Limit :<input className="limit_box" value={this.state.limit > filterMovies.length ? filterMovies.length : this.state.limit}
                                        onChange={this.handleLimit} min='1' max={movies.length} type='number'></input>
                                    <br></br>
                                    <table className="table table-dark table-striped table_position">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Genre</th>

                                                <th scope="col">

                                                    <i className="fas fa-sort-up" onClick={this.sortUpStock}></i>
                                                    Stock
                                                    <i className="fas fa-sort-down" onClick={this.sortDownStock}></i>
                                                </th>
                                                <th scope="col">

                                                    <i className="fas fa-sort-up" onClick={this.sortUpRate}></i>
                                                    Rate
                                                    <i className="fas fa-sort-down" onClick={this.sortDownRate}></i>
                                                </th>
                                                <th scope="col"></th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //    diplay movies => map used
                                                filterMovies.map(movieObj => (
                                                    //    set key for uniquely identification
                                                    <tr scope='row' key={movieObj._id} >

                                                        <td></td>
                                                        <td>{movieObj.title}</td>
                                                        <td>{movieObj.genre.name}</td>
                                                        <td>{movieObj.numberInStock}</td>
                                                        <td>{movieObj.dailyRentalRate}</td>
                                                        <td><button type='button' className='btn btn-danger' onClick={() => this.onDelete(movieObj._id)}>Delete</button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>

                                    </table>
                                    <nav aria-label="...">
                                        <ul className="pagination">
                                            {
                                                // map on pagenumber arr
                                                pageNumberArr.map(pageNumber => {
                                                    // get class => if current page and pagenumber is same then add active class also.
                                                    let classStyleName = pageNumber == currPage ? 'page-item active' : 'page-item'
                                                    return (
                                                        <li onClick={() => this.handlePageChange(pageNumber)} className={classStyleName} key={pageNumber} >
                                                            <span className="page-link">{pageNumber}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                }
            </>
        )
    }
}