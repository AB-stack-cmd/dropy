CREATE TABLE "files" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"size" integer NOT NULL,
	"type" text NOT NULL,
	"path" text NOT NULL,
	"file_url" text NOT NULL,
	"thumbnail_url" text NOT NULL,
	"user_Id" text NOT NULL,
	"parent_Id" uuid NOT NULL,
	"is_Folder" boolean DEFAULT false NOT NULL,
	"is_started" boolean DEFAULT false NOT NULL,
	"is_trash" boolean DEFAULT false NOT NULL,
	"current_time" timestamp DEFAULT now() NOT NULL,
	"update_time" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "files_email_unique" UNIQUE("email")
);
