// Suknelių duomenys
const dresses = {
    "1": {
        "title": "Klasikinė suknelė",
        "image": "images/wedding_dress_1.jpg",
        "additionalImages": ["images/wedding_dress_1_1.jpg", "images/wedding_dress_1_2.jpg"],
        "description": "Elegantiška suknelė su nėriniais ir švelniu kritimu.",
        "price": "Nuomos kaina: 450€",
        "style": "classic",
        "color": "white",
        "priceCategory": "low"
    },
    "2": {
        "title": "Šiuolaikinė suknelė",
        "image": "images/wedding_dress_2.jpg",
        "additionalImages": ["images/wedding_dress_2_1.jpg", "images/wedding_dress_2_2.jpg"],
        "description": "Modernus dizainas su minimalistinėmis detalėmis.",
        "price": "Nuomos kaina: 650€",
        "style": "modern",
        "color": "champagne",
        "priceCategory": "medium"
    },
    "3": {
        "title": "Romantiška suknelė",
        "image": "images/wedding_dress_3.jpg",
        "additionalImages": ["images/wedding_dress_3_1.jpg", "images/wedding_dress_3_2.jpg"],
        "description": "Švelnus ir romantiškas stilius.",
        "price": "Nuomos kaina: 700€",
        "style": "romantic",
        "color": "ivory",
        "priceCategory": "high"
    },
    "4": {
        "title": "Glaminė suknelė",
        "image": "images/wedding_dress_4.jpg",
        "additionalImages": ["images/wedding_dress_4_1.jpg", "images/wedding_dress_4_2.jpg"],
        "description": "Puiki išvaizda vakarinei iškilmei.",
        "price": "Nuomos kaina: 800€",
        "style": "glamorous",
        "color": "white",
        "priceCategory": "high"
    },
    "5": {
        "title": "Minimalistinė suknelė",
        "image": "images/wedding_dress_5.jpg",
        "additionalImages": ["images/wedding_dress_5_1.jpg", "images/wedding_dress_5_2.jpg"],
        "description": "Paprasta ir elegantiška.",
        "price": "Nuomos kaina: 500€",
        "style": "minimalist",
        "color": "ivory",
        "priceCategory": "low"
    },
    "6": {
        "title": "Bohemiška suknelė",
        "image": "images/wedding_dress_6.jpg",
        "additionalImages": ["images/wedding_dress_6_1.jpg", "images/wedding_dress_6_2.jpg"],
        "description": "Laisvas ir bohemiškas stilius su nėriniais.",
        "price": "Nuomos kaina: 550€",
        "style": "bohemian",
        "color": "white",
        "priceCategory": "medium"
    }
};

