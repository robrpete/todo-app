ALTER TABLE `Todo` MODIFY COLUMN `id` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `Todo` MODIFY COLUMN `createdAt` datetime;--> statement-breakpoint
ALTER TABLE `User` MODIFY COLUMN `id` varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE `Todo` ADD `userName` varchar(191) NOT NULL;