const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

// Shop schema
const shopSchema = new mongoose.Schema({
  name: String,
  rent: Number
});

// Shopping Complex model
const ShoppingComplex = mongoose.model('Shopping', shopSchema);

async function main() {
  const uri = 'mongodb+srv://ishitadsbsc22:TVqKZoFY8qdeWXVS@ishita.zvfjtxa.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'shopping'; // Replace with your database name

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');

    const n = parseInt(prompt("Enter the number of shops in the complex: "));

    // Create shops
    for (let i = 1; i <= n; i++) {
      console.log(`Shop ${i}:`);
      const name = prompt("Enter the name of the shop: ");
      const rent = parseFloat(prompt("Enter the rent of the shop: "));

      const shop = new ShoppingComplex({ name, rent });
      await shop.save();
    }

    // Read all shops
    const shops = await ShoppingComplex.find();
    console.log('All Shops:', shops);

    // Calculate total rent
    const totalRent = shops.reduce((sum, shop) => sum + shop.rent, 0);
    console.log(`The total rent of all shops in the shopping complex is: ${totalRent}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from the database');
  }
}

main();