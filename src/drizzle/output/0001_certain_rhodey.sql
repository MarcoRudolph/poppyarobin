ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "token" text;--> statement-breakpoint
ALTER TABLE "vorschlaege" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "vorschlaege" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "vorschlaege" ADD CONSTRAINT "vorschlaege_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;