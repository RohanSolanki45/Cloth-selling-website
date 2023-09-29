const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;

  switch (action.type) {
    case "ADDITEM":
      // Check if product is already exist
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        // Increase the quantity
        const updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
        return updatedCart;
      } else {
        const updatedCart = [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
        return updatedCart;
      }
    case "DELITEM":
      const exist1 = state.find((x) => x.id === product.id);
      if (exist1.qty === 1) {
        return state.filter((x) => x.id !== exist1.id);
      } else {
        const updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
        return updatedCart;
      }
    default:
      return state;
  }
};

export default handleCart;
