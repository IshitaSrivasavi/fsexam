const prompt = require('prompt-sync')();

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

function promptUser(question) {
  return prompt(question);
}

async function main() {
  // Get shopping complex name from user
  const complexName = promptUser('Enter the name of the shopping complex: ');

  // Get the number of shops in the complex from user
  const numShops = parseInt(promptUser('Enter the number of shops in the complex: '));

  const shops = [];
  for (let i = 1; i <= numShops; i++) {
    // Get shop name and rent from user
    const shopName = promptUser(`Enter the name of shop ${i}: `);
    const shopRent = parseInt(promptUser(`Enter the rent of shop ${i}: `));

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

  // Prepare the document to be inserted
  const document = {
    complexName: shoppingComplex.name,
    shops: shoppingComplex.shops.map((shop) => ({ name: shop.name, rent: shop.rent })),
    totalRent: totalRent
  };
}

main();
