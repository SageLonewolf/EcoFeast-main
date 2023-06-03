// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const dateTimeSchema = new mongoose.Schema({
//   date: {
//     type: Date,
//     required: true,
//     validate: {
//       validator: function (value) {
//         // Custom validation to check if the date is in the future
//         return value > Date.now();
//       },
//       message: 'The date must be in the future',
//     },
//   },
//   time: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (value) {
//         // Custom validation to check if the time is in a valid format (HH:mm)
//         const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
//         return timeRegex.test(value);
//       },
//       message: 'The time must be in a valid format (HH:mm)',
//     },
//   },
//   // uniqueId: {
//   //   type: String,
//   //   required: true,
//   // },
// });


// const DateTimeModel = mongoose.model('DateTime', dateTimeSchema);
// module.exports = DateTimeModel;


