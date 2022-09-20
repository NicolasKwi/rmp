const btn_pre_Scroll = document.getElementById("pre-slide");
const btn_sui_Scroll = document.getElementById("sui-slide");
const sliders_cible = document.getElementById("slides_conteneur");
const imgs_slider = document.querySelectorAll(".slides img");
const button_to_top = document.getElementById("button_scroll_totop");

imgs_slider.forEach((element) => {
  element.addEventListener("click", () => {
    element.classList.toggle("clickSliderImg");
    if (element.classList.contains("clickSliderImg")) {
      clearInterval(interval_Slide);
    } else {
      interval_Slide = setInterval(Scroll_sui, 7000);
    }
  });
});

const imgs_Slider_Init = () => {
  imgs_slider.forEach((element) => {
    element.classList.remove("clickSliderImg");
  });
};

const Scroll_sui = () => {
  imgs_Slider_Init();
  let scrollX1 = sliders_cible.scrollLeft + sliders_cible.offsetWidth;
  if (sliders_cible.scrollWidth - sliders_cible.clientWidth < scrollX1) {
    sliders_cible.scrollLeft = 0;
  } else {
    sliders_cible.scrollLeft = scrollX1;
  }
};
let interval_Slide = setInterval(Scroll_sui, 7000);

sliders_cible.addEventListener("scroll", () => {
  imgs_Slider_Init();
  clearInterval(interval_Slide);
  interval_Slide = setInterval(Scroll_sui, 7000);
});

const Scroll_pre = () => {
  imgs_Slider_Init();
  let scrollX2 = sliders_cible.scrollLeft - sliders_cible.offsetWidth;
  if (scrollX2 < 0) {
    sliders_cible.scrollLeft =
      sliders_cible.scrollWidth - sliders_cible.clientWidth;
  } else {
    sliders_cible.scrollLeft = scrollX2;
  }
};

sliders_cible.addEventListener("scroll", () => {
  imgs_Slider_Init();
  clearInterval(interval_Slide);
  interval_Slide = setInterval(Scroll_sui, 7000);
});

/**/

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
const button_scroll_top = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

let time_button_top;

window.addEventListener("scroll", () => {
  if (window.scrollY > 1000) {
    button_to_top.style.display = "flex";
    button_to_top.classList.add("button_affichage");
    clearTimeout(time_button_top);
    time_button_top = setTimeout(() => {
      button_to_top.classList.remove("button_affichage");
    }, 3000);
  }
});
