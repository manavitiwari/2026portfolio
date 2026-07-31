/* ==========================================================================
   THREAD & FRAME - INTERACTIVE COMMERCIAL LOGIC & CUSTOMIZER ENGINE
   ========================================================================== */

// Store State
const appState = {
    cart: [],
    wishlist: [],
    products: [
        {
            id: 'hd-1',
            category: 'candles',
            name: 'Botanical Amber & Cedar Hand-Poured Soy Candle',
            price: 38,
            rating: 4.9,
            reviewsCount: 42,
            image: 'artisan_hero_banner_1785516476736.jpg',
            description: 'Hand-poured 100% natural soy wax infused with dried botanical petals, cedarwood essential oils, and organic cotton wick in a reusable apothecary jar.'
        },
        {
            id: 'hd-2',
            category: 'macrame',
            name: 'Terracotta & Linen Handwoven Macrame Wall Tapestry',
            price: 85,
            rating: 5.0,
            reviewsCount: 28,
            image: 'home_decor_product_178551644249.jpg', // will fallback gracefully
            imageReal: 'home_decor_product_1785516544249.jpg',
            description: 'Intricately hand-knotted macrame wall hanging crafted from 100% organic unbleached cotton cord and natural terracotta dyed wool on solid walnut dowel.'
        },
        {
            id: 'hd-3',
            category: 'ceramics',
            name: 'Speckled Earth Wabi-Sabi Ceramic Vase',
            price: 64,
            rating: 4.8,
            reviewsCount: 19,
            imageReal: 'home_decor_product_1785516544249.jpg',
            description: 'Wheel-thrown ceramic vase with organic earth glaze variations and hand-carved subtle texture.'
        },
        {
            id: 'hd-4',
            category: 'wallart',
            name: 'Carved Botanical Oak Wood Wall Relief',
            price: 110,
            rating: 4.9,
            reviewsCount: 34,
            imageReal: 'artisan_hero_banner_1785516476736.jpg',
            description: 'Hand-carved solid European white oak tile displaying delicate botanical leaves motif finished with organic wax finish.'
        }
    ],

    // Jeans Studio State
    jeans: {
        style: 'vintage-blue',
        basePrice: 120,
        monogram: 'E.L.W',
        threadColor: '#D4AF37',
        threadName: 'Champagne Gold',
        motif: 'wildflowers',
        motifPrice: 25,
        placement: 'pocket-front',
        isFlipped: false
    },

    // Resin Studio State
    resin: {
        type: 'Wedding Bouquet Preservation',
        basePrice: 180,
        shape: '3D Monolith Cube (6x6 inch)',
        shapeExtra: 40,
        goldFlakes: true,
        engravedPlate: false,
        ledBase: true,
        engravingText: 'Alexander & Maya • 10.12.2025'
    },

    // Pencil Sketch Studio State
    sketch: {
        medium: 'Realistic Graphite Pencil',
        basePrice: 95,
        subjects: '1 Subject (Solo)',
        subjectExtra: 0,
        frame: 'Unframed Archival Paper (A4)',
        frameExtra: 0
    }
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initJeansCanvasCustomizer();
    initResinStudioControls();
    initSketchStudioControls();
    renderHomeDecorProducts('all');
    initFilterTabs();
    initCartDrawer();
    initSearchOverlay();
});

/* --- HEADER SCROLL & NAVIGATION --- */
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
}

