
export const Remap = (store, router) => {
  if (store.state.api.isAuth === false) {
    router.push("/auth")
  }
  else {
    return;
  }
}

export const CheckAdmin = (isAdmin, router) => {
  if (isAdmin === false) {
    router.push("/")
  }
}

