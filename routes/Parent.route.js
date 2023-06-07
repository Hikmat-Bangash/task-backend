import express from 'express'
import { Pagination, addedInstallment, createParentData, getAllParentData } from '../controller/Parent.controller.js';

const Route = express.Router();


Route.post('/', createParentData);
Route.get('/', getAllParentData);
Route.patch('/installment', addedInstallment);
Route.get("/pagination", Pagination);



export default Route; 


// const updated = await ComplaintModel.findByIdAndUpdate(complaintId, {
//   $addToSet: { status: status },
// });
