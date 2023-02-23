import { Knex } from "knex";
import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export async function seed(knex: Knex): Promise<void> {
  const trx = await knex.transaction();
  try {
    const users = [
      {
        email: "123@gmail.com",
        password: await bcrypt.hash("1234", SALT_ROUNDS),
        username: "user123",
        gender: "female",
        mobile: 12345678,
        is_login: false,
      },
      {
        email: "456@gmail.com",
        password: await bcrypt.hash("5678", SALT_ROUNDS),
        username: "user456",
        gender: "male",
        mobile: 87654321,
        is_login: false,
      },
      {
        email: "789@gmail.com",
        password: await bcrypt.hash("1234", SALT_ROUNDS),
        username: "user789",
        gender: "female",
        mobile: 99999998,
        is_login: false,
      },
    ];
    const [{ id: user1Id }, { id: user2Id }, { id: user3Id }] = await trx(
      "users"
    )
      .insert(users)
      .returning("id");
    // await trx("users").insert(users).returning("id");
    const folders = [
      {
        user_id: user1Id,
        name: "Study",
        is_favourite: true,
        favourite_at: "5-10-2022",
        cover_image: "cover.jpg", 
        is_delete: false,
      },
      {
        user_id: user2Id,
        name: "New Year",
        is_favourite: false,
        cover_image: "cover.jpg",
        is_delete: false,
      },
      {
        user_id: user3Id,
        name: "Test1",
        is_favourite: false,
        cover_image: "cover.jpg",
        is_delete: false,
      },
      {
        user_id: user3Id,
        name: "Test2",
        is_favourite: false,
        cover_image: "cover.jpg",
        is_delete: false,
      },
      {
        user_id: user3Id,
        name: "Test3",
        is_favourite: false,
        cover_image: "cover.jpg",
        is_delete: false,
      },
    ];
    const [{ id: folder1Id }, { id: folder2Id }, { id: folder3Id }] = await trx(
      "folders"
    )
      .insert(folders)
      .returning("id");
    const purpose = [
      {
        // user_id: user1Id,
        folder_id: folder1Id,
        type: "setGoal",
        title: "tecky",
        description: "finish 4 modules",
        start_date: "5-10-2022",
        start_time: "09:00",
        due_date: "09-02-2023",
        due_time: "18:00",
        is_favourite: true,
        favourite_at: "5-10-2022",
        is_delete: false,
      },
      {
        // user_id: user1Id,
        folder_id: folder2Id,
        type: "setRemainder",
        title: "tecky resources",
        description: "cms",
        is_favourite: false,
        is_delete: false,
      },
      {
        folder_id: folder3Id,
        type: "setGoal",
        title: "purpose 1",
        description: "purpose 1",
        start_date: "5-10-2022",
        start_time: "09:00",
        due_date: "09-02-2023",
        due_time: "18:00",
        is_favourite: true,
        favourite_at: "6-10-2022",
        is_delete: false,
      },
      {
        folder_id: folder3Id,
        type: "setGoal",
        title: "purpose 2",
        description: "purpose 2",
        start_date: "10-10-2022",
        start_time: "09:00",
        due_date: "09-11-2022",
        due_time: "18:00",
        is_favourite: false,
        favourite_at: "11-10-2022",
        is_delete: false,
      },
      {
        folder_id: folder3Id,
        type: "setRemainder",
        title: "reminder 1",
        description: "cms",
        is_favourite: false,
        is_delete: false,
      },
    ];
    // const [{ id: purpose2Id }] = await trx("purposes").insert(purpose).returning("id")
    const [
      { id: purpose1Id },
      { id: purpose2Id },
      { id: purpose3Id },
      { id: purpose4Id },
      { id: purpose5Id },
    ] = await trx("purposes").insert(purpose).returning("id");
    const purposeAttachment = [
      {
        purpose_id: purpose2Id,
        type: "voice",
        title: "resources",
        voice_name: "voice 1",
        audioFile_name: "voice 1.mp3",
        description: "cms voice",
        is_delete: false,
      },
      {
        purpose_id: purpose2Id,
        type: "image",
        title: "resources",
        image_name: "cms image",
        imageFile_name: "image/cms_image.jpg",
        description: "some image",
        is_delete: false,
      },
      {
        purpose_id: purpose2Id,
        type: "weblink",
        title: "resources",
        weblink_url: "https://cms.tecky.io",
        description: "some weblink",
        is_delete: false,
      },
      {
        purpose_id: purpose2Id,
        type: "location",
        title: "resources",
        location_address:
          "Room 20B, 20/F, TML Tower 3 Hoi Shing Road, Tsuen Wan, N.T, Hong Kong",
        description: "some location",
        is_delete: false,
      },
      {
        purpose_id: purpose5Id,
        type: "voice",
        title: "resources",
        voice_name: "test attachment 1",
        audioFile_name: "voice_1.mp3",
        description: "cms voice",
        is_delete: false,
      },
      {
        purpose_id: purpose5Id,
        type: "image",
        title: "test attachment 2",
        image_name: "cms image",
        imageFile_name: "image/cms_image.jpg",
        description: "some image",
        is_delete: false,
      },
      {
        purpose_id: purpose5Id,
        type: "weblink",
        title: "resources",
        weblink_url: "https://cms.tecky.io",
        description: "some weblink",
        is_delete: false,
      },
      // {
      //     purpose_id: purpose2Id,
      //     type: "location",
      //     title: "resources",
      //     voice_name: "voice 1",
      //     audioFile_name: "voice 1.mp3",
      //     location_address: "Room 20B, 20/F, TML Tower 3 Hoi Shing Road, Tsuen Wan, N.T, Hong Kong",
      //     image_name: "cms image",
      //     imageFile_name: "cms image.jpg",
      //     weblink_url: "https://cms.tecky.io",
      // },
    ];
    // console.log("check 1")
    // try {
    //     await trx("attachments").insert(purposeAttachment);
    // } catch(error) {
    //     console.log(error)
    // }

    await trx("attachments").insert(purposeAttachment).returning("id");

    const milestone = [
      {
        purpose_id: purpose1Id,
        title: "WSP",
        description: "first module",
        start_date: "05-10-2022",
        start_time: "11:00",
        due_date: "05-11-2022",
        due_time: "12:00",
        finished_at: "05-11-2022",
        is_delete: false,
      },
      {
        purpose_id: purpose1Id,
        title: "WEF",
        description: "second module",
        start_date: "05-10-2022",
        start_time: "11:00",
        due_date: "05-11-2022",
        due_time: "12:00",
        finished_at: "06-12-2022",
        is_delete: false,
      },
      {
        purpose_id: purpose1Id,
        title: "BAD",
        description: "third module",
        start_date: "05-10-2022",
        start_time: "11:00",
        due_date: "05-11-2022",
        due_time: "12:00",
        finished_at: "07-01-2023",
        is_delete: false,
      },
      {
        purpose_id: purpose1Id,
        title: "FRD",
        description: "fouth module",
        start_date: "05-10-2022",
        start_time: "11:00",
        due_date: "05-11-2022",
        due_time: "12:00",
        is_delete: false,
      },
      {
        purpose_id: purpose3Id,
        title: "Milestone 1",
        description: "fouth module",
        start_date: "05-10-2022",
        start_time: "11:00",
        due_date: "05-11-2022",
        due_time: "12:00",
        is_delete: false,
      },
      {
        purpose_id: purpose3Id,
        title: "Milestone 2",
        description: "fouth module",
        start_date: "05-10-2022",
        start_time: "11:00",
        due_date: "05-11-2022",
        due_time: "12:00",
        is_delete: false,
      },
      {
        purpose_id: purpose3Id,
        title: "Milestone 3",
        description: "fouth module",
        start_date: "05-10-2022",
        start_time: "11:00",
        due_date: "05-11-2022",
        due_time: "12:00",
        is_delete: false,
      },
      {
        purpose_id: purpose4Id,
        title: "Milestone 1",
        description: "fouth module",
        start_date: "05-10-2022",
        start_time: "11:00",
        due_date: "05-11-2022",
        due_time: "12:00",
        is_delete: false,
      },
    ];
    // console.log("insert milestone")

    // try {
    //     await trx("milestones").insert(milestone).returning("id")
    // } catch (error) {
    //     console.log("Error ~", error)
    // }

    const [
      { id: milestone1Id },
      { id: milestone2Id },
      { id: milestone3Id },
      { id: milestone4Id },
      { id: milestone5Id },
      { id: milestone6Id },
      { id: milestone7Id },
    ] = await trx("milestones").insert(milestone).returning("id");

    const milestoneAttachement = [
      {
        milestone_id: milestone1Id,
        purpose_id: purpose1Id,
        type: "voice",
        title: "voice record for wsp",
        voice_name: "wsp1",
        audioFile_name: "wsp1.mp3",
        description: "lession 1",
        is_delete: false,
      },
      {
        milestone_id: milestone1Id,
        purpose_id: purpose1Id,
        type: "image",
        title: "image for wsp",
        image_name: "wsp1 screen cap1",
        imageFile_name: "image/cms_image.jpg",
        is_delete: false,
      },
      {
        milestone_id: milestone2Id,
        purpose_id: purpose1Id,
        type: "voice",
        title: "voice record for wef",
        voice_name: "wef1",
        audioFile_name: "wef1.mp3",
        description: "lession 1",
        is_delete: false,
      },
      {
        milestone_id: milestone2Id,
        purpose_id: purpose1Id,
        type: "image",
        title: "image for wef",
        image_name: "wef1 screen cap1",
        imageFile_name: "image/cms_image.jpg",
        description: "improtant",
        is_delete: false,
      },
      {
        milestone_id: milestone3Id,
        purpose_id: purpose1Id,
        type: "weblink",
        title: "weblink for bad",
        weblink_url: "https://cms.tecky.io",
        description: "cms",
        is_delete: false,
      },
      {
        milestone_id: milestone4Id,
        purpose_id: purpose1Id,
        type: "location",
        title: "location for frd capstone present",
        location_address:
          "Room 20B, 20/F, TML Tower 3 Hoi Shing Road, Tsuen Wan, N.T, Hong Kong",
        description: "arraived at 10:00",
        is_delete: false,
      },
      {
        milestone_id: milestone5Id,
        purpose_id: purpose3Id,
        type: "weblink",
        title: "mile attachment 1",
        weblink_url: "https://cms.tecky.io",
        description: "cms",
        is_delete: false,
      },
      {
        milestone_id: milestone5Id,
        purpose_id: purpose3Id,
        type: "weblink",
        title: "mile attachment 2",
        weblink_url: "https://cms.tecky.io",
        description: "cms",
        is_delete: false,
      },
      {
        milestone_id: milestone5Id,
        purpose_id: purpose3Id,
        type: "weblink",
        title: "mile attachment 3",
        weblink_url: "https://cms.tecky.io",
        description: "cms",
        is_delete: false,
      },
      {
        milestone_id: milestone6Id,
        purpose_id: purpose3Id,
        type: "location",
        title: "mile attachment 4",
        location_address:
          "Room 20B, 20/F, TML Tower 3 Hoi Shing Road, Tsuen Wan, N.T, Hong Kong",
        description: "arraived at 10:00",
        is_delete: false,
      },
      {
        milestone_id: milestone7Id,
        purpose_id: purpose3Id,
        type: "image",
        title: "mile attachment 5",
        image_name: "wef1 screen cap1",
        imageFile_name: "image/cms_image.jpg",
        description: "improtant",
        is_delete: false,
      },
    ];
    await trx("attachments").insert(milestoneAttachement).returning("id");
    await trx.commit();
  } catch (error) {
    console.log("Error", error);
    await trx.rollback();
  }
}

// await knex("table_name").insert([
//     { id: 1, colName: "rowValue1" },
//     { id: 2, colName: "rowValue2" },
//     { id: 3, colName: "rowValue3" }
// ]);
