function offsetTopElement(e,t=0){return e.offsetParent?offsetTopElement(e.offsetParent,t+e.offsetTop):t+e.offsetTop}class Parallax{constructor(e){this.element=e,this.options=this.parseAttribute(),this.elementY=offsetTopElement(this.element)+this.element.offsetHeight/2,this.onScroll=this.onScroll.bind(this),this.onIntersection=this.onIntersection.bind(this),this.onResize=this.onResize.bind(this);new IntersectionObserver(this.onIntersection).observe(e),this.onScroll()}parseAttribute(){const e={y:.2,r:0,variable:!1};return this.element.dataset.parallax.startsWith("{")?{...e,...JSON.parse(this.element.dataset.parallax)}:{...e,y:parseFloat(this.element.dataset.parallax)}}onIntersection(e){for(const t of e)t.isIntersecting?(document.addEventListener("scroll",this.onScroll),window.addEventListener("resize",this.onResize),this.elementY=offsetTopElement(this.element)+this.element.offsetHeight/2):(document.removeEventListener("scroll",this.onScroll),window.removeEventListener("resize",this.onResize))}onResize(){this.elementY=offsetTopElement(this.element)+this.element.offsetHeight/2,this.onScroll()}onScroll(){window.requestAnimationFrame((()=>{const e=window.scrollY+window.innerHeight/2,t=this.elementY-e,s=-1*t*this.options.y;if(this.options.variable)this.element.style.setProperty("--parallaxY",`${s}px`);else{let e=`translateY(${s}px)`;this.options.r&&(e+=` rotate(${t*this.options.r}deg)`),this.element.style.setProperty("transform",e)}}))}static bind(){return Array.from(document.querySelectorAll("[data-parallax]")).map((e=>new Parallax(e)))}}Parallax.bind();