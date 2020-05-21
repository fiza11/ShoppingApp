require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 5000;
const userRoutes = express.Router();

let User = require("./models/user");
let Consumer = require("./models/consumer");
let Vendor = require("./models/Vend");
let Seller = require("./models/seller");
let Dispatch = require("./models/dispatch");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established succesfully.");
});

userRoutes.route("/product").post(function(req, res) {
  console.log("vend det");
  console.log(req.body);
  let user = new Vendor(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ User: "product added successfully" });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});
userRoutes.route("/edited").post(function(req, res) {
  console.log("recieved");
  console.log(req);
  Seller.findOne(
    { email: req.body.name, sname: req.body.sname, sitem: req.body.item },
    function(err, person) {
      if (err) return handleError(err);
      else if (person) {
        let x = person.quan;
        console.log(x);

        Seller.updateOne(
          { email: req.body.name, sname: req.body.sname, sitem: req.body.item },
          { quan: req.body.newq },
          function(err, pes) {
            if (err) return;
            else console.log(pes.quan);
          }
        );
        Vendor.updateOne(
          { email: req.body.sname, name: req.body.item },
          { size: req.body.remain + req.body.oldq - req.body.newq },
          function(err, pes) {
            ``;
            if (err) return;
            else if (pes) {
              console.log(pes.size);
            }
          }
        );
        Seller.updateMany(
          { sname: req.body.sname, sitem: req.body.item },
          { remain: req.body.remain + req.body.oldq - req.body.newq },
          function(err, pes1) {
            if (err) return;
          }
        );
      }
    }
  );
});
userRoutes.route("/disproduct").post(function(req, res) {
  console.log(req.body.email);
  let x;
  Vendor.find({ email: req.body.email, size: 0 }, function(err, person) {
    if (err) return handleError(err);
    if (person) {
      res.status(200).json(person);
    }
  });
});
userRoutes.route("/upproduct").post(function(req, res) {
  console.log(req.body.email);
  let x;
  Vendor.findOne({ name: req.body.name, email: req.body.email }, function(
    err,
    person
  ) {
    if (err) return handleError(err);
    x = person.size;

    if (x - req.body.quan < 0) return res.status(404);

    console.log("x value");
    console.log(x);
    Vendor.updateOne(
      { email: req.body.email, name: req.body.name },
      { size: x - req.body.quan },
      function(err, res) {
        if (err) {
          console.log("invalid user");
        }
      }
    );
    return res.json(person);
  });
});
userRoutes.route("/venrat").post(function(req, res) {
  console.log("seller email");
  console.log(req.body.name);
  let x;
  Vendor.findOne({ email: req.body.name }, function(err, person) {
    if (err) return handleError(err);
    if (person) {
      x = person.count + 1;
      y = person.rating;

      console.log("x value");
      console.log(x);
      Vendor.updateMany(
        { email: req.body.name },
        { rating: (y * (x - 1) + req.body.quan) / x, count: x },
        function(err, res) {
          if (err) {
            console.log("invalid user");
          }
        }
      );
      return res.json(person);
    }
  });
});
userRoutes.route("/uprev").post(function(req, res) {
  console.log("seller email");
  console.log(req.body.name);
  Dispatch.updateOne(
    { email: req.body.name, buyer: req.body.buyer, name: req.body.item },
    { Rating: req.body.quan, review: req.body.rev },
    function(err) {
      if (err) return handleError(err);
    }
  );
});

userRoutes.route("/dispatchproduct").post(function(req, res) {
  Vendor.deleteOne({ email: req.body.email, name: req.body.name }, function(
    err
  ) {
    if (err) return handleError(err);
    else {
      Seller.find({ sname: req.body.email, sitem: req.body.name }, function(
        err,
        person
      ) {
        if (person) {
          for (let index = 0; index < person.length; index++) {
            const rd = {
              email: req.body.email,
              name: req.body.name,
              buyer: person[index].email
            };
            let user = new Dispatch(rd);
            user
              .save()
              .then(user => {
                res.status(200).json({ User: "Vendor added successfully" });
              })
              .catch(err => {
                res.status(400).send("Error");
              });
          }
        }
      });
      Seller.updateMany(
        { sname: req.body.email, sitem: req.body.name },
        { state: "Dispatched" },
        function(err) {
          if (err) return handleError(err);
        }
      );
      console.log("valid user");
      res.status(200);
    }
  });
});

