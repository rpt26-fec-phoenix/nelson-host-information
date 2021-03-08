const faker = require('faker');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/airbnbHostInfo', { useNewUrlParser: true , useUnifiedTopology: true});

let db = mongoose.connection;
db.on('open', () => console.log('connected to db'))
  .on('error', () => console.log('db connection error'));

let hostSchema = new mongoose.Schema({
  hostName: String,
  dateJoined: String,
  profilePic: String,
  hostDescription: String,
  reviewCount: Number,
  isVerified: Boolean,
  isSuperhost: Boolean,
  listingID: String
});

let Host = mongoose.model('Host', hostSchema);

let seedHostDB = () => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 50; i++) {
    let newHost = new Host({
      hostName: faker.name.findName(),
      dateJoined: faker.date.month() + ' 2021',
      profilePic: 'Insert SW url here',
      hostDescription: faker.lorem.sentences(3),
      reviewCount: faker.random.number(1000),
      isVerified: faker.random.boolean(),
      isSuperhost: faker.random.boolean(),
      listingID: faker.random.number(100)
    });
    resolve(Host.create(newHost));
    reject('Error with seeding the Host DB')
    }
  });
}

let refreshHostDB = () => {
  return new Promise((resolve, reject) => {
    resolve(Reviews.deleteMany({}))
  })
}

async function runHostSeed() {
  try {
    await refreshHostDB()
    await seedHostDB()
    console.log('Host DB seeded successfully.');
  } catch (err) {
    console.log('Error with seeding DB')
  }
}

runHostSeed();
// db.host.deleteMany({});