/* --- JEANS CANVAS CUSTOMIZER ENGINE --- */
let canvas, ctx;
function initJeansCanvasCustomizer() {
    canvas = document.getElementById('jeansCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    // Event listeners for Jeans controls
    const monogramInput = document.getElementById('monogramInput');
    if (monogramInput) {
        monogramInput.addEventListener('input', (e) => {
            appState.jeans.monogram = e.target.value.toUpperCase();
            document.getElementById('summaryText').innerText = `"${appState.jeans.monogram}"`;
            renderJeansCanvas();
        });
    }

    // Jeans Style Buttons
    document.querySelectorAll('#jeansStyleOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#jeansStyleOptions .option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            appState.jeans.style = this.dataset.style;
            appState.jeans.basePrice = parseFloat(this.dataset.price);
            updateJeansPrice();
            renderJeansCanvas();
        });
    });

    // Thread Color Swatches
    document.querySelectorAll('#threadColorSwatches .color-swatch').forEach(swatch => {
        swatch.addEventListener('click', function() {
            document.querySelectorAll('#threadColorSwatches .color-swatch').forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            appState.jeans.threadColor = this.dataset.color;
            appState.jeans.threadName = this.dataset.name;
            document.getElementById('threadNameDisplay').innerText = this.dataset.name;
            document.getElementById('summaryThread').innerText = this.dataset.name;
            renderJeansCanvas();
        });
    });

    // Motif Options
    document.querySelectorAll('#motifOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#motifOptions .option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            appState.jeans.motif = this.dataset.motif;
            appState.jeans.motifPrice = parseFloat(this.dataset.extra);
            updateJeansPrice();
            renderJeansCanvas();
        });
    });

    // Placement Options
    document.querySelectorAll('#placementOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#placementOptions .option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            appState.jeans.placement = this.dataset.place;
            renderJeansCanvas();
        });
    });

    // Flip View Button
    document.getElementById('btnFlipJeans').addEventListener('click', () => {
        appState.jeans.isFlipped = !appState.jeans.isFlipped;
        renderJeansCanvas();
        showToast(appState.jeans.isFlipped ? 'Switched to Back View' : 'Switched to Front Pocket View');
    });

    // Add Jeans to Cart
    document.getElementById('addJeansToCart').addEventListener('click', () => {
        const total = calculateJeansTotal();
        const customJeansItem = {
            id: 'custom-jeans-' + Date.now(),
            name: `Hand-Embroidered Denim (${appState.jeans.style.replace('-', ' ').toUpperCase()})`,
            price: total,
            specs: `Name: "${appState.jeans.monogram}" | Thread: ${appState.jeans.threadName} | Motif: ${appState.jeans.motif}`,
            image: 'embroidered_jeans_product_1785516492146.jpg'
        };
        addToCart(customJeansItem);
    });

    // Initial canvas render
    renderJeansCanvas();
}

function updateJeansPrice() {
    const total = calculateJeansTotal();
    document.getElementById('jeansTotalPrice').innerText = `$${total.toFixed(2)}`;
}

function calculateJeansTotal() {
    return appState.jeans.basePrice + appState.jeans.motifPrice;
}

function renderJeansCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Denim Background Color according to selected style
    let denimGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (appState.jeans.style === 'vintage-blue') {
        denimGradient.addColorStop(0, '#3A6073');
        denimGradient.addColorStop(1, '#16222A');
    } else if (appState.jeans.style === 'washed-black') {
        denimGradient.addColorStop(0, '#434343');
        denimGradient.addColorStop(1, '#000000');
    } else {
        // Ecru raw cream
        denimGradient.addColorStop(0, '#F5F2EB');
        denimGradient.addColorStop(1, '#E2DCD0');
    }
    ctx.fillStyle = denimGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Denim Weave Texture Effect
    ctx.strokeStyle = appState.jeans.style === 'ecru-cream' ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = -canvas.height; i < canvas.width; i += 8) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + canvas.height, canvas.height);
        ctx.stroke();
    }

    // Draw Jeans Pocket Outline
    ctx.strokeStyle = appState.jeans.threadColor;
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);

    ctx.beginPath();
    // Pocket shape
    ctx.moveTo(120, 140);
    ctx.lineTo(380, 140);
    ctx.lineTo(380, 360);
    ctx.lineTo(250, 440);
    ctx.lineTo(120, 360);
    ctx.closePath();
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Draw Hand Embroidery Floral Motif
    if (appState.jeans.motif !== 'minimal') {
        ctx.save();
        ctx.strokeStyle = appState.jeans.threadColor;
        ctx.fillStyle = appState.jeans.threadColor;
        ctx.lineWidth = 2;

        // Draw Floral Stems & Leaves
        ctx.beginPath();
        ctx.arc(180, 200, 18, 0, Math.PI * 2);
        ctx.arc(220, 180, 14, 0, Math.PI * 2);
        ctx.arc(320, 210, 16, 0, Math.PI * 2);
        ctx.fill();

        // Decorative Vines
        ctx.beginPath();
        ctx.moveTo(150, 220);
        ctx.bezierCurveTo(200, 160, 280, 240, 340, 190);
        ctx.stroke();
        ctx.restore();
    }

    // Draw Hand-Stitched Monogram Text
    ctx.save();
    ctx.font = 'italic 700 36px "Cormorant Garamond", serif';
    ctx.fillStyle = appState.jeans.threadColor;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 6;
    ctx.textAlign = 'center';
    
    const textY = appState.jeans.motif === 'minimal' ? 270 : 310;
    ctx.fillText(appState.jeans.monogram || 'YOUR NAME', 250, textY);

    // Thread Stitch Effect under text
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = appState.jeans.threadColor;
    ctx.beginPath();
    ctx.moveTo(180, textY + 12);
    ctx.lineTo(320, textY + 12);
    ctx.stroke();

    ctx.restore();
}

