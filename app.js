// Configuration
const whatsappNumber = "233543557388"; // Primary WhatsApp number for links

// Static Product Data
const classicPacks = [
    { name: "Mini Pack (10 bottles)", size: 10, price: 200.00 },
    { name: "Personal Pack (20 bottles)", size: 20, price: 400.00 },
    { name: "Family Pack (50 bottles)", size: 50, price: 1000.00 },
    { name: "Jumbo Pack (100 bottles)", size: 100, price: 2000.00 },
    { name: "Party Pack (200 bottles)", size: 200, price: 4000.00 }
];

const premiumPacks = [
    { name: "Mini Pack (10 bottles)", size: 10, price: 250.00 },
    { name: "Personal Pack (20 bottles)", size: 20, price: 500.00 },
    { name: "Family Pack (50 bottles)", size: 50, price: 1250.00 },
    { name: "Jumbo Pack (100 bottles)", size: 100, price: 2500.00 },
    { name: "Party Pack (200 bottles)", size: 200, price: 5000.00 }
];

const products = [
    {
        id: 1,
        name: "Mango Juice",
        description: "Sweet, rich, and authentic mango puree.",
        image: "images/mango.jpg",
        singlePrice: 20.00,
        packs: classicPacks
    },
    {
        id: 2,
        name: "Palatable Pineapple",
        description: "Tropical freshness in every sip.",
        image: "images/pineapple.jpg",
        singlePrice: 20.00,
        packs: classicPacks
    },
    {
        id: 3,
        name: "Sweet Ananas",
        description: "Deliciously sweet pineapple blend.",
        image: "images/ananas.jpg",
        singlePrice: 20.00,
        packs: classicPacks
    },

    {
        id: 5,
        name: "Melon Vibes",
        description: "The ultimate watermelon thirst quencher.",
        image: "images/watermelon.jpg",
        singlePrice: 20.00,
        packs: classicPacks
    },
    {
        id: 6,
        name: "Nature's Cocktail",
        description: "A vibrant blend of fresh mixed fruits.",
        image: "images/mixed-fruit.jpg",
        singlePrice: 20.00,
        packs: classicPacks
    },
    {
        id: 7,
        name: "Tigernut Blend Drink",
        description: "Special Tiger Nut flavor. Rich and nutritious.",
        image: "images/tigernut-sun.jpg",
        singlePrice: 30.00,
        packs: [
            { name: "4 bottles", size: 4, price: 120.00 },
            { name: "10 bottles", size: 10, price: 300.00 }
        ]
    },

    {
        id: 9,
        name: "Detox Special",
        description: "Green Juice - Detox Special.",
        image: "images/detox.jpg",
        singlePrice: 25.00,
        packs: premiumPacks
    },
    {
        id: 10,
        name: "Glow Carrot",
        description: "Fresh and healthy carrot juice.",
        image: "images/carrot.jpg",
        singlePrice: 25.00,
        packs: premiumPacks
    },
    {
        id: 11,
        name: "Orange Juice",
        description: "100% freshly squeezed oranges with zero added sugar.",
        image: "images/better.jpg",
        singlePrice: 20.00,
        packs: classicPacks
    },
    {
        id: 12,
        name: "Mint Lovers",
        description: "Mint | Pineapple | Ginger. Refreshing & healthy.",
        image: "images/better1.jpg",
        singlePrice: 20.00,
        packs: classicPacks
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        const isActive = mobileNav.classList.contains('active');
        mobileToggle.innerHTML = isActive ? '<i class="ph ph-x"></i>' : '<i class="ph ph-list"></i>';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileToggle.innerHTML = '<i class="ph ph-list"></i>';
        });
    });

    // --- Render Products ---
    const productGrid = document.getElementById('product-grid');

    // Sort products by price (lowest to highest)
    products.sort((a, b) => a.singlePrice - b.singlePrice);

    function renderProducts() {
        productGrid.innerHTML = '';
        
        products.forEach(product => {
            const hasPacks = product.packs && product.packs.length > 0;

            const card = document.createElement('div');
            card.className = 'product-card';

            // Generate Pack Options HTML
            let packOptionsHtml = `
                <div class="pack-options">
                    <label class="price-label" for="pack-${product.id}">SELECT SIZE:</label>
                    <select id="pack-${product.id}" class="pack-select">
                        ${(product.packs || []).map(pack => `<option value="${pack.name}" data-price="${pack.price}">${pack.name} - GH₵${pack.price.toFixed(2)}</option>`).join('')}
                    </select>
                </div>
            `;

            const singlePriceStr = product.singlePrice ? ` <span class="per-bottle-label" style="font-size: 0.65em; opacity: 0.8; font-weight: 500; display: block; line-height: 1.2;">per bottle (Available in packs only)</span>` : '';

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="price-section" style="align-items: flex-start;">
                        <span class="price-label" style="margin-top: 0.5rem;">PRICE</span>
                        <div class="price-value" id="price-${product.id}" style="text-align: left;">GH₵${product.singlePrice.toFixed(2)}${singlePriceStr}</div>
                    </div>
                    ${packOptionsHtml}
                    <button class="btn-primary btn-buy" onclick="buyNow(${product.id}, '${product.name.replace(/'/g, "\\'")}')">
                        <i class="ph-bold ph-whatsapp-logo"></i> Buy Now
                    </button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    // Initial render
    renderProducts();

    // --- Initialize display WhatsApp number ---
    document.getElementById('display-whatsapp').innerText = "0543557388 / 0242750157";

    // --- Modal Outside Click Listener ---
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target !== document.getElementById('modal-image')) {
                closeModal();
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});

// --- Global Functions ---

window.updatePrice = function(productId, selectElement) {
    // Legacy function, intentionally left blank as prices are now static per bottle
};

window.buyNow = function(productId, productName) {
    const selectElement = document.getElementById(`pack-${productId}`);
    let selectionValue = selectElement ? selectElement.value : 'single';
    
    let message = "";
    if (selectionValue === 'single') {
        message = `Hello Vical Freshly Squeezed, I would like to order 1 bottle of ${productName}.`;
    } else {
        message = `Hello Vical Freshly Squeezed, I would like to order the ${selectionValue} of ${productName}.`;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

window.orderWholesale = function() {
    const message = "Hello Vical Freshly Squeezed, I am interested in placing a bulk/wholesale order for your fresh juice. Please provide me with the available options and pricing.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

window.leaveReview = function() {
    const message = "Hello Vical Freshly Squeezed, I would like to leave a review...";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

// --- Modal Functions ---
window.openModal = function(src) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = "flex";
    modalImg.src = src;
};

window.closeModal = function() {
    const modal = document.getElementById('image-modal');
    modal.style.display = "none";
};
