const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const insertDocument = require('./operations').insertDocument;
const findDocuments = require('./operations').findDocuments;
const removeDocument = require('./operations').removeDocument;
const updateDocument = require('./operations').updateDocument;

const url = 'mongodb://localhost:27017';
const dbname = 'confusion';


MongoClient.connect(url)
.then((client) => {
    console.log('Connected correctly to server');
    const confusion = client.db(dbname);
    insertDocument(confusion, { name: "Vadonut", description: "Test"}, "dishes")
    .then((result) =>{
        console.log("Insert Document:\n", result.ops);
        return findDocuments(confusion, "dishes");
    })
    .then((docs) => {
        console.log("Found Documents:\n", docs);
        return updateDocument(confusion,  { name: "Vadonut" }, { description: "Updated Test" }, "dishes");
    })
    .then((result) => {
        console.log("Updated document:\n", result.result);
        return findDocuments(confusion, "dishes");
    })
    .then((docs) => {
        console.log("Found Documents:\n", docs);
        return confusion.dropCollection("dishes")
    })
    .then((result) => {
        console.log("Dropped Collection:", result);
        return client.close();
    })
    .catch((err)=> {
        console.log(err);
    })
    
})
.catch((err)=> console.log(err));

// MongoClient.connect(url, (err, client) => {
//     assert.strictEqual(err, null);
//     console.log('conneted correctly to server');

//     const db = client.db(dbname);

//     insertDocument(db, {name:"Vardonut", description: "Test"}, "dishes", (result) => {
//         console.log("Inserted Document \n", result.ops);

//         findDocuments(db, "dishes", (docs) =>{
//             console.log("Found Documents", docs);

//             updateDocument(db, {name: "Vadonut"}, {description:"Updated Test"}, "dishes", (result) => {
//                 console.log("Updated Document \n", result.result);

//                 findDocuments(db, "dishes", (docs) => {
//                     console.log("Found Updated Documents \n", docs);

//                     db.dropCollection("dishes", (result) => {
//                         console.log("Droped Collection \n", result);

//                         client.close();
//                     });
//                 });
//             });

//         });
//     });
// }); 