/*
 Navicat Premium Data Transfer

 Source Server         : vts-posgres
 Source Server Type    : PostgreSQL
 Source Server Version : 140001
 Source Host           : vtsign.tech:5432
 Source Catalog        : coviddb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140001
 File Encoding         : 65001

 Date: 22/12/2021 09:30:21
*/


-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS "public"."account";
CREATE TABLE "public"."account" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "balance" int8 NOT NULL,
  "blocked" bool NOT NULL,
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "role" varchar(255) COLLATE "pg_catalog"."default",
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "patient_id" int8
)
;

-- ----------------------------
-- Table structure for account_histories
-- ----------------------------
DROP TABLE IF EXISTS "public"."account_histories";
CREATE TABLE "public"."account_histories" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "action" varchar(255) COLLATE "pg_catalog"."default",
  "created_date" timestamp(6),
  "account_id" int8
)
;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS "public"."category";
CREATE TABLE "public"."category" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "limit_person" int4 NOT NULL,
  "limit_time" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for district
-- ----------------------------
DROP TABLE IF EXISTS "public"."district";
CREATE TABLE "public"."district" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "province_id" int8
)
;

-- ----------------------------
-- Table structure for hospital
-- ----------------------------
DROP TABLE IF EXISTS "public"."hospital";
CREATE TABLE "public"."hospital" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "current_size" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "size" int4 NOT NULL,
  "district_id" int8,
  "province_id" int8,
  "ward_id" int8
)
;

-- ----------------------------
-- Table structure for hospital_histories
-- ----------------------------
DROP TABLE IF EXISTS "public"."hospital_histories";
CREATE TABLE "public"."hospital_histories" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "export_time" timestamp(6),
  "hospital_name" varchar(255) COLLATE "pg_catalog"."default",
  "import_time" timestamp(6),
  "patient_id" int8
)
;

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS "public"."image";
CREATE TABLE "public"."image" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "path" varchar(255) COLLATE "pg_catalog"."default",
  "product_id" int8
)
;

-- ----------------------------
-- Table structure for order_product
-- ----------------------------
DROP TABLE IF EXISTS "public"."order_product";
CREATE TABLE "public"."order_product" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "quantity" int4 NOT NULL,
  "order_id" int8,
  "product_id" int8
)
;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS "public"."orders";
CREATE TABLE "public"."orders" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "created_time" timestamp(6),
  "total_amount" float4 NOT NULL,
  "total_product" int4 NOT NULL,
  "category_id" int8,
  "patient_id" int8
)
;

-- ----------------------------
-- Table structure for patient
-- ----------------------------
DROP TABLE IF EXISTS "public"."patient";
CREATE TABLE "public"."patient" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "credit" int8 NOT NULL,
  "debt" int8 NOT NULL,
  "dob" int4 NOT NULL,
  "identity" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "payment_min" int8 NOT NULL,
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "district_id" int8,
  "hospital_id" int8,
  "parent_id" int8,
  "province_id" int8,
  "ward_id" int8
)
;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS "public"."product";
CREATE TABLE "public"."product" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "amount" float4,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "unit" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for product_categories
-- ----------------------------
DROP TABLE IF EXISTS "public"."product_categories";
CREATE TABLE "public"."product_categories" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "limit_product" int4 NOT NULL,
  "category_id" int8,
  "product_id" int8
)
;

-- ----------------------------
-- Table structure for province
-- ----------------------------
DROP TABLE IF EXISTS "public"."province";
CREATE TABLE "public"."province" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Table structure for status_histories
-- ----------------------------
DROP TABLE IF EXISTS "public"."status_histories";
CREATE TABLE "public"."status_histories" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "destination" varchar(255) COLLATE "pg_catalog"."default",
  "source" varchar(255) COLLATE "pg_catalog"."default",
  "patient_id" int8
)
;

-- ----------------------------
-- Table structure for transaction_histories
-- ----------------------------
DROP TABLE IF EXISTS "public"."transaction_histories";
CREATE TABLE "public"."transaction_histories" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "amount" float8 NOT NULL,
  "created_date" timestamp(6),
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "method" varchar(255) COLLATE "pg_catalog"."default",
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "patient_id" int8
)
;

-- ----------------------------
-- Table structure for ward
-- ----------------------------
DROP TABLE IF EXISTS "public"."ward";
CREATE TABLE "public"."ward" (
  "id" int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "district_id" int8
)
;

