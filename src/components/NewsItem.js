import React from "react";


export default function NewsItem (props) {
    let { title, description, imageUrl, newsUrl, author, date } = props;

    return (
      <>
        <div className="my-5">
          <div className="card eachCard" style={{ width: "18rem" }}>
            <img className="card-img-top" src={!imageUrl?"https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg":imageUrl} alt="newsitemImg" />
            <div className="card-body">
              <h5 className="card-title"> {title}</h5>
              <p className="card-text fontColor">{description}</p>
              <p className="card-text"><small className="text-muted">By: {!author ? "Unknown" : author} on {new Date(date).toGMTString()} </small></p>
              <a
                href={newsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-dark btn-primary fontBold"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </>
    );
  
}
