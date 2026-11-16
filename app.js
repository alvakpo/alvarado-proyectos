/**
 * ALVARADO PROYECTOS - Sistema de Lista de Aportes de Materiales
 * Proyecto 1: Cerrar la Villa Deportiva (Etapa 1/4)
 * Club Atlético Alvarado - Mar del Plata
 */

// Catálogo oficial de materiales para la Etapa 1
const MATERIALS = [
  {
    id: 'hormigon-m3',
    name: 'Hormigón Elaborado H21',
    category: 'aridos',
    unitName: 'metro cúbico (m³)',
    unitShort: 'm³',
    price: 135000,
    icon: 'boxes',
    badge: 'Estructural',
    description: 'Bases y cimientos de hormigón para las columnas del muro perimetral.',
    step: 1,
    min: 0,
    max: 50
  },
  {
    id: 'arena-m3',
    name: 'Arena Gruesa de Cantera',
    category: 'aridos',
    unitName: 'metro cúbico (m³)',
    unitShort: 'm³',
    price: 34000,
    icon: 'mountain',
    badge: 'Árido',
    description: 'Para mezcla de asiento de bloques de hormigón y revoque impermeable.',
    step: 1,
    min: 0,
    max: 100
  },
  {
    id: 'cemento-bolsa',
    name: 'Cemento Portland (Bolsa 50 kg)',
    category: 'aridos',
    unitName: 'bolsa de 50 kg',
    unitShort: 'bolsa',
    price: 11800,
    icon: 'package',
    badge: 'Esencial',
    description: 'Cemento de primera marca para elaboración de morteros y hormigones.',
    step: 1,
    min: 0,
    max: 500
  },
  {
    id: 'hierro-10',
    name: 'Hierro del 10 (Barra 12m)',
    category: 'hierros',
    unitName: 'barra de 12 metros',
    unitShort: 'barra',
    price: 14500,
    icon: 'align-justify',
    badge: 'Acero A-420',
    description: 'Hierro nervurado de 10mm para armadura longitudinal de columnas y vigas.',
    step: 1,
    min: 0,
    max: 200
  },
  {
    id: 'hierro-12',
    name: 'Hierro del 12 (Barra 12m)',
    category: 'hierros',
    unitName: 'barra de 12 metros',
    unitShort: 'barra',
    price: 19900,
    icon: 'hash',
    badge: 'Refuerzo',
    description: 'Hierro nervurado estructural de 12mm para las zapatas y esquinas críticas.',
    step: 1,
    min: 0,
    max: 200
  },
  {
    id: 'ladrillo-block',
    name: 'Ladrillo Block de Cemento (19x19x39)',
    category: 'muros',
    unitName: 'bloque unidad',
    unitShort: 'unidad',
    price: 1950,
    icon: 'box',
    badge: 'Muro',
    description: 'Bloques de cemento vibrocomprimido de alta resistencia para el muro perimetral.',
    step: 5,
    min: 0,
    max: 2000
  },
  {
    id: 'alambre-recocido',
    name: 'Alambre de Atar Recocido (Rollo 5 kg)',
    category: 'hierros',
    unitName: 'rollo de 5 kg',
    unitShort: 'rollo',
    price: 18000,
    icon: 'link-2',
    badge: 'Armado',
    description: 'Para el atado seguro de estribos y estructuras de hierro en la armadura.',
    step: 1,
    min: 0,
    max: 50
  },
  {
    id: 'piedra-partida',
    name: 'Piedra Partida 6/20 (m³)',
    category: 'aridos',
    unitName: 'metro cúbico (m³)',
    unitShort: 'm³',
    price: 42000,
    icon: 'disc',
    badge: 'Árido',
    description: 'Piedra granítica seleccionada para vigas de encadenado y zapatas.',
    step: 1,
    min: 0,
    max: 60
  }
];

// Estado global del carrito/aportes del hincha
// Estructura: { [materialId]: cantidad }
let cart = {};

// Cargar del almacenamiento local si existe
try {
  const savedCart = localStorage.getItem('alvarado_cart_v1');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
} catch (e) {
  console.warn('No se pudo acceder a localStorage', e);
}

