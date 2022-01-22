/*
 Navicat Premium Data Transfer

 Source Server         : vtsign.tech
 Source Server Type    : PostgreSQL
 Source Server Version : 140001
 Source Host           : vtsign.tech:5432
 Source Catalog        : coviddb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140001
 File Encoding         : 65001

 Date: 21/01/2022 09:45:13
*/


-- ----------------------------
-- Sequence structure for account_histories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."account_histories_id_seq";
CREATE SEQUENCE "public"."account_histories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for account_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."account_id_seq";
CREATE SEQUENCE "public"."account_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for cart_item_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."cart_item_id_seq";
CREATE SEQUENCE "public"."cart_item_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for category_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."category_id_seq";
CREATE SEQUENCE "public"."category_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for district_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."district_id_seq";
CREATE SEQUENCE "public"."district_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for hospital_histories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."hospital_histories_id_seq";
CREATE SEQUENCE "public"."hospital_histories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for hospital_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."hospital_id_seq";
CREATE SEQUENCE "public"."hospital_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for image_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."image_id_seq";
CREATE SEQUENCE "public"."image_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for notification_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."notification_id_seq";
CREATE SEQUENCE "public"."notification_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for order_product_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."order_product_id_seq";
CREATE SEQUENCE "public"."order_product_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for orders_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."orders_id_seq";
CREATE SEQUENCE "public"."orders_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for patient_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."patient_id_seq";
CREATE SEQUENCE "public"."patient_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for product_categories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_categories_id_seq";
CREATE SEQUENCE "public"."product_categories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for product_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."product_id_seq";
CREATE SEQUENCE "public"."product_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for province_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."province_id_seq";
CREATE SEQUENCE "public"."province_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for status_histories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."status_histories_id_seq";
CREATE SEQUENCE "public"."status_histories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for transaction_histories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."transaction_histories_id_seq";
CREATE SEQUENCE "public"."transaction_histories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for ward_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."ward_id_seq";
CREATE SEQUENCE "public"."ward_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

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
  "balance" int8,
  "blocked" bool,
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
  "created_date" timestamptz(6),
  "account_id" int8
)
;

