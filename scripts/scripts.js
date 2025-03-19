document.addEventListener("DOMContentLoaded", function() {
    // Kontaktų formos apdorojimas
    const contactForm = document.getElementById('contact-form');
    const messageContainer = document.getElementById('message-container');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Sustabdyti numatytąjį formos pateikimą

            // Simuliuojame formos išsiuntimą
            try {
                // Tai gali būti API užklausa, tačiau dabar imituojame formos išsiuntimą
                await fakeFormSubmit();

                // Rodyti sėkmės pranešimą
                messageContainer.textContent = 'Jūsų žinutė sėkmingai išsiųsta!';
                messageContainer.classList.remove('error');
                messageContainer.classList.add('success');
                messageContainer.style.display = 'block';

                // Išvalyti formą
                contactForm.reset();

                // Paslėpti pranešimą
                hideMessage(messageContainer);
            } catch (error) {
                // Jei įvyko klaida
                messageContainer.textContent = 'Įvyko klaida siunčiant žinutę!';
                messageContainer.classList.remove('success');
                messageContainer.classList.add('error');
                messageContainer.style.display = 'block';
            }
        });
    }

    // Burger meniu funkcionalumas
    const burger = document.querySelector('#burger');
    const navLinks = document.querySelector('.top-navigation__nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', (e) => {
            e.preventDefault(); // Užkerta kelią peradresavimui dėl href="#"
            navLinks.classList.toggle('active'); // Įjungia arba išjungia meniu rodymą
        });

        // Uždaryti meniu, kai paspaudžiama nuoroda
        const navLinkItems = document.querySelectorAll('.top-navigation__nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Nustatyti datą šiandienai
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);  // Tik ateities datos
    }

    // Funkcija, kuri simuliuoja formos siuntimą
    function fakeFormSubmit() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1000); // Simuliuojame 1 sekundės vėlavimą
        });
    }

    // Funkcija pranešimo paslėpimui po 5 sekundžių
    function hideMessage(element) {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
});
