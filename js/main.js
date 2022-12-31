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
});
