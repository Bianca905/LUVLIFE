import type { Knex } from "knex";
import { table } from "../utils/table";
import {
  Attachment,
  AttachmentType,
  Folder,
  Milestone,
  Purpose,
  PurposeType,
} from "./model";

export class CoreService {
  constructor(private knex: Knex) {}

  async getFolder(user_id: number) {
    const queryResult = await this.knex(table.FOLDER)
      .select<Folder[]>("*")
      .where("user_id", user_id)
      .returning("id");
    return queryResult;
  }
  async getPurpose(folder_id: number) {
    const queryResult = await this.knex(table.PURPOSE)
      .select<Purpose[]>("*")
      .where("folder_id", folder_id)
      .where("is_delete", false)
      .returning("id");
    // .where("id", purpose_id)
    return queryResult;
  }

  async getGoalItems(user_id: number) {
    try {
      const queryResult = await this.knex.raw(
        "select purposes.id, folders.id as folder_id,type,title,description,start_date,start_time,due_date,due_time,purposes.is_favourite from folders join purposes on folders.id=purposes.folder_id where user_id = ? and purposes.type='setGoal'",
        user_id
      );
      return queryResult.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllGoalItemDateRange(user_id:number) {
    try {
      const queryResult = await this.knex.raw(
        "select purposes.id ,folders.id as folder_id,type,start_date,due_date from folders join purposes on folders.id=purposes.folder_id where user_id = ? and purposes.type='setGoal'",
        user_id
      );
      return queryResult.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async getPurposeByPurposeId(purpose_id: number) {
    const queryResult = await this.knex(table.PURPOSE)
    .select<Purpose>("*")
    .where("id", purpose_id)
      .returning("id")
    return queryResult
  }
  async getMilestone(purpose_id: number) {
    const queryResult = await this.knex(table.MILESTONE)
      .select<Milestone[]>("*")
      .where("purpose_id", purpose_id)
      .returning("id");
    return queryResult;
  }
  async getAttachmentBypurposeId(purpose_id: number) {
    const queryResult = await this.knex(table.ATTACHMENT)
      .select<Attachment[]>("*")
      // ("id", "purpose_id", "type", "title", "voice_name", "audioFile_name", "location_address", "image_name", "imageFile_name", "weblink_url", "description", "deleted_at", "created_at", "updated_at")
      .where("purpose_id", purpose_id)
      .returning("id");
    return queryResult;
  }
  async getAttachmentByMilestoneId(milestone_id: number) {
    const queryResult = await this.knex(table.ATTACHMENT)
      .select<Attachment[]>("*")
      .where("milestone_id", milestone_id)
      .returning("id");
    return queryResult;
  }
  //////////////////////////////////////////
  async insertFolder(
    user_id: number,
    name: string,
    is_favourite: boolean,
    cover_image: string
  ) {
    const queryResult = await this.knex<Folder[]>(table.FOLDER).select("name");
    queryResult.forEach((folder) => {
      if (folder.name == name) {
        throw new Error("This folder name already exists.");
      }
    });
    const id = await this.knex<Folder>(table.FOLDER)
      .insert([
        {
          user_id: user_id,
          name: name,
          is_favourite: is_favourite,
          cover_image: cover_image,
          is_delete: false,
        },
      ])
      .returning("id");

    // if (is_favourite == true) {
    //     await this.knex<Folder>(table.FOLDER).select("*")
    //         .where("id", id)
    //         .update({ favourite_at: this.knex.raw(`${Date.now()}`)})
    // }
    return id;
  }
  async insertPurpose(
    folder_id: number,
    type: PurposeType,
    title: string,
    description: string,
    start_date: string,
    start_time: string,
    due_date: string,
    due_time: string,
    is_favourite: boolean
  ) {
    const queryResult = await this.knex<Purpose>(table.PURPOSE).select("title");
    queryResult.forEach((purpose) => {
      if (purpose.title == title) {
        throw new Error("This purpose name already exists.");
      }
    });
    const id = await this.knex<Purpose>(table.PURPOSE)
      .insert([
        {
          folder_id: folder_id,
          type: type,
          title: title,
          description: description,
          start_date: start_date,
          start_time: start_time,
          due_date: due_date,
          due_time: due_time,
          is_favourite: is_favourite,
          is_delete: false,
        },
      ])
      .returning("id");
    // if (is_favourite == true) {
    //     // await this.knex<Purpose>(table.PURPOSE)
    //     //     // .select("*")
    //     //     .update({ favourite_at: new Date()})
    //     //     .where("id", id)
    //     console.log('---------[updating favourate at]')
    //     // const query = `update $1 set favorite_at = $ + interval '1' minute where id = $3`
    //     const query = `update $1 set favorite_at = $2 where id = $3`
    //     await this.knex.raw(query, [table.PURPOSE, Date.now(), id])
    // }
    return id;
  }
  async insertMilestone(
    purpose_id: number,
    title: string,
    description: string,
    start_date: string,
    start_time: string,
    due_date: string,
    due_time: string
  ) {
    await this.knex<Milestone>(table.MILESTONE).insert([
      {
        purpose_id: purpose_id,
        title: title,
        description: description,
        start_date: start_date,
        start_time: start_time,
        due_date: due_date,
        due_time: due_time,
        is_delete: false,
      },
    ]);
  }
  async insertPurposeAttachment(
    purpose_id: number,
    type: AttachmentType,
    title: string,
    voice_name: string,
    audioFile_name: string,
    location_address: string,
    image_name: string,
    imageFile_name: string,
    weblink_url: string,
    description: string
  ) {
    console.log(purpose_id, type, title, voice_name, audioFile_name, imageFile_name,description)
    const test = await this.knex<Attachment>(table.ATTACHMENT).insert([
      {
        purpose_id: purpose_id,
        type: type,
        title: title,
        voice_name: voice_name,
        audioFile_name: audioFile_name,
        location_address: location_address,
        image_name: image_name,
        imageFile_name: imageFile_name,
        weblink_url: weblink_url,
        description: description,
        is_delete: false,
      },
    ]);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",test);
    
  }
  async insertMilestoneAttachment(
    milestone_id: number,
    type: AttachmentType,
    title: string,
    voice_name: string,
    audioFile_name: string,
    location_address: string,
    image_name: string,
    imageFile_name: string,
    weblink_url: string,
    description: string
  ) {
    await this.knex<Attachment>(table.ATTACHMENT).insert([
      {
        milestone_id: milestone_id,
        type: type,
        title: title,
        voice_name: voice_name,
        audioFile_name: audioFile_name,
        location_address: location_address,
        image_name: image_name,
        imageFile_name: imageFile_name,
        weblink_url: weblink_url,
        description: description,
        is_delete: false,
      },
    ]);
  }
  //////////////////////////////////////////
  async updateFolder(
    id: number,
    name: string,
    is_favourite: boolean,
    cover_image: string
  ) {
    const folder_id = id;
    const queryResult = await this.knex<Folder>(table.FOLDER)
      .select("id", "name", "is_favourite", "cover_image")
      .where("id", folder_id)
      .update({
        name: name,
        is_favourite: is_favourite,
        cover_image: cover_image,
      })
      .returning("id");

    return queryResult;
  }
  async updatePurpose(
    id: number,
    folder_id: number,
    title: string,
    description: string,
    start_date: string,
    start_time: string,
    due_date: string,
    due_time: string,
    finished_at: string,
    is_favourite: boolean
  ) {
    const queryResult = await this.knex<Purpose>(table.PURPOSE)
      .select(
        "id",
        "folder_id",
        "title",
        "description",
        "start_date",
        "start_time",
        "due_date",
        "due_time",
        "finished_at",
        "is_favourite"
      )
      .where("folder_id", folder_id)
      .where("id", id)
      .update({
        title: title,
        description: description,
        start_date: start_date,
        start_time: start_time,
        due_date: due_date,
        due_time: due_time,
        finished_at: finished_at,
        is_favourite: is_favourite,
      })
      .returning("id");
    return queryResult;
  }
  async updateMilestone(
    id: number,
    purpose_id: number,
    title: string,
    description: string,
    start_date: string,
    start_time: string,
    due_date: string,
    due_time: string,
    finished_at: string
  ) {
    const queryResult = await this.knex<Milestone>(table.MILESTONE)
      .select(
        "id",
        "purpose_id",
        "title",
        "description",
        "start_date",
        "start_time",
        "due_date",
        "due_time",
        "finished_at"
      )
      .where("purpose_id", purpose_id)
      .where("id", id)
      .update({
        title: title,
        description: description,
        start_date: start_date,
        start_time: start_time,
        due_date: due_date,
        due_time: due_time,
        finished_at: finished_at,
      });
    return queryResult;
  }
  async updatePurposeAttachment(
    id: number,
    purpose_id: number,
    title: string,
    voice_name: string,
    audioFile_name: string,
    location_address: string,
    image_name: string,
    imageFile_name: string,
    weblink_url: string,
    description: string
  ) {
    const queryResult = await this.knex<Attachment>(table.ATTACHMENT)
      .select(
        "id",
        "purpose_id",
        "title",
        "voice_name",
        "audioFile_name",
        "location_address",
        "image_name",
        "imageFile_name",
        "weblink_url",
        "description"
      )
      .where("purpose_id", purpose_id)
      .where("id", id)
      .update({
        title: title,
        voice_name: voice_name,
        audioFile_name: audioFile_name,
        location_address: location_address,
        image_name: image_name,
        imageFile_name: imageFile_name,
        weblink_url: weblink_url,
        description: description,
      });
    return queryResult;
  }
  async updateMilestoneAttachment(
    id: number,
    milestone_id: number,
    title: string,
    voice_name: string,
    audioFile_name: string,
    location_address: string,
    image_name: string,
    imageFile_name: string,
    weblink_url: string,
    description: string
  ) {
    const queryResult = await this.knex<Attachment>(table.ATTACHMENT)
      .select(
        "id",
        "milestone_id",
        "title",
        "voice_name",
        "audioFile_name",
        "location_address",
        "image_name",
        "imageFile_name",
        "weblink_url",
        "description"
      )
      .where("milestone_id", milestone_id)
      .where("id", id)
      .update({
        title: title,
        voice_name: voice_name,
        audioFile_name: audioFile_name,
        location_address: location_address,
        image_name: image_name,
        imageFile_name: imageFile_name,
        weblink_url: weblink_url,
        description: description,
      });
    return queryResult;
  }
  //////////////////////////////////////////
  async deleteAttachment(attachment_id: number) {
    await this.knex(table.ATTACHMENT)
      .where("id", attachment_id)
      .update({ is_delete: true })
      .returning("id");
  } /* Available to delete one attachments either in purpose or milestone */
  //   async deleteMilestoneAttachment(milestoneAttachment_id: number) {
  //     await this.knex(table.ATTACHMENT)
  //       .where("id", milestoneAttachment_id)
  //       .update({ is_delete: true })
  //       .returning("id");
  //   }
  async deleteMilestoneAttachmentByMilestoneId(milestone_id: number) {
    await this.knex<Attachment>(table.ATTACHMENT)
      .where("milestone_id", milestone_id)
      .update({ is_delete: true })
      .returning("id");
  } /* focus on delete milestone's attachments */
  async deleteMilestone(milestone_id: number) {
    await this.knex(table.MILESTONE)
      .where("id", milestone_id)
      .update({ is_delete: true })
      .returning("id");

    await this.deleteMilestoneAttachmentByMilestoneId(milestone_id);
    // return milestoneId;
  } /* delete one milestone and its attachments */
  async deleteMilestoneByPurposeId(
    purpose_id: number /*, milestone_id: number*/
  ) {
    // await this.deleteMilestone(milestone_id);
    let milestoneId = await this.knex(table.MILESTONE)
      .select("id")
      .where("purpose_id", purpose_id)
      .update({ is_delete: true })
      .returning("id");
    //   console.log(milestoneId);
    const milestoneArr = milestoneId.map((e) => e.id);
    //   console.log(milestoneArr);
    for (const milestone of milestoneArr) {
      await this.deleteMilestoneAttachmentByMilestoneId(milestone);
    }

    return milestoneId;
  }
  async deleteAttachmentByPurposeId(purpose_id: number) {
    await this.knex(table.ATTACHMENT)
      .where("purpose_id", purpose_id)
      .update({ is_delete: true })
      .returning("id");
  } /* focus on delete purpose's attachments */
  async deletePurpose(purpose_id: number /*, milestone_id: number*/) {
    // await this.deleteMilestoneByPurposeId(purpose_id, milestone_id);
    await this.knex(table.PURPOSE)
      .where("id", purpose_id)
      .update({ is_delete: true })
      .returning("id");
    await this.deleteAttachmentByPurposeId(purpose_id);

    // let milestoneId: number =
    await this.knex(table.MILESTONE)
      .select("id", "is_delete")
      .where("purpose_id", purpose_id)
      .update({ is_delete: true })
      .returning("id");

    // await this.knex(table.ATTACHMENT)
    //   .select("id", "is_delete")
    //   .where("milestone_id", milestoneId)
    //   .update({ is_delete: true });
  } /* delete one purpose and its milestones and all the attachment inside them */
  async deleteFolder(folder_id: number) {
    await this.knex(table.FOLDER)
      .where("id", folder_id)
      .update({ is_delete: true })
      .returning("id");
    let purposeId = await this.knex(table.PURPOSE)
      .select("id")
      .where("folder_id", folder_id)
      .returning("id");
    console.log("check purposeArr", purposeId);
    const purposeArr = purposeId.map((e) => e.id);
    for (const purpose of purposeArr) {
      await this.deletePurpose(purpose);
    }

    //   await this.deletePurpose(purposeId)
    // await this.deletePurposeByFolderId(folder_id, purpose_id);

    // let purposeId: number = await this.knex(table.PURPOSE)
    //   .where("id", purpose_id)
    //   .update({ is_delete: true })
    //   .returning("id");
    // let milestoneId: number = await this.knex(table.MILESTONE)
    //   .where("purpose_id", purposeId)
    //   .returning("id");

    // await this.knex(table.FOLDER)
    //   .where("id", folder_id)
    //   .update({ is_delete: true })
    //   .returning("id");
  } /* delete one folder and its purpose */
  async deleteFolderByUserId(
    user_id: number,
    folder_id: number /*, purpose_id: number, milestone_id: number*/
  ) {
    await this.knex(table.FOLDER)
      .select("id", folder_id)
      .where("user_id", user_id)
      .update({ is_delete: true });

    // await this.deleteFolder(folder_id, purpose_id, milestone_id);

    // await this.knex(table.USER)
    //   .where("id", user_id)
    //   .update({ is_delete: true })
    //   .returning("id");
  } /* delete all the folder by that user id */

  //   async deletePurposeByFolderId(purpose_id: number, folder_id: number) {
  //     await this.deletePurpose(purpose_id);

  //     await this.knex(table.PURPOSE)
  //       .where("folder_id", folder_id)
  //       .update({ is_delete: true })
  //       .returning("id");
  //   }

  //////////////////////////////////////////
}