userRoutes.route("/delproduct").post(function(req, res) {
  Vendor.deleteOne({ email: req.body.email, name: req.body.name }, function(
    err
  ) {
    if (err) return handleError(err);
    else {
      Seller.updateMany(
        { sname: req.body.email, sitem: req.body.name },
        { state: "invalid" },
        function(err) {
          if (err) return handleError(err);
        }
      );
      console.log("valid user");
      res.status(200);
    }
  });
});
userRoutes.route("/csrlist").post(function(req, res) {
  let user = new Seller(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ User: "Cart added successfully" });
    })
    .catch(err => {
      res.status(400).send("Error");
    });
});
userRoutes.route("/vendorlist").post(function(req, res) {
  Dispatch.find({ email: req.body.email }, function(err, person) {
    if (err) return handleError(err);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(200).json({ firstName: "Invalid Credentials" });
    }
  });
});
userRoutes.route("/userlist").post(function(req, res) {
  Seller.find({ email: req.body.email }, function(err, person) {
    if (err) return handleError(err);
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(200).json({ firstName: "Invalid Credentials" });
    }
  });
});

userRoutes.route("/upuserlist").post(function(req, res) {
  Seller.find({ email: req.body.email }, "_id sname sitem quan state", function(
    err,
    person
  ) {
    if (err) return handleError(err);
    if (person) {
      console.log("getting res lenght");
      console.log(person.length);
      for (let index = 0; index < person.length; index++) {
        Vendor.findOne(
          { email: person[index].sname, name: person[index].sitem },
          function(err, user) {
            if (err) return handleError(err);
            else if (user) {
              if (user.size === 0) {
                Seller.updateMany(
                  {
                    sname: user.email,
                    sitem: user.name,
                    state: { $ne: "invalid" }
                  },
                  { state: "Placed", remain: 0 },
                  function(err, res) {
                    if (err) return handleError(err);
                  }
                );
              } else {
                Seller.updateMany(
                  {
                    sname: user.email,
                    sitem: user.name,
                    state: { $ne: "invalid" }
                  },
                  { remain: user.size },
                  function(err, res) {
                    if (err) return handleError(err);
                  }
                );
              }
            }
          }
        );
      }
      res.status(200).json(person);
    } else {
      res.status(200).json({ firstName: "Invalid Credentials" });
    }
  });
});
userRoutes.route("/srlist").post(function(req, res) {
  console.log("logging in");
  console.log(req.body.name);
  Vendor.find({ name: req.body.name, size: { $ne: 0 } }, function(err, person) {
    console.log("querying db");
    console.log(person);
    if (err) return handleError(err);
    if (person) {
      console.log("valid user");
      res.status(200).json(person);
    } else {
      console.log("user not found");
      res.status(200).json({ firstName: "Invalid Credentials" });
    }
  });
});
userRoutes.route("/ssrlist").post(function(req, res) {
  console.log("logging in");
  console.log(req.body.name);
  Vendor.find({ size: { $ne: 0 } }, function(err, person) {
    console.log("querying db");
    console.log(person);
    if (err) return handleError(err);
    if (person) {
      console.log("valid user");
      res.status(200).json(person);
    } else {
      console.log("user not found");
      res.status(200).json({ firstName: "Invalid Credentials" });
    }
  });
});

userRoutes.route("/prlist").post(function(req, res) {
  console.log("logging in");
  console.log(req.body.email);
  Vendor.find(
    { email: req.body.email, size: { $ne: 0 } },
    "_id name size price",
    function(err, person) {
      console.log("querying db");
      console.log(person);
      if (err) return handleError(err);
      if (person) {
        console.log("valid user");
        res.status(200).json(person);
      } else {
        console.log("user not found");
        // res.set('Content-Type', 'json')
        res.status(200).json({ firstName: "Invalid Credentials" });
      }
    }
  );
});

userRoutes.route("/login").post(function(req, res) {
  console.log("logging in");
  let user = Consumer(req.body);
  console.log(req.body.email);
  console.log(req.body.password);
  Consumer.findOne(
    { email: req.body.email, password: req.body.password, type: req.body.type },
    "_id type email",
    function(err, person) {
      console.log("querying db");
      console.log(person);
      if (err) return handleError(err);
      if (person) {
        console.log("valid user");
        res.status(200).json(person);
      } else {
        console.log("user not found");
        // res.set('Content-Type', 'json')
        res.status(200).json({ firstName: "Invalid Credentials" });
      }
    }
  );
});

userRoutes.route("/add").post(function(req, res) {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ User: "Vendor added successfully" });
    })
    .catch(err => {
      res.status(200).json({ error: "Error" });
    });
});

app.use("/", userRoutes);
app.listen(PORT, function() {
  console.log("Server is running on port: " + PORT);
});
