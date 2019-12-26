

import React from "react";
import {Carousel} from "react-bootstrap";
import "./style.css"


 const PhotoCarousel=(props)=> {
    return (
        <Carousel>
            {props.Photos.map(photo=>(
                <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={photo.url}
                  alt="First slide"
                />
                 </Carousel.Item>
            ))}
       
      </Carousel>
    );
}

export default PhotoCarousel;
