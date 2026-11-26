import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
    {
      path: '/katalog',
      name: 'catalog',
      component: () => import('./views/CatalogView.vue'),
    },
    {
      path: '/template/:slug',
      name: 'template',
      component: () => import('./views/TemplateDetailView.vue'),
      props: true,
    },
    // Route yang tidak dikenal kembali ke beranda agar tidak ada halaman kosong
    { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      // Tunggu transisi halaman selesai agar posisi section sudah final.
      return new Promise((resolve) => {
        window.setTimeout(() => resolve({ el: to.hash, top: 72, behavior: 'smooth' }), 420)
      })
    }
    // Halaman yang sama dengan query berbeda (mis. filter katalog) tidak perlu lompat.
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

export default router
