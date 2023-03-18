import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React from "react";


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

var listOfImages =[];

function importAll(r) {
  return r.keys().map(r);
}

function Collaborator_Carousel(){
  listOfImages = importAll(require.context('./img/Collaborator/', false, /\.(png|jpe?g|svg)$/));
  console.log(listOfImages)
  return(
      <Carousel 
          responsive={responsive} 
          infinite={true}
          containerClass="carousel-container"
      >
          {
                listOfImages.map(
                  (image, index) =>    
                      <img 
                          className="d-block" 
                          style={{marginLeft: "auto", marginRight: "auto", display: "flex", justifyContent: "center"}}
                          key={index} src={image} alt="info">
                      </img>
                )
          }
      </Carousel>
    )
}

export default Collaborator_Carousel;