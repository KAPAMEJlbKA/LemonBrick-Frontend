
export const Remap = (store, router) => {
  if (store.state.api.isAuth === false) {
    router.push("/auth")
  }
  else
  {
    return;
  }
}

