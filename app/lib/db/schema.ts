import {uuid, integer, pgTable, varchar ,text ,timestamp,boolean} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";



// files
export const Files = pgTable("files", {
  

  //unique id 
  id: uuid("id").defaultRandom().primaryKey(),

  // filea and folder information
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  size:integer("size").notNull(),
  type:text("type").notNull(),
  path:text("path").notNull(),

  fileUrl:text("file_url").notNull(),// url of file
  thumbnailUrl:text("thumbnail_url").notNull(), // thumnail url

  // File/Folder flags
  userId: text("user_Id").notNull(),//owner of the file/folder
  parentId: uuid("parent_Id").notNull(),

  // Flags File/Folder
  isFolder : boolean("is_Folder").default(false).notNull(), // Folder true or false
  isStarted : boolean("is_started").default(false).notNull(),//check started or not
  isTrash : boolean("is_trash").default(false).notNull(), // Items in trash

  //Timestamps current and update
  createAt : timestamp("current_time").defaultNow().notNull(),
  updateTime : timestamp("update_time").defaultNow().notNull()


});

 /**
  * File Relatrion
  * 
  * Each file/folder  consists parent folder of file/folder
  * Many folder/File are the children folders
  *
  * 
  */

 // relation with files the parent and children
 //
export const fileRelation = relations(Files,({one,many})=>({
  parent : one(Files,{
    fields : [Files.parentId],
    references : [Files.id]
  })
}))

export const file = typeof Files.$inferSelect;   // type of retreving data from the db
export const Newfile = typeof Files.$inferInsert // type of inserting data on the db
