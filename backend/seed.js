import mongoose from "mongoose";
import foodModel from "./models/FoodModel.js";
import categoryModel from "./models/categoryModel.js";
import settingsModel from "./models/settingsModel.js";
import "dotenv/config";

const dummyCategories = [
    { name: "Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" },
    { name: "Pasta", image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=800&q=80" },
    { name: "Desserts", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80" },
    { name: "Burgers", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
    { name: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80" }
];

const dummyFoods = [
    // SALAD
    {
        name: "Caesar Salad",
        image: ["https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80"],
        price: 14, description: "Crisp romaine, parmesan, and garlic croutons with creamy Caesar dressing.", category: "Salad"
    },
    {
        name: "Berry Nut Salad",
        image: ["https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"],
        price: 13, description: "Fresh mixed greens with seasonal berries, walnuts, and goat cheese.", category: "Salad"
    },
    {
        name: "Avocado Garden Salad",
        image: ["https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=800&q=80"],
        price: 16, description: "Creamy avocado slices with cherry tomatoes, radish, and lime dressing.", category: "Salad"
    },

    // PASTA
    {
        name: "Spicy Arrabbiata",
        image: ["https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80"],
        price: 18, description: "Penne pasta in a fiery tomato sauce with garlic and chili flakes.", category: "Pasta"
    },
    {
        name: "Pesto Genovese",
        image: ["https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=800&q=80"],
        price: 20, description: "Spaghetti with fresh basil pesto, toasted pine nuts, and parmesan.", category: "Pasta"
    },
    {
        name: "Baked Penne Mozzarella",
        image: ["https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80"],
        price: 21, description: "Oven-baked penne with rich marinara sauce and a layer of golden mozzarella.", category: "Pasta"
    },

    // DESSERTS
    {
        name: "Belgian Chocolate Cake",
        image: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"],
        price: 15, description: "Dense and moist chocolate cake with a molten center.", category: "Desserts"
    },
    {
        name: "Classic Tiramisu",
        image: ["https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80"],
        price: 12, description: "Italian classic with coffee-soaked ladyfingers and mascarpone cream.", category: "Desserts"
    },
    {
        name: "Strawberry Cheesecake",
        image: ["https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80"],
        price: 14, description: "Creamy New York style cheesecake topped with glaze and fresh berries.", category: "Desserts"
    },
    {
        name: "Warm Fudge Brownie",
        image: ["https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&q=80"],
        price: 9, description: "Fudgy chocolate brownie served with a scoop of vanilla ice cream.", category: "Desserts"
    },
    {
        name: "Macaroon Selection",
        image: ["https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80"],
        price: 18, description: "A box of six artisanal French macaroons in assorted delicate flavors.", category: "Desserts"
    },

    // BURGERS
    {
        name: "Wagyu Signature Burger",
        image: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80"],
        price: 19, description: "Wagyu beef, aged cheddar, and secret sauce on a toasted brioche bun.", category: "Burgers"
    },
    {
        name: "Bacon BBQ Stack",
        image: ["https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80"],
        price: 17, description: "Beef patty with honey bacon, crispy onion rings, and smoky BBQ sauce.", category: "Burgers"
    },
    {
        name: "Garden Veggie Melt",
        image: ["https://images.unsplash.com/photo-1512152272829-e3139592d56f?w=800&q=80"],
        price: 13, description: "Plant-based patty with portobello mushrooms and swiss cheese.", category: "Burgers"
    },

    // SUSHI
    {
        name: "Rainbow Roll Set",
        image: ["https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80"],
        price: 22, description: "California roll topped with tuna, salmon, yellowtail, and avocado.", category: "Sushi"
    },
    {
        name: "Spicy Tuna Crunch",
        image: ["https://images.unsplash.com/photo-1558985250-27a406d64cb3?w=800&q=80"],
        price: 16, description: "Tuna and cucumber roll topped with spicy mayo and tempura flakes.", category: "Sushi"
    },
    {
        name: "Dragon Tempura Roll",
        image: ["https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80"],
        price: 24, description: "Eel and cucumber roll inside, topped with avocado and eel sauce.", category: "Sushi"
    },
    {
        name: "Nigiri Master Set",
        image: ["https://images.unsplash.com/photo-1563612116625-3012372fccce?w=800&q=80"],
        price: 26, description: "Chef's daily selection of ten seasonal nigiri pieces.", category: "Sushi"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB...");

        // Clear existing
        await foodModel.deleteMany({});
        await categoryModel.deleteMany({});
        console.log("Cleared old data.");

        // Seed Categories
        await categoryModel.insertMany(dummyCategories);
        console.log("Categories seeded!");

        // Seed Foods
        await foodModel.insertMany(dummyFoods);
        console.log("Foods seeded!");

        // Reset Settings to ensure social icons have valid targets
        const settings = await settingsModel.findOne({});
        const defaultSettings = {
            phone: "+1-212-456-7890",
            email: "contact@mentesdelivery.com",
            facebook: "https://facebook.com",
            twitter: "https://twitter.com",
            linkedin: "https://linkedin.com",
            instagram: "https://instagram.com",
            youtube: "https://youtube.com",
            tiktok: "https://tiktok.com",
            telegram: "https://t.me",
            address: "123 Foodie Street, Gourmet City",
            aboutContent: "Mente's Delivery is your favorite food delivery partner, providing fresh and delicious meals from top restaurants right to your doorstep."
        };

        if (settings) {
            await settingsModel.updateOne({}, { $set: defaultSettings });
            console.log("Settings updated with social links!");
        } else {
            await settingsModel.create(defaultSettings);
            console.log("Default settings created!");
        }

        console.log("Seeding completed successfully.");
        process.exit();
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedDB();
