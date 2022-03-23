import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    articles = [];
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general',

    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    constructor(props) {
        super(props);
        // console.log("i am a constructore in news.js");
        this.state = {
            articles: this.articles,
            // used when the static news are pasted in the article array
            loading: false,
            page: 1,
            totalResults: 0,
        }
        document.title = `Samachar - ${this.capitalizeFirstLetter(this.props.category)}`; // changing the title of dom upper side of url
    }
    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        this.props.setProgress(700);

        let parsedData = await data.json()

        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);

    }
    async componentDidMount() {

        // console.log("component did mount is here")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pageSize}`
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData)
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false,

        // })
        this.updateNews()
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json()
        // console.log(parsedData)
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,

        })

    };

    handleNext = async () => {
        // console.log(" next ")
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=91730cb6a898439da46b0891f2e3a6c7&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        //     let data = await fetch(url);
        //     this.setState({ loading: true });
        //     let parsedData = await data.json()
        //     // console.log(parsedData)
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false,
        //     })
        // }
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }
    handlePrev = async () => {
        //     console.log(" previous ")
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=91730cb6a898439da46b0891f2e3a6c7&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
        //     let data = await fetch(url);
        //     this.setState({ loading: true });
        //     let parsedData = await data.json()
        //     // console.log(parsedData)
        //     this.setState({
        //         page: this.state.page - 1,
        //         articles: parsedData.articles,
        //         loading: false,
        //     })
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    render() {
        return (
            <>
                <h3 className="text-center my-12" style={{ marginTop: "65px", marginBottom: "12px" }}>Samachar - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>
                {/* <h3 className="text-center my-3">Samachar - Top headlines</h3> */}
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    // inverse={true} //
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">

                        <div className="row my-2">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4 mb-1" key={element.url}>
                                    {/* <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 55) : ""} imgUrl={element.urlToImage} newsurl={element.url} /> */}
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsurl={element.url} author={element.author ? element.author : "Unknown"} publishedAt={element.publishedAt} source={element.source.name} />
                                </div>
                            })}

                            {/* {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4 mb-1" key={element.url}>
                            {/* <NewsItem title={element.title ? element.title.slice(0, 30) : ""} description={element.description ? element.description.slice(0, 55) :         ""} imgUrl={element.urlToImage} newsurl={element.url} /> comment end syntax
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.      urlToImage} newsurl={element.url} author={element.author ? element.author : "Unknown"} publishedAt={element.publishedAt} source={element.   source.name} />
                            </div>
                            })} */}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-around my-2">
                    <button disabled={this.state.page <= 1} onClick={this.handlePrev} type="button" className="btn btn-primary"> &larr; previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNext} type="button" className="btn btn-primary">Next &rarr; </button>
                </div> */}

            </>
        )
    }
}

export default News
// notes ternary operatore used in title and description if they r null then do this {after the ? mark and else(after the : syntax)}
// this used bcoz when fetcing the data and that data containes the null value so we gwtting the error