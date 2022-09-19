const btn_pre_Scroll = document.getElementById("pre-slide");
const btn_sui_Scroll = document.getElementById("sui-slide");
const sliders_cible = document.getElementById("slides_conteneur");

const Scroll_sui = () => {
  let scrollX1 = sliders_cible.scrollLeft + sliders_cible.offsetWidth;
  if (sliders_cible.scrollWidth - sliders_cible.clientWidth < scrollX1) {
    sliders_cible.scrollLeft = 0;
  } else {
    sliders_cible.scrollLeft = scrollX1;
  }
};

const Scroll_pre = () => {
  let scrollX2 = sliders_cible.scrollLeft - sliders_cible.offsetWidth;
  if (scrollX2 < 0) {
    sliders_cible.scrollLeft =
      sliders_cible.scrollWidth - sliders_cible.clientWidth;
  } else {
    sliders_cible.scrollLeft = scrollX2;
  }
};

let interval_Slide = setInterval(Scroll_sui, 7000);

btn_sui_Scroll.onclick = function () {
  Scroll_sui();
  clearInterval(interval_Slide);
  interval_Slide = setInterval(Scroll_sui, 7000);
};
btn_pre_Scroll.onclick = function () {
  Scroll_pre();
    clearInterval(interval_Slide);
  interval_Slide = setInterval(Scroll_sui, 7000);
};
/********************************/

/*const clickslider=(e)=>{
e.
}*/
