/* -----**** effet de parallax -----****
## Objectif

Faire en sorte que des éléments défilent plus ou moins vite lors
du scroll de l'utilisateur


##Solution

On trouve la position du centre de l'élément par rapport au centre
de l'écran, et on applique un translateY en fonction.

- Trouver la position du centre de l'élément par rapport au centre de l'écran
- Appliquer un translateY = ration x (centre écran - centre élément)


##Signature :

- new Parallax(element)
- Parallax.bind()

- data-parallax="0.2"
- data-parallax='{"y":0.2', "r":0.2}' --> r=Rotate


##Utilisation

# 1er cas 
- ajouter attibut data-parallax="0.2" à l'élément

# 2eme cas
- ajouter variable css (var(--parallaxY, 0px)  --> veut dire 
mettre --parallaxY si existe pas mettre 0px) dans une position d'un element
genre --> bottom var(--parallaxY, 0px)

*/

/* fonction intermediaire pour additionner l'essemble des top des elements*/
/**
 * Calcul la position de l'élément par rapport au haut de la page
 * @param {HTMLElement} element
 * @returns {number}
 */
function offsetTopElement(element, acc = 0) {
  if (element.offsetParent) {
    return offsetTopElement(element.offsetParent, acc + element.offsetTop);
  }
  return acc + element.offsetTop;
}

/**
 * @property {HTMLElement} element
 * @property {{y: number, r: number, variable: boolean}} options
 */
class Parallax {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;
    this.options = this.parseAttribute();
    this.elementY =
      offsetTopElement(this.element) + this.element.offsetHeight / 2;

    this.onScroll = this.onScroll.bind(this);
    this.onIntersection = this.onIntersection.bind(this);
    this.onResize = this.onResize.bind(this);

    const observer = new IntersectionObserver(this.onIntersection);
    observer.observe(element);
    this.onScroll();
  }

  parseAttribute() {
    const defaultOptions = {
      y: 0.2,
      r: 0,
      variable: false,
    };
    if (this.element.dataset.parallax.startsWith("{")) {
      return {
        ...defaultOptions,
        ...JSON.parse(this.element.dataset.parallax),
      };
    }
    return { ...defaultOptions, y: parseFloat(this.element.dataset.parallax) };
  }

  /**
   * @param {IntersectionObserverEntry[]} entries
   */
  onIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        document.addEventListener("scroll", this.onScroll);
        window.addEventListener("resize", this.onResize);
        this.elementY =
          offsetTopElement(this.element) + this.element.offsetHeight / 2;
      } else {
        document.removeEventListener("scroll", this.onScroll);
        window.removeEventListener("resize", this.onResize);
      }
    }
  }

  onResize() {
    this.elementY =
      offsetTopElement(this.element) + this.element.offsetHeight / 2;
    this.onScroll();
  }

  onScroll() {
    window.requestAnimationFrame(() => {
      const screenY = window.scrollY + window.innerHeight / 2;
      const diffY = this.elementY - screenY;
      const translateY = diffY * -1 * this.options.y;

      if (this.options.variable) {
        this.element.style.setProperty("--parallaxY", `${translateY}px`);
      } else {
        //else if (diffY > 0)  --> pour activé jusqu'a le milieu ou un point de l'ecran et inversement
        let transform = `translateY(${translateY}px)`;
        if (this.options.r) {
          transform += ` rotate(${diffY * this.options.r}deg)`;
        }

        this.element.style.setProperty("transform", transform);
      }
    });
  }

  /**
   * @returns {Parallax[]}
   */
  static bind() {
    return Array.from(document.querySelectorAll("[data-parallax]")).map(
      (element) => {
        return new Parallax(element);
      }
    );
  }
}

Parallax.bind(); //lance le traitement