/* --- RESIN MEMORY ART STUDIO LOGIC --- */
function initResinStudioControls() {
    // Memory Type Buttons
    document.querySelectorAll('#resinMemoryType .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#resinMemoryType .option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            appState.resin.type = this.dataset.type;
            appState.resin.basePrice = parseFloat(this.dataset.price);
            updateResinPrice();
        });
    });

    // Resin Shape Buttons
    document.querySelectorAll('#resinShapeOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#resinShapeOptions .option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            appState.resin.shape = this.dataset.shape;
            appState.resin.shapeExtra = parseFloat(this.dataset.extra);
            updateResinPrice();
        });
    });

    // Addons Checkboxes
    document.getElementById('addGoldFlakes').addEventListener('change', (e) => {
        appState.resin.goldFlakes = e.target.checked;
        const glow = document.getElementById('resinGlow');
        glow.style.opacity = e.target.checked ? '1' : '0.2';
        updateResinPrice();
    });

    document.getElementById('addEngravedPlate').addEventListener('change', (e) => {
        appState.resin.engravedPlate = e.target.checked;
        const plaque = document.getElementById('resinPlaqueOverlay');
        plaque.style.display = e.target.checked ? 'block' : 'none';
        updateResinPrice();
    });

    document.getElementById('addLedBase').addEventListener('change', (e) => {
        appState.resin.ledBase = e.target.checked;
        updateResinPrice();
    });

    // Inscription Text Input
    const engravingInput = document.getElementById('resinEngravingText');
    if (engravingInput) {
        engravingInput.addEventListener('input', (e) => {
            appState.resin.engravingText = e.target.value;
            document.getElementById('plaqueTextDisplay').innerText = e.target.value || 'Custom Inscription';
        });
    }

    // File upload simulated handling
    const fileInput = document.getElementById('resinPhotoUpload');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    document.getElementById('resinImagePreview').src = evt.target.result;
                    document.getElementById('uploadText').innerText = `Photo Uploaded: ${e.target.files[0].name}`;
                    showToast('Flower Keepsake Photo Attached!');
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    // Add Resin to Cart Button
    document.getElementById('addResinToCart').addEventListener('click', () => {
        const total = calculateResinTotal();
        const resinItem = {
            id: 'resin-memory-' + Date.now(),
            name: `Resin Preservation: ${appState.resin.type}`,
            price: total,
            specs: `Shape: ${appState.resin.shape} | Inscription: "${appState.resin.engravingText}" | Base: ${appState.resin.ledBase ? 'LED Walnut' : 'Standard'}`,
            image: 'resin_memory_art_1785516510147.jpg'
        };
        addToCart(resinItem);
    });

    updateResinPrice();
}

function updateResinPrice() {
    const total = calculateResinTotal();
    document.getElementById('resinTotalPrice').innerText = `$${total.toFixed(2)}`;
}

function calculateResinTotal() {
    let total = appState.resin.basePrice + appState.resin.shapeExtra;
    if (appState.resin.goldFlakes) total += 20;
    if (appState.resin.engravedPlate) total += 25;
    if (appState.resin.ledBase) total += 35;
    return total;
}

/* --- PENCIL SKETCH PORTRAIT STUDIO LOGIC --- */
function initSketchStudioControls() {
    // Art Medium
    document.querySelectorAll('#sketchMediumOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#sketchMediumOptions .option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            appState.sketch.medium = this.dataset.medium;
            appState.sketch.basePrice = parseFloat(this.dataset.price);
            updateSketchPrice();
        });
    });

    // Subjects Count
    document.querySelectorAll('#sketchSubjectOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#sketchSubjectOptions .option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            appState.sketch.subjects = this.dataset.subjects;
            appState.sketch.subjectExtra = parseFloat(this.dataset.extra);
            updateSketchPrice();
        });
    });

    // Frame Options
    document.querySelectorAll('#sketchFrameOptions .option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('#sketchFrameOptions .option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            appState.sketch.frame = this.dataset.frame;
            appState.sketch.frameExtra = parseFloat(this.dataset.extra);
            updateSketchPrice();
        });
    });

    // Photo Upload for Sketch
    const sketchInput = document.getElementById('sketchPhotoUpload');
    if (sketchInput) {
        sketchInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    document.getElementById('sketchImgPreview').src = evt.target.result;
                    document.getElementById('sketchUploadText').innerText = `Reference Photo Loaded: ${e.target.files[0].name}`;
                    showToast('Portrait Reference Photo Uploaded!');
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    // Add Sketch to Cart
    document.getElementById('addSketchToCart').addEventListener('click', () => {
        const total = calculateSketchTotal();
        const sketchItem = {
            id: 'sketch-commission-' + Date.now(),
            name: `Hand-Drawn Pencil Portrait (${appState.sketch.medium})`,
            price: total,
            specs: `Subjects: ${appState.sketch.subjects} | Framing: ${appState.sketch.frame}`,
            image: 'pencil_sketch_product_1785516527345.jpg'
        };
        addToCart(sketchItem);
    });

    updateSketchPrice();
}

