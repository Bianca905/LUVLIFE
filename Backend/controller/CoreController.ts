import { CoreService } from "../service/CoreService";
import type { Request, Response } from "express";
import formidable from "formidable";
import { AttachmentType, PurposeType } from "../service/model";
// import { readFile } from "fs/promises"
// import fetch from "cross-fetch"

export class CoreController{
    constructor(private coreService: CoreService) { }

    getFolder = async (req: Request, res: Response) => {
        const userId = req.session.user?.userId as number
        console.log("check user id ", userId) 
      
        try {const queryResult = await this.coreService.getFolder(userId)
            res.status(200).json({ message: "success to get folder", result: queryResult})
        } catch (error) {
            res.status(400).json({ message: "failed to get folder", error})
        }
    }
//     getPurpose = async (req: Request, res: Response) => {
//         const folderId = req.body.folder_id as number;
//         // const purposeId = req.body.id as number
//         console.log(folderId)
//         try {
//             const queryResult = await this.coreService.getPurpose(folderId)
//             res.status(200).json({ message: "success to get purpose", result: queryResult})
//         } catch (error) {
//             res.status(400).json({ message: "failed to get purpose", result:folderId
// })
//         }
//     }

    getGoalItems = async (req:Request, res:Response) => {
        const userId = req.session.user?.userId as number
        console.log("check user id ", userId) 

        try {const queryResult= await this.coreService.getGoalItems(userId)
            res.status(200).json({ message: "success to get goal items", result: queryResult})
        } catch (error) {
            res.status(400).json({ message: "failed to get goal items", error})
        }
    }

    getAllGoalItemDateRange = async (req:Request, res:Response) => {
        const userId = req.session.user?.userId as number
        console.log("check user id ", userId) 
        try {
            const queryResult = await this.coreService.getAllGoalItemDateRange(userId)
            res.status(200).json({ message: "success to get goal items date range", result: queryResult})

        } catch (error) {
            res.status(400).json({ message: "failed to get goal items date rnage", error})
        }
    }



    getPurpose = async (req: Request, res: Response) => {
        // const userId = req.session.user?.userId as number 
        console.log(req.session.user);
        
        const folderId = req.body.folder_id as number
        // const purposeId = req.body.id as number;
        // const purposeId = req.body.id as number
        // console.log(userId) // 1
        console.log(folderId) // undefined
        // console.log(purposeId)  // undefined
        try {
            const queryResult = await this.coreService.getPurpose(folderId)
            res.status(200).json({ message: "success to get purpose", result: queryResult})
        } catch (error) {
            res.status(400).json({ message: "failed to get purpose", error})
        }
    }
    getPurposeByPurposeId = async (req: Request, res: Response) => {
        const purpose_id = req.body.id as any as number
        console.log("contoller check ppurpose id", purpose_id
        );
        
        try {
            const queryResult = await this.coreService.getPurposeByPurposeId(purpose_id)
            res.status(200).json({ message: "success to get purpose by purpose id", result: queryResult})
        } catch (error) {
            res.status(400).json({ message: "failed to get purpose by purpose id", error })
            console.log(error
            );
            
        }
    }
    getMilestone = async (req: Request, res: Response) => {
        const purposeId = req.body.purpose_id as number;
        try {
            const queryResult = await this.coreService.getMilestone(purposeId)
            res.status(200).json({ message: "success to get milestone", result: queryResult})
        } catch (error) {
            res.status(400).json({ message: "failed to get milestone", error})
        }
    }
    getAttachmentBypurposeId = async (req: Request, res: Response) => {
        const purposeId = req.body.purpose_id as number
        try {
            const queryResult = await this.coreService.getAttachmentBypurposeId(purposeId)
            res.status(200).json({ message: " success to get attachment", result: queryResult})
        } catch (error) {
            res.status(400).json({ message: "failed to get attachment", error})
        }
    }
    getAttachmentByMilestoneId = async (req: Request, res: Response) => {
        const milestoneId = req.body.milestone_id as number;
        try {
            const result = await this.coreService.getAttachmentByMilestoneId(milestoneId)
            res.status(200).json({ message: " success to get attachment by milestone id", result: result })
        } catch (error) {
            res.status(400).json({ message: " failed to get attachment by milestone id", error})
        }
    }
    //////////////////////////////////////////
    
