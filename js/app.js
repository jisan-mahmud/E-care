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

    slide.innerHTML = `
        <div class="slide-content">
          <h3>${service.name}</h3>
          <p class="description">${sliceDesc}</p>
          <button class="see-more-btn">See More</button>
        </div>
      `;
    glideContainer.appendChild(slide);
  });
};

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  // centeredSlides: true,
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
