const { Router } = require("express");

const router = Router();

const groceryList = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 1,
  },
  {
    item: "pop-tarts",
    quantity: 3,
  },
];

router.use((req, res, next) => {
  console.log("inside groceries auth check middleware");
  console.log(req.user);
  if (req.user) next(); //kkanchi hajord middleware ,yuraqanchyur route i mejiny
  else res.send(401);
});

// router.use((req, res, next) => {
//   if (req.session.user) next(); //kkanchi hajord middleware ,yuraqanchyur route i mejiny
//   else res.send(401);
// });

//while using cookies we restore all info in client side
//but when we have sensative info , we want to restore it in server side, so we use sessions

router.get("/", (req, res, next) => {
  // res.cookie("visited", true, {
  //   maxAge: 60000,
  // });
  res.send(groceryList);
});

router.get("/:item", (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  console.log(groceryItem);
  res.send(groceryItem);
});

router.post("/", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.send(201);
});

router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;
  console.log(req.session);
  if (!cart) {
    res.send("You have no cart session");
  } else {
    res.send(cart);
  }
});
router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  // res.send(req.session)
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});

module.exports = router;
