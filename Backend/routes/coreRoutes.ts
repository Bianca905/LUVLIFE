import express from "express";
import { coreController } from "../routes";
import { uploadMiddleWare } from "../utils/formidable";
import { isLoggedInApi } from "../utils/guard";

export const coreRoutes = express.Router();

coreRoutes.get("/getFolder", isLoggedInApi, coreController.getFolder)
coreRoutes.post("/getPurpose", isLoggedInApi, coreController.getPurpose)
coreRoutes.post("/getPurposeByPurposeId", isLoggedInApi, coreController.getPurposeByPurposeId)
coreRoutes.post("/getMilestone", isLoggedInApi, coreController.getMilestone)
coreRoutes.post("/getAttachmentBypurposeId", isLoggedInApi, coreController.getAttachmentBypurposeId)
coreRoutes.post("/getAttachmentByMilestoneId", isLoggedInApi, coreController. getAttachmentByMilestoneId)

coreRoutes.get("/getGoalItems", isLoggedInApi, coreController.getGoalItems)
coreRoutes.get("/getAllGoalItemDateRange", isLoggedInApi, coreController.getAllGoalItemDateRange)

coreRoutes.post("/insertFolder", isLoggedInApi, uploadMiddleWare, coreController.insertFolder)
coreRoutes.post("/insertPurpose", isLoggedInApi, coreController.insertPurpose)
coreRoutes.post("/insertPurposeAttachment", isLoggedInApi, uploadMiddleWare, coreController.insertPurposeAttachment)
coreRoutes.post("/insertMilestone", isLoggedInApi, coreController.insertMilestone)
coreRoutes.post("/insertMilestoneAttachment", isLoggedInApi, uploadMiddleWare, coreController.insertMilestoneAttachment)

coreRoutes.put("/updateFolder", isLoggedInApi, uploadMiddleWare, coreController.updateFolder)
coreRoutes.put("/updatePurpose", isLoggedInApi, coreController.updatePurpose)
coreRoutes.put("/updateMilestone", isLoggedInApi, coreController.updateMilestone)
coreRoutes.put("/updatePurposeAttachment", isLoggedInApi, uploadMiddleWare, coreController.updatePurposeAttachment)
coreRoutes.put("/updateMilestoneAttachment", isLoggedInApi, uploadMiddleWare, coreController.updateMilestoneAttachment)

coreRoutes.put("/deleteAttachment", isLoggedInApi, coreController.deleteAttachment)
coreRoutes.put("/deleteAttachmentByPurposeId", isLoggedInApi, coreController.deleteAttachmentByPurposeId)
// coreRoutes.put("/deleteMilestoneAttachment", isLoggedInApi, coreController.deleteMilestoneAttachment)
coreRoutes.put("/deleteMilestoneAttachmentByMilestoneId", isLoggedInApi, coreController.deleteMilestoneAttachmentByMilestoneId)
coreRoutes.put("/deleteMilestone", isLoggedInApi, coreController.deleteMilestone)
coreRoutes.put("/deleteMilestoneByPurposeId", isLoggedInApi, coreController.deleteMilestoneByPurposeId)
coreRoutes.put("/deletePurpose", isLoggedInApi, coreController.deletePurpose)
// coreRoutes.put("/deletePurposeByFolderId", isLoggedInApi, coreController.deletePurposeByFolderId)
coreRoutes.put("/deleteFolder", isLoggedInApi, coreController.deleteFolder)
coreRoutes.put("/deleteFolderByUserId", isLoggedInApi, coreController.deleteFolderByUserId)