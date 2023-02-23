import type {Request,  Response} from "express"
import { hashPassword } from "../utils/hash"
import { UserService } from "../service/UserService"
import formidable from "formidable"
import { Gendertype } from "../service/model"

export class UserController {
    constructor(private userService: UserService) { }

    login = async (req: Request, res: Response) => {
       console.log('hi')
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                res.status(401).json({message: "Missing email or password"})
            }
            const user = await this.userService.checkLogin(email, password);

            if (user) {
              req.session.user = { userId: user.id }
              res.status(200).json({ message: "login success", email });
              return;
            }
        }catch (err) {
            if (err instanceof Error) {
              res.status(400).json({ message: err.message });
            } else {
              res.status(400).json({ message: err });
            }
          }
    }
  logout = async (req: Request, res: Response) => {
    const userId = req.session.user?.userId as number
    try {
      const result = await this.userService.logout(userId)
      delete req.session.user;
      res.status(200).json({ message: "logout success", result: result})
    } catch (error) {
      res.status(400).json({message: "failed to logo out"})
    }
  }
  register = async (req: Request, res: Response) => {
    const email = req.body.email as string;
    const password = req.body.password as string;
    const hashedPassword = await hashPassword(password)
    const username = req.body.username as string;
    // const gender = req.body.gender as Gendertype;
    try {
      const result = await this.userService.register(email, hashedPassword, username
        // , gender
      )
      res.status(200).json({message: "register success", result: result})
    } catch (error) {
      res.status(400).json({message: "failed to register"})
    }
  }
  getProfileInfo = async (req: Request, res: Response) => { 
    const userId = req.session.user?.userId as number;
    try {
      const result = await this.userService.getProfileInfo(userId);
      res.status(200).json({ message: "success to get profile info", result: result[0] });
    } catch (error) {
      res.status(400).json({ message: "failed to get profile info" });
    }
  }
  updateUserInfo = async (req: Request, res: Response) => {
    const userInfo = req.form.fields;

    const userId = req.session.user?.userId as number;
    const password = userInfo.password as string;
    const hashedPassword = await hashPassword(password);
    const username = userInfo.username as string
    const avatar = (req.form.files["avatar"] as formidable.File)
      ?.newFilename;
    const gender = userInfo.gender as Gendertype;
    const date_of_birth = userInfo.date_of_birth as string;
    const mobile = userInfo.mobile as any as number;
    const address = userInfo.address as string;
    console.log("test update userinfo",username,mobile)
    try {
      const result = await this.userService.updateUserInfo(userId, hashedPassword, username, avatar, gender, date_of_birth, mobile, address)
      res.status(200).json({ message: "success upload profile info", result: result });
    }
    catch (error){
      console.log(error)
      res.status(400).json({ message: "failed to update user info"})
    }
    // catch (err) {
    //   if (err instanceof Error) {
    //     res.status(400).json({ message: err.message });
    //   } else {
    //     res.status(400).json({ message: err });
    //   }
    // }

  }
}