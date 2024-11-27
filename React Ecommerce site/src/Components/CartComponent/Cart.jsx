import { useSelector } from "react-redux";
import {
  ClearCart,
  alltotal,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../../Redux/Slices/CartSlice";
import { useDispatch } from "react-redux";
import { Button, InputGroup } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartIcon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartlist = useSelector((store) => store.cart.cart);
  const total = useSelector((store) => store.cart.total);
  const isLoggedIn = useSelector((store) => store.auth?.isLoggedIn || false);

  useEffect(() => {
    dispatch(alltotal());
  }, [dispatch]);

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
    dispatch(alltotal());
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
    dispatch(alltotal());
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
    dispatch(alltotal());
  };

  const handleRemoveAll = () => {
    dispatch(ClearCart());
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return cartlist.length > 0 ? (
    <div className="container">
      <div>
        <h2 className="text-center mb-4">Your Cart</h2>
        <div className="p-2">
          {cartlist.map((item) => (
            <div
              key={item.id}
              className="d-flex justify-content-between align-items-center flex-lg-row flex-sm-column"
            >
              <div className="d-flex align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ width: "34%" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-image"
                    style={{ padding: "1.5rem" }}
                  />
                </div>
                <div
                  className="d-flex flex-column justify-content-center"
                  style={{ width: "30%" }}
                >
                  <h6>{item.title}</h6>
                  <p className="text-muted">Price: ${item.price}</p>
                </div>
              </div>
              <div
                className="d-flex align-items-center w-100 justify-content-center"
                style={{ width: "50%" }}
              >
                <InputGroup className="mb-3">
                  <Button
                    variant="light"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </Button>
                  <InputGroup.Text>{item.quantity}</InputGroup.Text>
                  <Button
                    variant="light"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </Button>
                </InputGroup>
                <div className="me-4">
                  <p>Quantity: {item.quantity}</p>
                  <p>Subtotal: ${Math.floor(item.subtotal)}</p>
                  <button
                    className="btn btn-danger fw"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h3>
          <div className="row">
            <div className="col-lg-2 ms-auto me-2 d-flex flex-column">
              <p className="me-3">
                Total: <span>${total.toFixed(2)}</span>
              </p>
              <button className="ms-4 btn btn-danger" onClick={handleRemoveAll}>
                Clear cart
              </button>
              <button
                className="ms-4 btn btn-primary mt-2"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
        </h3>
      </div>
    </div>
  ) : (
    <p className="text-center mt-4 text-danger fs-2 fw-bold">
      Your cart is empty
    </p>
  );
}

export default CartIcon;
