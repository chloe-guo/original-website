let scene = null,
  renderer = null;
let camera = null;
let ring = null,
  pivot = null;

function init3D() {
  scene = new THREE.Scene();
  let size = window.innerWidth > 1024 ? 0.14 : 5.33;
  camera = new THREE.PerspectiveCamera(
    75,
    (window.innerWidth * size) / (window.innerWidth * size),
    0.1,
    1000
  );
  camera.position.z = 1;
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth * size, window.innerWidth * size);
  renderer.domElement.classList.add("concept__canvas");
  document.getElementById("concept").appendChild(renderer.domElement);
  renderer.setClearColor(0x000000, 0);
  const light = new THREE.DirectionalLight("#f2eee6", 0.75);
  const ambient = new THREE.AmbientLight("#f2eee6");
  light.position.set(0, 0, 100).normalize();
  scene.add(light);
  scene.add(ambient);
  const loader = new THREE.GLTFLoader();
  loader.load(
    "../images/ring.glb",
    function (gltf) {
      ring = gltf.scene;
      const box = new THREE.Box3().setFromObject(ring);
      box.center(ring.position);
      ring.position.multiplyScalar(-1);
      pivot = new THREE.Group();
      pivot.scale.set(12, 12, 12);
      pivot.rotation.set(-2.5, 3, -2.5);
      scene.add(pivot);
      pivot.add(ring);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  animate();
}
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  if (pivot) {
    pivot.rotation.y += 0.005;
  }
}

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

function imageLoading() {
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
  document.getElementsByClassName("js-loading")[0].classList.remove("is-popup");
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

let SVGDraw = null;
const el_service = document.getElementById("service");
function service_ani() {
  if (el_service.getBoundingClientRect().top < window.scrollY) {
    if (el_service.classList.contains("is-unDraw")) {
      setTimeout(() => {
        el_service.classList.remove("is-unDraw");
      }, 1200);
      setTimeout(() => {
        const el_svg = document.getElementsByClassName("js-SVGInject");
        Array.prototype.filter.call(el_svg, (svg) => (svg.style.opacity = 1));
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

document.addEventListener("DOMContentLoaded", function () {
  init3D();

  new Swiper(".service__swiper", {
    followFinger: true,
    grabCursor: true,
    observer: true,
    enabled: true,
    loop: true,
    slidesPerView: "auto",
    speed: 600,
    breakpoints: {
      1025: {
        enabled: false,
        slidesPerView: 2,
      },
    },
  });

  imageLoading();

  SVGInject.setOptions({
    afterInject: function (img, svg) {
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

  service_ani();
  window.addEventListener("scroll", function () {
    service_ani();
  });
});
