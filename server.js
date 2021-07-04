let express = require('express');
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient
let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.set('view engine', 'ejs');

connectionString = "mongodb+srv://product:propass@cluster0.pphx6.mongodb.net/product?retryWrites=true&w=majority";

MongoClient.connect(connectionString, {useUnifiedTopology: true})
  .then(client => {

  const db = client.db("product");

    app.get('/', (req, res) => {
      db.collection("pdetails").find().toArray()
        .then(results => {
          res.render("index", {
            pdetails: results
          });
        });
    });

    app.post('/filter', (req, res) => {
      var request = req.body;
      db.collection("pdetails").find().toArray()
        .then(results => {
          if(request.price === "pval")
          {
            results.sort((a, b) => {
              return parseFloat(a.price) - parseFloat(b.price);
            });
          }
          res.render("index", {
            pdetails: results
          });
        })
    });

    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  })
  .catch(error => console.error(error));
