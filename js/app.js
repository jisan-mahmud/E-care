    // Fetch services data
    const services_load = () => {
        fetch("https://testing-8az5.onrender.com/services/")
            .then((res) => res.json())
            .then((data) => display_service(data))
            .catch((err) => console.log(err));
    }

    // Display services
    const display_service = (services) => {
        const glideContainer = document.getElementById('services_container');

        services.forEach(service => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${service.image}" alt="${service.name}" class="w-full max-w-full max-h-full m-auto"/>
                <h3 class="text-white">${service.name}</h3>
            `;
            glideContainer.appendChild(li);
        });
    }

    services_load();


document.addEventListener('DOMContentLoaded', ()=> {
    var glide04 = new Glide('.glide-04', {
        type: 'carousel',
        focusAt: 'center',
        perView: 3,
        autoplay: 0,
        animationDuration: 700,
        gap: 24,
        classes: {
            activeNav: '[&>*]:bg-slate-700',
        },
        breakpoints: {
            1024: {
                perView: 2
            },
            640: {
                perView: 1
            }
        },
    });

    glide04.mount();
})