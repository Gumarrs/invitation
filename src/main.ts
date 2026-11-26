import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vMagnetic, vTilt } from './directives/interactions'
import './style.css'

// Aktifkan state awal animasi (elemen tersembunyi sampai GSAP mengungkapnya)
// hanya bila pengguna tidak meminta pengurangan gerakan.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion')
}

createApp(App)
  .use(router)
  .directive('magnetic', vMagnetic)
  .directive('tilt', vTilt)
  .mount('#app')
