# 🟦⬜ Alvarado Proyectos • Villa Deportiva

Landing web interactiva para la campaña de construcción colectiva del **Club Atlético Alvarado** (Mar del Plata): **Proyecto 1: Cerrar la Villa Deportiva (Etapa 1/4)**.

Permite a los hinchas y socios seleccionar materiales de obra esenciales (hormigón, arena, cemento, hierro del 10, hierro del 12, bloques, etc.), calcular en tiempo real el costo unitario y total, y sumar sus aportes de manera transparente para coordinar vía WhatsApp o transferencia bancaria directa (Alias oficial).

---

## 🚀 Características

- **Diseño 100% Identidad Alvarado**: Azul y blanco marplatense, tipografía moderna, badges oficiales y estética deportiva de primer nivel.
- **Sin páginas extra (Single Page Landing)**: Todo el flujo de selección, cálculo, resumen y coordinación en una sola pantalla ágil y sin fricciones.
- **Cálculo Reactivo en Tiempo Real**:
  - Nombre del material y especificación técnica
  - Precio unitario visible en Pesos Argentinos (ARS)
  - Botones intuitivos `[-]` y `[+]` con input numérico
  - **Precio total por ítem al lado del control**
  - Barra flotante inferior y Drawer interactivo de resumen
- **Materiales incluidos en Etapa 1**:
  - Hormigón Elaborado H21 (m³)
  - Arena Gruesa de Cantera (m³)
  - Cemento Portland (Bolsa 50kg)
  - Hierro del 10 (Barra 12m)
  - Hierro del 12 (Barra 12m)
  - Bloques de cemento, alambre recocido y piedra partida
- **Flujo de Donación / Aporte**:
  - Generación de mensaje automático detallado para WhatsApp
  - Copiado rápido de Alias oficial: `ALVARADO.VILLA.MP`
  - Persistencia de selección en el navegador (`localStorage`)

---

## 🛠️ Tecnologías

- **HTML5 & Vanilla JavaScript**: Cero dependencias pesadas, carga instantánea, máxima compatibilidad.
- **Tailwind CSS & Lucide Icons**: Interfaz moderna, accesible y totalmente responsiva (móviles, tablets y desktop).
- **Vercel Ready**: Archivo `vercel.json` configurado para despliegue inmediato con URLs limpias.

---

## 📦 Despliegue en GitHub y Vercel

### 1. Subir a GitHub (`alvarado-proyectos`)

Si tienes instalada la herramienta GitHub CLI (`gh`):
```bash
gh repo create alvarado-proyectos --public --source=. --remote=origin --push
```

O desde la web de GitHub:
1. Crea un repositorio nuevo en GitHub llamado `alvarado-proyectos`.
2. En tu terminal ejecuta:
   ```bash
   git add .
   git commit -m "feat: landing Alvarado Proyectos - Cerrar la Villa Deportiva"
   git remote add origin https://github.com/TU_USUARIO/alvarado-proyectos.git
   git branch -M main
   git push -u origin main
   ```

### 2. Desplegar en Vercel (`alvarado-proyectos.vercel.app`)

#### Opción A: Desde la consola con Vercel CLI
1. Abre tu terminal y ejecuta:
   ```bash
   vercel
   ```
2. Sigue las preguntas en pantalla (presiona Enter para los valores por defecto). Al pedir el nombre del proyecto, confirma `alvarado-proyectos`.
3. Para pasar a producción:
   ```bash
   vercel --prod
   ```

#### Opción B: Desde el panel web de Vercel
1. Ingresa a [vercel.com/new](https://vercel.com/new).
2. Conecta tu cuenta de GitHub e importa el repositorio `alvarado-proyectos`.
3. En **Project Name** ingresa: `alvarado-proyectos` (para obtener el dominio `alvarado-proyectos.vercel.app`).
4. Haz clic en **Deploy**. ¡Listo en 10 segundos!
