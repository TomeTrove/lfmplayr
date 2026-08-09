CREATE TABLE `libraries` (
	`id` integer PRIMARY KEY,
	`name` text NOT NULL UNIQUE,
	`value` text
);
