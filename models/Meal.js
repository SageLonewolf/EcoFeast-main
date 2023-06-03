const mongoose = require('mongoose');
const dateSchema = require("./date");

const MealSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  menu: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
 // date: [dateSchema],
});

const Meal = mongoose.model("Meal", MealSchema);
module.exports=  { Meal, MealSchema };