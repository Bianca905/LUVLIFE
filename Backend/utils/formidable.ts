import type { Request, Response, NextFunction } from "express";
import formidable from "formidable";
import fs from "fs";
// import path from "path";

declare global {
  namespace Express {
    export interface Request {
      form: {
        fields: formidable.Fields;
        files: formidable.Files;
      };
    }
  }
}

const uploadDir = "uploads"
fs.mkdirSync(uploadDir, { recursive: true });

const ImageuploadDir = "uploads/image"
fs.mkdirSync(ImageuploadDir, { recursive: true });
const VoiceuploadDir = "uploads/audio"
fs.mkdirSync(VoiceuploadDir, { recursive: true });

// const filterImage = ({ name,  originalFilename, mimetype}) => {
//   if (!(originalFilename && name)) return false;
//   return mimetype && mimetype.includes("image")||true;
// }
// const filterVoice = ({ name,  originalFilename, mimetype}) => {
//   if (!(originalFilename && name)) return false;
//   return mimetype && mimetype.includes("audio")||true;
// }
// const filterFunction = ({ name,  originalFilename, mimetype}) => {
//   if (!(originalFilename && name)) return false;

//   return mimetype && mimetype.includes("audio") || mimetype && mimetype.includes("image") ||true;
// }

let counter = 0;
export const Form = formidable({
  uploadDir,
  keepExtensions: true,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  filter: (part) => part.mimetype?.startsWith("image/") || part.mimetype?.startsWith("audio/") || false,
  // filter: (part) => part.mimetype?.startsWith("image/" || "audio/") || false,
  // filter: filterFunction,
  filename: (originalName, originalExt, part, form) => {
    counter++;
    let fieldName = part.name;
    console.log("check field name:",fieldName)
    let timestamp = Date.now();
    let ext = part.mimetype?.split("/").pop();
    console.log("check formidable",fieldName,timestamp,ext,part.mimetype)
    let subFolder; 
    
    {
      if (part.mimetype?.startsWith("image/")) {
        const image = "image";
        subFolder = image
      }
      // if (part.mimetype?.startsWith("audio/"))
      else {
        const audio = "audio";
        subFolder =  audio
      }
    };
    console.log("check subFolder",subFolder)
    return `${subFolder}/${fieldName}-${timestamp}-${counter}.${ext}`;
  },
});

// export const audioForm = formidable({
//   uploadDir,
//   keepExtensions: true,
//   maxFiles: 1,
//   maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
//   filter: (part) => part.mimetype?.startsWith("audio/") || false,
//   // filter: (part) => part.mimetype?.startsWith("image/" || "audio/") || false,
//   // filter: filterFunction,
//   filename: (originalName, originalExt, part, form) => {
//     counter++;
//     let fieldName = part.name;
//     let timestamp = Date.now();
//     let ext = part.mimetype?.split("/").pop();
//     return `audio/${fieldName}-${timestamp}-${counter}.${ext}`;
//   },
// });

// export const voiceForm = formidable({
//   uploadDir,
// })

export const uploadMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log("error", err);
      res.status(400).json({ message: "cannot upload file"});
      return;
    }
    req.form = { fields, files };
    console.log(files, "this is files");

    next();
  });
};
// export const uploadMiddleWareAudio = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   audioForm.parse(req, async (err, fields, files) => {
//     if (err) {
//       res.status(400).json({ message: "cannot upload file" });
//       return;
//     }
//     req.form = { fields, files };
//     console.log(files, "this is audio files");

//     next();
//   });
// };
