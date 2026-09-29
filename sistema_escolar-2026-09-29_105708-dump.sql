-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sistema_escolar
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `aluno_disciplinas`
--

DROP TABLE IF EXISTS `aluno_disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno_disciplinas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aluno_id` int NOT NULL,
  `disciplina_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_aluno_disciplina` (`aluno_id`,`disciplina_id`),
  KEY `idx_aluno_disciplinas_aluno` (`aluno_id`),
  KEY `idx_aluno_disciplinas_disciplina` (`disciplina_id`),
  CONSTRAINT `fk_aluno_disciplinas_aluno` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_aluno_disciplinas_disciplina` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno_disciplinas`
--

LOCK TABLES `aluno_disciplinas` WRITE;
/*!40000 ALTER TABLE `aluno_disciplinas` DISABLE KEYS */;
INSERT INTO `aluno_disciplinas` VALUES (1,1,1),(2,1,2),(3,1,4),(4,1,5),(5,2,1),(6,2,2),(7,2,4),(8,2,5);
/*!40000 ALTER TABLE `aluno_disciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alunos`
--

DROP TABLE IF EXISTS `alunos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alunos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `serie` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cpf` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `endereco` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `turma_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_aluno_cpf` (`cpf`),
  KEY `idx_alunos_turma` (`turma_id`),
  CONSTRAINT `fk_alunos_turma` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alunos`
--

LOCK TABLES `alunos` WRITE;
/*!40000 ALTER TABLE `alunos` DISABLE KEYS */;
INSERT INTO `alunos` VALUES (1,'João da Silva','joao@email.com','2009-05-10','1º Ano',NULL,NULL,NULL,1),(2,'Maria Santos','maria@email.com','2009-08-15','1º Ano',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `alunos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auditoria`
--

DROP TABLE IF EXISTS `auditoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int DEFAULT NULL,
  `usuario_nome` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `perfil` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `operacao` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recurso` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `recurso_id` int DEFAULT NULL,
  `detalhes` text COLLATE utf8mb4_unicode_ci,
  `criado_em` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_auditoria_criado_em` (`criado_em`),
  KEY `idx_auditoria_operacao` (`operacao`),
  KEY `idx_auditoria_recurso` (`recurso`),
  KEY `idx_auditoria_usuario` (`usuario_id`),
  KEY `idx_auditoria_perfil` (`perfil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditoria`
--

LOCK TABLES `auditoria` WRITE;
/*!40000 ALTER TABLE `auditoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `auditoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chamadas`
--

DROP TABLE IF EXISTS `chamadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chamadas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `professor_id` int NOT NULL,
  `turma_id` int NOT NULL,
  `disciplina_id` int NOT NULL,
  `data_aula` date NOT NULL,
  `quantidade_aulas` int NOT NULL DEFAULT '1',
  `titulo_plano` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_chamadas_professor` (`professor_id`),
  KEY `idx_chamadas_turma` (`turma_id`),
  KEY `idx_chamadas_disciplina` (`disciplina_id`),
  CONSTRAINT `fk_chamadas_disciplina` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_chamadas_professor` FOREIGN KEY (`professor_id`) REFERENCES `professores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_chamadas_turma` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chamadas`
--

LOCK TABLES `chamadas` WRITE;
/*!40000 ALTER TABLE `chamadas` DISABLE KEYS */;
/*!40000 ALTER TABLE `chamadas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disciplinas`
--

DROP TABLE IF EXISTS `disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disciplinas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_disciplina_nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplinas`
--

LOCK TABLES `disciplinas` WRITE;
/*!40000 ALTER TABLE `disciplinas` DISABLE KEYS */;
INSERT INTO `disciplinas` VALUES (1,'Português','Língua Portuguesa'),(2,'Matemática','Matemática'),(3,'Inglês','Língua Inglesa'),(4,'Programação','Desenvolvimento de Sistemas'),(5,'Banco de Dados','Banco de Dados'),(6,'Desenvolvimento Web','Desenvolvimento Web');
/*!40000 ALTER TABLE `disciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frequencias`
--

DROP TABLE IF EXISTS `frequencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frequencias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aluno_id` int NOT NULL,
  `chamada_id` int DEFAULT NULL,
  `numero_aula` int DEFAULT NULL,
  `data_aula` date NOT NULL,
  `presente` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_frequencia_chamada_aula` (`chamada_id`,`aluno_id`,`numero_aula`),
  KEY `idx_frequencias_aluno` (`aluno_id`),
  KEY `idx_frequencias_data` (`data_aula`),
  CONSTRAINT `fk_frequencias_aluno` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_frequencias_chamada` FOREIGN KEY (`chamada_id`) REFERENCES `chamadas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frequencias`
--

LOCK TABLES `frequencias` WRITE;
/*!40000 ALTER TABLE `frequencias` DISABLE KEYS */;
INSERT INTO `frequencias` VALUES (1,1,NULL,1,'2026-08-26',1),(2,1,NULL,1,'2026-08-27',1),(3,1,NULL,1,'2026-08-28',0),(4,2,NULL,1,'2026-08-26',1),(5,2,NULL,1,'2026-08-27',0),(6,2,NULL,1,'2026-08-28',1);
/*!40000 ALTER TABLE `frequencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notas`
--

DROP TABLE IF EXISTS `notas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `aluno_id` int NOT NULL,
  `disciplina_id` int NOT NULL,
  `bimestre` int NOT NULL,
  `nota` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_nota_aluno_disciplina_bimestre` (`aluno_id`,`disciplina_id`,`bimestre`),
  KEY `idx_notas_aluno` (`aluno_id`),
  KEY `idx_notas_disciplina` (`disciplina_id`),
  CONSTRAINT `fk_notas_aluno` FOREIGN KEY (`aluno_id`) REFERENCES `alunos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_notas_disciplina` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_bimestre` CHECK ((`bimestre` between 1 and 4)),
  CONSTRAINT `chk_nota` CHECK ((`nota` between 0 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notas`
--

LOCK TABLES `notas` WRITE;
/*!40000 ALTER TABLE `notas` DISABLE KEYS */;
INSERT INTO `notas` VALUES (1,1,1,1,8.50),(2,1,2,1,7.00),(3,1,4,1,9.00),(4,1,5,1,8.00),(5,2,1,1,9.00),(6,2,2,1,8.50);
/*!40000 ALTER TABLE `notas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor_disciplinas`
--

DROP TABLE IF EXISTS `professor_disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor_disciplinas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `professor_id` int NOT NULL,
  `disciplina_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_professor_disciplina` (`professor_id`,`disciplina_id`),
  KEY `idx_professor_disciplinas_professor` (`professor_id`),
  KEY `idx_professor_disciplinas_disciplina` (`disciplina_id`),
  CONSTRAINT `fk_professor_disciplinas_disciplina` FOREIGN KEY (`disciplina_id`) REFERENCES `disciplinas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_professor_disciplinas_professor` FOREIGN KEY (`professor_id`) REFERENCES `professores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor_disciplinas`
--

LOCK TABLES `professor_disciplinas` WRITE;
/*!40000 ALTER TABLE `professor_disciplinas` DISABLE KEYS */;
INSERT INTO `professor_disciplinas` VALUES (1,2,4),(2,2,5),(3,3,1),(4,3,3),(5,4,2),(6,4,6);
/*!40000 ALTER TABLE `professor_disciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professores`
--

DROP TABLE IF EXISTS `professores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `senha` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `turma_id` int DEFAULT NULL,
  `perfil` enum('professor','admin','aluno') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'professor',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_professor_email` (`email`),
  UNIQUE KEY `uk_professor_usuario` (`usuario`),
  KEY `idx_professores_turma` (`turma_id`),
  CONSTRAINT `fk_professores_turma` FOREIGN KEY (`turma_id`) REFERENCES `turmas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professores`
--

LOCK TABLES `professores` WRITE;
/*!40000 ALTER TABLE `professores` DISABLE KEYS */;
INSERT INTO `professores` VALUES (1,'Administrador','admin@escola.com','(11) 99999-0000','admin','admin123',NULL,'admin'),(2,'Carlos Mendes','carlos.mendes@escola.com','(11) 99999-0001','carlos','123456',1,'professor'),(3,'Ana Oliveira','ana.oliveira@escola.com','(11) 99999-0002','ana','123456',2,'professor'),(4,'Ricardo Souza','ricardo.souza@escola.com','(11) 99999-0003','ricardo','123456',NULL,'professor');
/*!40000 ALTER TABLE `professores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turmas`
--

DROP TABLE IF EXISTS `turmas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turmas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serie` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ano` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_turma_nome_ano` (`nome`,`ano`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmas`
--

LOCK TABLES `turmas` WRITE;
/*!40000 ALTER TABLE `turmas` DISABLE KEYS */;
INSERT INTO `turmas` VALUES (1,'1º DS A','1º Ano',2026),(2,'2º DS A','2º Ano',2026),(3,'3º DS A','3º Ano',2026);
/*!40000 ALTER TABLE `turmas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-29 10:57:08
