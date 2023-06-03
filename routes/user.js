const express = require("express");
const userRouter = express.Router();
const bodyParser = require("body-parser");
//const User = require("../middlewares/auth");
const { user }= require("../models/user");
const { Meal }= require("../models/Meal");
const { PromiseProvider } = require("mongoose");


userRouter.get("/user/see-meal/breakfast", async (req, res) => {
    try {
        const name = "br";
        const User = await user.find({name});
        //Date is missing
        res.json(User);
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });
userRouter.get("/user/see-meal/lunch", async (req, res) => {
        try {
            const name = "lh";
            //Date is missing
            const User = await user.find({name});
            res.json(User);
          } catch (e) {
            res.status(500).json({ error: e.message });
          }
        });

 userRouter.get("/user/see-meal/dinner", async (req, res) => {
        try {
             const name = "dn";
             //Date is missing
            const User = await user.find({name});
            res.json(User);
          } catch (e) {
           res.status(500).json({ error: e.message });
          }
        });

        
userRouter.put("/user/see-meal/choice", async (req, res) => {
            try {
                // Get the meal ID from the request body or query parameters
                const { name , category } = req.body;
        
                // Find the meal by its ID
                const meal = await Meal.findById({name, category});
        
                if (!meal) {
                    return res.status(404).json({ error: "Meal not found" });
                }
        
                // Subtract 1 from the num_eater field
                meal.num_eater -= 1;
        
                // Save the updated meal
                await meal.save();
        
                res.json({ message: "Meal updated successfully" });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        
module.exports = userRouter;