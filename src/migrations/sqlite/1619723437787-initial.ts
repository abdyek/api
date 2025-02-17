import { MigrationInterface, QueryRunner } from 'typeorm'

export class initial1619723437787 implements MigrationInterface {
  name = 'initial1619723437787'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "page" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "show" boolean NOT NULL, "title" varchar, "paragraph" text, "buttonText" varchar)');
    await queryRunner.query('CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar, "lastName" varchar, "email" varchar(255) NOT NULL, "username" varchar(255) NOT NULL, "passwordHash" varchar NOT NULL, "salt" varchar, "provider" varchar NOT NULL, "roles" text NOT NULL, "language" varchar NOT NULL, "resetPasswordToken" varchar, "resetPasswordExpires" datetime, "token" varchar, "apiKey" varchar, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "lastModified" datetime NOT NULL DEFAULT (datetime(\'now\')), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))');
    await queryRunner.query('CREATE TABLE "form_field_logic" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "formula" varchar NOT NULL, "action" varchar(10) NOT NULL, "visible" boolean, "require" boolean, "disable" boolean, "enabled" boolean NOT NULL, "fieldId" integer, "jumpToId" integer, CONSTRAINT "FK_6098b83f6759445d8cfdd03d545" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4a8019f2b753cfb3216dc3001a6" FOREIGN KEY ("jumpToId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('CREATE TABLE "form_field_option" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "key" varchar, "title" varchar, "value" varchar NOT NULL, "fieldId" integer, CONSTRAINT "FK_c4484ad12c2c56db31dffdbfe97" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('CREATE TABLE "form_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" text NOT NULL, "slug" varchar, "required" boolean NOT NULL, "disabled" boolean NOT NULL, "type" varchar NOT NULL, "value" varchar NOT NULL, "formId" integer, "ratingSteps" integer, "ratingShape" varchar, CONSTRAINT "FK_2d83d8a334dd66445db13f92b77" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('CREATE TABLE "form_hook" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "enabled" boolean NOT NULL, "url" varchar NOT NULL, "format" varchar, "formId" integer, CONSTRAINT "FK_bbeb4d224d8857fd5a458538a30" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('CREATE TABLE "form_notification" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "subject" varchar, "htmlTemplate" varchar, "enabled" boolean NOT NULL, "toEmail" varchar, "fromEmail" varchar, "formId" integer, "fromFieldId" integer, "toFieldId" integer, CONSTRAINT "FK_a9ed55144108ded893b502d6321" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_0876741ce2acdaee4553d7a3bbd" FOREIGN KEY ("fromFieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_4915ebae53e09b732322d0ff6ed" FOREIGN KEY ("toFieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('CREATE TABLE "page_button" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "url" varchar, "action" varchar, "text" varchar NOT NULL, "bgColor" varchar, "activeColor" varchar, "color" varchar, "pageId" integer, CONSTRAINT "FK_d9f099286b75fa0034dcd8cf7c2" FOREIGN KEY ("pageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('CREATE TABLE "submission_field" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fieldType" varchar NOT NULL, "fieldValue" varchar NOT NULL, "submissionId" integer, "fieldId" integer, CONSTRAINT "FK_16fae661ce5b10f27abe2e524a0" FOREIGN KEY ("submissionId") REFERENCES "submission" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_5befa92da2370b7eb1cab6ae30a" FOREIGN KEY ("fieldId") REFERENCES "form_field" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('CREATE TABLE "form_visitor" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "referrer" varchar, "ipAddr" varchar NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "updated" datetime NOT NULL DEFAULT (datetime(\'now\')), "formId" integer, "geoLocationCountry" varchar, "geoLocationCity" varchar, "deviceLanguage" varchar, "deviceType" varchar, "deviceName" varchar, CONSTRAINT "FK_72ade6c3a3e55d1fce94300f8b6" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
    await queryRunner.query('CREATE TABLE "submission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "ipAddr" varchar NOT NULL, "tokenHash" varchar NOT NULL, "timeElapsed" numeric NOT NULL, "percentageComplete" numeric NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "lastModified" datetime NOT NULL DEFAULT (datetime(\'now\')), "formId" integer, "visitorId" integer, "userId" integer, "geoLocationCountry" varchar, "geoLocationCity" varchar, "deviceLanguage" varchar, "deviceType" varchar, "deviceName" varchar, CONSTRAINT "FK_6090e1d5cbf3433ffd14e3b53e7" FOREIGN KEY ("formId") REFERENCES "form" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_95b73c7faf2c199f005fda5e8c8" FOREIGN KEY ("visitorId") REFERENCES "form_visitor" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7bd626272858ef6464aa2579094" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');




    await queryRunner.query('CREATE TABLE "form" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "language" varchar(10) NOT NULL, "showFooter" boolean NOT NULL, "isLive" boolean NOT NULL, "created" datetime NOT NULL DEFAULT (datetime(\'now\')), "lastModified" datetime NOT NULL DEFAULT (datetime(\'now\')), "adminId" integer, "startPageId" integer, "endPageId" integer, "analyticsGacode" varchar, "designFont" varchar, "designColorsBackground" varchar, "designColorsQuestion" varchar, "designColorsAnswer" varchar, "designColorsButton" varchar, "designColorsButtonactive" varchar, "designColorsButtontext" varchar, CONSTRAINT "FK_a7cb33580bca2b362e5e34fdfcd" FOREIGN KEY ("adminId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_023d9cf1d97e93facc96c86ca70" FOREIGN KEY ("startPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e5d158932e43cfbf9958931ee01" FOREIGN KEY ("endPageId") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "form"');
    await queryRunner.query('DROP TABLE "submission"');
    await queryRunner.query('DROP TABLE "form_visitor"');
    await queryRunner.query('DROP TABLE "user"');
    await queryRunner.query('DROP TABLE "submission_field"');
    await queryRunner.query('DROP TABLE "page"');
    await queryRunner.query('DROP TABLE "page_button"');
    await queryRunner.query('DROP TABLE "form_notification"');
    await queryRunner.query('DROP TABLE "form_hook"');
    await queryRunner.query('DROP TABLE "form_field"');
    await queryRunner.query('DROP TABLE "form_field_option"');
    await queryRunner.query('DROP TABLE "form_field_logic"');
  }
}
