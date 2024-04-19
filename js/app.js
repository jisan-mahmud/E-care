// Fetch services data
const services_load = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data); // Log API response
      display_service(data);
    })
    .catch((err) => console.log(err));
};

// Display services
const display_service = (services) => {
    const glideContainer = document.querySelector(".swiper-wrapper");
  
    services.forEach((service) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide flex flex-col justify-center items-center";
      slide.innerHTML = `
        <div class="flex flex-col justify-center items-center">
          <img src="${service.image}" class="w-full h-52 mb-4" />
          <div class="text-center">
            <h3 class="text-xl font-semibold">${service.name}</h3>
            <p class="text-sm">${service.description}</p>
          </div>
        </div>
      `;
      glideContainer.appendChild(slide);
    });
  };
  

var swiper = new Swiper(".mySwiper", {
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

services_load();
