const express = require("express");
const adminRouter = express.Router();
const bodyParser = require("body-parser");
const admin = require("../middlewares/admin");
const { Meal }= require("../models/Meal");
//const Order = require("../models/order");
const { PromiseProvider } = require("mongoose");

// Add meal
adminRouter.post("/admin/add-meal", async (req, res) => {
  try {
    const { name, menu, category } = req.body;
    let meal = new Meal({
      name,
      menu,
      category,
    });
    meal = await meal.save();
    res.json(meal);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all your products
// adminRouter.get("/get-meals", async (req, res) => {
//   try {
//     const meals = await Meal.find({});
//     res.json(meals);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

adminRouter.post("/admin/get-meals", async (req, res) => {
  try {
    const{ name } = req.body;
    const meals = await Meal.find({name});
    res.json(meals);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete the meal
adminRouter.post("/admin/delete-meal", async (req, res) => {
  try {
    const { id } = req.body;
    let meal = await Meal.findByIdAndDelete(id);
    res.json(meal);
    console.log("deletes");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// adminRouter.get("/admin/get-orders", admin, async (req, res) => {
//   try {
//     const orders = await Order.find({});
//     res.json(orders);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

adminRouter.get("/admin/analytics", admin, async (req, res) => {
  try {
    
    // CATEGORY WISE ORDER FETCHING
    let breakfast_no = await fetchCategoryWiseProduct("Breakfast");
    let lunch_no = await fetchCategoryWiseProduct("Lunch");
    let snack_no = await fetchCategoryWiseProduct("Snack");
    let dinner_no = await fetchCategoryWiseProduct("Dinner");

    let number_of_studnets = {
      breakfast_no,
      lunch_no,
      snack_no,
      dinner_no
    };

    res.json(earnings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;