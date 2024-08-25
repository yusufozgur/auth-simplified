CREATE TABLE IF NOT EXISTS "private"."sessionTable" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "private"."userTable" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "userTable_username_unique" UNIQUE("username"),
	CONSTRAINT "userTable_password_hash_unique" UNIQUE("password_hash")
);
--> statement-breakpoint
DROP TABLE "private"."session";--> statement-breakpoint
DROP TABLE "private"."user";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "private"."sessionTable" ADD CONSTRAINT "sessionTable_user_id_userTable_id_fk" FOREIGN KEY ("user_id") REFERENCES "private"."userTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
