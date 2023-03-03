const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: "Whole Foods",
    miles: 0.6,
  },
  {
    id: 2,
    store: "Trader Joes",
    miles: 2.5,
  },
  {
    id: 3,
    store: "Albertsons",
    miles: 2.8,
  },
  {
    id: 4,
    store: "Nor Zovk",
    miles: 3.5,
  },
  {
    id: 5,
    store: "Albertsons",
    miles: 1.8,
  },
];

router.use((req, res, next) => {
  if (req.session.user)
    next(); //kkanchi hajord middleware ,yuraqanchyur route i mejiny
  else res.send(401);
});

router.get("", (req, res) => {
  console.log(req.query);
  const { miles } = req.query;
  const parsedMiles = parseInt(miles);
  if (!isNaN(parsedMiles)) {
    const filteredStores = supermarkets.filter((s) => s.miles <= parsedMiles);
    res.send(filteredStores);
  } else {
    res.send(supermarkets);
  }
});

module.exports = router;
