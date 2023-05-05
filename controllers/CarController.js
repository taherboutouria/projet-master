const Car = require('../carSchema')
const cloudinary =require('../config/cloudinary')

//add a Car
//method : @post
 const AddCar = async(req,res)=>{
    try {
        //1 creating a Car and saved it in the DB
        const savedImage = await cloudinary.uploader.upload(req.files.Image.tempFilePath)
        console.log(req.files.Image.tempFilePath)

        const NewCar = await Car.create({...req.body,Image:{public_id:savedImage.public_id,imgUrl:savedImage.url }})
       res.json({NewCar, msg:'Car has been added successfully'})
    } catch (error) {
        console.log(error);
    }
} 

//get all data Cars
//method: @GET
 const getAllDataCars = async(req,res)=>{
    try {
        const Cars = await Car.find({})
        res.json(Cars)
    } catch (error) {
        console.log(error)
    }
}

//delete data Car
//method: @Delete
 const DeleteDataCar = async(req,res)=>{
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.idCar)
        res.json({msg:'Car has been deleted succ !!', deletedCar })
    } catch (error) {
        console.log(error)
    }
}

 const UpdateDataCar = async(req,res)=>{
    try {
        const updateDataCar = await Car.findByIdAndUpdate(req.params.id,req.body, {new:true})
        res.json(updateDataCar)
    } catch (error) {
        console.log(error)
    }
}

module.exports ={UpdateDataCar,DeleteDataCar,getAllDataCars,AddCar}