import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

// let category = 'business';
// const API_URL = `https://newsapi.org/v2/top-headlines?country={this.props.categories}&category=${category}&apiKey=b2f661aba90e49eba0d98d19cac4ba0c`;
// const API_URL = "https://newsapi.org/v2/top-headlines?country=us&apiKey=b2f661aba90e49eba0d98d19cac4ba0c&pagesize=6";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 6,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.props.category} - Daily News`;
  }

  async updateNews() {
    this.props.setProgress(10);
    this.setState({ loading: true });
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pagesize)
    ) {
    } else {
      let response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`
      );
      let data = await response.json();
      this.props.setProgress(30);
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
    }
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevBtn = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextBtn = async () => {
    console.log("next btn clicked");
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <>
        <div className="container my-3">
          <h2 style={{marginTop : '80px', textAlign : 'center'}}> Daily News -Top {this.props.category} headlines</h2>
          {this.state.loading && <Spinner />}

          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>

          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevBtn}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pagesize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextBtn}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
