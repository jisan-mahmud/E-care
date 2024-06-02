let doctor_id = () =>{
    let params = new URLSearchParams(window.location.search).get('doctor-id');
    return params
}

let load_doctor_info = () => {
    id = doctor_id()
    fetch("http://127.0.0.1:8000/doctor/list/" + id)
    .then((res) => res.json())
    .then((data) => {
        display_doctor_info(data);
        load_time(id);
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
                            <span>Designation: ${doctor_info.designation}</span>
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

                        <button class="text-white bg-blue-700 hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 my-6" onclick="my_modal_3.showModal()">Take Appointment
                        </button>
                    </div>
                </div>
    `
    parent.append(div)
}

const load_time = (id) => {
    fetch("http://127.0.0.1:8000/doctor/availabletime/?doctor_id=" + id)
    .then((res) => res.json())
    .then((data) => {
        data.forEach( (time) => {
            let parent = document.getElementById('time')
            let option = document.createElement('option')
            option.value = time.id
            option.innerHTML = time.name
            parent.appendChild(option)
        })
    })
    .catch((err) => console.log(err));
}

const load_review = () => {
    fetch("http://127.0.0.1:8000/doctor/review/?doctor_id=" + doctor_id())
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

const take_appointment = () => {
    const form = document.getElementById('take-appointment')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);

        const info = {
            appointment_type: formProps.appointment_type,
            time: Number(formProps.time),
            symtom: formProps.syntoms,
            doctor: Number(doctor_id())
        }



        token = localStorage.getItem('token')
        fetch("http://127.0.0.1:8000/appointment/", {
            method: "POST",
            body: JSON.stringify(info),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Token ${token}`
            }
        })
        .then(response => {
            document.getElementById('alert').innerHTML= ''
            if(response.ok){
                let status = document.getElementById('alert');
                status.classList.remove('hidden', 'text-red-900')
                status.classList.add('flex')
                status.innerHTML = `
                <div class="ms-3 text-sm font-medium">
                    Appointment Request Successfull!
                </div>
                `
            }else if(response.status = 406){
                return response.json()
            }
            form.reset()
        })
        .then(json => {
            if(json.errors){
                let status = document.getElementById('alert');
                status.classList.remove('hidden')
                status.classList.add('flex', 'text-red-900')
                for(const [key, value] of Object.entries(json.errors)){
                    let div = document.createElement('div')
                    div.classList.add('text-sm', 'font-medium')
                    div.innerHTML = `
                        <p>${value}</p>
                    `
                    div.classList.add('ms-3', 'text-sm', 'font-medium')
                    status.appendChild(div)
                }
            }
        })
        .catch( e => {

        });
    })
}

load_doctor_info()
load_review()
take_appointment()