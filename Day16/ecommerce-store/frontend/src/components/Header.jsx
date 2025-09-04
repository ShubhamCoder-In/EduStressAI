const { cart } = useCart();

<Link to="/cart" style={{ color: "#fff", textDecoration: "none" }}>
  Cart ({cart.length})
</Link>