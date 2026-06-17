import '../../style/Carousel.css'
import Image from 'next/image'


export default function Carousel(){
  return (
    <div id="carouselExampleIndicators" className="carousel slide main">
      {/* Indicators */}

      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
 
      <div className="carousel-inner">
        <div className="carousel-item active" >
          <Image src="/image/carouselimage/7912204.jpg" className="d-block w-100" alt="slide1" fill   />
        </div>
        <div className="carousel-item" >
          <Image src="/image/carouselimage/2549650.jpg" className="d-block w-100" alt="slide2" fill/>
        </div>
        <div className="carousel-item">
          <Image src="/image/carouselimage/5765164.jpg" className="d-block w-100" alt="slide3" fill />
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}