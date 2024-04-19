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

    const sliceDesc = service.description.split(" ").slice(0, 20).join(" ");
    const fullDesc = service.description;

    slide.innerHTML = `
        <div class="slide-content">
          <h3>${service.name}</h3>
          <p class="description">${sliceDesc}</p>
          <button class="see-more-btn text-blue-700 border-blue-700 border px-3 mt-4">See More</button>
          <p class="full-description hidden">${fullDesc}</p>
        </div>
      `;
    glideContainer.appendChild(slide);
  });

  //  see more btn event handler
  const seeMoreButtons = document.querySelectorAll(".see-more-btn");
  seeMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const fullDesc = this.parentElement.querySelector(".full-description");
      const sliceDesc = this.parentElement.querySelector(".description");

      if (fullDesc.classList.contains("hidden")) {
        fullDesc.classList.remove("hidden");
        sliceDesc.classList.add("hidden");
        this.textContent = "See Less";
      } else {
        fullDesc.classList.add("hidden");
        sliceDesc.classList.remove("hidden");
        this.textContent = "See More";
      }
    });
  });
};

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

services_load();
