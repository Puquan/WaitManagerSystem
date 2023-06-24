-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: waitsys
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `isOnMenu` tinyint DEFAULT NULL,
  `order` int NOT NULL,
  PRIMARY KEY (`categoryId`),
  UNIQUE KEY `categoryId_UNIQUE` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Item` (
  `itemId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `picture` longblob,
  `description` varchar(50) DEFAULT NULL,
  `ingredient` varchar(30) DEFAULT NULL,
  `price` float NOT NULL,
  `categoryId` int NOT NULL,
  `rating` float NOT NULL,
  `isOnMenu` tinyint NOT NULL,
  `order` int NOT NULL,
  PRIMARY KEY (`itemId`),
  UNIQUE KEY `itemId_UNIQUE` (`itemId`),
  UNIQUE KEY `categoryId_UNIQUE` (`categoryId`),
  CONSTRAINT `item_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Item`
--

LOCK TABLES `Item` WRITE;
/*!40000 ALTER TABLE `Item` DISABLE KEYS */;
/*!40000 ALTER TABLE `Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `tableId` int NOT NULL,
  `startTime` datetime DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `isComplete` tinyint DEFAULT NULL,
  `isCook` tinyint DEFAULT NULL,
  PRIMARY KEY (`orderId`),
  UNIQUE KEY `orderId_UNIQUE` (`orderId`),
  KEY `tableId` (`tableId`),
  CONSTRAINT `order_ibfk_1` FOREIGN KEY (`tableId`) REFERENCES `Table` (`tableId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order_item`
--

DROP TABLE IF EXISTS `Order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `itemId` int NOT NULL,
  `tableId` int NOT NULL,
  `isCook` tinyint DEFAULT NULL,
  `isServe` tinyint DEFAULT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `tableId` (`tableId`),
  KEY `orderId` (`orderId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`tableId`) REFERENCES `Table` (`tableId`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`orderId`) REFERENCES `Order` (`orderId`),
  CONSTRAINT `order_item_ibfk_3` FOREIGN KEY (`itemId`) REFERENCES `Item` (`itemId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order_item`
--

LOCK TABLES `Order_item` WRITE;
/*!40000 ALTER TABLE `Order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `Order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Table`
--

DROP TABLE IF EXISTS `Table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Table` (
  `tableId` int NOT NULL AUTO_INCREMENT,
  `state` tinyint NOT NULL,
  `needHelp` tinyint NOT NULL,
  PRIMARY KEY (`tableId`),
  UNIQUE KEY `tableId_UNIQUE` (`tableId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Table`
--

LOCK TABLES `Table` WRITE;
/*!40000 ALTER TABLE `Table` DISABLE KEYS */;
/*!40000 ALTER TABLE `Table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-24 21:57:12
