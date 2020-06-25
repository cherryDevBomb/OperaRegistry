create schema registrydb;
use registrydb;


-- ************************************** `user`

CREATE TABLE `user`
(
    `userid`                int NOT NULL AUTO_INCREMENT ,
    `firstname`             nvarchar(255) NOT NULL ,
    `lastname`              nvarchar(255) NOT NULL ,
    `email`                 nvarchar(255) NOT NULL UNIQUE ,
    `password`              nvarchar(255) NOT NULL ,
    `department`            nvarchar(255) NOT NULL ,
    `role`                  nvarchar(255) NOT NULL ,
    `registrationconfirmed` boolean NOT NULL,

    PRIMARY KEY (`userid`)
);


-- ************************************** `document`

CREATE TABLE `document`
(
    `registrynumber`     int NOT NULL ,
    `createddate`        datetime NOT NULL ,
    `title`              nvarchar(512) NOT NULL ,
    `type`               nvarchar(255) NOT NULL ,
    `createdby`          int NOT NULL ,
    `origin`             nvarchar(255) NULL ,
    `archived`           boolean NOT NULL ,
    `archivingmessage`   nvarchar(255) NULL ,
    `archivingdate`      datetime NULL ,

    PRIMARY KEY (`registrynumber`),
    KEY `fkIdx_80` (`createdby`),
    CONSTRAINT `FK_80` FOREIGN KEY `fkIdx_80` (`createdby`) REFERENCES `user` (`userid`)
);


-- ************************************** `documenthistory`

CREATE TABLE `documenthistory`
(
    `documenthistoryid` int NOT NULL AUTO_INCREMENT ,
    `registrynumber`    int NOT NULL ,
    `sentdate`          datetime NOT NULL ,
    `sender`            int NOT NULL ,
    `sentmessage`       nvarchar(512) NULL ,
    `internalrecipient` int NULL ,
    `externalrecipient` nvarchar(512) NULL ,
    `resolved`          boolean NOT NULL ,
    `resolvedmessage`   nvarchar(512) NULL ,
    `resolveddate`      datetime NULL ,

    PRIMARY KEY (`documenthistoryid`),
    KEY `fkIdx_100` (`internalrecipient`),
    CONSTRAINT `FK_100` FOREIGN KEY `fkIdx_100` (`internalrecipient`) REFERENCES `user` (`userid`),
    KEY `fkIdx_23` (`registrynumber`),
    CONSTRAINT `FK_23` FOREIGN KEY `fkIdx_23` (`registrynumber`) REFERENCES `document` (`registrynumber`),
    KEY `fkIdx_97` (`sender`),
    CONSTRAINT `FK_97` FOREIGN KEY `fkIdx_97` (`sender`) REFERENCES `user` (`userid`)
);

-- ************************************** `documentfile`

CREATE TABLE `documentfile`
(
    `documentfileid` int NOT NULL AUTO_INCREMENT ,
    `registrynumber` int NOT NULL ,
    `file`           longblob NULL ,
    `uploaddate`     datetime NOT NULL ,
    `uploader`       int NOT NULL ,
    `filename`       nvarchar(255),

    PRIMARY KEY (`documentfileid`),
    KEY `fkIdx_112` (`registrynumber`),
    CONSTRAINT `FK_112` FOREIGN KEY `fkIdx_112` (`registrynumber`) REFERENCES `document` (`registrynumber`),
    KEY `fkIdx_113` (`uploader`),
    CONSTRAINT `FK_113` FOREIGN KEY `fkIdx_113` (`uploader`) REFERENCES `user` (`userid`)
);
