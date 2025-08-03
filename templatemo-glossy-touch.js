let currentPage = 'home';

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') === `showPage('${pageId}')`) {
            link.classList.add('active');
        }
    });

    currentPage = pageId;

    const footer = document.getElementById('footer');
    const activePage = document.getElementById(pageId);
    activePage.appendChild(footer);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('DOMContentLoaded', () => {
    const footer = document.getElementById('footer');
    const homePage = document.getElementById('home');
    homePage.appendChild(footer);

    // === Center all <h2> elements dynamically ===
    document.querySelectorAll('h2').forEach(h2 => {
        h2.style.textAlign = 'center';
    });

    // === Justify-align all non-heading text inside sections ===
    document.querySelectorAll('section').forEach(section => {
        section.querySelectorAll('p, li').forEach(el => {
            el.style.textAlign = 'justify';
        });
    });

    // === Fix dropdown z-index (force topmost) ===
    const dropdown = document.querySelector('.dropdown');
    const content = dropdown.querySelector('.dropdown-content');
    dropdown.style.zIndex = '99999';
    content.style.zIndex = '99999';

    let hoverTimer;
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer);
        content.style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', () => {
        hoverTimer = setTimeout(() => {
            content.style.display = 'none';
        }, 200);
    });
    content.addEventListener('mouseenter', () => clearTimeout(hoverTimer));
    content.addEventListener('mouseleave', () => {
        hoverTimer = setTimeout(() => {
            content.style.display = 'none';
        }, 200);
    });
});

// === Background Parallax ===
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 20;
        const yPos = (y - 0.5) * speed * 20;
        shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-shapes');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// === Form Submission Handler ===
document.querySelector('form')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(46, 204, 113, 0.9);
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        backdrop-filter: blur(20px);
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    successMsg.textContent = 'Message sent successfully! We\'ll get back to you soon.';

    document.body.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
    this.reset();
});

// === Fade-In Keyframe Style ===
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
`;
document.head.appendChild(fadeStyle);
