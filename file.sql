-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: aoligei
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `aoligei`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `aoligei` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `aoligei`;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` varchar(50) NOT NULL,
  `course_name` varchar(200) DEFAULT NULL,
  `major_id` int DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `major_id` (`major_id`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('CEME 1004','Engineering Mechanics - Statics',2),('CEME 2001','Strength of Materials',2),('CEME 2002','Structural Mechanics',2),('CEME 3002','Reinforced Concrete Design',2),('CEME 3003','Structural Steel Design',2),('COMP SCI 1102','Object Oritened Programming',1),('COMP SCI 1106','Introduction to Software Engineering',1),('COMP SCI 2000','Computer System',1),('COMP SCI 2207','Web & Database Computing',1),('COMP SCI 3306','Mining Big Data',1),('COMP SCI 3315','Computer Version',1),('DESST 1503','Design Studio I',4),('DESST 1505','History Theory I',4),('DESST 2516','Design Studio III',4),('DESST 2517','Environment II',4),('DESST 3513','Design Studio V',4),('DESST 3516','Design Studio VI',4),('MATHS 1011','Mathematics IA',3),('MATHS 1012','Mathematics IB',3),('MATHS 2100','Real Analysis II',3),('MATHS 2103','Probability & Statistics II',3),('MATHS 3021','Capstone Project in Mathematical Sciences III',3),('MATHS 3025','Professional Practice III',3),('STATS 1000','Statistical Practice I',5);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(20) DEFAULT NULL,
  `event_host_id` int NOT NULL,
  `event_description` varchar(500) DEFAULT NULL,
  `event_place` varchar(100) DEFAULT NULL,
  `event_time` varchar(100) DEFAULT NULL,
  `event_post_time` varchar(100) DEFAULT NULL,
  `event_situation` bit(1) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `event_host_id` (`event_host_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`event_host_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'killben',1,'杀','BENchu bieshu','4/6/2022','2/6/2022',_binary '\0'),(2,'sadad',6,'adasd','sssss','6/18/2022','2022-06-10T12:13:36.738Z',_binary '\0'),(4,'adasda',7,'sadds','asada','6/17/2022','2022-06-10T12:24:45.526Z',_binary '\0'),(5,'adasda',7,'sadds','asada','6/17/2022','2022-06-10T12:24:51.852Z',_binary '\0'),(7,'adasd',8,'asdada','asdada','6/17/2022','2022-06-10T12:29:42.405Z',_binary '\0'),(9,'adsada',9,'saadadad','ssssss','6/17/2022','2022-06-10T12:40:53.623Z',_binary '\0');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventmember`
--

DROP TABLE IF EXISTS `eventmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventmember` (
  `eventmember_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `event_id` int DEFAULT NULL,
  PRIMARY KEY (`eventmember_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `eventmember_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventmember`
--

LOCK TABLES `eventmember` WRITE;
/*!40000 ALTER TABLE `eventmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `index_user`
--

DROP TABLE IF EXISTS `index_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `index_user` (
  `index_user_id` int DEFAULT NULL,
  `index_username` varchar(20) DEFAULT NULL,
  `index_password` varchar(20) DEFAULT NULL,
  `index_email` varchar(30) DEFAULT NULL,
  `index_birthday_date` varchar(30) DEFAULT NULL,
  `index_course_id` varchar(30) DEFAULT NULL,
  `index_major_id` varchar(30) DEFAULT NULL,
  `index_major` varchar(30) DEFAULT NULL,
  `index_course` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `index_user`
--

LOCK TABLES `index_user` WRITE;
/*!40000 ALTER TABLE `index_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `index_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `major`
--

DROP TABLE IF EXISTS `major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `major` (
  `major_id` int NOT NULL,
  `major_name` varchar(80) DEFAULT NULL,
  `major_duration` varchar(80) DEFAULT NULL,
  `major_start_date` varchar(80) DEFAULT NULL,
  `major_location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`major_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `major`
--

LOCK TABLES `major` WRITE;
/*!40000 ALTER TABLE `major` DISABLE KEYS */;
INSERT INTO `major` VALUES (1,'Bachelor of Computer Science','3 years full-time','February and July','North Terrace Campus'),(2,'Bachelor of Engineeering (Honours)(Civil)','4 years full-time','February and July','North Terrace Campus'),(3,'Bachelor of Mathematical Science','3 years full-time','February and July','North Terrace Campus'),(4,'Bachelor of Architectural Design','3 years full-time','February and July','North Terrace Campus'),(5,'Bachelor of Applied Data Analytics','3 years full-time','February and July','North Terrace Campus Waite Campus'),(13,'asdadad','sadad','sadasd','adas'),(15,'dasdsad','sadasdad','sdadaddwqf','fafaasdad'),(16,'sadqaawda','sadadasdad','eqweqeqe','adadad');
/*!40000 ALTER TABLE `major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES (100000,'test1','0','example@example');
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `managerevent`
--

DROP TABLE IF EXISTS `managerevent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `managerevent` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(20) DEFAULT NULL,
  `event_host_id` int NOT NULL,
  `event_description` varchar(500) DEFAULT NULL,
  `event_place` varchar(100) DEFAULT NULL,
  `event_time` varchar(100) DEFAULT NULL,
  `event_post_time` varchar(100) DEFAULT NULL,
  `event_situation` bit(1) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `event_host_id` (`event_host_id`),
  CONSTRAINT `managerevent_ibfk_1` FOREIGN KEY (`event_host_id`) REFERENCES `manager` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `managerevent`
--

LOCK TABLES `managerevent` WRITE;
/*!40000 ALTER TABLE `managerevent` DISABLE KEYS */;
/*!40000 ALTER TABLE `managerevent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `note_id` int NOT NULL AUTO_INCREMENT,
  `responed` bit(1) DEFAULT NULL,
  `comfirm` bit(1) DEFAULT NULL,
  `event_finish` bit(1) DEFAULT NULL,
  `event_cancel` bit(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`note_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `note_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (1,_binary '',_binary '',_binary '',_binary '',1),(2,_binary '',_binary '',_binary '',_binary '',2),(3,_binary '',_binary '',_binary '',_binary '',3),(4,_binary '',_binary '',_binary '',_binary '',4),(5,_binary '',_binary '',_binary '',_binary '',5),(6,_binary '',_binary '',_binary '',_binary '',6),(7,_binary '',_binary '',_binary '',_binary '',7),(8,_binary '',_binary '',_binary '',_binary '',8),(9,_binary '',_binary '',_binary '',_binary '',9);
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `birthday_date` varchar(30) DEFAULT NULL,
  `major_id` int DEFAULT NULL,
  `course_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `major_id` (`major_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'yiting','000000','2693645795@qq.com','03/06/2000',NULL,NULL),(2,'lulu','000000','example@exmaple.com','03/06/2000',NULL,NULL),(3,'shuhao','000000','example@example.com','03/06/2000',NULL,NULL),(4,'yongsheng','000000','example@example.com','03/06/2000',NULL,NULL),(5,'dingzhen','litang','dingzhen@litang.com','03/06/2000',NULL,NULL),(6,'gg','123','123@123.com',NULL,NULL,NULL),(7,'xxx','123','xx@123.com',NULL,NULL,NULL),(8,'aaa','123','aa@13.com',NULL,NULL,NULL),(9,'gh','123','123@1.com',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-10 12:58:16
