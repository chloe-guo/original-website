document.addEventListener("DOMContentLoaded", function () {
  let swiper = new Swiper(".swiper", {
    init: false,
    speed: 600,
    autoplay: {
      delay: 6000,
    },
    loop: true,
    followFinger: true,
    grabCursor: true,
    observer: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: ["-20%", 0, -1],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
  });

  SVGInject.setOptions({
    afterInject: function (img, svg) {
      svg.style.opacity = 1;
      if (svg.classList.contains("js-SVGInject")) {
        setTimeout(() => {
          const el_path = document.getElementsByClassName("is-bgLine");
          Array.prototype.filter.call(
            el_path,
            (path) => (path.style.opacity = 1)
          );
        }, 1200);
        let SVGDraw = new Walkway({
          selector: ".js-SVGInject",
          duration: "3600",
          easing: "cubic-bezier(0.11, 0, 0.5, 0)",
        });
        SVGDraw.draw(function () {
          svg.classList.add("is-drawFinish");
        });
      }
    },
  });

  AOS.init({
    duration: 1200,
    easing: "ease-in-out-sine",
    anchorPlacement: "top-bottom",
    once: true,
  });

  setTimeout(() => {
    document.body.classList.remove("is-unOpening");
    setTimeout(() => {
      swiper.init();
    }, 1200);
  }, 1200);

  const el_service = document.getElementById("service");
  service_ani();
  window.addEventListener("scroll", function () {
    service_ani();
  });

  function service_ani() {
    if (el_service.getBoundingClientRect().top < window.scrollY) {
      if (el_service.classList.contains("is-unDraw")) {
        setTimeout(() => {
          el_service.classList.remove("is-unDraw");
        }, 1200);
        setTimeout(() => {
          SVGInject(document.getElementsByClassName("js-SVGInject"));
        }, 3000);
      }
    }
  }
});
