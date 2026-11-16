/**
 * ALVARADO PROYECTOS - Sistema de Donación / Aporte de Materiales
 * Proyecto 1: Cerrar la Villa Deportiva
 * Etapa 1: Primeros 255 metros de Paredón Lineal
 * Club Atlético Alvarado - Mar del Plata
 */

// Catálogo de materiales necesarios para los primeros 255 metros de paredón
// Datos extraídos de la lista de referencia del usuario y de las especificaciones del plano
const MATERIALS = [
  {
    id: 'hierro-6',
    name: 'barras de 6 mm',
    spec: 'Estribos en columnas y rióstras de encadenado',
    category: 'hierros',
    redCount: 5,
    struckCount: 170,
    unitName: 'barra de 12m',
    unitShort: 'c/u',
    price: 5600,
    step: 1
  },
  {
    id: 'hierro-8',
    name: 'barras de 8 mm',
    spec: 'Refuerzo horizontal entre hiladas de bloques',
    category: 'hierros',
    redCount: 22,
    struckCount: 140,
    unitName: 'barra de 12m',
    unitShort: 'c/u',
    price: 9700,
    step: 1
  },
  {
    id: 'hierro-10',
    name: 'barras de 10 mm',
    spec: 'Viga de amarre superior y columnas intermedias',
    category: 'hierros',
    redCount: 11,
    struckCount: 80,
    unitName: 'barra de 12m',
    unitShort: 'c/u',
    price: 15200,
    step: 1
  },
  {
    id: 'hierro-12',
    name: 'barras de 12 mm',
    spec: 'Armadura principal en columnas (25x25) y zapatas bajo tierra',
    category: 'hierros',
    redCount: 17,
    struckCount: 145,
    unitName: 'barra de 12m',
    unitShort: 'c/u',
    price: 21700,
    step: 1
  },
  {
    id: 'hierro-16',
    name: 'barras de 16 mm',
    spec: 'Zapatas esquineras y anclajes antisísmicos',
    category: 'hierros',
    redCount: 3,
    struckCount: 28,
    unitName: 'barra de 12m',
    unitShort: 'c/u',
    price: 38000,
    step: 1
  },
  {
    id: 'hierro-20',
    name: 'barras de 20 mm',
    spec: 'Anclajes maestros de zapatas profundas',
    category: 'hierros',
    redCount: 1,
    struckCount: 47,
    unitName: 'barra de 12m',
    unitShort: 'c/u',
    price: 60000,
    step: 1
  },
  {
    id: 'hormigon-m3',
    name: 'Hormigón Elaborado H21 (m³)',
    spec: 'Zapatas (35x35) y rióstras de cimentación (30x30) bajo tierra',
    category: 'aridos',
    redCount: 18,
    struckCount: 65,
    unitName: 'metro cúbico (m³)',
    unitShort: 'c/u',
    price: 135000,
    step: 1
  },
  {
    id: 'arena-m3',
    name: 'Arena Gruesa de Cantera (m³)',
    spec: 'Mortero de asiento para 94 bloques por cada paño de 3m',
    category: 'aridos',
    redCount: 12,
    struckCount: 40,
    unitName: 'metro cúbico (m³)',
    unitShort: 'c/u',
    price: 34000,
    step: 1
  },
  {
    id: 'cemento-bolsa',
    name: 'Cemento Portland (Bolsa 50 kg)',
    spec: 'Mezcla de asiento de bloques y colado de columnas',
    category: 'aridos',
    redCount: 45,
    struckCount: 350,
    unitName: 'bolsa de 50 kg',
    unitShort: 'c/u',
    price: 11800,
    step: 1
  },
  {
    id: 'ladrillo-block',
    name: 'Bloques de Concreto 39x19x19 cm (Unidad)',
    spec: '13 unidades x m² (94 bloques por paño de 3m x 2.40m)',
    category: 'muros',
    redCount: 650,
    struckCount: 3200,
    unitName: 'unidad block',
    unitShort: 'c/u',
    price: 1950,
    step: 5
  },
  {
    id: 'piedra-partida',
    name: 'Piedra Partida / Grava (m³)',
    spec: 'Lecho de piedras de 10 a 20 cm bajo zapatas para drenaje',
    category: 'aridos',
    redCount: 8,
    struckCount: 30,
    unitName: 'metro cúbico (m³)',
    unitShort: 'c/u',
    price: 42000,
    step: 1
  }
];

