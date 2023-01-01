document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".swiper", {
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
          duration: "2400",
          easing: "cubic-bezier(0.11, 0, 0.5, 0)",
        });
        SVGDraw.draw(function () {
          svg.classList.add("is-drawFinish");
        });
      }
    },
  });

  SVGInject(document.getElementsByClassName("js-SVGInject"));
});