// Formateador de moneda en Pesos Argentinos (ARS)
const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
});

function formatMoney(amount) {
  return currencyFormatter.format(amount);
}

// Guardar carrito
function persistCart() {
  try {
    localStorage.setItem('alvarado_cart_v1', JSON.stringify(cart));
  } catch (e) {
    console.warn(e);
  }
}

// RENDERIZADO DE LA GRILLA DE MATERIALES
function renderMaterials(categoryFilter = 'all') {
  const container = document.getElementById('materials-grid');
  if (!container) return;

  const filtered = categoryFilter === 'all' 
    ? MATERIALS 
    : MATERIALS.filter(m => m.category === categoryFilter);

  container.innerHTML = filtered.map(mat => {
    const qty = cart[mat.id] || 0;
    const subtotal = qty * mat.price;
    const hasItems = qty > 0;

    return `
      <article class="material-card bg-white rounded-2xl p-6 border ${hasItems ? 'border-alva-lightBlue bg-blue-50/20' : 'border-slate-200'} shadow-sm flex flex-col justify-between" id="card-${mat.id}">
        
        <div>
          <!-- Header card: badge & unit -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <span class="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
              <i data-lucide="${mat.icon}" class="w-3.5 h-3.5 text-alva-lightBlue"></i>
              ${mat.badge}
            </span>
            <span class="text-xs font-semibold text-slate-500 text-right">
              ${mat.unitName}
            </span>
          </div>

          <!-- Name & Description -->
          <h3 class="text-lg font-heading font-bold text-slate-900 leading-snug mb-1">
            ${mat.name}
          </h3>
          <p class="text-xs text-slate-500 mb-4 leading-relaxed">
            ${mat.description}
          </p>

          <!-- Price per Unit -->
          <div class="mb-5 pb-4 border-b border-slate-100 flex items-baseline justify-between">
            <span class="text-xs font-medium text-slate-500">Precio x unidad:</span>
            <span class="text-base font-heading font-extrabold text-alva-navy">
              ${formatMoney(mat.price)}
              <span class="text-xs font-normal text-slate-400">/ ${mat.unitShort}</span>
            </span>
          </div>
        </div>

        <!-- Controls Section: +/- buttons and Total per item -->
        <div class="space-y-3 pt-1">
          
          <div class="flex items-center justify-between gap-2">
            
            <!-- Quantity Picker -->
            <div class="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 shadow-inner">
              <button 
                type="button"
                onclick="changeQty('${mat.id}', -1)"
                class="qty-btn w-9 h-9 rounded-lg bg-white text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-base transition-colors shadow-sm disabled:opacity-30 disabled:cursor-not-allowed"
                ${qty === 0 ? 'disabled' : ''}
                aria-label="Disminuir ${mat.name}"
              >
                -
              </button>
              
              <input 
                type="number"
                min="0"
                max="${mat.max}"
                value="${qty}"
                id="input-${mat.id}"
                onchange="setManualQty('${mat.id}', this.value)"
                class="w-12 text-center bg-transparent font-heading font-bold text-slate-900 text-sm outline-none"
                aria-label="Cantidad de ${mat.name}"
              >

              <button 
                type="button"
                onclick="changeQty('${mat.id}', 1)"
                class="qty-btn w-9 h-9 rounded-lg bg-alva-lightBlue text-white hover:bg-blue-600 flex items-center justify-center font-bold text-base transition-colors shadow-sm active:scale-95"
                aria-label="Aumentar ${mat.name}"
              >
                +
              </button>
            </div>

            <!-- Price total per item display (Al lado del botón) -->
            <div class="text-right">
              <span class="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Total Ítem</span>
              <span class="text-sm sm:text-base font-heading font-black ${qty > 0 ? 'text-alva-blue' : 'text-slate-400'}" id="subtotal-${mat.id}">
                ${formatMoney(subtotal)}
              </span>
            </div>

          </div>

          <!-- Quick Action helper button -->
          <div class="pt-1">
            ${qty > 0 ? `
              <button 
                type="button"
                onclick="openCartDrawer()"
                class="w-full py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 transition-colors"
              >
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>${qty} en tu lista • Ver resumen</span>
              </button>
            ` : `
              <button 
                type="button"
                onclick="changeQty('${mat.id}', 1)"
                class="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <i data-lucide="plus" class="w-3.5 h-3.5 text-slate-400"></i>
                <span>Sumar 1 ${mat.unitShort}</span>
              </button>
            `}
          </div>

        </div>

      </article>
    `;
  }).join('');

  // Re-inicializar iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
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
    showToast(`Sumaste ${step} ${mat.unitShort} de ${mat.name}`);
  }
}

