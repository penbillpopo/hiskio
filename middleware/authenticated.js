
export default async ({ store,route,redirect,ssrContext,app }) => {
  let token = ''
  let authenticated = false;
  const sameRoute = route.path==='/'
  if (process.client) {
    token = app.$cookies.get('accessToken')
    await store.dispatch('getInfo',token);
  }
  authenticated = store.getters.getAuthenticated;
  if (!authenticated && !sameRoute) {
    return redirect('/')
  }
}



