import React, { Component } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner"
export default class News extends Component {
    constructor() {
        super()
        this.state = {
            articles: [],
            page: 1,
            totalResults: 0
            // paseSize:18

        }
    }
    async getData() {
        console.log(this.props.paseSize);
        try {
            this.setState({ page: 1 })
            var rawdata=''
            if (this.props.search === "None") {
                 rawdata = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&pageSize=${this.props.pageSize}&apiKey=a599abfecd79462e97f0e48d5664cd6e`)
            }
            else {
                 rawdata = await fetch(`https://newsapi.org/v2/everything?q=${this.props.search}&language=${this.props.language}&pageSize=${this.props.pageSize}&apiKey=a599abfecd79462e97f0e48d5664cd6e`)
            }
           
            let result = await rawdata.json()
            this.setState({
                articles: result.articles,
                totalResults: result.totalResults
            })
        }
        catch (error) {
            console.log(error)
            alert("Something Went Wrong!")
        }
    }
    fetchMoreData = async () => {
        try {
            this.setState({ page: this.state.page + 1 })
            let rawdata = await fetch(`https://newsapi.org/v2/everything?q=${this.props.q}&language=${this.props.language}&pageSize=${this.props.pageSize}&page=${this.state.page}&apiKey=a599abfecd79462e97f0e48d5664cd6e`)
            let result = await rawdata.json()

            this.setState({ articles: this.state.articles.concat(result.articles) })

        }
        catch (error) {
            console.log(error)
            alert("Something Went Wrong!")
        }

    }
    componentDidMount() {
        this.getData()
    }
    componentDidUpdate(old) {
        // console.log(old.language,this.props.language)
        if (old.q !== this.props.q || old.language !== this.props.language || old.pageSize !== this.props.pageSize || old.search !== this.props.search)
            this.getData()
    }

    render() {
        return (
            <>
            <div className="container-fluid">
                <h5 className="backgound text-center text-light p-2 mt-2"> {this.props.q} News Section</h5>

                <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={<Spinner />}
                    >
                    
                        <div className="row">
                            {this.state.articles.map((item, index) => {
                                return <NewsItem
                                    key={index}
                                    title={item.title}
                                    pic={item.urlToImage}
                                    description={item.description}
                                    source={item.source}
                                    date={item.publishedAt}
                                    url={item.url}
                                />
                            })}
                        </div>
                 
                </InfiniteScroll>
                </div>
            </>
        )
    }
}