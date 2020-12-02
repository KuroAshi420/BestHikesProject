const express = require("express");
const cors = require("cors");
const passport = require("passport");
const fileUpload = require('express-fileupload');
const app = express();
const connectDB=require('./config/connectDB')
const stripe = require("stripe")("sk_test_51HpGOPLS3K6Zu9OJ93NrxInXzejYV18vOWO4b7cAzRhl7BRHNy18g93timMdKzKyBwomWERmPQ2lZXLqZDLJw5RZ009TsYtK7W");
const uuid = require("uuid");
const http = require('http').createServer(app)
// Middlewares
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Passport Configuration
require("./middleware/passport")(passport);

//connectDB (config)
connectDB();
// test upload ...

const morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(
//     bodyParser.urlencoded({
//       extended: true
//     })
// );
  
app.use(cors());

app.use('/api', require('./routes/category.route'));
// fin upload




// localhost:5000/users/add_user
// localhost:5000/events/add
app.use("/events", require("./routes/event"));
// app.use("/participantss", require("./routes/participant"));
app.use("/users", require("./routes/user"));
app.use("/advices", require("./routes/advice"));
app.use("/materiel", require("./routes/materiel.route"));
// app.use('/comment', require('./routes/comment'));
// app.use('/publication', require('./routes/publication'));
app.use("/admin", require("./routes/admin"));

const Publication = require('./models/category.model')
const Event = require("./models/Event");
const io = require('socket.io')(http)
io.on('connection', socket => {
  socket.on('post', (post) => {
      try {
        Event.findOneAndUpdate({ _id: post._id }, post, { new: true })
          .populate("writer")
          .exec((err, post) => {
            return io.emit('post', post)
          })
      } catch (error) {
        console.error(error);
      }
  })
})

io.on('connection', socket => {
  console.log("pubbbb")
  socket.on('postpub', (post) => {
      try {
        Publication.findOneAndUpdate({ _id: post._id }, post, { new: true })
          .populate("writer")
          .exec((err, post) => {
            return io.emit('postpub', post)
          })
      } catch (error) {
        console.error(error);
      }
  })
})

//payement
app.get("/", (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { priceTopay, token , eventTitle } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: priceTopay,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${eventTitle}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

// app.use(fileUpload());

// // Upload Endpoint
// app.post('/upload', (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }

//   const file = req.files.file;

//   file.mv(`${__dirname}/uploads/${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });
http.listen(4000, function () {
  console.log('listening on port 4000')
})
//run server
const port = process.env.PORT || 5000;
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`Server connected on port ${port} ...`)
);
