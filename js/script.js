document.addEventListener('DOMContentLoaded', () => {
    // 1. EFEITO TYPEWRITER COM LOOP INFINITO - UM APÓS OUTRO
    const texts = [
        "Transformamos suas ideias em soluções digitais de alta performance",
        "Criamos sites modernos que convertem visitantes em clientes",
        "Seu sucesso digital começa aqui na Dev Martins"
    ];
    
    const elements = [
        document.getElementById("typewriter-1"),
        document.getElementById("typewriter-2"),
        document.getElementById("typewriter-3")
    ];
    
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const element = elements[currentTextIndex];
        const text = texts[currentTextIndex];
        
        if (!isDeleting) {
            // Digitando
            if (charIndex < text.length) {
                element.innerHTML += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                // Finished digitando, aguarda antes de deletar
                isDeleting = true;
                setTimeout(typeWriter, 2000);
            }
        } else {
            // Deletando
            if (charIndex > 0) {
                element.innerHTML = text.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeWriter, 80);
            } else {
                // Finished deletando, move para próximo texto
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % 3;
                setTimeout(typeWriter, 500);
            }
        }
    }
    
    typeWriter();

    // 2. TEMA DARK/LIGHT
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', nextTheme);
        themeToggle.querySelector('i').className = nextTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', nextTheme);
    });

    // 3. MENU MOBILE
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenu.querySelector('i').classList.toggle('fa-bars');
        mobileMenu.querySelector('i').classList.toggle('fa-times');
    });

    // Fechar menu ao clicar em links
    document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenu.querySelector('i').classList.add('fa-bars');
        mobileMenu.querySelector('i').classList.remove('fa-times');
    }));

    // 4. CONTADORES ANIMADOS
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const increment = target / 80;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 30);
                    } else { counter.innerText = target; }
                };
                updateCount();
            });
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats');
    if(statsSection) observer.observe(statsSection);
});
