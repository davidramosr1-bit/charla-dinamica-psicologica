# Charla Psicológica — Ansiedad y Depresión

Aplicación interactiva para charlas psicológicas sobre ansiedad y depresión.

**Psic. Andrea Moys de Alfaro & Psic. Keren de Alvarenga**

---

## Características

- **Presentación interactiva** con 12 diapositivas navegables (teclado o botones)
- **Quiz dinámico** — 8 escenarios para clasificar entre tristeza, depresión o ansiedad
- **Casos anónimos** — participantes envían experiencias desde sus celulares
- **Vista en vivo** — las psicólogas ven casos en tiempo real con marcado de leído
- **Acceso protegido** — contraseña para modo expositora
- **Responsive** — funciona en laptop (proyección) y celulares (participantes)

---

## Despliegue en Vercel

### Paso 1: Subir a GitHub

```bash
cd charla-psicologica
git init
git add .
git commit -m "Charla psicológica - versión inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/charla-psicologica.git
git push -u origin main
```

### Paso 2: Conectar en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub
2. Clic en **"Add New Project"**
3. Importa el repositorio `charla-psicologica`
4. Vercel detectará automáticamente que es un proyecto Next.js
5. Clic en **"Deploy"**

### Paso 3: Configurar Upstash Redis (base de datos para casos)

1. En tu proyecto de Vercel, ve a la pestaña **"Storage"**
2. Clic en **"Upstash"**
3. Selecciona **"Redis"** → ponle nombre (ej: `charla-kv`)
4. Selecciona la región más cercana (Americas si está disponible)
5. Clic en **"Create"**
6. Upstash conectará automáticamente las variables de entorno
7. Ve a **"Settings" → "Environment Variables"** y verifica que estén:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
8. **Redespliega** el proyecto: ve a "Deployments" → clic en los 3 puntos del último deploy → "Redeploy"

### Paso 4: ¡Listo!

Tu app estará disponible en `https://charla-psicologica.vercel.app` (o el dominio que Vercel asigne).

---

## Uso durante la charla

### Para las psicólogas (expositoras)
1. Abrir la URL en el navegador de la laptop
2. Seleccionar **"Soy expositora"**
3. Ingresar contraseña: `salud2026`
4. Navegar con flechas del teclado o botones en pantalla
5. En la sección de casos: pestaña **"Ver casos recibidos"** para ver en vivo

### Para los participantes
1. Abrir la URL en el navegador del celular (no necesitan cuenta ni app)
2. Seleccionar **"Soy participante"**
3. Escribir su experiencia y enviar — completamente anónimo

---

## Cambiar la contraseña

Edita el archivo `app/data.js`, línea final:

```js
export const PRESENTER_PASSWORD = "tu-nueva-contraseña";
```

Haz commit y push — Vercel redesplegará automáticamente.

---

## Desarrollo local

```bash
npm install
npm run dev
```

Nota: Para desarrollo local necesitarás un archivo `.env.local` con las variables de Vercel KV.
Puedes obtenerlas con: `vercel env pull .env.local`

---

## Estructura del proyecto

```
charla-psicologica/
├── app/
│   ├── api/cases/route.js    # API serverless para casos anónimos
│   ├── components/
│   │   ├── CasesSlide.js     # Formulario y vista de casos
│   │   ├── QuizSlide.js      # Quiz interactivo
│   │   ├── RoleSelection.js  # Pantalla de selección de rol
│   │   └── Slides.js         # Todos los tipos de diapositivas
│   ├── data.js               # Datos de slides, quiz y configuración
│   ├── globals.css            # Estilos globales
│   ├── layout.js              # Layout raíz
│   └── page.js                # Página principal con routing de roles
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```
