import { ParentModel } from "../model/parent.js";



export const getchildData = async (req, res) => {
  const parentId = req.params.id;
  // const parentId = req.body.parentId;

  try {
    const ParentData = await ParentModel.findOne({ _id: parentId });
    if (ParentData) {
      res.status(200).json({
        status: 200,
        success: true,
        childData: ParentData.TotalPaidAmount,
      });
    } else {
      res.status(403).json({
        status: 403,
        success: false,
        message: "parent not found",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
