import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props){
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  console.log(props.apikey + " thisis");

   const updateNews =  async ()=> {
    props.setProgress(10);
    const url =  `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;

    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
      
      props.setProgress(30);
      setArticles(data.articles);
      setTotalResults(data.totalResults);

      setLoading(false);
    
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
    // eslint-disable-next-line
  },[])

   const fetchMoreData = async() => {
    
     setPage(page+1);
    const url =  `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pagesize}`;


    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
      
    setArticles(articles.concat(data.articles));
    setTotalResults(data.totalResults);
    setLoading(false);
    
  };

  
    return (
      <>
        
          <h2 className="heading" style={{marginTop : '80px', textAlign : 'center'}}> Daily News -Top {props.category} headlines</h2>
          {loading && <Spinner />}

          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
          >
          <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
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
          </div>
          </InfiniteScroll>

          
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pagesize: 6,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};


