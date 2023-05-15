import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";


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

  const handlePrevBtn = async () => {
    setPage(page-1);
    updateNews();
  };
  const handleNextBtn = async () => {
    console.log("next btn clicked");
    setPage(page+1)
    updateNews();
  };

  
    return (
      <>
        <div className="container my-3">
          <h2 style={{marginTop : '80px', textAlign : 'center'}}> Daily News -Top {props.category} headlines</h2>
          {loading && <Spinner />}

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

          <div className="container d-flex justify-content-between">
            <button
              disabled={page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={handlePrevBtn}
            >
              &larr; Previous
            </button>
            <button
              disabled={
                page + 1 >
                Math.ceil(totalResults / props.pagesize)
              }
              type="button"
              className="btn btn-dark"
              onClick={handleNextBtn}
            >
              Next &rarr;
            </button>
          </div>
        </div>
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


