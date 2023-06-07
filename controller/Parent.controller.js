import { ParentModel } from "../model/parent.js"



export const createParentData = async (req, res) => {
    console.log(req.body)
    try {
          const parentData = await ParentModel.create(req.body);

         await parentData.save();

          res
            .status(200)
            .json({ status: 200, success: true, data: parentData });
    } catch (error) {
        res.status(500).json({status: 500, success: false, message: error})
    }
    
}

// get all parent data
export const getAllParentData = async (req, res) => {
    
    try {
        const parentsData = await ParentModel.find();

        res.status(200).json({status: 200, success: true, length: parentsData.length, data: parentsData})
        
    } catch (error) {
         res.status(500).json({ status: 500, success: false, message: error });  
    }
}

export const addedInstallment = async (req, res) => {

    const { parentId, ...childData } = req.body;
  try {
   
    const ParentData = await ParentModel.findOne({_id: parentId});
// checking whether parent data is found or not
      if (ParentData) {
           let allInstallment = 0;

           ParentData.TotalPaidAmount.forEach((element) => {
             allInstallment += element.installment;
           });
          const updated  = await ParentModel.findByIdAndUpdate(parentId, {
           $addToSet: {TotalPaidAmount: childData},
            new: true
          });
          
          res.status(200).json({
            status: 200,
            success: true, 
            updateddata: ParentData
          });
      }
      else {
           res.status(200).json({
             status: 200,
             success: true,
             message: "parent not found",
           });
        
        
      }

    
  } catch (error) {
      res.status(500).json({success: false, error})
  }
};


// implemented pagination on server side
export const Pagination = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
     
    const StartIndex = (page - 1) * limit;
    const lastIndex = (page) * limit;
    
    try {
         let results = {};
         const ParentData = await ParentModel.find();
         results.totalParentData = ParentData.length;
         results.pageCount = Math.ceil(ParentData.length / limit);

         if (lastIndex < ParentData.length) {
             results.next = {
                 page: page + 1,
             }
         }
         if (StartIndex > 0) {
             results.prev = {
                 page: page - 1,
             }
         }
         results.result = ParentData.slice(StartIndex, lastIndex);

          res
            .status(200)
            .json({
              status: 200,     
              success: true,
              data: results,
            });

     } catch (error) {
        
     }
}