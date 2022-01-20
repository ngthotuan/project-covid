-- Adminer 4.8.1 PostgreSQL 14.1 dump


CREATE TABLE "public"."account"
(
    "id"         serial NOT NULL,
    "balance"    bigint,
    "blocked"    boolean,
    "password"   character varying(255),
    "role"       character varying(255),
    "username"   character varying(255),
    "patient_id" bigint,
    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."account_histories"
(
    "id"           serial NOT NULL,
    "action"       character varying(255),
    "created_date" timestamptz,
    "account_id"   bigint,
    CONSTRAINT "account_histories_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."cart_item"
(
    "id"          serial NOT NULL,
    "category_id" bigint,
    "patient_id"  bigint,
    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."category"
(
    "id"           serial                 NOT NULL,
    "limit_person" integer                NOT NULL,
    "limit_time"   character varying(255),
    "name"         character varying(255) NOT NULL,
    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."district"
(
    "id"          serial NOT NULL,
    "name"        character varying(255),
    "province_id" bigint,
    CONSTRAINT "district_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."hospital"
(
    "id"           serial  NOT NULL,
    "address"      character varying(255),
    "current_size" integer NOT NULL,
    "name"         character varying(255),
    "size"         integer NOT NULL,
    "district_id"  bigint,
    "province_id"  bigint,
    "ward_id"      bigint,
    CONSTRAINT "hospital_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."hospital_histories"
(
    "id"            serial NOT NULL,
    "export_time"   timestamptz,
    "hospital_name" character varying(255),
    "import_time"   timestamptz,
    "patient_id"    bigint,
    CONSTRAINT "hospital_histories_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."image"
(
    "id"         serial NOT NULL,
    "path"       character varying(255),
    "product_id" bigint,
    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."notification"
(
    "id"           serial NOT NULL,
    "description"  character varying(255),
    "patient_id"   integer,
    "created_date" timestamptz DEFAULT '2022-01-20 13:57:13.517+00',
    "view"         boolean     DEFAULT false,
    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."order_product"
(
    "id"          serial  NOT NULL,
    "quantity"    integer NOT NULL,
    "order_id"    bigint,
    "product_id"  bigint,
    "category_id" bigint,
    "amount"      bigint  NOT NULL,
    CONSTRAINT "order_product_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."orders"
(
    "id"             serial NOT NULL,
    "created_time"   timestamptz,
    "patient_id"     bigint,
    "total_amount"   bigint,
    "total_category" bigint,
    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."patient"
(
    "id"            serial       NOT NULL,
    "credit"        bigint,
    "debt"          bigint,
    "identity"      character varying(255),
    "name"          character varying(255),
    "payment_min"   bigint,
    "status"        character varying(255),
    "district_id"   bigint,
    "hospital_id"   bigint,
    "parent_id"     bigint,
    "province_id"   bigint,
    "ward_id"       bigint,
    "dob"           timestamp(6) NOT NULL,
    "create_date"   timestamptz,
    "modified_date" timestamptz,
    CONSTRAINT "CMND" UNIQUE ("identity"),
    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."product"
(
    "id"     serial NOT NULL,
    "amount" real,
    "name"   character varying(255),
    "unit"   character varying(255),
    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."product_categories"
(
    "id"            serial  NOT NULL,
    "limit_product" integer NOT NULL,
    "category_id"   bigint,
    "product_id"    bigint,
    CONSTRAINT "product_categories_pkey" UNIQUE ("id"),
    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."province"
(
    "id"   serial NOT NULL,
    "name" character varying(255),
    CONSTRAINT "province_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."status_histories"
(
    "id"           serial NOT NULL,
    "destination"  character varying(255),
    "source"       character varying(255),
    "patient_id"   bigint,
    "created_date" timestamptz,
    CONSTRAINT "status_histories_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."transaction_histories"
(
    "id"           serial           NOT NULL,
    "amount"       double precision NOT NULL,
    "created_date" timestamptz,
    "description"  character varying(255),
    "patient_id"   bigint,
    "code"         character varying(255),
    CONSTRAINT "transaction_histories_pkey" PRIMARY KEY ("id")
);


ALTER TABLE ONLY "public"."account"
    ADD CONSTRAINT "account_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patient (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;


CREATE TABLE "public"."ward"
(
    "id"          serial NOT NULL,
    "name"        character varying(255),
    "district_id" bigint,
    CONSTRAINT "ward_pkey" PRIMARY KEY ("id")
);

ALTER TABLE ONLY "public"."account_histories"
    ADD CONSTRAINT "account_histories_account_id_fkey" FOREIGN KEY (account_id) REFERENCES account (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."cart_item"
    ADD CONSTRAINT "cart_item_category_id_fkey" FOREIGN KEY (category_id) REFERENCES category (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;
ALTER TABLE ONLY "public"."cart_item"
    ADD CONSTRAINT "cart_item_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patient (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."district"
    ADD CONSTRAINT "district_province_id_fkey" FOREIGN KEY (province_id) REFERENCES province (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."hospital"
    ADD CONSTRAINT "hospital_district_id_fkey" FOREIGN KEY (district_id) REFERENCES district (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;
ALTER TABLE ONLY "public"."hospital"
    ADD CONSTRAINT "hospital_province_id_fkey" FOREIGN KEY (province_id) REFERENCES province (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;
ALTER TABLE ONLY "public"."hospital"
    ADD CONSTRAINT "hospital_ward_id_fkey" FOREIGN KEY (ward_id) REFERENCES ward (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."hospital_histories"
    ADD CONSTRAINT "hospital_histories_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patient (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."image"
    ADD CONSTRAINT "image_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."notification"
    ADD CONSTRAINT "notification_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patient (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."order_product"
    ADD CONSTRAINT "order_product_category_id_fkey" FOREIGN KEY (category_id) REFERENCES category (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;
ALTER TABLE ONLY "public"."order_product"
    ADD CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;
ALTER TABLE ONLY "public"."order_product"
    ADD CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patient (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."patient"
    ADD CONSTRAINT "fk5u7hgucxoppt13cnq6d1jku73" FOREIGN KEY (parent_id) REFERENCES patient (id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."patient"
    ADD CONSTRAINT "fk8ena1rkb5kdlhqalyfxif5hk1" FOREIGN KEY (province_id) REFERENCES province (id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."patient"
    ADD CONSTRAINT "fkfrtkp1fawf55kilsxb1uxpio0" FOREIGN KEY (hospital_id) REFERENCES hospital (id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."patient"
    ADD CONSTRAINT "fkj8tcgt32iya29rfi0fkju88yf" FOREIGN KEY (district_id) REFERENCES district (id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."patient"
    ADD CONSTRAINT "fkl1wwwexsf24hcuxbxy3og8gqn" FOREIGN KEY (ward_id) REFERENCES ward (id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "fk2k3smhbruedlcrvu6clued06x" FOREIGN KEY (product_id) REFERENCES product (id) NOT DEFERRABLE;
ALTER TABLE ONLY "public"."product_categories"
    ADD CONSTRAINT "fkkud35ls1d40wpjb5htpp14q4e" FOREIGN KEY (category_id) REFERENCES category (id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."status_histories"
    ADD CONSTRAINT "status_histories_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patient (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."transaction_histories"
    ADD CONSTRAINT "transaction_histories_patient_id_fkey" FOREIGN KEY (patient_id) REFERENCES patient (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."ward"
    ADD CONSTRAINT "ward_district_id_fkey" FOREIGN KEY (district_id) REFERENCES district (id) ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

