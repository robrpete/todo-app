-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Todo` (
	`id` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAT` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`text` varchar(191) NOT NULL,
	`done` tinyint NOT NULL DEFAULT 0,
	`userId` varchar(191) NOT NULL,
	CONSTRAINT `Todo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	CONSTRAINT `User_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `Todo_userId_idx` ON `Todo` (`userId`);
*/