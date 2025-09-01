# 🔐 Vulnerable App – Aplicación Web para Pruebas de Seguridad

**Vulnerable App** es una aplicación web creada con fines **educativos y de investigación**.  
Su objetivo es simular vulnerabilidades comunes en aplicaciones web para facilitar el **aprendizaje en ciberseguridad** y la práctica con distintas herramientas de análisis.

[![Repo](https://img.shields.io/badge/GitHub-TodTete-blue?logo=github)](https://github.com/TodTete/Vunerable-App-Web/tree/main)
[![Status](https://img.shields.io/badge/status-experimental-orange)](#estado)
[![Security](https://img.shields.io/badge/security-intentionally%20vulnerable-red)](#advertencia)

---

## 🚨 Advertencia

⚠️ **IMPORTANTE:**  
Esta aplicación contiene múltiples vulnerabilidades **intencionales**.  
Está diseñada **únicamente** para:

- Prácticas de seguridad en entornos **locales**.  
- Laboratorios de enseñanza y **CTFs**.  
- Evaluación de herramientas de análisis (SAST, DAST, IAST, RASP).  

❌ **No debe usarse en producción ni desplegarse en servidores públicos.**  

---

## 🧩 Vulnerabilidades incluidas

- 🔓 **Fuerza bruta**  
- 💉 **Cross-Site Scripting (XSS)**  
- 🧬 **Cross-Site Request Forgery (CSRF)**  
- 🛑 **Inyecciones SQL y otras variantes**  
- 🚪 Sesiones inseguras y almacenamiento deficiente  

---

## 📖 Objetivo académico

El proyecto busca facilitar el aprendizaje en:

- 🧬 **SAST** (Static Application Security Testing)  
- 🧪 **DAST** (Dynamic Application Security Testing)  
- 🧠 **IAST** (Interactive Application Security Testing)  
- 🛡️ **RASP** (Runtime Application Self-Protection)  

Permite comprender cómo se originan, explotan y mitigan las vulnerabilidades más comunes en entornos web modernos.

---

## 🧱 Tecnologías utilizadas

- ⚛️ **Next.js** – Framework React con SSR  
- 🎨 **TailwindCSS** – Estilos responsivos y rápidos  
- 🗄️ **MySQL** – Base de datos relacional  
- 🔐 **OWASP Principles** – Referencia de vulnerabilidades  

---

## 📂 Estructura del proyecto

```

Vunerable-App-Web/
├─ app/             # Rutas y páginas (Next.js App Router)
├─ components/      # Componentes reutilizables
├─ hooks/           # Hooks personalizados
├─ lib/             # Funciones auxiliares
├─ public/          # Recursos estáticos
├─ styles/          # Estilos globales
├─ db-setup.sql     # Script para inicializar la BD
├─ next.config.mjs  # Configuración de Next.js
├─ package.json     # Dependencias y scripts
├─ tailwind.config.ts
└─ tsconfig.json    # Configuración de TypeScript

````

---

## ⚙️ Requisitos previos

- **Node.js** (v18+)  
- **MySQL Server**  
- Entorno local seguro (Docker opcional)  

---

## 🚀 Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TodTete/Vunerable-App-Web.git
   cd Vunerable-App-Web

2. Instala dependencias:

   ```bash
   npm install
   ```
3. Configura la base de datos:

   * Crea una BD en MySQL.
   * Importa el script:

     ```bash
     mysql -u usuario -p nombre_bd < db-setup.sql
     ```
   * Ajusta credenciales en tu configuración (`lib/db.js` o similar).
4. Ejecuta en modo desarrollo:

   ```bash
   npm run dev
   ```
5. Abre en tu navegador:
   👉 `http://localhost:3000`

---

## 🔬 Casos de prueba sugeridos

* Intentar **inyección SQL** en formularios de login.
* Ejecutar **XSS reflejado** en inputs de búsqueda.
* Probar fuerza bruta con herramientas como **Hydra** o **Burp Suite Intruder**.
* Realizar ataques CSRF con formularios externos.

---

## 📜 Licencia

Este proyecto está destinado a **fines educativos y de investigación**.
El uso indebido en sistemas no autorizados es **responsabilidad exclusiva del usuario**.

---

👤 Autor: **Ricardo Vallejo**
🔗 [Repositorio oficial](https://github.com/TodTete/Vunerable-App-Web/tree/main)