// Estado global de la donación/compra
let cart = {};

try {
  const savedCart = localStorage.getItem('alvarado_cart_v3');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  console.warn(e);
}

// Formateador de moneda en ARS
const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
});

function formatMoney(amount) {
  return currencyFormatter.format(amount);
}

function persistCart() {
  try {
    localStorage.setItem('alvarado_cart_v3', JSON.stringify(cart));
  } catch (e) {
    console.warn(e);
  }
}

// RENDERIZADO DE LOS MATERIALES EN EL MISMO CUADRADO (DIVIDE-Y)
function renderMaterialsList(filter = 'all') {
  const container = document.getElementById('materials-list-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? MATERIALS 
    : MATERIALS.filter(m => m.category === filter);

  container.innerHTML = filtered.map(mat => {
    const qty = cart[mat.id] || 0;
    const subtotal = qty * mat.price;
    const isSelected = qty > 0;

    return `
      <div 
        id="item-row-${mat.id}"
        class="material-single-row ${isSelected ? 'selected' : ''} px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <!-- Left: Red number, Strikethrough, Name, Dotted leader, Unit Price -->
        <div class="flex items-center flex-grow min-w-0">
          
          <!-- Red number & Strikethrough from user reference image -->
          <div class="flex flex-col items-center justify-center mr-3 sm:mr-4 w-9 sm:w-11 flex-shrink-0 text-center select-none">
            <span class="text-xl sm:text-2xl font-heading font-black text-red-600 leading-none tracking-tight">
              ${mat.redCount}
            </span>
            <span class="strikethrough-tag">
              ${mat.struckCount}
            </span>
          </div>

          <!-- Name & Spec -->
          <div class="flex-shrink-0">
            <div class="flex items-center gap-2">
              <span class="font-heading font-black text-sm sm:text-base text-slate-900 capitalize tracking-tight">
                ${mat.name}
              </span>
            </div>
            <p class="text-[11px] sm:text-xs text-slate-500 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              ${mat.spec}
            </p>
          </div>

          <!-- Dotted Leader Line (like image) -->
          <div class="dotted-leader hidden sm:block"></div>

          <!-- Unit Price (like image) -->
          <div class="ml-auto sm:ml-0 flex-shrink-0 text-right pr-2 select-none">
            <span class="text-sm sm:text-base font-heading font-extrabold text-slate-800 tracking-tight">
              ${formatMoney(mat.price)}
            </span>
            <span class="text-xs text-slate-400 font-medium ml-0.5">(${mat.unitShort})</span>
          </div>

        </div>

        <!-- Right: [-] [qty] [+] Controls and Subtotal per item -->
        <div class="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-shrink-0">
          
          <div class="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 shadow-inner">
            <button 
              type="button"
              onclick="changeQty('${mat.id}', -1)"
              class="qty-btn w-8 h-8 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-base transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
              ${qty === 0 ? 'disabled' : ''}
              aria-label="Disminuir"
            >
              -
            </button>
            
            <input 
              type="number"
              min="0"
              value="${qty}"
              id="input-${mat.id}"
              onchange="setManualQty('${mat.id}', this.value)"
              class="w-12 text-center bg-transparent font-heading font-bold text-slate-900 text-sm outline-none"
              aria-label="Cantidad"
            >

            <button 
              type="button"
              onclick="changeQty('${mat.id}', 1)"
              class="qty-btn w-8 h-8 rounded-lg bg-alva-lightBlue text-white hover:bg-blue-600 flex items-center justify-center font-bold text-base transition-colors shadow-sm active:scale-95"
              aria-label="Aumentar"
            >
              +
            </button>
          </div>

          <!-- Subtotal per item -->
          <div class="text-right min-w-[95px] select-none">
            <span class="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Subtotal</span>
            <span class="text-sm sm:text-base font-heading font-black ${qty > 0 ? 'text-alva-blue' : 'text-slate-400'}">
              ${formatMoney(subtotal)}
            </span>
          </div>

        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

// CONTROL DE CANTIDADES
function changeQty(materialId, delta) {
  const current = cart[materialId] || 0;
  const mat = MATERIALS.find(m => m.id === materialId);
  const step = mat ? (mat.step || 1) : 1;
  const next = Math.max(0, current + (delta * step));

  if (next === 0) {
    delete cart[materialId];
  } else {
    cart[materialId] = next;
  }

  persistCart();
  updateUI();

  if (delta > 0 && mat) {
    showToast(`Sumaste ${mat.name} al aporte`);
  }
}

function setManualQty(materialId, val) {
  const parsed = parseInt(val, 10);
  if (isNaN(parsed) || parsed <= 0) {
    delete cart[materialId];
  } else {
    cart[materialId] = parsed;
  }
  persistCart();
  updateUI();
}

// ACTUALIZACIÓN DE INTERFAZ Y TOTALES
function updateUI() {
  let totalItemsCount = 0;
  let totalPrice = 0;

  MATERIALS.forEach(mat => {
    const qty = cart[mat.id] || 0;
    const subtotal = qty * mat.price;
    totalItemsCount += qty;
    totalPrice += subtotal;
  });

  const activeBtn = document.querySelector('.filter-btn.active');
  const cat = activeBtn ? activeBtn.dataset.cat : 'all';
  renderMaterialsList(cat);

  // Header Badge
  const headerBadge = document.getElementById('header-cart-badge');
  if (headerBadge) {
    headerBadge.textContent = totalItemsCount;
    headerBadge.classList.toggle('hidden', totalItemsCount === 0);
  }

  // Total en la caja del cuadrado
  const mainTotalDisplay = document.getElementById('main-total-amount');
  const mainItemsCount = document.getElementById('main-items-count');

  if (mainTotalDisplay) mainTotalDisplay.textContent = formatMoney(totalPrice);
  if (mainItemsCount) mainItemsCount.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? 'material seleccionado' : 'materiales seleccionados'} para el paredón`;

  // Barra Sticky
  const stickyBar = document.getElementById('sticky-cart-bar');
  const stickyTotal = document.getElementById('sticky-cart-total');
  const stickyCount = document.getElementById('sticky-cart-count');

  if (stickyBar && stickyTotal && stickyCount) {
    stickyTotal.textContent = formatMoney(totalPrice);
    stickyCount.textContent = `${totalItemsCount} materiales`;

    if (totalPrice > 0) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }

  // Modal checkout
  renderModalSummary(totalItemsCount, totalPrice);
}

// RENDERIZADO DEL RESUMEN EN EL MODAL DE PAGO
function renderModalSummary(totalCount, totalPrice) {
  const container = document.getElementById('cart-items-container');
  const modalTotal = document.getElementById('modal-pay-total');

  if (modalTotal) modalTotal.textContent = formatMoney(totalPrice);
  if (!container) return;

  const entries = Object.entries(cart);

  if (entries.length === 0) {
    container.innerHTML = `
      <div class="text-center py-6 text-slate-400">
        <p class="text-xs">No seleccionaste ningún material todavía.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = entries.map(([id, qty]) => {
    const mat = MATERIALS.find(m => m.id === id);
    if (!mat) return '';
    const itemTotal = qty * mat.price;

    return `
      <div class="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
        <div>
          <span class="font-bold text-slate-900">${mat.name}</span>
          <span class="text-slate-500 block text-[11px]">${qty} x ${formatMoney(mat.price)}</span>
        </div>
        <span class="font-extrabold text-alva-blue">${formatMoney(itemTotal)}</span>
      </div>
    `;
  }).join('');
}

// APERTURA DE CHECKOUT MODAL
function openCheckoutModal() {
  let total = 0;
  Object.entries(cart).forEach(([id, qty]) => {
    const m = MATERIALS.find(mat => mat.id === id);
    if (m) total += qty * m.price;
  });

  if (total === 0) {
    showToast('Sumá al menos un material antes de pagar');
    const listEl = document.getElementById('materials-square-container');
    if (listEl) listEl.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.classList.add('drawer-open');
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }
}

// ACCIONES DE PAGO DENTRO DEL MODAL
function payViaWhatsApp() {
  const entries = Object.entries(cart);
  if (entries.length === 0) return;

  const nameInput = document.getElementById('checkout-name-input');
  const hinchaName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Hincha de Alvarado';

  let lines = [];
  lines.push(`🟦⬜ *APORTE PAREDÓN - VILLA DEPORTIVA ALVARADO* ⬜🟦`);
  lines.push(`*Etapa 1: Primeros 255 metros de Paredón Lineal*\n`);
  lines.push(`👤 *Hincha / Colaborador:* ${hinchaName}`);
  lines.push(`🧱 *Materiales seleccionados para la obra:*`);

  let total = 0;
  entries.forEach(([id, qty]) => {
    const mat = MATERIALS.find(m => m.id === id);
    if (mat) {
      const sub = qty * mat.price;
      total += sub;
      lines.push(`• ${qty}x ${mat.name} (${formatMoney(sub)})`);
    }
  });

  lines.push(`\n💰 *TOTAL A PAGAR / DONAR: ${formatMoney(total)}*`);
  lines.push(`\n¡Hola! Quiero coordinar el pago o entrega de estos materiales para la obra del paredón.`);

  const fullText = encodeURIComponent(lines.join('\n'));
  const phone = '5492235900000';
  window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${fullText}`, '_blank');
}

function payViaMercadoPago() {
  showToast('Redirigiendo a coordinación de pago...');
  setTimeout(() => {
    payViaWhatsApp();
  }, 600);
}

// CAMBIO DE IMAGEN EN LA GALERÍA DEL PAREDÓN
function switchWallImage(src, caption, btnEl) {
  const imgEl = document.getElementById('main-wall-photo');
  const capEl = document.getElementById('wall-photo-caption');

  if (imgEl) {
    imgEl.style.opacity = '0.3';
    setTimeout(() => {
      imgEl.src = src;
      imgEl.style.opacity = '1';
    }, 150);
  }

  if (capEl && caption) {
    capEl.textContent = caption;
  }

  // Activar botón
  const btns = document.querySelectorAll('.wall-tab-btn');
  btns.forEach(b => {
    b.classList.remove('bg-alva-blue', 'text-white', 'shadow');
    b.classList.add('bg-slate-100', 'text-slate-600');
  });
  if (btnEl) {
    btnEl.classList.add('bg-alva-blue', 'text-white', 'shadow');
    btnEl.classList.remove('bg-slate-100', 'text-slate-600');
  }
}

// TOAST
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-item bg-slate-900 text-white text-xs sm:text-sm font-semibold py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 pointer-events-auto';
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
  renderMaterialsList('all');
  updateUI();

  // Botones de PAGAR
  const mainPayBtn = document.getElementById('main-pay-btn');
  if (mainPayBtn) mainPayBtn.addEventListener('click', openCheckoutModal);

  const stickyPayBtn = document.getElementById('sticky-pay-btn');
  if (stickyPayBtn) stickyPayBtn.addEventListener('click', openCheckoutModal);

  // Cerrar Modal
  const closeCheckoutBtn = document.getElementById('close-checkout-modal-btn');
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);

  const modalOverlay = document.getElementById('checkout-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeCheckoutModal();
    });
  }

  // Acciones modal
  const waBtn = document.getElementById('modal-pay-whatsapp-btn');
  if (waBtn) waBtn.addEventListener('click', payViaWhatsApp);

  const mpBtn = document.getElementById('modal-pay-mp-btn');
  if (mpBtn) mpBtn.addEventListener('click', payViaMercadoPago);

  // Filtros
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-alva-navy', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('active', 'bg-alva-navy', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700');
      renderMaterialsList(btn.dataset.cat);
    });
  });

  // ESC cierra modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCheckoutModal();
  });
});
