// menu toggle
const menuToggle = document.getElementById('menu_toggle');
const navbarCta = document.getElementById('navbar-cta');
menuToggle.addEventListener('click', function() {
  navbarCta.classList.toggle('hidden'); // Toggle visibility of the navigation menu
});

// Select all elements with the class 'sider_arrow'
const siderArrows = document.querySelectorAll('#sider_arrow');

// Add event listener to each sider arrow element
siderArrows.forEach(siderarrow => {
  siderarrow.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const sideritems = document.getElementById(targetId);

    if (sideritems) {
      sideritems.classList.toggle('hidden'); // Toggle visibility of the corresponding navigation menu
      if (!sideritems.classList.contains('hidden')) {
        sideritems.classList.add('block'); // Ensure the navigation menu is displayed as block when not hidden
      } else {
        sideritems.classList.remove('block'); // Remove 'block' class when hidden
      }
    }
  });
});

const services_load = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => {
      display_service(data);
    })
    .catch((err) => console.log(err));
};

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


// fetch all doctor from sever
const doctor_load = (value) => {
  document.getElementById('doctors').innerHTML = ''
  if (value){
    fetch("https://testing-8az5.onrender.com/doctor/list/?search="+value)
      .then((res) => res.json())
      .then((data) => {
        display_doctor(data); // Corrected function call here
      })
      .catch((err) => console.log(err));
  }
  else{
    fetch("https://testing-8az5.onrender.com/doctor/list/")
      .then((res) => res.json())
      .then((data) => {
        display_doctor(data); // Corrected function call here
      })
      .catch((err) => console.log(err));
  }
};

const display_doctor = (doctors) =>{
  doctors.results.forEach((doctor) => {
    const doctors_section = document.getElementById('doctors');
    let div = document.createElement('div');
    div.classList = 'bg-gray-50 shadow-md overflow-hidden rounded cursor-pointer hover:-translate-y-2 transition-all relative'
    div.innerHTML = `
                    <div class="h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img src="${doctor.image}" alt="Product 1" class="!h-full !w-full" />
                    </div>
                    <div class="p-6 bg-white">
                    <h3 class="text-lg font-bold text-gray-800">${doctor.full_name}</h3>
                    <h4 class="text-lg text-gray-700 font-bold mt-2">${doctor.designation}</h4>
                    <p class="text-gray-500 text-sm mt-2">Fee ${doctor.fee}</p>
                    </div>
                    `
    doctors_section.appendChild(div)
  });

}

// fetch all doctor from sever
const doctor_designation = () => {
  fetch("https://testing-8az5.onrender.com/doctor/designation/")
    .then((res) => res.json())
    .then((data) => {
      display_designation(data);
    })
    .catch((err) => console.log(err));
};

const display_designation = (designations) => {
  designations.forEach((designation) => {
    const parent = document.getElementById('sider_items2')
    const li = document.createElement('li')
    li.classList = 'px-6 py-2'
    li.innerHTML = `
    <a class="cursor-pointer hover:text-blue-700" onclick= "doctor_load('${designation.name}')">${designation.name}</a>
    `
    parent.appendChild(li)
  })
}


const doctor_specialization = () => {
    fetch("https://testing-8az5.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
      display_specialization(data);
    })
    .catch((err) => console.log(err));
};

const display_specialization = (specializations) => {
  specializations.forEach((specialization) => {
    const parent = document.getElementById('sider_items1')
    const li = document.createElement('li')
    li.classList = 'px-6 py-2'
    li.innerHTML = `
    <a class="cursor-pointer hover:text-blue-700" onclick= "doctor_load('${specialization.name}')">${specialization.name}</a>
    `
    parent.appendChild(li)
  })
}

// doctor find by searcing
const search_form = document.getElementById("doctor-search")
search_form.addEventListener('submit', (event) =>{
  event.preventDefault()
  let data = new FormData(event.target)
  doctor_load(data.get('search_box'))
})


services_load();
doctor_specialization();
doctor_designation();
doctor_load();
