
export default async ({ store,route,redirect,app }) => {
  let token = ''
  let authenticated = store.getters.getAuthenticated;
  const sameRoute = route.path==='/'
  if (process.client) {
    token = app.$cookies.get('accessToken')
    await store.dispatch('getInfo',token);
  }
  if (!authenticated && !sameRoute) {
    return redirect('/')
  }
}



