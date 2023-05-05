//add a car and save it in the DB
const express = require('express');
const router = express.Router();

const {  DeleteDataCar, UpdateDataCar, getAllDataCars, AddCar } = require('../controllers/CarController')



const Car = require('../carSchema');

router.post(
  '/Car',AddCar)
  


    router.get('/', getAllDataCars )


router.delete('/:idCar',DeleteDataCar )

//update data user
//method : @PUT
router.put('/:id', UpdateDataCar )

    module.exports = router