let mobile_menu = () => {
    // menu toggle
    const menuToggle = document.getElementById('menu_toggle');
    const navbarCta = document.getElementById('navbar-cta');
    menuToggle.addEventListener('click', function() {
      navbarCta.classList.toggle('hidden'); // Toggle visibility of the navigation menu
    });
  }

let get_params = () =>{
    let params = new URLSearchParams(window.location.search).get('doctor-id');
    return params
}

let load_doctor_info = () => {
    id = get_params()
    fetch("https://testing-8az5.onrender.com/doctor/list/" + id)
    .then((res) => res.json())
    .then((data) => {
        display_doctor_info(data);
    })
    .catch((err) => console.log(err));
}

let display_doctor_info = (doctor_info) => {
    let parent = document.getElementById("doctor_details")
    let div = document.createElement('div')
    div.classList = 'flex !gap-10'
    div.innerHTML = `
    <div class="flex">
                    <img class="rounded-full sm:w-52 sm:h-52" src="${doctor_info.image}" alt="">
                </div>
                <div class="flex w-8/12">
                    <div class="flex flex-col gap-2 mt-6">
                        <h1 class="font-bold text-3xl text-teal-500">${doctor_info.full_name}</h1>
                        <div class="flex gap-4 font-medium">
                            <span>Designation: </span>
                            <ul class="flex gap-3 specialization">
                                ${doctor_info.designation.map((element) => `
                                <li>${element}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <div class="flex gap-4 font-medium">
                            <span>Specialization: </span>
                            <ul class="flex gap-3 specialization">
                                ${doctor_info.specialization.map((element) => `
                                <li>${element}</li>
                                `).join('')}
                            </ul>
                        </div>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores architecto fuga maxime! Error, aliquid nihil corporis iusto est itaque? Minus, molestias maiores eum accusamus assumenda voluptates ipsa esse laborum. Minus.
                        </p>
                        <span class="font-medium">Free: ${doctor_info.fee} BDT</span>
                        <button type="button" class="text-white bg-blue-700 hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 my-6">
                        Take a appoinment
                        </button>
                    </div>
                </div>
    `
    parent.append(div)
}

const load_review = () => {
    fetch("https://testing-8az5.onrender.com/doctor/review/")
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


mobile_menu()
load_doctor_info()
load_review()