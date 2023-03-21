import React, { Component } from "react";
import pic from "../asstes/images/no.png"
import { Link } from "react-router-dom";

export default class NewsItem extends Component {
    render() {
        return (
            <div className='col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-3'>
                <div class="card">
                    <img src={this.props.pic?this.props.pic:pic} height="200px" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title heading">{this.props.title?this.props.title.slice(0,100)+"...":""}</h5>
                        <p class="card-text text-center" style={{fontSize:"13px"}}>Date:{(this.props.date)}</p>
                        <p class="card-text source ">{this.props.source.name}</p>
                        <p class="card-text desc">{this.props.description}</p>
                        <Link to={this.props.url} class="btn mybtn backgound text-light w-100">Read Full Articles</Link>
                    </div>
                </div>
            </div>
        )
    }
}