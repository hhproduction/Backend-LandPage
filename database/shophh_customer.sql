-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shophh
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customerId` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `customerName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customerNation` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customerAddress` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customerZip` int DEFAULT NULL,
  `customerCity` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customerPhone` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `customerEmail` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `isDelete` int DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('0360da0b-4efe-3449-8914-9bd6c829bd5e','Mohamed Becker V','Holy See (Vatican City State)','64634 Saul Falls Apt. 476',21143,'Martaville','(913)263-0814x67225','ybraun@example.com',0,'1979-10-08 15:17:23','1984-01-11 06:40:47'),('0a117757-c21e-34b3-a609-64886947ba1d','Drake Abbott','Bolivia','568 Lynn Lodge',40191,'Port Ahmadton','057.625.7779x7019','agustin61@example.org',0,'1978-03-06 05:08:41','2007-02-28 20:05:43'),('127ecfce-d9f2-389a-a618-d9656cab015e','Kendrick Schroeder','Korea','78225 Kemmer Drive Suite 815',81405,'East Chasityview','788-969-1136','declan09@example.org',0,'1999-01-19 10:30:17','1986-09-26 04:11:53'),('1f05750c-daa4-3258-a22d-f54ea4433037','Dr. Jorge Klein','Australia','68394 Israel Heights Suite 531',77264,'Port Valerie','408.237.5343','mitchell.oceane@example.com',0,'1985-06-22 14:53:26','2018-07-07 09:29:53'),('4b1932e5-6458-3b56-ae0d-aa03e2aaf32c','Sarai Stracke','San Marino','7588 Dach Tunnel',94309,'Demariomouth','697-912-1174x1935','frederique73@example.net',0,'1993-04-27 18:00:00','2012-04-23 00:16:52'),('4f92236c-4a15-395c-b4db-cd385593e9bd','Esta Cole','Egypt','69194 Lind Prairie',24431,'South Kaelynberg','026-263-7531','daryl.jenkins@example.com',0,'2002-07-08 04:58:39','1986-04-04 17:10:29'),('5b046040-7714-399c-b71a-2981d72d0649','Bradford Blick','Saudi Arabia','203 Funk Stream Apt. 122',14219,'East Zella','1-572-968-3384x720','percy08@example.net',0,'1988-07-01 11:20:35','1986-10-19 07:36:39'),('70d9b929-a752-3cda-80cc-e1ee7e3a4408','Trudie Mante','Holy See (Vatican City State)','64283 Andreane Bridge Apt. 658',99349,'New Camren','496-174-2038x903','lynch.kelsi@example.com',0,'1990-05-29 06:12:53','2015-09-11 06:22:06'),('71dccf5e-643c-356c-8d98-f5405de80209','Prof. Christa Harvey Jr.','Solomon Islands','934 Ortiz Port Apt. 605',78713,'East Trevor','(271)369-8683x6234','jadon.buckridge@example.net',0,'2010-05-14 13:31:44','2006-09-20 01:13:51'),('773afb87-fd15-379d-84c5-14c6693d2a96','Jaquelin Walter','Dominican Republic','002 Rosalind Island',51476,'South Herminia','(469)348-2095x5783','orland61@example.net',0,'1974-02-01 13:36:57','2010-06-08 05:09:02'),('77dca403-aebd-3874-87a3-ba10523064a8','Kiera Cremin II','Fiji','45500 Powlowski Walk',59947,'North Prudencehaven','(865)085-7250x23182','sporer.napoleon@example.net',0,'1980-07-10 04:01:08','1982-12-26 00:06:03'),('7c3cbf2f-1b47-3e33-9119-53009d678863','Oswald Kshlerin','Albania','1898 Rippin Loop',85126,'Marianeshire','1-870-953-2234x453','edgardo66@example.net',0,'1988-01-12 02:16:14','2015-01-25 11:57:11'),('84d473f1-fa12-3e86-9a7a-6a2b2e6f2e3c','Dr. Freeman Nader','Antarctica (the territory South of 60 deg S)','683 Murphy Glens',44833,'West Steve','1-444-383-1740','lschamberger@example.com',0,'2011-06-13 19:28:43','2014-04-27 18:36:32'),('89e3d978-e4d7-3135-898d-0ff724059e5b','Camylle Rempel','Japan','242 Janet Plains Apt. 098',58564,'Lake Edythland','1-305-872-3796','schowalter.geo@example.net',0,'1975-05-10 09:38:16','1994-09-13 13:55:07'),('c2910ebc-1c19-340d-9c7a-f1bb8665279f','Jaquan Bartoletti','Morocco','453 Sydni Burgs',75010,'South Imeldaside','975-261-9464x16681','justine79@example.org',0,'1984-06-06 04:09:52','2006-09-08 09:51:08'),('c5a75719-973f-3c85-9168-9e1214a74691','Rosie Zulauf I','Bahamas','6608 King Parkways Suite 591',41687,'South Rosanna','951.418.9679x682','wuckert.lisandro@example.org',0,'1984-06-01 10:12:11','2015-03-24 03:24:04'),('cada8022-dbd6-3803-9b97-926e633adf32','Abby Labadie','Ethiopia','520 Gleichner Locks',70382,'Port Emmytown','(531)397-2935','voberbrunner@example.org',0,'2009-05-28 13:23:50','1998-01-21 13:01:42'),('f48104d1-6da3-3713-b242-c214b9559762','Mrs. Charlotte Stoltenberg I','Afghanistan','154 Francisca Trail Apt. 435',97001,'Bechtelarmouth','1-325-987-2157','esteban06@example.com',0,'1989-08-03 22:51:49','2000-01-17 03:08:15'),('f65eed0b-854b-3a3d-bfc4-da0bb81a6be0','Bryana Skiles','Cape Verde','12054 Harvey Mountains',34227,'Ibrahimstad','+52(9)6491096482','hjohnston@example.com',0,'2018-07-09 23:10:54','2020-10-24 10:19:42'),('fb466ca6-6a9c-3ed0-8388-8032467ead72','Shane Doyle','Sao Tome and Principe','8150 Braeden Junctions Apt. 545',63782,'Kurtisport','704.896.4440','jaron65@example.com',0,'2005-08-26 08:31:08','1990-07-16 06:50:46');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-08 13:44:12
