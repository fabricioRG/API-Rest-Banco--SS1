-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema BANK_SYSTEM
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema BANK_SYSTEM
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BANK_SYSTEM` DEFAULT CHARACTER SET latin1 ;
USE `BANK_SYSTEM` ;

-- -----------------------------------------------------
-- Table `BANK_SYSTEM`.`USER_ACCOUNT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BANK_SYSTEM`.`USER_ACCOUNT` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  `userName` VARCHAR(20) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pin` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 300035
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `BANK_SYSTEM`.`BANK_ACCOUNT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BANK_SYSTEM`.`BANK_ACCOUNT` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idUserAccount` INT(11) NOT NULL,
  `accountType` ENUM('BASIC', 'PREMIUM', 'PLUS') NOT NULL DEFAULT 'BASIC',
  `role` ENUM('CLIENT', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
  `stateAccount` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `balance` DOUBLE NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  INDEX `fk_BANK_ACCOUNT_ID_USER_ON_USER_ACCOUNT_idx` (`idUserAccount` ASC),
  CONSTRAINT `fk_BANK_ACCOUNT_ID_USER_ON_USER_ACCOUNT`
    FOREIGN KEY (`idUserAccount`)
    REFERENCES `BANK_SYSTEM`.`USER_ACCOUNT` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 100017
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `BANK_SYSTEM`.`BANK_MOVEMENT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BANK_SYSTEM`.`BANK_MOVEMENT` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idBankAccount` INT(11) NOT NULL,
  `dateMovement` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `movementType` ENUM('ACCREDITATION', 'RETIREMENT') NOT NULL,
  `amount` DOUBLE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_BANK_MOVEMENT_ID_BANK_ON_BANK_ACCOUNT_idx` (`idBankAccount` ASC),
  CONSTRAINT `fk_BANK_MOVEMENT_ID_BANK_ON_BANK_ACCOUNT`
    FOREIGN KEY (`idBankAccount`)
    REFERENCES `BANK_SYSTEM`.`BANK_ACCOUNT` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 100015
DEFAULT CHARACTER SET = latin1;

USE `BANK_SYSTEM` ;
