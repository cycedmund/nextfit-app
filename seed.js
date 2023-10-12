require("dotenv").config();
const mongoose = require("mongoose");
const Wardrobe = require("./models/wardrobeModel");
const User = require("./models/userModel");
const debug = require("debug")("nextfit:config:database");
const jwt = require("jsonwebtoken");

mongoose.set("debug", true);
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("connected", function () {
  debug(`Connected to ${db.name} at ${db.host}:${db.port}`);
});

const adminUser = {
  email: "admin@gmail.com",
  username: "admin",
  password: "password",
};

const initialWardrobe = [
  {
    mainCategory: "Top",
    subCategory: "T-shirt",
    fit: "Regular",
    wornFrequency: 2,
    imageURL:
      "https://nextfit-project.s3.ap-southeast-1.amazonaws.com/0a8e-0a8e-sweatshirt.jpeg",
  },
  {
    mainCategory: "Bottom",
    subCategory: "Pants",
    fit: "Regular",
    wornFrequency: 3,
    imageURL:
      "https://nextfit-project.s3.ap-southeast-1.amazonaws.com/048f-048f-black-trousers.jpeg",
  },
];

const seedUser = async () => {
  try {
    // const hashedPassword = await bcrypt.hash(adminUser.password, 6);
    // adminUser.password = hashedPassword;
    await User.deleteOne({ username: adminUser.username });
    const createUser = await User.create(adminUser);
    debug("User seeded:", createUser);
    const token = jwt.sign({ id: createUser._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    return { userId: createUser._id, token };
  } catch (error) {
    debug("Error seeding user:", error);
  }
};

const seedWardrobe = async (userId, token) => {
  try {
    await Wardrobe.deleteMany();

    const updatedWardrobe = initialWardrobe.map((apparel) => ({
      ...apparel,
      user: userId,
    }));

    const createWardrobe = await Wardrobe.insertMany(updatedWardrobe);
    debug("Database seeded:", createWardrobe);

    return token;
  } catch (error) {
    debug("Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedUser().then((result) => {
  if (result) {
    const { userId, token } = result;
    seedWardrobe(userId, token);
  }
});