// Funkcija, kad gauti ID iš URL
function getDressIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Funkcija užkrauti suknelės detales pagal ID
function loadDressDetails() {
    const id = getDressIdFromURL();
    const dress = dresses[id];

    if (dress) {
        const mainImageElement = document.getElementById('dress-image');
        const originalImage = dress.image;

        document.getElementById('dress-title').textContent = dress.title;
        document.getElementById('dress-description').textContent = dress.description;
        mainImageElement.src = dress.image;
        mainImageElement.classList.add('main-image', 'magnify'); // Ensure consistent size and add magnify effect
        document.getElementById('dress-price').textContent = dress.price;

        // Load additional images
        const additionalImagesContainer = document.getElementById('additional-images');
        additionalImagesContainer.innerHTML = '';
        dress.additionalImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image;
            imgElement.alt = dress.title;
            imgElement.classList.add('additional-image');
            imgElement.addEventListener('click', () => {
                mainImageElement.src = image;
                mainImageElement.classList.add('main-image', 'magnify'); // Ensure consistent size and add magnify effect
            });
            additionalImagesContainer.appendChild(imgElement);
        });

        // Add the original image as the first additional image
        const originalImageElement = document.createElement('img');
        originalImageElement.src = originalImage;
        originalImageElement.alt = dress.title;
        originalImageElement.classList.add('additional-image');
        originalImageElement.addEventListener('click', () => {
            mainImageElement.src = originalImage;
            mainImageElement.classList.add('main-image', 'magnify'); // Ensure consistent size and add magnify effect
        });
        additionalImagesContainer.insertBefore(originalImageElement, additionalImagesContainer.firstChild);

        // Magnify in and out functionality
        let isDragging = false;
        let startX, startY;
        let translateX = 0, translateY = 0;

        mainImageElement.addEventListener('click', (event) => {
            const rect = mainImageElement.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            const originX = (offsetX / rect.width) * 100;
            const originY = (offsetY / rect.height) * 100;

            if (mainImageElement.classList.contains('magnified')) {
                mainImageElement.classList.remove('magnified');
                mainImageElement.style.transformOrigin = 'center center';
                mainImageElement.style.transform = 'scale(1)';
                mainImageElement.style.cursor = 'zoom-in';
                translateX = 0;
                translateY = 0;
            } else {
                mainImageElement.classList.add('magnified');
                mainImageElement.style.transformOrigin = `${originX}% ${originY}%`;
                mainImageElement.style.transform = 'scale(2)'; // Maksimalus didinimo dydis
                mainImageElement.style.cursor = 'zoom-out';
            }
        });

        mainImageElement.addEventListener('mousedown', (event) => {
            if (mainImageElement.classList.contains('magnified')) {
                isDragging = true;
                startX = event.clientX - translateX;
                startY = event.clientY - translateY;
                mainImageElement.style.cursor = 'grabbing';
            }
        });

        mainImageElement.addEventListener('mouseup', () => {
            isDragging = false;
            mainImageElement.style.cursor = 'zoom-out';
        });

        mainImageElement.addEventListener('mousemove', (event) => {
            if (isDragging) {
                translateX = event.clientX - startX;
                translateY = event.clientY - startY;
                mainImageElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(2)`; // Maksimalus didinimo dydis
            }
        });
    } else {
        console.error("Suknelė nerasta!");
        document.getElementById('dress-title').textContent = "Suknelė nerasta";
        document.getElementById('dress-description').textContent = "Prašome patikrinti, ar teisingai nurodėte suknelės ID.";
        document.getElementById('dress-image').src = "images/placeholder.jpg"; // Use a placeholder image for missing dresses
        document.getElementById('dress-price').textContent = "";
    }
}

// Funkcija užkrauti visas sukneles
function loadAllDresses() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    Object.keys(dresses).forEach(id => {
        const dress = dresses[id];
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.setAttribute('data-style', dress.style);
        item.setAttribute('data-color', dress.color);
        item.setAttribute('data-price', dress.priceCategory);
        item.innerHTML = `
            <a href="suknele.html?id=${id}">
                <img src="${dress.image}" alt="${dress.title}">
                <h3>${dress.title}</h3>
                <p>${dress.description}</p>
            </a>
        `;
        gallery.appendChild(item);
    });
}

// Funkcija užkrauti suknelių peržiūrą
function loadDressPreview() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    // Pasirinkite, kurias sukneles norite rodyti peržiūroje
    const selectedDresses = ["1", "2", "6"]; // Pakeiskite ID į norimas sukneles

    selectedDresses.forEach(id => {
        const dress = dresses[id];
        const item = document.createElement('div');
        item.classList.add('gallery-item');
        item.innerHTML = `
            <a href="suknele.html?id=${id}">
                <img src="${dress.image}" alt="${dress.title}">
                <h3>${dress.title}</h3>
                <p>${dress.description}</p>
            </a>
        `;
        gallery.appendChild(item);
    });
}

// Filtravimo funkcija
function filterItems() {
    const styleFilter = document.getElementById('style').value;
    const colorFilter = document.getElementById('color').value;
    const priceFilter = document.getElementById('price').value;
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const itemStyle = item.getAttribute('data-style');
        const itemColor = item.getAttribute('data-color');
        const itemPrice = item.getAttribute('data-price');

        if ((styleFilter === 'all' || styleFilter === itemStyle) &&
            (colorFilter === 'all' || colorFilter === itemColor) &&
            (priceFilter === 'all' || priceFilter === itemPrice)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const styleFilter = document.getElementById('style');
    const colorFilter = document.getElementById('color');
    const priceFilter = document.getElementById('price');

    if (document.getElementById('gallery')) {
        if (document.body.classList.contains('index-page')) {
            loadDressPreview();
        } else {
            loadAllDresses();
            styleFilter.addEventListener('change', filterItems);
            colorFilter.addEventListener('change', filterItems);
            priceFilter.addEventListener('change', filterItems);
        }
    }

    if (document.getElementById('dress-title')) {
        loadDressDetails();
    }

    // Išsaugoti slinkimo poziciją prieš pereinant į kolekcijos puslapį
    const backToCollectionLink = document.querySelector('.back-to-collection a');
    if (backToCollectionLink) {
        backToCollectionLink.addEventListener('click', function () {
            sessionStorage.setItem('scrollPosition', window.scrollY);
        });
    }

    // Atstatyti slinkimo poziciją
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
    }
});
