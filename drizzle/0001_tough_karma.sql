CREATE TABLE "my-chatbot_chats" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "my-chatbot_messages" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"role" varchar(256) NOT NULL,
	"content" text,
	"parts" jsonb NOT NULL,
	"chatId" varchar(256)
);
--> statement-breakpoint
ALTER TABLE "my-chatbot_messages" ADD CONSTRAINT "my-chatbot_messages_chatId_my-chatbot_chats_id_fk" FOREIGN KEY ("chatId") REFERENCES "public"."my-chatbot_chats"("id") ON DELETE no action ON UPDATE no action;