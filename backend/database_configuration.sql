-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: collection_management
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collections`
--

DROP TABLE IF EXISTS `collections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `collections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collections`
--

LOCK TABLES `collections` WRITE;
/*!40000 ALTER TABLE `collections` DISABLE KEYS */;
INSERT INTO `collections` VALUES (3,'Fantastic Concrete Sausages','Suspendo veritas ambitus culpo fugit pecto. Carus cauda culpa contego uterque ustilo. Pecus atavus vestrum cultura asper conspergo taceo suadeo trepide iusto.','Outdoors','https://loremflickr.com/640/480',6,'2024-08-19 22:01:14'),(5,'Tasty Rubber Tuna','Stips subvenio corrumpo arx omnis adnuo talis. Solum accusator cubo cui. Vulariter arbor solvo congregatio termes titulus viscus comptus chirographum.','Games','https://loremflickr.com/640/480',8,'2024-08-19 22:01:14'),(7,'Awesome Wooden Pizza','Tamen nobis aliqua. Vicissitudo sufficio aggero porro capillus sordeo. Appono substantia crapula vitium turba candidus fugit cedo ademptio aestus.','Automotive','https://loremflickr.com/640/480',5,'2024-08-19 23:06:47'),(8,'Sleek Granite Chair','Demergo corrupti trans subito vulpes votum itaque. Eos arguo comis beatae cultellus doloribus. Vel considero adstringo cuius ad acquiro ciminatio.','Grocery','https://loremflickr.com/640/480',9,'2024-08-19 23:06:47'),(9,'Awesome Plastic Gloves','Credo comprehendo utor spiculum calculus atavus nisi amplitudo. Aperte abscido tempora impedit urbanus dolor cogo. Cibus cena degero adfero basium nostrum degenero cuppedia.','Baby','https://loremflickr.com/640/480',5,'2024-08-19 23:06:47'),(10,'Practical Steel Bike','Vilitas auctor aurum colo. Caecus temperantia odit balbus vilicus porro volup. Ceno magni spes atrocitas annus.','Toys','https://loremflickr.com/640/480',6,'2024-08-19 23:06:47'),(11,'Bespoke Rubber Car','Cibo pax comburo cupiditate dolore denique aetas cognomen. Terga amaritudo acer arma eveniet cimentarius tenax iste non sponte. Correptius video vilicus unde timor cohibeo administratio auxilium comprehendo veritas.','Electronics','https://loremflickr.com/640/480',6,'2024-08-19 23:06:47'),(15,'tangas','a',NULL,NULL,NULL,'2024-08-21 23:41:06'),(16,'tangas','a','a',NULL,NULL,'2024-08-21 23:45:43'),(17,'tangas2','a','a',NULL,NULL,'2024-08-21 23:46:23'),(18,'tangas','a','a',NULL,NULL,'2024-08-21 23:48:41'),(19,'tangas2','a','a',NULL,NULL,'2024-08-21 23:49:56');
/*!40000 ALTER TABLE `collections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (9,15,10,'Coruscus astrum placeat consectetur.','2024-08-19 22:01:14'),(20,9,8,'Sollers amplitudo quia deporto studio vinum acceptus subito conor.','2024-08-19 22:01:14'),(48,9,5,'Decor neque ambulo adipisci valetudo anser corrupti timidus ars.','2024-08-19 23:06:47'),(50,9,9,'Derelinquo eaque socius veniam reprehenderit abundans.','2024-08-19 23:06:47'),(51,15,10,'Comis cubo auctus arbitro commemoro.','2024-08-19 23:06:47'),(64,28,22,'asd','2024-08-22 10:36:36');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `collection_id` int(11) DEFAULT NULL,
  `tags` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `collection_id` (`collection_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (3,'Elegant Soft Bacon','Magnam cado acerbitas vix pel deputo. Consequuntur conicio tersus vulgivagus. Clamo studio cogito damno.',3,'antea iusto sto','2024-08-19 22:01:14'),(5,'Modern Fresh Bike','Brevis aegrus defungo collum strues velut. Consequatur bibo creta. Coaegresco arbustum volup calculus debeo.',5,'alioqui aureus adeo','2024-08-19 22:01:14'),(6,'Awesome Steel Bacon','Capto beneficium succurro abstergo curso angustus bellum subiungo optio commodi. Amissio temporibus cultellus culpo verbum. Velut velociter argumentum coerceo aranea capillus.',3,'victus ultra curso','2024-08-19 22:01:14'),(9,'Handcrafted Plastic Mouse','Hic appono abeo animus cernuus tenax convoco solium amplexus. Eligendi cultellus alo cupio ea nisi. Pecus cognatus corrumpo cedo nam causa socius.',5,'ultio turbo inflammatio','2024-08-19 22:01:14'),(12,'Unbranded Frozen Bike','Crapula capio sed vallum averto cupio. Baiulus amissio error censura. Umbra alo nostrum viscus censura caries.',3,'usus absum tamisium','2024-08-19 22:01:14'),(15,'Small Plastic Computer','Consuasor ulciscor vesica deleo. Usque tandem correptius cetera copiose conservo tenus. Sollicito apud curis delicate abutor aperte eveniet.',3,'absens victoria adinventitias','2024-08-19 22:01:14'),(18,'Licensed Frozen Chair','Tametsi soluta capitulus textus tyrannus appello modi appello tui sopor. Auxilium vigor minus arceo audacia temperantia cimentarius conspergo vicissitudo. Adhaero pecco sumo angulus.',3,'antepono tyrannus cunctatio','2024-08-19 22:01:14'),(26,'Gorgeous Frozen Pants','Una ars ulterius curo defungo labore amissio stips cognatus. Aequus iusto claudeo corroboro cras capio suadeo cras cilicium thesaurus. Peccatus volva cribro demergo vulnero totidem viridis velut.',3,'sum tabella argentum','2024-08-19 23:06:47'),(28,'Generic Soft Pants','Corrupti tantum astrum volubilis architecto non debeo quae copia neque. Communis antiquus voro sollers recusandae somniculosus deludo subito. Vapulus cattus similique trucido deficio avarus callide cunae termes consectetur.',3,'attonbitus capitulus beneficium','2024-08-19 23:06:47'),(30,'Electronic Wooden Computer','Adeptio pecto circumvenio doloremque crastinus cunae velum pauper vilis. Amet atqui bestia tandem vereor utrimque depono. Crustulum vulticulus cetera communis vulgaris cohaero acer tero.',3,'eveniet nam facilis','2024-08-19 23:06:47'),(31,'Luxurious Soft Tuna','Approbo ipsam verbera deprimo ocer sopor autem carpo supplanto. Aufero tersus defleo vox angelus cena demitto adsidue. Tabesco abutor tribuo vinum coerceo.',5,'abeo aperiam confugo','2024-08-19 23:06:47'),(34,'Intelligent Soft Pants','Confugo amitto xiphias bonus deinde truculenter atavus. Contra placeat vobis terror calculus vicissitudo. Qui amor apparatus acies attonbitus verus vilitas decor.',5,'terebro tondeo absens','2024-08-19 23:06:47'),(36,'Refined Rubber Chair','Defungo vado tenuis cuppedia. Spes surculus cedo amitto temperantia solus comburo dicta. Sophismata solum ter.',3,'cresco caecus thema','2024-08-19 23:06:47'),(37,'Incredible Steel Pants','Similique cultellus taceo. Carbo bonus advoco coniuratio demens valeo arbitro cunctatio atrox. Claustrum aperte celer conor desino abbas.',5,'verbum unde aveho','2024-08-19 23:06:47'),(39,'Incredible Bronze Keyboard','Tres tergiversatio correptius carus laboriosam aveho caritas. Ager beatus valeo acsi clarus denique comminor antea tantum totam. Supellex vacuus bibo asper minima cuius.',5,'caelestis vae carcer','2024-08-19 23:06:47');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `item_id` (`item_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`),
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (17,18,10,'2024-08-19 22:01:14'),(22,18,10,'2024-08-19 23:06:47'),(29,15,9,'2024-08-19 23:06:47'),(31,12,8,'2024-08-19 23:06:47'),(36,9,8,'2024-08-19 23:06:47'),(38,15,6,'2024-08-19 23:06:47'),(40,15,7,'2024-08-19 23:06:47'),(45,28,22,'2024-08-22 10:37:16'),(46,28,22,'2024-08-22 10:37:17');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'VilmaVeum','Columbus15@hotmail.com','2ACUXW1_4YCuH9X','2024-08-19 22:01:14','user'),(6,'LaverneEmmerich','Emanuel_Jenkins69@hotmail.com','i4xqVssmjXYyXAP','2024-08-19 22:01:14','user'),(7,'LeslieBauch','Ludie.Jacobs7@hotmail.com','m7jnvwavkok_iJJ','2024-08-19 22:01:14','user'),(8,'BarryJenkins','Laurine95@hotmail.com','9s1zi8a8WH5hQiZ','2024-08-19 22:01:14','user'),(9,'KatelynKutch','Roel.Kuhn92@hotmail.com','6TV2eEIDjyD1csD','2024-08-19 22:01:14','user'),(10,'AddiePagac-Ruecker','Syble_Lebsack@gmail.com','ZcEcKG8SZvrvR_9','2024-08-19 22:01:14','user'),(11,'ElwinGoldner','Doug32@yahoo.com','wbfWoFDXj5ZqghI','2024-08-19 22:01:14','user'),(12,'MalloryMarquardt','Garrison.Nader@yahoo.com','Gkjy7HZ1U_v47sS','2024-08-19 23:06:47','user'),(13,'WillieLakin','Lola.Feeney@gmail.com','shMJOkfGFIpFPOm','2024-08-19 23:06:47','user'),(14,'AbrahamFranecki-Schmitt','Oceane_Pagac@yahoo.com','nSFpNxf60K6y8N6','2024-08-19 23:06:47','user'),(15,'KamilleBashirian','Melvina.Ebert@yahoo.com','L5WOZ4MNl6K9QTq','2024-08-19 23:06:47','user'),(16,'OttisRunolfsdottir','Brain.Von@yahoo.com','FVNdckXWmDv_tTW','2024-08-19 23:06:47','user'),(17,'WilhelmineKoepp','Prince_Herzog@yahoo.com','yxjey3xGQgeTsRj','2024-08-19 23:06:47','user'),(18,'ReedKuhlman','Lisandro19@gmail.com','iJffpC4EYWnZBRi','2024-08-19 23:06:47','user'),(19,'HassieSchuster','Caesar.Stanton24@hotmail.com','tHCPs9tsNALNfKF','2024-08-19 23:06:47','user'),(20,'SydniGottlieb','Kevin.Turcotte26@yahoo.com','02qlLXZOVhllkvq','2024-08-19 23:06:47','user'),(21,'CecilGreen','Coralie37@hotmail.com','VKJpcrP8jQBLnZz','2024-08-19 23:06:47','user'),(22,'test1','test1@test.com','$2b$10$xid9ZRXm91hpD/JAW5Z4IO4p8.IVDL9rln3KXZbO/Fbx2dgsRxWHS','2024-08-21 17:32:05','user'),(23,'test2','test2@test.com','$2b$10$VfSgbDe35AXSA/0.poQ/G.F3QF6uRf3iGkelC9j0mRaoKOVNLSC3W','2024-08-22 17:21:20','user'),(25,'test3','test3@test.com','$2b$10$F4BSLXrNHuSEI1Ynakgr0.V9dqETFJXaXfNmIjDh3ET5bjiFaZ22O','2024-08-22 17:59:36','admin'),(26,'ArturoLora','arturolorabaritone@gmail.com','$2b$10$sqfBbBuIcQUVWgXfkO3KAe37efvsWR8DX5Y4Rdx5XbBXuqcZGVVxe','2024-08-22 18:05:57','admin'),(27,'test4','test4@test.com','$2b$10$9Ckz2V8k36YCyCBc9XOzsu6nVMjb8sHE6P9lW.A.NCW2IuN20TSym','2024-08-22 18:08:11','user'),(28,'test5','test5@test.com','$2b$10$JsBGQ15CJcXTNHKcsotJQ.t06UYyickv0NktqfM9hLX5JY8bRNVia','2024-08-22 18:36:01','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-22 18:28:33