-- ----------------------------
-- Primary Key structure for table account
-- ----------------------------
ALTER TABLE "public"."account" ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table account_histories
-- ----------------------------
ALTER TABLE "public"."account_histories" ADD CONSTRAINT "account_histories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table category
-- ----------------------------
ALTER TABLE "public"."category" ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table district
-- ----------------------------
ALTER TABLE "public"."district" ADD CONSTRAINT "district_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table hospital
-- ----------------------------
ALTER TABLE "public"."hospital" ADD CONSTRAINT "hospital_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table hospital_histories
-- ----------------------------
ALTER TABLE "public"."hospital_histories" ADD CONSTRAINT "hospital_histories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table image
-- ----------------------------
ALTER TABLE "public"."image" ADD CONSTRAINT "image_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table order_product
-- ----------------------------
ALTER TABLE "public"."order_product" ADD CONSTRAINT "order_product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table patient
-- ----------------------------
ALTER TABLE "public"."patient" ADD CONSTRAINT "patient_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product_categories
-- ----------------------------
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "product_category_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table province
-- ----------------------------
ALTER TABLE "public"."province" ADD CONSTRAINT "province_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table status_histories
-- ----------------------------
ALTER TABLE "public"."status_histories" ADD CONSTRAINT "status_histories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table transaction_histories
-- ----------------------------
ALTER TABLE "public"."transaction_histories" ADD CONSTRAINT "transaction_histories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table ward
-- ----------------------------
ALTER TABLE "public"."ward" ADD CONSTRAINT "ward_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table account
-- ----------------------------
ALTER TABLE "public"."account" ADD CONSTRAINT "fkqeqbft17ojmddumyd99fkyehg" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table account_histories
-- ----------------------------
ALTER TABLE "public"."account_histories" ADD CONSTRAINT "fkbjcn111gt8i12uu5owwcf11yh" FOREIGN KEY ("account_id") REFERENCES "public"."account" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table district
-- ----------------------------
ALTER TABLE "public"."district" ADD CONSTRAINT "fk276utu38g5lgqeth6pwfm3rw2" FOREIGN KEY ("province_id") REFERENCES "public"."province" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table hospital
-- ----------------------------
ALTER TABLE "public"."hospital" ADD CONSTRAINT "fkm6ixsb5opmtkq4oy788d0eqku" FOREIGN KEY ("ward_id") REFERENCES "public"."ward" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."hospital" ADD CONSTRAINT "fkqh0w6y6qr5q1h8eia74uuxc1y" FOREIGN KEY ("province_id") REFERENCES "public"."province" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."hospital" ADD CONSTRAINT "fktgak2rgvr12h50jmemj4ec3eb" FOREIGN KEY ("district_id") REFERENCES "public"."district" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table hospital_histories
-- ----------------------------
ALTER TABLE "public"."hospital_histories" ADD CONSTRAINT "fkj5uwog9fs87jpx6yu6x6h09c2" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table image
-- ----------------------------
ALTER TABLE "public"."image" ADD CONSTRAINT "fkgpextbyee3uk9u6o2381m7ft1" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table order_product
-- ----------------------------
ALTER TABLE "public"."order_product" ADD CONSTRAINT "fkhnfgqyjx3i80qoymrssls3kno" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."order_product" ADD CONSTRAINT "fkl5mnj9n0di7k1v90yxnthkc73" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "fk6161shkjqug4b2dsdu5g3emyl" FOREIGN KEY ("category_id") REFERENCES "public"."category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."orders" ADD CONSTRAINT "fkgrc0y8p5nsfxonpp4xolxxglc" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table patient
-- ----------------------------
ALTER TABLE "public"."patient" ADD CONSTRAINT "fk5u7hgucxoppt13cnq6d1jku73" FOREIGN KEY ("parent_id") REFERENCES "public"."patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."patient" ADD CONSTRAINT "fk8ena1rkb5kdlhqalyfxif5hk1" FOREIGN KEY ("province_id") REFERENCES "public"."province" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."patient" ADD CONSTRAINT "fkfrtkp1fawf55kilsxb1uxpio0" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."patient" ADD CONSTRAINT "fkj8tcgt32iya29rfi0fkju88yf" FOREIGN KEY ("district_id") REFERENCES "public"."district" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."patient" ADD CONSTRAINT "fkl1wwwexsf24hcuxbxy3og8gqn" FOREIGN KEY ("ward_id") REFERENCES "public"."ward" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table product_categories
-- ----------------------------
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "fk2k3smhbruedlcrvu6clued06x" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."product_categories" ADD CONSTRAINT "fkkud35ls1d40wpjb5htpp14q4e" FOREIGN KEY ("category_id") REFERENCES "public"."category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table status_histories
-- ----------------------------
ALTER TABLE "public"."status_histories" ADD CONSTRAINT "fkek3mho1vf61shs6tvkq7mnvid" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table transaction_histories
-- ----------------------------
ALTER TABLE "public"."transaction_histories" ADD CONSTRAINT "fk159xvvg1igw4djabuq50k5if6" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table ward
-- ----------------------------
ALTER TABLE "public"."ward" ADD CONSTRAINT "fkslko72wj5nauqvsgefqkvwpsb" FOREIGN KEY ("district_id") REFERENCES "public"."district" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