-- ----------------------------
-- Table structure for cart_item
-- ----------------------------
DROP TABLE IF EXISTS "public"."cart_item";
CREATE TABLE "public"."cart_item" (
  "id" int4 NOT NULL DEFAULT nextval('cart_item_id_seq'::regclass),
  "category_id" int8,
  "patient_id" int8
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
  "name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
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
  "export_time" timestamptz(6),
  "hospital_name" varchar(255) COLLATE "pg_catalog"."default",
  "import_time" timestamptz(6),
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
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS "public"."notification";
CREATE TABLE "public"."notification" (
  "id" int4 NOT NULL DEFAULT nextval('notification_id_seq'::regclass),
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "patient_id" int4,
  "created_date" timestamptz(6) DEFAULT '2022-01-20 15:05:00.184+00'::timestamp with time zone,
  "view" bool DEFAULT false
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
  "product_id" int8,
  "category_id" int8,
  "amount" int8 NOT NULL
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
  "created_time" timestamptz(6),
  "patient_id" int8,
  "total_amount" int8,
  "total_category" int8
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
  "credit" int8,
  "debt" int8,
  "identity" varchar(255) COLLATE "pg_catalog"."default",
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "payment_min" int8,
  "status" varchar(255) COLLATE "pg_catalog"."default",
  "district_id" int8,
  "hospital_id" int8,
  "parent_id" int8,
  "province_id" int8,
  "ward_id" int8,
  "dob" timestamp(6) NOT NULL,
  "create_date" timestamptz(6),
  "modified_date" timestamptz(6)
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
  "patient_id" int8,
  "created_date" timestamptz(6)
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
  "created_date" timestamptz(6),
  "description" varchar(255) COLLATE "pg_catalog"."default",
  "patient_id" int8,
  "code" varchar(255) COLLATE "pg_catalog"."default"
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
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."account_histories_id_seq"
OWNED BY "public"."account_histories"."id";
SELECT setval('"public"."account_histories_id_seq"', 67, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."account_id_seq"
OWNED BY "public"."account"."id";
SELECT setval('"public"."account_id_seq"', 36, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."cart_item_id_seq"
OWNED BY "public"."cart_item"."id";
SELECT setval('"public"."cart_item_id_seq"', 35, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."category_id_seq"
OWNED BY "public"."category"."id";
SELECT setval('"public"."category_id_seq"', 9, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."district_id_seq"
OWNED BY "public"."district"."id";
SELECT setval('"public"."district_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."hospital_histories_id_seq"
OWNED BY "public"."hospital_histories"."id";
SELECT setval('"public"."hospital_histories_id_seq"', 26, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."hospital_id_seq"
OWNED BY "public"."hospital"."id";
SELECT setval('"public"."hospital_id_seq"', 9, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."image_id_seq"
OWNED BY "public"."image"."id";
SELECT setval('"public"."image_id_seq"', 57, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."notification_id_seq"
OWNED BY "public"."notification"."id";
SELECT setval('"public"."notification_id_seq"', 59, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."order_product_id_seq"
OWNED BY "public"."order_product"."id";
SELECT setval('"public"."order_product_id_seq"', 43, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."orders_id_seq"
OWNED BY "public"."orders"."id";
SELECT setval('"public"."orders_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."patient_id_seq"
OWNED BY "public"."patient"."id";
SELECT setval('"public"."patient_id_seq"', 27, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_categories_id_seq"
OWNED BY "public"."product_categories"."id";
SELECT setval('"public"."product_categories_id_seq"', 28, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."product_id_seq"
OWNED BY "public"."product"."id";
SELECT setval('"public"."product_id_seq"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."province_id_seq"
OWNED BY "public"."province"."id";
SELECT setval('"public"."province_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."status_histories_id_seq"
OWNED BY "public"."status_histories"."id";
SELECT setval('"public"."status_histories_id_seq"', 11, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."transaction_histories_id_seq"
OWNED BY "public"."transaction_histories"."id";
SELECT setval('"public"."transaction_histories_id_seq"', 16, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."ward_id_seq"
OWNED BY "public"."ward"."id";
SELECT setval('"public"."ward_id_seq"', 2, false);

-- ----------------------------
-- Primary Key structure for table account
-- ----------------------------
ALTER TABLE "public"."account" ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table account_histories
-- ----------------------------
ALTER TABLE "public"."account_histories" ADD CONSTRAINT "account_histories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table cart_item
-- ----------------------------
ALTER TABLE "public"."cart_item" ADD CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id");

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
-- Primary Key structure for table notification
-- ----------------------------
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table order_product
-- ----------------------------
ALTER TABLE "public"."order_product" ADD CONSTRAINT "order_product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table patient
-- ----------------------------
ALTER TABLE "public"."patient" ADD CONSTRAINT "CMND" UNIQUE ("identity");

-- ----------------------------
-- Primary Key structure for table patient
-- ----------------------------
ALTER TABLE "public"."patient" ADD CONSTRAINT "patient_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table product
-- ----------------------------
ALTER TABLE "public"."product" ADD CONSTRAINT "product_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table product_categories
-- ----------------------------
CREATE UNIQUE INDEX "product_categories_pkey" ON "public"."product_categories" USING btree (
  "id" "pg_catalog"."int8_ops" ASC NULLS LAST
);

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
ALTER TABLE "public"."account" ADD CONSTRAINT "account_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table account_histories
-- ----------------------------
ALTER TABLE "public"."account_histories" ADD CONSTRAINT "account_histories_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "public"."account" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table cart_item
-- ----------------------------
ALTER TABLE "public"."cart_item" ADD CONSTRAINT "cart_item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."cart_item" ADD CONSTRAINT "cart_item_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table district
-- ----------------------------
ALTER TABLE "public"."district" ADD CONSTRAINT "district_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "public"."province" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table hospital
-- ----------------------------
ALTER TABLE "public"."hospital" ADD CONSTRAINT "hospital_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "public"."district" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."hospital" ADD CONSTRAINT "hospital_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "public"."province" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."hospital" ADD CONSTRAINT "hospital_ward_id_fkey" FOREIGN KEY ("ward_id") REFERENCES "public"."ward" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table hospital_histories
-- ----------------------------
ALTER TABLE "public"."hospital_histories" ADD CONSTRAINT "hospital_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table image
-- ----------------------------
ALTER TABLE "public"."image" ADD CONSTRAINT "image_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table notification
-- ----------------------------
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table order_product
-- ----------------------------
ALTER TABLE "public"."order_product" ADD CONSTRAINT "order_product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."order_product" ADD CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."order_product" ADD CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table orders
-- ----------------------------
ALTER TABLE "public"."orders" ADD CONSTRAINT "orders_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "public"."status_histories" ADD CONSTRAINT "status_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table transaction_histories
-- ----------------------------
ALTER TABLE "public"."transaction_histories" ADD CONSTRAINT "transaction_histories_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table ward
-- ----------------------------
ALTER TABLE "public"."ward" ADD CONSTRAINT "ward_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "public"."district" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