    insertFolder = async (req: Request, res: Response) => {
        const user_id = req.session.user?.userId as number;
        console.log(user_id);
        const folderInfo = req.form.fields
        console.log("folder: ",folderInfo);
        
        const name = folderInfo.name as string;
        console.log("name: ", name);
        
        const is_favourite = folderInfo.is_favourite as any as boolean;
        console.log("is_favourite: ", is_favourite);
        
        const cover_image = (req.form.files["cover_image"] as formidable.File)?.newFilename
        
        try {
            const result = await this.coreService.insertFolder(user_id, name, is_favourite, cover_image)
            res.status(200).json({ message: " success to insert folder", result:result})
        } catch (error) {
            console.log(error);
            
            res.status(400).json({ message: "failed to insert folder"})
        }
    }
    insertPurpose = async (req: Request, res: Response) => {
        const folder_id = req.body.folder_id as number;
        const type = req.body.type as PurposeType;
        const title = req.body.title as string;
        const description = req.body.description as string;
        const start_date = req.body.start_date as string;
        const start_time = req.body.start_time as string;
        const due_date = req.body.due_date as string;
        const due_time = req.body.due_time as string;
        const is_favourite = req.body.is_favourite as boolean;
        try {
            console.log(folder_id, type, title, description, start_date, start_time, due_date, due_time, is_favourite);
            
            const result = await this.coreService.insertPurpose(folder_id, type, title, description, start_date, start_time, due_date, due_time, is_favourite)
            // console.log('--------[update favourite done]')

            res.status(200).json({ message: "success to insert purpose", result: result})
        } catch (error) {
            console.log(error);
            
            res.status(400).json({ message: "failed to insert purpose", error})
        }
    }
    insertMilestone = async (req: Request, res: Response) => {
        const purpose_id = req.body.purpose_id as number;
        const title = req.body.title as string;
        const description = req.body.description as string;
        const start_date = req.body.start_date as string;
        const start_time = req.body.start_time as string;
        const due_date = req.body.due_date as string;
        const due_time = req.body.due_time as string;
        try {
            const result = await this.coreService.insertMilestone(purpose_id, title, description, start_date, start_time, due_date, due_time)
            res.status(200).json({ message: "success to insert milestone", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to insert milestone", error})
        }
    }
    insertPurposeAttachment = async (req: Request, res: Response) => {
        const purposeAttachmentInfo = req.form.fields
        console.log(purposeAttachmentInfo);
        
        const purpose_id = purposeAttachmentInfo.purpose_id as any as number;
        const type = purposeAttachmentInfo.type as AttachmentType;
        const title = purposeAttachmentInfo.title as string;
        const voice_name = purposeAttachmentInfo.voice_name as string;
        const audioFile_name = (req.form.files["audioFile_name"] as formidable.File)?.newFilename;
        const location_address = purposeAttachmentInfo.location_address as string;
        const image_name = purposeAttachmentInfo.image_name as string;
        const imageFile_name = (req.form.files["imageFile_name"] as formidable.File)?.newFilename;
        const weblink_url = purposeAttachmentInfo.weblink_url as string;
        const description = purposeAttachmentInfo.description as string;
        console.log("Controller imageFile_name",imageFile_name)
        try {
            const result = await this.coreService.insertPurposeAttachment(purpose_id, type, title, voice_name, audioFile_name, location_address, image_name, imageFile_name, weblink_url, description)
            res.status(200).json({ message: "success to insert purpose attachment", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to insert purpose attachment", error})
        }
    }
    insertMilestoneAttachment = async (req: Request, res: Response) => {
        const milestoneAttachmentInfo = req.form.fields
        const milestone_id = milestoneAttachmentInfo.milestone_id as any as number;
        const type = milestoneAttachmentInfo.type as AttachmentType;
        const title = milestoneAttachmentInfo.title as string;
        const voice_name = milestoneAttachmentInfo.voice_name as string;
        const audioFile_name = (req.form.files["audioFile_name"] as formidable.File)?.newFilename;
        const location_address = milestoneAttachmentInfo.location_address as string;
        const image_name = milestoneAttachmentInfo.image_name as string;
        const imageFile_name = (req.form.files["imageFile_name"] as formidable.File)?.newFilename;
        const weblink_url = milestoneAttachmentInfo.weblink_url as string;
        const description = milestoneAttachmentInfo.description as string;
        try {
            const result = await this.coreService.insertPurposeAttachment(milestone_id, type, title, voice_name, audioFile_name, location_address, image_name, imageFile_name, weblink_url, description)
            res.status(200).json({ message: "success to insert milestone attachment", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to insert milestone attachment", error})
        }
    }
    //////////////////////////////////////////

    updateFolder = async (req: Request, res: Response) => {
        const folderInfo = req.form.fields
        // console.log(folderInfo);
        
        const folder_id = folderInfo.id as any as number;
        // console.log("folder_id: ",folder_id);
        
        const name = folderInfo.name as string;
        // console.log("name: ",name);
        
        const is_favourite = folderInfo.is_favourite as any as boolean
        // console.log("is_favourite: ", is_favourite);
        
        const cover_image = (req.form.files["cover_image"] as formidable.File)?.newFilename
        // console.log("cover_image: ", cover_image);
        
        try {
            const queryResult = await this.coreService.updateFolder(folder_id, name, is_favourite, cover_image)
            res.status(200).json({ message: "update folder success", result: queryResult})
        } catch (error) {
            res.status(400).json({ message: "failed to update folder", error})
        }
    }
    updatePurpose = async (req: Request, res: Response) => {
        const purpose_id = req.body.id as number;
        const folder_id = req.body.folder_id as number;
        const title = req.body.title as string;
        const description = req.body.description as string;
        const start_date = req.body.start_date as string;
        const start_time = req.body.start_time as string;
        const due_date = req.body.due_date as string;
        const due_time = req.body.due_time as string;
        const finished_at = req.body.finished_at as string;
        const is_favourite = req.body.is_favourite as boolean;
        try {
            const result = await this.coreService.updatePurpose(purpose_id, folder_id, title, description, start_date, start_time, due_date, due_time, finished_at, is_favourite)
            res.status(200).json({ message: "update purpose success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to update purpose", error})
        }
    }
    updateMilestone = async (req: Request, res: Response) => {
        const milestoneId = req.body.id as number;
        const purposeId = req.body.purpose_id as number;
        const milestoneTitle = req.body.title as string;
        const description = req.body.description as string;
        const start_date = req.body.start_date as string;
        const start_time = req.body.start_time as string;
        const due_date = req.body.due_date as string;
        const due_time = req.body.due_time as string;
        const finished_at = req.body.finished_at as string;
        try {
            const result = await this.coreService.updateMilestone(milestoneId, purposeId, milestoneTitle, description, start_date, start_time, due_date, due_time, finished_at)
            res.status(200).json({ message: "update milestone success", result: result})
        } catch (error) {
            res.status(400).json({ messsage: "failed to update milestone", error})
        }
    }
    updatePurposeAttachment = async (req: Request, res: Response) => {

        const attachmentInfo = req.form.fields
        console.log("check form fields",attachmentInfo)
        
        const attachmentId = attachmentInfo.id as any as number;
        const purposeId = attachmentInfo.purpose_id as any as number;
        const attachmentTitle = attachmentInfo.title as string;
        // const voice_name = req.body.voice_name as string;
        const voice_name = attachmentInfo.voice_name as string
        const audioFile_name = (req.form.files["audioFile_name"] as formidable.File)?.newFilename;
        const location_address = attachmentInfo.location_address as string;
        const image_name = attachmentInfo.image_name as string;
        const imageFile_name = (req.form.files["imageFile_name"] as formidable.File)?.newFilename;
        const weblink_url = attachmentInfo.weblink_url as string;
        const description = attachmentInfo.description as string;
        try {
            const result = await this.coreService.updatePurposeAttachment(attachmentId, purposeId, attachmentTitle, voice_name, audioFile_name,location_address, image_name, imageFile_name,weblink_url, description)
            res.status(200).json({ message: "update purpose attachment success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to update purpose attachment", error})
        }
    }
    updateMilestoneAttachment = async (req: Request, res: Response) => {
        
        const attachmentInfo = req.form.fields
        console.log("check form fields",attachmentInfo);
        
        const attachmentId = attachmentInfo.id as any as number;
        const milestoneId = attachmentInfo.milestone_id as any as number;
        const attachmentTitle = attachmentInfo.title as string;
        // const voice_name = req.body.voice_name as string;
        const voice_name = attachmentInfo.voice_name as string
        const audioFile_name = (req.form.files["audioFile_name"] as formidable.File)?.newFilename;
        const location_address = attachmentInfo.location_address as string;
        const image_name = attachmentInfo.image_name as string;
        const imageFile_name = (req.form.files["imageFile_name"] as formidable.File)?.newFilename;
        const weblink_url = attachmentInfo.weblink_url as string;
        const description = attachmentInfo.description as string;
        try {
            const result = await this.coreService.updateMilestoneAttachment(attachmentId, milestoneId, attachmentTitle, voice_name, audioFile_name,location_address, image_name, imageFile_name,weblink_url, description)
            res.status(200).json({ message: "update milestone attachment success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to update milestone attachment", error})
        }
    }
    //////////////////////////////////////////

    deleteAttachment = async (req: Request, res: Response) => {
        const attachment_id = req.body.id as number;
        try {
            const result = await this.coreService.deleteAttachment(attachment_id)
            res.status(200).json({ message: "delete attachment success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to delete attachment", error})
        }
    }
    // deleteMilestoneAttachment = async (req: Request, res: Response) => {
    //     const milestoneAttachment_id = req.body.id as number;
    //     try {
    //         const result = await this.coreService.deleteMilestoneAttachment(milestoneAttachment_id)
    //         res.status(200).json({ message: "delete milestone attachment success", result: result})
    //     } catch (error) {
    //         res.status(400).json({ message: "failed to delete milestone attachment", error})
    //     }
    // }
    deleteMilestoneAttachmentByMilestoneId = async (req: Request, res: Response) => {
        const milestone_id = req.body.milestone_id as number;
        try {
            const result = await this.coreService.deleteMilestoneAttachmentByMilestoneId(milestone_id)
            res.status(200).json({ message: "delete milestone attachment by milestone id success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to delete milestone attachment by milestone id", error})
        }
    }
    deleteMilestone = async (req: Request, res: Response) => {
        const milestone_id = req.body.id as number;
        try {
            const result = await this.coreService.deleteMilestone(milestone_id)
            res.status(200).json({ message: "success to delete milestone", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to delete milest", error})
        }

    }
    deleteMilestoneByPurposeId = async (req: Request, res: Response) => {
        const purpose_id = req.body.purpose_id as number;
        // const milestone_id = req.body.id as number;
        try {
            const result = await this.coreService.deleteMilestoneByPurposeId(purpose_id)
            res.status(200).json({ message: "sucess to delete milestone by purpose id", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to delete milestone by purpose id", error})
        }
    }
    deleteAttachmentByPurposeId = async (req: Request, res: Response) => {
        const purpose_id = req.body.purpose_id as number;
        try {
            const result = await this.coreService.deleteAttachmentByPurposeId(purpose_id)
            res.status(200).json({ message: "delete attachment by purpose id success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to delete attachment by purpose id", error})
        }
    }
    deletePurpose = async (req: Request, res: Response) => {
        // const milestone_id = req.body.milestone_id as number;
        const purpose_id = req.body.id as number;
        try {
            const result = await this.coreService.deletePurpose(purpose_id)
            res.status(200).json({ message: "delete attachment success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to delete attachment", error})
        }
    }
    deleteFolder = async (req: Request, res: Response) => {
        const folder_id = req.body.id as number;
        // const purpose_id = req.body.purpose_id as number;
        // const milestone_id = req.body.milestone_id as number;
        try {
            const result = await this.coreService.deleteFolder(folder_id)
            res.status(200).json({ message: "delete attachment success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to delete attachment", error})
        }
    }
    deleteFolderByUserId = async (req: Request, res: Response) => {
        const user_id = req.session.user?.userId as number
        const folder_id = req.body.folder_id as number;
        // const purpose_id = req.body.purpose_id as number;
        // const milestone_id = req.body.milestone_id as number;
        try {
            const result = await this.coreService.deleteFolderByUserId(user_id, folder_id)
            res.status(200).json({ message: "delete attachment success", result: result})
        } catch (error) {
            res.status(400).json({ message: "failed to delete attachment", error})
        }
    }
    
    // deletePurposeByFolderId = async (req: Request, res: Response) => {
    //     const purpose_id = req.body.id as number;
    //     const milestone_id = req.body.milestone_id as number;
    //     const folder_id = req.body.folder_id as number;
    //     try {
    //         const result = this.coreService.deletePurposeByFolderId(purpose_id, milestone_id, folder_id)
    //         res.status(200).json({ message: " success to delete purpose by folder id", result: result})
    //     } catch (error) {
    //         res.status(400).json({ message: "failed to delete ppurpose by folder id", error})
    //     }
    // }
    //////////////////////////////////////////
}