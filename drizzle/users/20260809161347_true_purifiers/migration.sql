CREATE TABLE `configs` (
	`id` integer PRIMARY KEY,
	`name` text NOT NULL UNIQUE,
	`value` text
);
--> statement-breakpoint
CREATE TABLE `placement-history` (
	`id` integer PRIMARY KEY,
	`name` text NOT NULL UNIQUE,
	`value` text
);
