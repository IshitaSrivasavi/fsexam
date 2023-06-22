const prompt = require('prompt-sync')();
const { MongoClient } = require('mongodb');

class Shop {
  constructor(name, rent) {
    this.name = name;
    this.rent = rent;
  }
}

class ShoppingComplex {
  constructor(name, shops) {
    this.name = name;
    this.shops = shops;
  }

  calculateTotalRent() {
    let totalRent = 0;
    for (let shop of this.shops) {
      totalRent += shop.rent;
    }
    return totalRent;
  }
}

async function main() {
  // Get shopping complex name from user
  const complexName = prompt('Enter the name of the shopping complex: ');

  // Get the number of shops in the complex from user
  const numShops = parseInt(prompt('Enter the number of shops in the complex: '));

  const shops = [];
  for (let i = 1; i <= numShops; i++) {
    // Get shop name and rent from user
    const shopName = prompt(`Enter the name of shop ${i}: `);
    const shopRent = parseInt(prompt(`Enter the rent of shop ${i}: `));

    // Create shop instance and add it to the array
    const shop = new Shop(shopName, shopRent);
    shops.push(shop);
  }

  // Create shopping complex instance
  const shoppingComplex = new ShoppingComplex(complexName, shops);

  // Calculate total rent
  const totalRent = shoppingComplex.calculateTotalRent();

  // Print complex details
  console.log(`Shopping Complex Name: ${shoppingComplex.name}`);
  for (let shop of shoppingComplex.shops) {
    console.log(`Shop: ${shop.name}, Rent: ${shop.rent}`);
  }
  console.log(`Total Rent: ${totalRent}`);

  try {
    // Connect to MongoDB
    const url = 'mongodb+srv://ishitadsbsc22:TVqKZoFY8qdeWXVS@ishita.zvfjtxa.mongodb.net/?retryWrites=true&w=majority';
    const dbName = 'shops';
    const collectionName = 'shoprent';

    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the document into the collection
    await collection.insertOne({
      complexName: shoppingComplex.name,
      shops: shoppingComplex.shops.map((shop) => ({ name: shop.name, rent: shop.rent })),
      totalRent: totalRent
    });
    console.log('Data saved to MongoDB.');

    // Query the collection and print the data
    const queryResult = await collection.find().toArray();
    queryResult.forEach((document) => {
      console.log(`Shopping Complex Name: ${document.complexName}`);
      document.shops.forEach((shop) => {
        console.log(`Shop: ${shop.name}, Rent: ${shop.rent}`);
      });
      console.log(`Total Rent: ${document.totalRent}`);
      console.log('----------------------');
    });

    // Close the connection
    client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

main();

