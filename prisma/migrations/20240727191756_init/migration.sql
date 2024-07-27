/*
  Warnings:

  - Made the column `playOnYoutubeOnly` on table `BlogPost` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `BlogPost` MODIFY `playOnYoutubeOnly` BOOLEAN NOT NULL;
