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
  fetch("http://127.0.0.1:8000/service/")
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
const doctor_load = (value, url) => {
  const pre = document.getElementById('pgn-pre')
  pre.classList.add('hidden')
  const next = document.getElementById('pgn-next')
  next.classList.add('hidden')
  document.getElementById('doctors').innerHTML = `
    <div class="loader">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
   `
   if (url){
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('doctors').innerHTML = ''
        console.log(data)
        display_doctor(data); // Corrected function call here
      })
      .catch((err) => console.log(err));
  }else if (value){
    fetch("http://127.0.0.1:8000/doctor/list/?search="+value)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('doctors').innerHTML = ''
        display_doctor(data); // Corrected function call here
      })
      .catch((err) => console.log(err));
  }
  else{
    fetch("http://127.0.0.1:8000/doctor/list/")
      .then((res) => res.json())
      .then((data) => {
        document.getElementById('doctors').innerHTML = ''
        display_doctor(data); // Corrected function call here
      })
      .catch((err) => console.log(err));
  }


};

const display_doctor = (doctors) =>{
  console.log(doctors)
  if (doctors.results.length <= 0){
    document.getElementById('doctors').innerHTML = `
    <div class="container flex flex-col items-center m-auto w-5">
        <div class="flex flex-col gap-6 max-w-md text-center">
            <h2 class="font-extrabold text-9xl text-black">
                <span class="sr-only">Error</span>404
            </h2>
            <p class="text-2xl md:text-3xl text-black">Sorry, we couldn't find this doctor.</p>
        </div>
    </div>
    `
    const pre = document.getElementById('pgn-pre')
    pre.classList.add('hidden')
    const next = document.getElementById('pgn-next')
    next.classList.add('hidden')
  }
  // doctor append in html
  doctors.results.forEach((doctor) => {
    const doctors_section = document.getElementById('doctors');
    let div = document.createElement('div');
    div.classList = 'bg-gray-50 shadow-md overflow-hidden rounded cursor-pointer hover:-translate-y-2 transition-all relative'
    div.innerHTML = `
                    <div class="h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img src="${doctor.image}" alt="Product 1" class="!h-full !w-full" />
                    </div>
                    <div class="p-6 bg-white">
                    <h3 class="text-lg font-bold text-gray-800"><a class="hover:text-blue-600" href="./doctor.html?doctor-id=${doctor.id}">${doctor.full_name}</a></h3>
                    <h4 class="text-lg text-gray-700 font-bold mt-2">${doctor.designation}</h4>
                    <p class="text-gray-500 text-sm mt-2">Fee ${doctor.fee}</p>
                    </div>
                    `
    doctors_section.appendChild(div)
  });
  // call pagination function
  pagination(doctors)
}

const pagination = (doctors) => {
    const pre = document.getElementById('pgn-pre')
    const next = document.getElementById('pgn-next')

    if(doctors.next == null)
      next.classList.add('hidden')

    if(doctors.previous == null)
      pre.classList.add('hidden')

    // pagination functionaly
    if (doctors.next != null){
      next.href = doctors.next
      next.classList.remove('hidden')
      next.addEventListener('click', (e)=>{
        e.preventDefault()
        var url = e.target.href
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
          document.getElementById('doctors').innerHTML = ''
          console.log(data)
          display_doctor(data); // Corrected function call here
        })
        .catch((err) => console.log(err));

        })
    }


    if (doctors.previous != null) {
      pre.classList.remove('hidden')
      pre.href = doctors.previous;
      pre.addEventListener('click', (e)=>{
        e.preventDefault()
        var url = e.target.href
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
          document.getElementById('doctors').innerHTML = ''
          console.log(data)
          display_doctor(data); // Corrected function call here
        })
        .catch((err) => console.log(err));

        })
    }
}

// fetch all doctor designation from sever
const doctor_designation = () => {
  fetch("http://127.0.0.1:8000/doctor/designation/")
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
    fetch("http://127.0.0.1:8000/doctor/designation/")
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
const search_doctor = () => {
  const search_form = document.getElementById("doctor-search")
  search_form.addEventListener('submit', (event) =>{
    event.preventDefault()
    let data = new FormData(event.target)
    doctor_load(data.get('search_box'))
  })
}


const load_review = () => {
  fetch("http://127.0.0.1:8000/doctor/review/")
    .then((res) => res.json())
    .then((data) => {
      display_review(data);
    })
    .catch((err) => console.log(err));
}

const display_review = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById('review_section')
    const div = document.createElement('div')
    div.classList = 'bg-gray-200 w-fit rounded-lg p-8 flex-none text-center md:w-1/3 card-animation'
    div.innerHTML = `
    <p class="font-bold uppercase">${review.reviewer}</p>
                <p class="text-xl font-light italic text-gray-700">${review.body.slice(0, 90)}...</p>
                <div class="flex items-center justify-center space-x-2 mt-4">
                ${review.rating}
                </div>
    `
    parent.appendChild(div)
  })
}

services_load();
doctor_specialization();
doctor_designation();
doctor_load();
search_doctor()
load_review()