function updateSketchPrice() {
    const total = calculateSketchTotal();
    document.getElementById('sketchTotalPrice').innerText = `$${total.toFixed(2)}`;
}

function calculateSketchTotal() {
    return appState.sketch.basePrice + appState.sketch.subjectExtra + appState.sketch.frameExtra;
}

/* --- HOME DECOR STORE & PRODUCT RENDERING --- */
function renderHomeDecorProducts(filterCategory = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = filterCategory === 'all' 
        ? appState.products 
        : appState.products.filter(p => p.category === filterCategory);

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-box">
                <img src="${product.imageReal || product.image}" alt="${product.name}" loading="lazy">
                <button class="btn btn-primary quick-add-btn" onclick="quickAddStoreProduct('${product.id}')">
                    <i class="fa-solid fa-bag-shopping"></i> Add to Bag
                </button>
            </div>
            <div class="product-content">
                <span class="product-cat">${product.category.toUpperCase()}</span>
                <h4 class="product-title">${product.name}</h4>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i> ${product.rating} (${product.reviewsCount} reviews)
                </div>
                <div class="product-price-row">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="icon-btn" onclick="openQuickView('${product.id}')" title="Quick View">
                        <i class="fa-regular fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initFilterTabs() {
    document.querySelectorAll('.filter-tabs .filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-tabs .filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderHomeDecorProducts(this.dataset.filter);
        });
    });
}

function quickAddStoreProduct(productId) {
    const item = appState.products.find(p => p.id === productId);
    if (item) {
        addToCart({
            id: item.id + '-' + Date.now(),
            name: item.name,
            price: item.price,
            specs: 'Handmade Ready-to-Ship Craft Item',
            image: item.imageReal || item.image
        });
    }
}

function openQuickView(productId) {
    const item = appState.products.find(p => p.id === productId);
    if (!item) return;

    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    content.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center;">
            <img src="${item.imageReal || item.image}" style="border-radius: 12px; width: 100%;">
            <div>
                <span style="font-weight: 700; color: var(--color-primary);">${item.category.toUpperCase()}</span>
                <h2 style="font-family: var(--font-heading); font-size: 2rem; margin: 0.5rem 0;">${item.name}</h2>
                <div style="color: #F39C12; margin-bottom: 1rem;">★ ${item.rating} (${item.reviewsCount} customer reviews)</div>
                <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">${item.description}</p>
                <div style="font-size: 2rem; font-weight: 700; color: var(--color-primary); margin-bottom: 1.5rem;">$${item.price.toFixed(2)}</div>
                <button class="btn btn-primary btn-lg btn-block" onclick="quickAddStoreProduct('${item.id}'); document.getElementById('closeQuickView').click();">
                    <i class="fa-solid fa-cart-plus"></i> Add Handcrafted Item to Order
                </button>
            </div>
        </div>
    `;
    modal.classList.add('active');
}

/* --- SHOPPING CART DRAWER MANAGEMENT --- */
function initCartDrawer() {
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const btnCheckout = document.getElementById('btnCheckout');
    const closeCheckout = document.getElementById('closeCheckout');
    const checkoutModal = document.getElementById('checkoutModal');
    const closeQuickView = document.getElementById('closeQuickView');
    const quickViewModal = document.getElementById('quickViewModal');

    cartToggle.addEventListener('click', () => {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    cartOverlay.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    if (closeQuickView) {
        closeQuickView.addEventListener('click', () => quickViewModal.classList.remove('active'));
    }

    if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
            if (appState.cart.length === 0) {
                showToast('Your bag is empty! Add custom items first.');
                return;
            }
            cartDrawer.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.getElementById('checkoutTotalAmount').innerText = `$${calculateCartSubtotal().toFixed(2)}`;
            checkoutModal.classList.add('active');
        });
    }

    if (closeCheckout) {
        closeCheckout.addEventListener('click', () => checkoutModal.classList.remove('active'));
    }

    const closeReceipt = document.getElementById('closeReceipt');
    if (closeReceipt) {
        closeReceipt.addEventListener('click', () => document.getElementById('receiptModal').classList.remove('active'));
    }
}

function addToCart(item) {
    appState.cart.push(item);
    updateCartUI();
    showToast(`Added "${item.name}" to your shopping bag!`);
    
    // Open drawer automatically
    document.getElementById('cartDrawer').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
}

function removeFromCart(itemId) {
    appState.cart = appState.cart.filter(item => item.id !== itemId);
    updateCartUI();
    showToast('Item removed from cart');
}

function updateCartUI() {
    const countBadge = document.getElementById('cartCount');
    const drawerCount = document.getElementById('cartDrawerCount');
    const itemsList = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('emptyCartState');
    const subtotalEl = document.getElementById('cartSubtotal');

    countBadge.innerText = appState.cart.length;
    drawerCount.innerText = appState.cart.length;

    if (appState.cart.length === 0) {
        emptyState.style.display = 'block';
        itemsList.innerHTML = '';
        itemsList.appendChild(emptyState);
        subtotalEl.innerText = '$0.00';
        return;
    }

    emptyState.style.display = 'none';
    itemsList.innerHTML = '';

    appState.cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.image}" class="cart-item-img" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-spec">${item.specs}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">
                    <i class="fa-solid fa-trash-can"></i> Remove
                </button>
            </div>
        `;
        itemsList.appendChild(itemEl);
    });

    subtotalEl.innerText = `$${calculateCartSubtotal().toFixed(2)}`;
}

