import React from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
function Tip() {
  return (
  <Splide options = {{type: "loop", width: "100%", height: "400px", fixedWidth: "90%", fixedHeight: "370px", perPage: 1,  perMove: 1, padding: 15, pagination: true, autoplay: true}}>
  <SplideSlide>
    <div style={{background: "red", width: "90%", height: "370px"}}></div>
  </SplideSlide>
  <SplideSlide>
    <div style={{background: "green", width: "90%", height: "370px"}}></div>
  </SplideSlide>
  <SplideSlide>
    <div style={{background: "yellow", width: "90%", height: "370px"}}></div>
  </SplideSlide>
</Splide>
  );
}

export default Tip;