function setManualQty(materialId, value) {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed <= 0) {
    delete cart[materialId];
  } else {
    cart[materialId] = parsed;
  }

  persistCart();
  updateUI();
}

function clearCart() {
  if (Object.keys(cart).length === 0) return;
  if (confirm('¿Deseas vaciar tu lista de materiales seleccionados?')) {
    cart = {};
    persistCart();
    updateUI();
    showToast('Tu lista ha sido vaciada');
  }
}

// ACTUALIZACIÓN GLOBAL DE LA INTERFAZ
function updateUI() {
  let totalItemsCount = 0;
  let totalPrice = 0;

  MATERIALS.forEach(mat => {
    const qty = cart[mat.id] || 0;
    const subtotal = qty * mat.price;

    totalItemsCount += qty;
    totalPrice += subtotal;

    // Actualizar elementos específicos en la tarjeta si existen
    const input = document.getElementById(`input-${mat.id}`);
    if (input) input.value = qty;

    const subtotalEl = document.getElementById(`subtotal-${mat.id}`);
    if (subtotalEl) {
      subtotalEl.textContent = formatMoney(subtotal);
      if (qty > 0) {
        subtotalEl.classList.remove('text-slate-400');
        subtotalEl.classList.add('text-alva-blue');
      } else {
        subtotalEl.classList.add('text-slate-400');
        subtotalEl.classList.remove('text-alva-blue');
      }
    }
  });

  // Re-renderizar grilla completa para reflejar estilos de tarjeta
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  const activeCat = activeFilterBtn ? activeFilterBtn.dataset.cat : 'all';
  renderMaterials(activeCat);

  // Actualizar badges y totales del Header
  const headerBadge = document.getElementById('header-cart-badge');
  if (headerBadge) {
    headerBadge.textContent = totalItemsCount;
    headerBadge.classList.toggle('hidden', totalItemsCount === 0);
  }

  // Actualizar barra flotante inferior
  const stickyBar = document.getElementById('sticky-cart-bar');
  const stickyTotal = document.getElementById('sticky-cart-total');
  const stickyCount = document.getElementById('sticky-cart-count');

  if (stickyBar && stickyTotal && stickyCount) {
    stickyTotal.textContent = formatMoney(totalPrice);
    stickyCount.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? 'material' : 'materiales'}`;

    if (totalItemsCount > 0) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }

  // Actualizar Drawer
  renderDrawer(totalItemsCount, totalPrice);
}

// RENDERIZADO DEL DRAWER / CARRITO
function renderDrawer(totalCount, totalPrice) {
  const container = document.getElementById('cart-items-container');
  const totalItemsEl = document.getElementById('drawer-total-items');
  const totalPriceEl = document.getElementById('drawer-total-price');

  if (totalItemsEl) totalItemsEl.textContent = `${totalCount} ${totalCount === 1 ? 'unidad' : 'unidades'}`;
  if (totalPriceEl) totalPriceEl.textContent = formatMoney(totalPrice);

  if (!container) return;

  const cartEntries = Object.entries(cart);

  if (cartEntries.length === 0) {
    container.innerHTML = `
      <div class="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
        <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
          <i data-lucide="shopping-basket" class="w-8 h-8"></i>
        </div>
        <h4 class="font-heading font-bold text-slate-700 text-base mb-1">Tu lista está vacía</h4>
        <p class="text-xs text-slate-500 max-w-xs">
          Seleccioná los materiales que quieras sumar para cerrar la Villa Deportiva usando los botones +/- de cada ítem.
        </p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = cartEntries.map(([id, qty]) => {
    const mat = MATERIALS.find(m => m.id === id);
    if (!mat) return '';
    const itemTotal = qty * mat.price;

    return `
      <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
        <div class="flex-grow min-w-0">
          <div class="flex items-center gap-2">
            <h4 class="font-heading font-bold text-sm text-slate-800 truncate">${mat.name}</h4>
          </div>
          <div class="text-xs text-slate-500">
            ${qty} x ${formatMoney(mat.price)} • <span class="font-bold text-alva-blue">${formatMoney(itemTotal)}</span>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="flex items-center bg-white rounded-lg border border-slate-200 shadow-sm">
            <button onclick="changeQty('${mat.id}', -1)" class="w-7 h-7 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-l flex items-center justify-center">-</button>
            <span class="w-7 text-center text-xs font-bold text-slate-800">${qty}</span>
            <button onclick="changeQty('${mat.id}', 1)" class="w-7 h-7 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-r flex items-center justify-center">+</button>
          </div>
          <button onclick="setManualQty('${mat.id}', 0)" class="text-slate-400 hover:text-red-500 p-1 transition-colors" title="Eliminar">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

// APERTURA / CIERRE DEL DRAWER
function openCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.classList.add('active');
    document.body.classList.add('drawer-open');
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.classList.remove('drawer-open');
  }
}

// GENERADOR DE MENSAJE DE WHATSAPP
function sendWhatsAppDonation() {
  const cartEntries = Object.entries(cart);
  if (cartEntries.length === 0) {
    showToast('Primero seleccioná al menos un material');
    return;
  }

  const hinchaInput = document.getElementById('hincha-name-input');
  const hinchaName = hinchaInput && hinchaInput.value.trim() 
    ? hinchaInput.value.trim() 
    : 'Hincha de Alvarado';

  let lines = [];
  lines.push(`🟦⬜ *APORTE VILLA DEPORTIVA - ALVARADO* ⬜🟦`);
  lines.push(`*Proyecto 1: Cerrar la Villa Deportiva (Etapa 1/4)*\n`);
  lines.push(`👤 *Hincha / Colaborador:* ${hinchaName}`);
  lines.push(`📦 *Detalle de Materiales:*`);

  let total = 0;
  cartEntries.forEach(([id, qty]) => {
    const mat = MATERIALS.find(m => m.id === id);
    if (mat) {
      const sub = qty * mat.price;
      total += sub;
      lines.push(`• ${qty}x ${mat.name} (${formatMoney(sub)})`);
    }
  });

  lines.push(`\n💰 *Total Aporte:* ${formatMoney(total)}`);
  lines.push(`\n¡Hola! Quiero coordinar con el club cómo realizar el aporte o la entrega física de estos materiales para la obra.`);

  const fullText = encodeURIComponent(lines.join('\n'));
  
  // Número de WhatsApp del club
  const whatsappNumber = '5492235900000';
  const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${fullText}`;

  window.open(url, '_blank');
}

// SISTEMA DE TOAST NOTIFICATIONS
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

// EVENT LISTENERS INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  // Render inicial
  renderMaterials('all');
  updateUI();

  // Botón abrir carrito header
  const openCartBtn = document.getElementById('open-cart-btn');
  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);

  // Botón sticky bar
  const stickyViewBtn = document.getElementById('sticky-view-cart-btn');
  if (stickyViewBtn) stickyViewBtn.addEventListener('click', openCartDrawer);

  // Botón cerrar drawer
  const closeCartBtn = document.getElementById('close-cart-btn');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);

  // Overlay click cierra drawer
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCartDrawer();
    });
  }

  // Vaciar carrito
  const clearBtn = document.getElementById('clear-cart-btn');
  if (clearBtn) clearBtn.addEventListener('click', clearCart);

  // Enviar por WhatsApp
  const waBtn = document.getElementById('action-whatsapp-btn');
  if (waBtn) waBtn.addEventListener('click', sendWhatsAppDonation);

  // Filtros de categoría
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-alva-navy', 'text-white');
        b.classList.add('bg-white', 'text-slate-700');
      });
      btn.classList.add('active', 'bg-alva-navy', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700');
      renderMaterials(btn.dataset.cat);
    });
  });

  // Cerrar modales con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeTransferModal();
    }
  });
});
