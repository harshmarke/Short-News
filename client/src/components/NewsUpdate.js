import React, { Component } from 'react';
import default_image from "./default_image.png";

export class NewsUpdate extends Component {
    render() {

        let { title, imageUrl, newsUrl, author, source } = this.props;

        if (!newsUrl) {
            return null; // Skip rendering this article
        }
        

        return (
            <div className='my-3'>
                <div className='card' style={{ width: "25rem" }}>

                    <div className='card-header bg-warning'>
                        <b>
                            {source}
                        </b>
                    </div>

                    <img src={!imageUrl?default_image:imageUrl} className='card-img-top' alt="..." height="200px" width="400px"/>

                    <div className='card-body'>

                        <div style={{ height:'100px' }}>
                            <h5 className='card-title'>{title}...</h5>
                        </div>
                        
                        <a target='_blank' rel='noreferrer' href={newsUrl} className='btn btn-primary'>Read</a>
                    </div>

                    <div className='card-footer text-success'>
                        <cite title="Source Title">
                            By: {!author?source:author}
                        </cite>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsUpdate