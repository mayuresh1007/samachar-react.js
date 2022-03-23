import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsurl, publishedAt, author, source } = this.props;
        // this is called as destructuring ^^ extracting from props{object like} what we want 
        return (
            <div >
                <div className="card" >
                    <div style={{display :"flex", justifyContent:"flex-end", position:"" , right:"0"}}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={!imgUrl ? "https://image.freepik.com/free-vector/technology-background-with-earth-circuit-diagram_1017-19385.jpg" : imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-danger">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
                        <a href={newsurl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem

// style={{ width: "15rem" }}