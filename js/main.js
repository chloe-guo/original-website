document.addEventListener("DOMContentLoaded", function () {
  let swiper_concept = new Swiper(".concept__swiper", {
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

  let swiper_service = new Swiper(".service__swiper", {
    followFinger: true,
    grabCursor: true,
    observer: true,
    enabled: true,
    loop: true,
    slidesPerView: "auto",
    speed: 600,
    autoplay: {
      delay: 6000,
    },
    breakpoints: {
      1025: {
        enabled: false,
        slidesPerView: 2,
      },
    },
  });

  let SVGDraw = null;

  SVGInject.setOptions({
    afterInject: function (img, svg) {
      svg.style.opacity = 1;
      opening();
      if (svg.classList.contains("js-SVGInject")) {
        setTimeout(() => {
          const el_path = document.getElementsByClassName("is-bgLine");
          Array.prototype.filter.call(
            el_path,
            (path) => (path.style.opacity = 1)
          );
        }, 1200);
        SVGDraw = new Walkway({
          selector: ".js-SVGInject",
          duration: "3600",
          easing: "cubic-bezier(0.11, 0, 0.5, 0)",
        });
      }
    },
  });

  imageLoading();

  function imageLoading() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.classList.add("has-popup");
    let imgN = 0;
    const imgID = document.querySelectorAll("img");
    const line = document.getElementsByClassName("js-loadingLine")[0];
    imgID.forEach((item) => {
      const img = new Image();
      img.src = item.src;
      img.addEventListener("load", () => {
        imgN++;
        line.style.width = (imgN / imgID.length) * 100 + "%";
        if (imgN == imgID.length) {
          SVGInject(document.getElementsByClassName("js-SVGInject"));
        }
      });
    });
  }

  function opening() {
    document.body.classList.remove("has-popup");
    document
      .getElementsByClassName("js-loading")[0]
      .classList.remove("is-popup");
    setTimeout(() => {
      AOS.init({
        duration: 1200,
        easing: "ease-in-out-sine",
        anchorPlacement: "top-bottom",
        once: true,
      });
      setTimeout(() => {
        document.body.classList.remove("is-unOpening");
        setTimeout(() => {
          swiper_concept.init();
        }, 1200);
      }, 1200);
    }, 1800);
  }

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
          SVGDraw.draw(function () {
            const el_svg = document.getElementsByClassName("js-SVGInject");
            Array.prototype.filter.call(el_svg, (svg) =>
              svg.classList.add("is-drawFinish")
            );
          });
        }, 3000);
      }
    }
  }
});
