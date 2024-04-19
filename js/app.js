// menu toggle
const menuToggle = document.getElementById('menu_toggle');
const navbarCta = document.getElementById('navbar-cta');
menuToggle.addEventListener('click', function() {
  navbarCta.classList.toggle('hidden'); // Toggle visibility of the navigation menu
});

const services_load = () => {
    fetch("https://testing-8az5.onrender.com/services/")
      .then((res) => res.json())
      .then((data) => {
        display_service(data);
      })
      .catch((err) => console.log(err));
  };

  // display services
  const display_service = (services) => {
    const glideContainer = document.querySelector(".swiper-wrapper");

    services.forEach((service) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.style.backgroundImage = `url(${service.image})`;
      slide.innerHTML = `
        <div class="slide-content">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
        </div>
      `;
      glideContainer.appendChild(slide);
    });

    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  };

  services_load();