import React from "react";
import Carousel from "react-bootstrap/Carousel";
import CompImagen from "../components/CompImagen";
import "../styles/carusel.css";

function CarouselComp() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <CompImagen src={"../src/img/imagen 1.png"} />
        </Carousel.Item>
        <Carousel.Item>
          <CompImagen src={"../src/img/imagen 4.png"} />
        </Carousel.Item>
        <Carousel.Item>
          <CompImagen src={"../src/img/imagen 2.png"} />
        </Carousel.Item>
        <Carousel.Item>
          <CompImagen src={"../src/img/imagen 3.png"} />
        </Carousel.Item>
        <Carousel.Item>
          <CompImagen src={"../src/img/imagen 5.png"} />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComp;
