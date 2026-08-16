const menu = document.querySelector('#menu');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => {
    nav.classList.toggle('open');
    menu.textContent = nav.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.textContent = '☰';
    });
});

const counter = document.querySelector('.fact strong');

if (counter) {
    let started = false;

    const animateCounter = () => {
        if (started) return;
        started = true;

        let value = 0;
        const target = 1000;
        const step = 25;

        const timer = setInterval(() => {
            value += step;

            if (value >= target) {
                value = target;
                clearInterval(timer);
            }

            counter.textContent = value.toLocaleString('pt-BR');
        }, 20);
    };

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateCounter();
            observer.disconnect();
        }
    }, {threshold:.4});

    observer.observe(counter);
}

const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('nav a');

const updateNav = () => {
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (scrollY >= top) current = section.id;
    });

    links.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });
};

window.addEventListener('scroll', updateNav);
updateNav();
