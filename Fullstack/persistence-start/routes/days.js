const express = require('express');
const router = express.Router();

const Days = require('../models').Day;



// get one specific day
router.get('/:id', function(req, res, next) {
	Days.findById(req.params.id)
	.then(day => {
		// console.log(day);
		res.json(day);
	})
})


// get all days
router.get('/', function(req, res, next) {
	Days.findAll()
	.then(days => {
		res.json(days);
		// days.forEach(day => {
		// 	day.getRestaurants();
		// 	day.getActivities();
		// })
	})
})


// add a new day
router.post('/', function(req, res, next) {
	console.log(req.body)
	Days.create({ number: req.body.number }).then((dayCreated) => res.json(dayCreated))
})

// delete entire day
router.delete('/:id', function(req, res, next) {
	Days.findById(req.params.id)
	.then(day => {
		day.destroy();
		res.send("destroyed day");
	})
})


// Add a restaurant to a day
router.post('/:id/restaurants', function(req, res, next) {

})

// Remove a restaurant from a day
router.delete('/:id/restaurants/:resId', function(req, res, next) {
	
})


// Add a hotel to a day
router.post('/:id/hotels', function(req, res, next) {

})

// Remove a hotel from a day
router.delete('/:id/hotels/:hotelId', function(req, res, next) {
	
})


// Add an activity to a day
router.post('/:id/activities', function(req, res, next) {

})

// Remove an activity to a day
router.delete('/:id/activities/:actId', function(req, res, next) {
	
})



module.exports = router;