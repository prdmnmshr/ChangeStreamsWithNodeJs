const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const pipeline = [
  {
    $project: { documentKey: false }
  }
];
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology:true
}
MongoClient.connect("mongodb+srv://<pradyumnamishra>:<password>@cluster0.vteiovk.mongodb.net/sample_airbnb?retryWrites=true&w=majority")
  .then(client => {
    console.log("Connected correctly to server");
    // specify db and collections
    const db = client.db("changestream");
    const collection = db.collection("places");

    const changeStream = collection.watch(pipeline);
    // start listen to changes
    changeStream.on("change", function (change) {
      console.log(change);
    });

    // insert few data with timeout so that we can watch it happening
    setTimeout(function () {
      collection.insertOne({ "batman": "bruce wayne" }, function (err) {
        assert.ifError(err);
      });
    }, 1000);
    
    setTimeout(function () {
      collection.insertOne({ "superman": "clark kent" }, function (err) {
        assert.ifError(err);
      });
    }, 2000);
    
    setTimeout(function () {
      collection.insertOne({ "wonder-woman": "diana prince" }, function (err) {
        assert.ifError(err);
      });
    }, 3000);
    
    setTimeout(function () {
      collection.insertOne({ "ironman": "tony stark" }, function (err) {
        assert.ifError(err);
      });
    }, 4000);
    
    setTimeout(function () {
      collection.insertOne({ "spiderman": "peter parker" }, function (err) {
        assert.ifError(err);
      });
    }, 5000);
    
    // update existing document
    setTimeout(function () {
      collection.updateOne({ "ironman": "tony stark" }, { $set: { "ironman": "elon musk" } }, function (err) {
        assert.ifError(err);
      });
    }, 6000);
    
    // delete existing document
    setTimeout(function () {
      collection.deleteOne({ "spiderman": "peter parker" }, function (err) {
        assert.ifError(err);
      });
    }, 7000);
  })
  .catch(err => {
    console.error(err);
  });