function calculateCartSubtotal() {
    return appState.cart.reduce((sum, item) => sum + item.price, 0);
}

/* --- CHECKOUT & ORDER CONFIRMATION INVOICE --- */
function handlePlaceOrder(event) {
    event.preventDefault();
    const checkoutModal = document.getElementById('checkoutModal');
    const receiptModal = document.getElementById('receiptModal');
    const receiptContent = document.getElementById('receiptContent');

    const orderNumber = 'TF-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = calculateCartSubtotal();

    let itemsHtml = appState.cart.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; border-bottom: 1px dashed #eee; padding-bottom: 0.5rem;">
            <div>
                <strong>${item.name}</strong>
                <div style="font-size: 0.8rem; color: #666;">${item.specs}</div>
            </div>
            <div style="font-weight: 700; color: var(--color-primary);">$${item.price.toFixed(2)}</div>
        </div>
    `).join('');

    receiptContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <i class="fa-solid fa-circle-check" style="font-size: 3.5rem; color: #27AE60;"></i>
            <h2 style="font-family: var(--font-heading); font-size: 2.2rem; margin-top: 0.5rem;">Handcrafted Order Confirmed!</h2>
            <p style="color: var(--color-text-muted);">Thank you for supporting artisanal craftsmanship. Your custom order is now queued in our studio atelier.</p>
        </div>

        <div style="background: var(--color-bg-light); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Order Reference Number:</span>
                <strong>${orderNumber}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Estimated Crafting Time:</span>
                <strong>5 - 7 Business Days</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
                <span>Prepaid Shipping Label:</span>
                <span style="color: #27AE60; font-weight: 700;">Sent to your email</span>
            </div>
        </div>

        <h3>Order Breakdown:</h3>
        <div style="margin: 1rem 0;">${itemsHtml}</div>

        <div style="display: flex; justify-content: space-between; font-size: 1.3rem; font-weight: 700; border-top: 2px solid var(--color-primary); padding-top: 1rem; margin-top: 1rem;">
            <span>Total Paid:</span>
            <span style="color: var(--color-primary);">$${subtotal.toFixed(2)}</span>
        </div>

        <button class="btn btn-primary btn-block btn-lg" style="margin-top: 2rem;" onclick="window.print()">
            <i class="fa-solid fa-print"></i> Print Order Receipt / Keepsake Voucher
        </button>
    `;

    checkoutModal.classList.remove('active');
    receiptModal.classList.add('active');

    // Reset Cart
    appState.cart = [];
    updateCartUI();
}

/* --- SEARCH OVERLAY LOGIC --- */
function initSearchOverlay() {
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.getElementById('closeSearch');

    searchToggle.addEventListener('click', () => searchOverlay.classList.add('active'));
    closeSearch.addEventListener('click', () => searchOverlay.classList.remove('active'));
}

function quickSearch(query) {
    document.getElementById('searchOverlay').classList.remove('active');
    if (query === 'Embroidery') {
        window.location.hash = '#jeans-studio';
    } else if (query === 'Resin') {
        window.location.hash = '#resin-studio';
    } else if (query === 'Sketch') {
        window.location.hash = '#sketch-studio';
    } else {
        window.location.hash = '#home-decor';
    }
}

/* --- TOAST NOTIFICATIONS --- */
function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-sparkles"></i> <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
