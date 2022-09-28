export default function () {
  this.nuxt.hook('generate:done', (context) => {
    const allRoutes = Array.from(context.generatedRoutes)
    this.nuxt.options.sitemap.routes = allRoutes
  })
}
