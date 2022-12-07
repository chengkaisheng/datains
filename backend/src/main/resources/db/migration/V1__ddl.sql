CREATE TABLE "USER_KEY"
(
 "ID" BIGINT IDENTITY(17,1) NOT NULL,
 "USER_ID" BIGINT NULL,
 "ACCESS_KEY" VARCHAR(50) NOT NULL,
 "SECRET_KEY" VARCHAR(50) NOT NULL,
 "CREATE_TIME" BIGINT NOT NULL,
 "STATUS" VARCHAR(10) NULL
);

CREATE TABLE "SYS_USERS_ROLES"
(
 "USER_ID" BIGINT NOT NULL,
 "ROLE_ID" BIGINT NOT NULL
);

CREATE TABLE "SYS_USER"
(
 "USER_ID" BIGINT IDENTITY(3,1) NOT NULL,
 "DEPT_ID" BIGINT NULL,
 "USERNAME" VARCHAR(255) NULL,
 "NICK_NAME" VARCHAR(255) NULL,
 "GENDER" VARCHAR(10) NULL,
 "PHONE" VARCHAR(255) NULL,
 "EMAIL" VARCHAR(255) NULL,
 "PASSWORD" VARCHAR(255) NULL,
 "IS_ADMIN" BIT DEFAULT '0' NULL,
 "ENABLED" BIGINT NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "UPDATE_BY" VARCHAR(255) NULL,
 "PWD_RESET_TIME" BIGINT NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL,
 "LANGUAGE" VARCHAR(20) NULL,
 "FROM" INT NOT NULL,
 "SUB" VARCHAR(255) NULL
);

CREATE TABLE "SYS_THEME_ITEM"
(
 "THEME_ID" BIGINT NOT NULL,
 "KEY" VARCHAR(255) NULL,
 "VAL" VARCHAR(255) NULL
);

CREATE TABLE "SYS_THEME"
(
 "ID" BIGINT IDENTITY(4,1) NOT NULL,
 "NAME" VARCHAR(255) NOT NULL,
 "IMG_ID" VARCHAR(255) NULL,
 "IMG" VARCHAR(255) NULL,
 "STATUS" TINYINT NULL
);

CREATE TABLE "SYS_TASK_INSTANCE"
(
 "INSTANCE_ID" BIGINT IDENTITY(1,1) NOT NULL,
 "TASK_ID" BIGINT NOT NULL,
 "EXECUTE_TIME" BIGINT NULL,
 "FINISH_TIME" BIGINT NULL,
 "STATUS" INT NULL,
 "INFO" CLOB NULL
);

CREATE TABLE "SYS_TASK_EMAIL"
(
 "ID" BIGINT IDENTITY(1,1) NOT NULL,
 "TITLE" VARCHAR(255) NULL,
 "PANEL_ID" VARCHAR(255) NULL,
 "RECIPIENTS" VARCHAR(255) NULL,
 "CONTENT" BLOB NULL,
 "PIXEL" VARCHAR(255) NULL,
 "TASK_ID" BIGINT NOT NULL
);

CREATE TABLE "SYS_TASK"
(
 "TASK_ID" BIGINT IDENTITY(1,1) NOT NULL,
 "TASK_NAME" VARCHAR(255) NOT NULL,
 "TASK_TYPE" VARCHAR(100) NOT NULL,
 "START_TIME" BIGINT NULL,
 "END_TIME" BIGINT NULL,
 "RATE_TYPE" INT NOT NULL,
 "RATE_VAL" VARCHAR(255) NULL,
 "CREATOR" BIGINT NOT NULL,
 "CREATE_TIME" BIGINT NULL
);

CREATE TABLE "SYS_ROLES_MENUS"
(
 "MENU_ID" BIGINT NOT NULL,
 "ROLE_ID" BIGINT NOT NULL
);

CREATE TABLE "SYS_ROLE"
(
 "ROLE_ID" BIGINT IDENTITY(3,1) NOT NULL,
 "NAME" VARCHAR(255) NOT NULL,
 "DESCRIPTION" VARCHAR(255) NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "UPDATE_BY" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL
);

CREATE TABLE "SYS_MSG_TYPE"
(
 "MSG_TYPE_ID" BIGINT IDENTITY(9,1) NOT NULL,
 "PID" BIGINT NOT NULL,
 "TYPE_NAME" VARCHAR(255) NULL,
 "ROUTER" VARCHAR(255) NULL,
 "CALLBACK" VARCHAR(255) NULL
);

CREATE TABLE "SYS_MSG_SETTING"
(
 "MSG_SETTING_ID" BIGINT IDENTITY(1,1) NOT NULL,
 "USER_ID" BIGINT NOT NULL,
 "TYPE_ID" BIGINT NOT NULL,
 "CHANNEL_ID" BIGINT NOT NULL,
 "ENABLE" TINYINT NULL
);

CREATE TABLE "SYS_MSG_CHANNEL"
(
 "MSG_CHANNEL_ID" BIGINT IDENTITY(4,1) NOT NULL,
 "CHANNEL_NAME" VARCHAR(255) NULL,
 "SERVICE_NAME" VARCHAR(255) NULL
);

CREATE TABLE "SYS_MSG"
(
 "MSG_ID" BIGINT IDENTITY(1,1) NOT NULL,
 "USER_ID" BIGINT NOT NULL,
 "TYPE_ID" BIGINT NOT NULL,
 "STATUS" TINYINT NOT NULL,
 "PARAM" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NOT NULL,
 "READ_TIME" BIGINT NULL,
 "CONTENT" VARCHAR(255) NULL
);

CREATE TABLE "SYS_MENU"
(
 "MENU_ID" BIGINT IDENTITY(62,1) NOT NULL,
 "PID" BIGINT NULL,
 "SUB_COUNT" INT DEFAULT 0
 NULL,
 "TYPE" INT NULL,
 "TITLE" VARCHAR(255) NULL,
 "NAME" VARCHAR(255) NULL,
 "COMPONENT" VARCHAR(255) NULL,
 "MENU_SORT" INT NULL,
 "ICON" VARCHAR(255) NULL,
 "PATH" VARCHAR(255) NULL,
 "I_FRAME" BIT NULL,
 "CACHE" BIT DEFAULT '0'
 NULL,
 "HIDDEN" BIT DEFAULT '0'
 NULL,
 "PERMISSION" VARCHAR(255) NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "UPDATE_BY" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL
);

CREATE TABLE "SYS_DEPT"
(
 "DEPT_ID" BIGINT IDENTITY(2,1) NOT NULL,
 "PID" BIGINT NULL,
 "SUB_COUNT" INT DEFAULT 0
 NULL,
 "NAME" VARCHAR(255) NOT NULL,
 "DEPT_SORT" INT DEFAULT 999
 NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "UPDATE_BY" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL
);

CREATE TABLE "SYS_BACKGROUND_IMAGE"
(
 "ID" VARCHAR(64) NOT NULL,
 "NAME" VARCHAR(255) NULL,
 "CLASSIFICATION" VARCHAR(255) NOT NULL,
 "CONTENT" CLOB NULL,
 "REMARK" VARCHAR(255) NULL,
 "SORT" INT NULL,
 "UPLOAD_TIME" BIGINT NULL,
 "BASE_URL" VARCHAR(255) NULL,
 "URL" VARCHAR(255) NULL
);

CREATE TABLE "SYS_AUTH_DETAIL"
(
 "ID" VARCHAR(50) NOT NULL,
 "AUTH_ID" VARCHAR(50) NULL,
 "PRIVILEGE_NAME" VARCHAR(255) NULL,
 "PRIVILEGE_TYPE" INT NULL,
 "PRIVILEGE_VALUE" INT NULL,
 "PRIVILEGE_EXTEND" VARCHAR(2000) NULL,
 "REMARK" VARCHAR(2000) NULL,
 "CREATE_USER" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "SYS_AUTH"
(
 "ID" VARCHAR(50) NOT NULL,
 "AUTH_SOURCE" VARCHAR(255) NULL,
 "AUTH_SOURCE_TYPE" VARCHAR(255) NULL,
 "AUTH_TARGET" VARCHAR(255) NULL,
 "AUTH_TARGET_TYPE" VARCHAR(255) NULL,
 "AUTH_TIME" BIGINT NULL,
 "AUTH_DETAILS" VARCHAR(2000) NULL,
 "AUTH_USER" VARCHAR(255) NULL,
 "UPDATE_TIME" TIMESTAMP(0) NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "SYSTEM_PARAMETER"
(
 "PARAM_KEY" VARCHAR(64) NOT NULL,
 "PARAM_VALUE" VARCHAR(255) NULL,
 "TYPE" VARCHAR(100) DEFAULT 'text'
 NOT NULL,
 "SORT" INT NULL
);

CREATE TABLE "SCHEDULE"
(
 "ID" VARCHAR(50) NOT NULL,
 "KEY" VARCHAR(50) NOT NULL,
 "TYPE" VARCHAR(50) NOT NULL,
 "VALUE" VARCHAR(255) NOT NULL,
 "GROUP" VARCHAR(50) NULL,
 "JOB" VARCHAR(64) NOT NULL,
 "ENABLE" TINYINT NULL,
 "RESOURCE_ID" VARCHAR(64) NOT NULL,
 "USER_ID" VARCHAR(50) NOT NULL,
 "CUSTOM_DATA" CLOB NULL
);

CREATE TABLE "QRTZ_TRIGGERS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "TRIGGER_NAME" VARCHAR(200) NOT NULL,
 "TRIGGER_GROUP" VARCHAR(200) NOT NULL,
 "JOB_NAME" VARCHAR(200) NOT NULL,
 "JOB_GROUP" VARCHAR(200) NOT NULL,
 "DESCRIPTION" VARCHAR(250) NULL,
 "NEXT_FIRE_TIME" BIGINT NULL,
 "PREV_FIRE_TIME" BIGINT NULL,
 "PRIORITY" INT NULL,
 "TRIGGER_STATE" VARCHAR(16) NOT NULL,
 "TRIGGER_TYPE" VARCHAR(8) NOT NULL,
 "START_TIME" BIGINT NOT NULL,
 "END_TIME" BIGINT NULL,
 "CALENDAR_NAME" VARCHAR(200) NULL,
 "MISFIRE_INSTR" SMALLINT NULL,
 "JOB_DATA" BLOB NULL
);

CREATE TABLE "QRTZ_SIMPROP_TRIGGERS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "TRIGGER_NAME" VARCHAR(200) NOT NULL,
 "TRIGGER_GROUP" VARCHAR(200) NOT NULL,
 "STR_PROP_1" VARCHAR(512) NULL,
 "STR_PROP_2" VARCHAR(512) NULL,
 "STR_PROP_3" VARCHAR(512) NULL,
 "INT_PROP_1" INT NULL,
 "INT_PROP_2" INT NULL,
 "LONG_PROP_1" BIGINT NULL,
 "LONG_PROP_2" BIGINT NULL,
 "DEC_PROP_1" DECIMAL(13,4) NULL,
 "DEC_PROP_2" DECIMAL(13,4) NULL,
 "BOOL_PROP_1" VARCHAR(1) NULL,
 "BOOL_PROP_2" VARCHAR(1) NULL
);

CREATE TABLE "QRTZ_SIMPLE_TRIGGERS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "TRIGGER_NAME" VARCHAR(200) NOT NULL,
 "TRIGGER_GROUP" VARCHAR(200) NOT NULL,
 "REPEAT_COUNT" BIGINT NOT NULL,
 "REPEAT_INTERVAL" BIGINT NOT NULL,
 "TIMES_TRIGGERED" BIGINT NOT NULL
);

CREATE TABLE "QRTZ_SCHEDULER_STATE"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "INSTANCE_NAME" VARCHAR(200) NOT NULL,
 "LAST_CHECKIN_TIME" BIGINT NOT NULL,
 "CHECKIN_INTERVAL" BIGINT NOT NULL
);

CREATE TABLE "QRTZ_PAUSED_TRIGGER_GRPS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "TRIGGER_GROUP" VARCHAR(200) NOT NULL
);

CREATE TABLE "QRTZ_LOCKS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "LOCK_NAME" VARCHAR(40) NOT NULL
);

CREATE TABLE "QRTZ_JOB_DETAILS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "JOB_NAME" VARCHAR(200) NOT NULL,
 "JOB_GROUP" VARCHAR(200) NOT NULL,
 "DESCRIPTION" VARCHAR(250) NULL,
 "JOB_CLASS_NAME" VARCHAR(250) NOT NULL,
 "IS_DURABLE" VARCHAR(1) NOT NULL,
 "IS_NONCONCURRENT" VARCHAR(1) NOT NULL,
 "IS_UPDATE_DATA" VARCHAR(1) NOT NULL,
 "REQUESTS_RECOVERY" VARCHAR(1) NOT NULL,
 "JOB_DATA" BLOB NULL
);

CREATE TABLE "QRTZ_FIRED_TRIGGERS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "ENTRY_ID" VARCHAR(95) NOT NULL,
 "TRIGGER_NAME" VARCHAR(200) NOT NULL,
 "TRIGGER_GROUP" VARCHAR(200) NOT NULL,
 "INSTANCE_NAME" VARCHAR(200) NOT NULL,
 "FIRED_TIME" BIGINT NOT NULL,
 "SCHED_TIME" BIGINT NOT NULL,
 "PRIORITY" INT NOT NULL,
 "STATE" VARCHAR(16) NOT NULL,
 "JOB_NAME" VARCHAR(200) NULL,
 "JOB_GROUP" VARCHAR(200) NULL,
 "IS_NONCONCURRENT" VARCHAR(1) NULL,
 "REQUESTS_RECOVERY" VARCHAR(1) NULL
);

CREATE TABLE "QRTZ_CRON_TRIGGERS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "TRIGGER_NAME" VARCHAR(200) NOT NULL,
 "TRIGGER_GROUP" VARCHAR(200) NOT NULL,
 "CRON_EXPRESSION" VARCHAR(120) NOT NULL,
 "TIME_ZONE_ID" VARCHAR(80) NULL
);

CREATE TABLE "QRTZ_CALENDARS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "CALENDAR_NAME" VARCHAR(200) NOT NULL,
 "CALENDAR" BLOB NOT NULL
);

CREATE TABLE "QRTZ_BLOB_TRIGGERS"
(
 "SCHED_NAME" VARCHAR(120) NOT NULL,
 "TRIGGER_NAME" VARCHAR(200) NOT NULL,
 "TRIGGER_GROUP" VARCHAR(200) NOT NULL,
 "BLOB_DATA" BLOB NULL
);

CREATE TABLE "PORTAL_DATA"
(
 "ID" BIGINT IDENTITY(1,1) NOT NULL,
 "USER_ID" BIGINT NULL,
 "USER_NAME" VARCHAR(225) NULL,
 "UPDATE_BY" VARCHAR(225) NULL,
 "UPDATE_TIME" TIMESTAMP(0) NULL,
 "POSITION_JSON" CLOB NULL,
 "CREATE_TIME" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP()
 NULL
);

CREATE TABLE "PLUGIN_SYS_MENU"
(
 "MENU_ID" BIGINT NOT NULL,
 "PID" BIGINT NULL,
 "SUB_COUNT" INT NULL,
 "TYPE" VARCHAR(255) NULL,
 "TITLE" VARCHAR(255) NULL,
 "NAME" VARCHAR(255) NULL,
 "COMPONENT" VARCHAR(255) NULL,
 "MENU_SORT" VARCHAR(255) NULL,
 "ICON" VARCHAR(255) NULL,
 "PATH" VARCHAR(255) NULL,
 "I_FRAME" TINYINT NULL,
 "CACHE" TINYINT NULL,
 "HIDDEN" TINYINT NULL,
 "PERMISSION" VARCHAR(255) NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "UPDATE_BY" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL,
 "NO_LAYOUT" TINYINT NULL
);

CREATE TABLE "PANEL_VIEW_LINKAGE_FIELD"
(
 "ID" VARCHAR(50) NOT NULL,
 "LINKAGE_ID" VARCHAR(50) NULL,
 "SOURCE_FIELD" VARCHAR(255) NULL,
 "TARGET_FIELD" VARCHAR(255) NULL,
 "UPDATE_TIME" BIGINT NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_VIEW_LINKAGE"
(
 "ID" VARCHAR(50) NOT NULL,
 "PANEL_ID" VARCHAR(50) NULL,
 "SOURCE_VIEW_ID" VARCHAR(50) NULL,
 "TARGET_VIEW_ID" VARCHAR(50) NULL,
 "UPDATE_TIME" BIGINT NULL,
 "UPDATE_PEOPLE" VARCHAR(255) NULL,
 "EXT1" VARCHAR(2000) NULL,
 "EXT2" VARCHAR(2000) NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_VIEW"
(
 "ID" VARCHAR(50) NOT NULL,
 "PANEL_ID" VARCHAR(50) NULL,
 "CHART_VIEW_ID" VARCHAR(50) NULL,
 "CONTENT" BLOB NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_BY" VARCHAR(255) NULL,
 "UPDATE_TIME" BIGINT NULL,
 "POSITION" VARCHAR(255) DEFAULT 'panel'
 NULL,
 "COPY_FROM_PANEL" VARCHAR(255) NULL,
 "COPY_FROM_VIEW" VARCHAR(255) NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_TEMPLATE"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(255) NULL,
 "PID" VARCHAR(255) NULL,
 "LEVEL" INT NULL,
 "NODE_TYPE" VARCHAR(255) NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "SNAPSHOT" CLOB NULL,
 "TEMPLATE_TYPE" VARCHAR(255) NULL,
 "TEMPLATE_STYLE" CLOB NULL,
 "TEMPLATE_DATA" CLOB NULL,
 "DYNAMIC_DATA" CLOB NULL
);

CREATE TABLE "PANEL_SUBJECT"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(255) NULL,
 "TYPE" VARCHAR(255) NULL,
 "DETAILS" CLOB NULL,
 "CREATE_TIME" BIGINT NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "UPDATE_TIME" BIGINT NULL,
 "UPDATE_BY" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_STORE"
(
 "STORE_ID" BIGINT IDENTITY(10011,1) NOT NULL,
 "PANEL_GROUP_ID" VARCHAR(50) NOT NULL,
 "USER_ID" BIGINT NOT NULL,
 "CREATE_TIME" BIGINT NULL
);

CREATE TABLE "PANEL_SHARE"
(
 "SHARE_ID" BIGINT IDENTITY(7,1) NOT NULL,
 "PANEL_GROUP_ID" VARCHAR(50) NULL,
 "TARGET_ID" BIGINT NULL,
 "GRANTER" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "TYPE" INT NULL
);

CREATE TABLE "PANEL_PDF_TEMPLATE"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "CREATE_USER" VARCHAR(255) NULL,
 "TEMPLATE_CONTENT" CLOB NULL,
 "SORT" INT NULL
);

CREATE TABLE "PANEL_OUTER_PARAMS_TARGET_VIEW_INFO"
(
 "TARGET_ID" VARCHAR(50) NOT NULL,
 "PARAMS_INFO_ID" VARCHAR(50) NULL,
 "TARGET_VIEW_ID" VARCHAR(50) NULL,
 "TARGET_FIELD_ID" VARCHAR(50) NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(50) NULL
);

CREATE TABLE "PANEL_OUTER_PARAMS_INFO"
(
 "PARAMS_INFO_ID" VARCHAR(50) NOT NULL,
 "PARAMS_ID" VARCHAR(50) NULL,
 "PARAM_NAME" VARCHAR(255) NULL,
 "CHECKED" TINYINT NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(50) NULL
);

CREATE TABLE "PANEL_OUTER_PARAMS"
(
 "PARAMS_ID" VARCHAR(50) NOT NULL,
 "PANEL_ID" VARCHAR(50) NULL,
 "CHECKED" TINYINT NULL,
 "REMARK" VARCHAR(255) NULL,
 "COPY_FROM" VARCHAR(50) NULL,
 "COPY_ID" VARCHAR(50) NULL
);

CREATE TABLE "PANEL_LINK_MAPPING"
(
 "ID" BIGINT IDENTITY(1,1) NOT NULL,
 "RESOURCE_ID" VARCHAR(255) NULL,
 "USER_ID" BIGINT NULL,
 "UUID" VARCHAR(8) NULL
);

CREATE TABLE "PANEL_LINK_JUMP_TARGET_VIEW_INFO"
(
 "TARGET_ID" VARCHAR(50) NOT NULL,
 "LINK_JUMP_INFO_ID" VARCHAR(50) NULL,
 "TARGET_VIEW_ID" VARCHAR(50) NULL,
 "TARGET_FIELD_ID" VARCHAR(50) NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_LINK_JUMP_INFO"
(
 "ID" VARCHAR(50) NOT NULL,
 "LINK_JUMP_ID" VARCHAR(50) NULL,
 "LINK_TYPE" VARCHAR(255) NULL,
 "JUMP_TYPE" VARCHAR(255) NULL,
 "TARGET_PANEL_ID" VARCHAR(255) NULL,
 "SOURCE_FIELD_ID" VARCHAR(255) NULL,
 "CONTENT" VARCHAR(3900) NULL,
 "CHECKED" TINYINT NULL,
 "ATTACH_PARAMS" TINYINT NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_LINK_JUMP"
(
 "ID" VARCHAR(50) NOT NULL,
 "SOURCE_PANEL_ID" VARCHAR(50) NULL,
 "SOURCE_VIEW_ID" VARCHAR(50) NULL,
 "LINK_JUMP_INFO" VARCHAR(3900) NULL,
 "CHECKED" TINYINT NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_LINK"
(
 "RESOURCE_ID" VARCHAR(50) NOT NULL,
 "VALID" TINYINT DEFAULT 0
 NULL,
 "ENABLE_PWD" TINYINT DEFAULT 0
 NULL,
 "PWD" VARCHAR(255) NULL,
 "OVER_TIME" BIGINT NULL,
 "USER_ID" BIGINT NULL
);

CREATE TABLE "PANEL_GROUP_EXTEND_DATA"
(
 "ID" VARCHAR(50) NOT NULL,
 "PANEL_ID" VARCHAR(50) NULL,
 "VIEW_ID" VARCHAR(50) NULL,
 "VIEW_DETAILS" CLOB NULL,
 "COPY_FROM" VARCHAR(255) NULL,
 "COPY_ID" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_GROUP_EXTEND"
(
 "ID" VARCHAR(50) NOT NULL,
 "PANEL_ID" VARCHAR(50) NULL,
 "TEMPLATE_ID" VARCHAR(50) NULL,
 "TEMPLATE_DYNAMIC_DATA" CLOB NULL,
 "TEMPLATE_VERSION" VARCHAR(255) NULL
);

CREATE TABLE "PANEL_GROUP"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(255) NULL,
 "PID" VARCHAR(255) NULL,
 "LEVEL" INT NULL,
 "NODE_TYPE" VARCHAR(255) NULL,
 "CREATE_BY" VARCHAR(255) NULL,
 "CREATE_TIME" BIGINT NULL,
 "PANEL_TYPE" VARCHAR(255) NOT NULL,
 "PANEL_STYLE" CLOB NOT NULL,
 "PANEL_DATA" CLOB NULL,
 "SOURCE" VARCHAR(255) NULL,
 "EXTEND1" VARCHAR(255) NULL,
 "EXTEND2" VARCHAR(255) NULL,
 "REMARK" VARCHAR(255) NULL,
 "MOBILE_LAYOUT" TINYINT DEFAULT 0
 NULL
);

CREATE TABLE "PANEL_DESIGN"
(
 "ID" VARCHAR(100) NOT NULL,
 "PANEL_ID" VARCHAR(100) NULL,
 "COMPONENT_ID" VARCHAR(100) NULL,
 "COMPONENT_STYLE" VARCHAR(2000) NULL,
 "COMPONENT_POSITION" VARCHAR(2000) NULL,
 "COMPONENT_TYPE" VARCHAR(255) NULL,
 "COMPONENT_DETAILS" VARCHAR(2000) NULL,
 "UPDATE_TIME" BIGINT NULL,
 "UPDATE_PERSON" VARCHAR(255) NULL
);

CREATE TABLE "MY_PLUGIN"
(
 "PLUGIN_ID" BIGINT IDENTITY(4,1) NOT NULL,
 "NAME" VARCHAR(255) NULL,
 "STORE" VARCHAR(255) NULL,
 "FREE" TINYINT DEFAULT 0
 NULL,
 "COST" INT NULL,
 "CATEGORY" VARCHAR(255) NULL,
 "DESCRIPT" VARCHAR(255) NULL,
 "VERSION" VARCHAR(255) NULL,
 "INSTALL_TYPE" INT NULL,
 "CREATOR" VARCHAR(255) NULL,
 "LOAD_MYBATIS" TINYINT DEFAULT 0
 NULL,
 "RELEASE_TIME" BIGINT NULL,
 "INSTALL_TIME" BIGINT NULL,
 "MODULE_NAME" VARCHAR(255) NULL,
 "ICON" VARCHAR(255) NULL
);

CREATE TABLE "LICENSE"
(
 "ID" VARCHAR(50) NOT NULL,
 "UPDATE_TIME" TIMESTAMP(0) NULL,
 "LICENSE" CLOB NULL,
 "F2C_LICENSE" CLOB NULL
);

CREATE TABLE "FILE_PICTURE"
(
 "ID" BIGINT IDENTITY(1,1) NOT NULL,
 "URL" CLOB NULL,
 "IMG_DETAILED" CLOB NULL,
 "TYPE" INT NULL,
 "NAME" VARCHAR(100) NULL
);

CREATE TABLE "FILE_METADATA"
(
 "ID" VARCHAR(64) NOT NULL,
 "NAME" VARCHAR(64) NOT NULL,
 "TYPE" VARCHAR(64) NULL,
 "SIZE" BIGINT NOT NULL,
 "CREATE_TIME" BIGINT NOT NULL,
 "UPDATE_TIME" BIGINT NOT NULL
);

CREATE TABLE "FILE_CONTENT"
(
 "FILE_ID" VARCHAR(64) NOT NULL,
 "FILE" BLOB NULL
);

CREATE TABLE "DE_ENGINE"
(
 "ID" VARCHAR(50) DEFAULT ''
 NOT NULL,
 "NAME" VARCHAR(50) NULL,
 "DESC" VARCHAR(50) NULL,
 "TYPE" VARCHAR(50) NOT NULL,
 "CONFIGURATION" CLOB NOT NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL,
 "CREATE_BY" VARCHAR(50) NULL,
 "STATUS" VARCHAR(45) NULL
);

CREATE TABLE "DEMO_VACCINATION"
(
 "CUMULATIVE" DECIMAL(10,2) NOT NULL,
 "NEW_ADD" DECIMAL(10,2) NULL,
 "VACCINATION_PER_100_PEOPLE" DECIMAL(10,2) NOT NULL
);

CREATE TABLE "DEMO_SALES_DASHBOARD"
(
 "YEAR" BIGINT NULL,
 "MOUNTH" INT NULL,
 "SALES_DEPT" VARCHAR(255) NULL,
 "PRODUCT_NAME" VARCHAR(255) NULL,
 "SALES_QTY" INT NULL,
 "SALES_AMOUNT" INT NULL,
 "TARGET_QTY" INT NULL
);

CREATE TABLE "DEMO_RECENT_LOCAL_CASES"
(
 "CITY" VARCHAR(50) DEFAULT ''
 NOT NULL,
 "PROVINCE" VARCHAR(50) NOT NULL,
 "NEW_ADD" BIGINT NULL,
 "EXISTING" BIGINT NULL,
 "RISK" VARCHAR(50) NOT NULL
);

CREATE TABLE "DEMO_OLYMPIAD_MEDAL_QTY"
(
 "ID" VARCHAR(255) NULL,
 "COUNTRY" VARCHAR(255) NULL,
 "MEDAL" VARCHAR(255) NULL,
 "QTY" VARCHAR(255) NULL
);

CREATE TABLE "DEMO_OLYMPIAD_MEDAL"
(
 "CODE" INT NOT NULL,
 "NAME" VARCHAR(50) NOT NULL
);

CREATE TABLE "DEMO_OLYMPIAD_HOT_GAME"
(
 "CODE" VARCHAR(255) NOT NULL,
 "SORT" VARCHAR(255) NULL,
 "NAME" VARCHAR(255) NULL
);

CREATE TABLE "DEMO_OLYMPIAD_GOLD_DATE"
(
 "ID" VARCHAR(255) NOT NULL,
 "DATEKEY" VARCHAR(255) NULL,
 "GAME" VARCHAR(255) NULL,
 "QTY" VARCHAR(255) NULL
);

CREATE TABLE "DEMO_OLYMPIAD_DATA_UPDATE"
(
 "UPDATE_DATE" TIMESTAMP(0) NULL
);

CREATE TABLE "DEMO_OLYMPIAD_COUNTRY"
(
 "CODE" VARCHAR(255) NOT NULL,
 "NAME" VARCHAR(255) NULL
);

CREATE TABLE "DEMO_OLYMPIAD_AUDIENCE_SEX"
(
 "SEX" VARCHAR(255) NOT NULL,
 "PERCENT" REAL NULL
);

CREATE TABLE "DEMO_OLYMPIAD_AUDIENCE_AGE"
(
 "AGE" VARCHAR(255) NOT NULL,
 "PERCENT" REAL NULL
);

CREATE TABLE "DEMO_OLYMPIAD_ATHLETE"
(
 "CODE" VARCHAR(255) NOT NULL,
 "SORT" INT NULL,
 "NAME" VARCHAR(255) NULL,
 "COUNTRY" VARCHAR(255) NULL,
 "GAME" VARCHAR(255) NULL,
 "HOT_NUM" INT NULL
);

CREATE TABLE "DEMO_NEW_TREND_OF_DIAGNOSIS"
(
 "DATE" VARCHAR(50) DEFAULT ''
 NOT NULL,
 "NEW_DIAGNOSIS" BIGINT NULL,
 "CURRENT_DIAGNOSIS" BIGINT NULL
);

CREATE TABLE "DEMO_GDP_HISTORY"
(
 "ID" INT IDENTITY(11,1) NOT NULL,
 "YEAR" VARCHAR(255) NULL,
 "GDP" DOUBLE NULL,
 "PERCENT" DOUBLE NULL
);

CREATE TABLE "DEMO_GDP_DISTRICT_TOP100"
(
 "ID" INT IDENTITY(17,1) NOT NULL,
 "PROVINCE" VARCHAR(255) NULL,
 "NUM" INT NULL
);

CREATE TABLE "DEMO_GDP_BY_INDUSTRY"
(
 "ID" INT IDENTITY(4,1) NOT NULL,
 "INDUSTRY" VARCHAR(255) NULL,
 "GDP" VARCHAR(255) NULL
);

CREATE TABLE "DEMO_GDP_BY_CITY_TOP10"
(
 "ID" INT DEFAULT 0
 NOT NULL,
 "PROVINCE" VARCHAR(255) NULL,
 "CITY" VARCHAR(255) NULL,
 "GDP" DOUBLE NULL
);

CREATE TABLE "DEMO_GDP_BY_CITY"
(
 "ID" INT IDENTITY(309,1) NOT NULL,
 "PROVINCE" VARCHAR(255) NULL,
 "CITY" VARCHAR(255) NULL,
 "GDP" DOUBLE NULL
);

CREATE TABLE "DEMO_GDP_2021"
(
 "ID" INT IDENTITY(10,1) NOT NULL,
 "2021GDP）" VARCHAR(255) NULL,
 "2020GDP" VARCHAR(255) NULL,
 "INCREASE" VARCHAR(255) NULL
);

CREATE TABLE "DEMO_DOMESTIC_EPIDEMIC"
(
 "STATISTICAL_TIME" VARCHAR(50) DEFAULT ''
 NOT NULL,
 "CUMULATIVE_CURE" BIGINT NULL,
 "CURRENT_DIAGNOSIS" BIGINT NULL,
 "CUMULATIVE_DIAGNOSIS" BIGINT NULL,
 "ASYMPTOMATIC_PATIENT" BIGINT NULL,
 "INPUT" BIGINT NULL,
 "CUMULATIVE_DEATH" BIGINT NULL
);

CREATE TABLE "DATASOURCE"
(
 "ID" VARCHAR(50) DEFAULT ''
 NOT NULL,
 "NAME" VARCHAR(50) NOT NULL,
 "DESC" VARCHAR(50) NULL,
 "TYPE" VARCHAR(50) NOT NULL,
 "CONFIGURATION" CLOB NOT NULL,
 "CREATE_TIME" BIGINT NOT NULL,
 "UPDATE_TIME" BIGINT NOT NULL,
 "CREATE_BY" VARCHAR(50) NULL,
 "STATUS" CLOB NULL
);

CREATE TABLE "DATASET_TABLE_UNION"
(
 "ID" VARCHAR(50) NOT NULL,
 "SOURCE_TABLE_ID" VARCHAR(50) NULL,
 "SOURCE_TABLE_FIELD_ID" VARCHAR(50) NULL,
 "SOURCE_UNION_RELATION" VARCHAR(50) NULL,
 "TARGET_TABLE_ID" VARCHAR(50) NULL,
 "TARGET_TABLE_FIELD_ID" VARCHAR(50) NULL,
 "TARGET_UNION_RELATION" VARCHAR(50) NULL,
 "CREATE_BY" VARCHAR(50) NULL,
 "CREATE_TIME" BIGINT NULL
);

CREATE TABLE "DATASET_TABLE_TASK_LOG"
(
 "ID" VARCHAR(50) NOT NULL,
 "TABLE_ID" VARCHAR(50) NOT NULL,
 "TASK_ID" VARCHAR(50) NULL,
 "START_TIME" BIGINT NULL,
 "END_TIME" BIGINT NULL,
 "STATUS" VARCHAR(50) NOT NULL,
 "INFO" CLOB NULL,
 "CREATE_TIME" BIGINT NULL,
 "TRIGGER_TYPE" VARCHAR(45) NULL
);

CREATE TABLE "DATASET_TABLE_TASK"
(
 "ID" VARCHAR(50) NOT NULL,
 "TABLE_ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(255) NOT NULL,
 "TYPE" VARCHAR(50) NOT NULL,
 "START_TIME" BIGINT NULL,
 "RATE" VARCHAR(50) NOT NULL,
 "CRON" VARCHAR(255) NULL,
 "END" VARCHAR(50) NOT NULL,
 "END_TIME" BIGINT NULL,
 "CREATE_TIME" BIGINT NULL,
 "LAST_EXEC_TIME" BIGINT NULL,
 "LAST_EXEC_STATUS" VARCHAR(50) NULL,
 "EXTRA_DATA" CLOB NULL,
 "STATUS" VARCHAR(50) NULL
);

CREATE TABLE "DATASET_TABLE_INCREMENTAL_CONFIG"
(
 "ID" VARCHAR(50) NOT NULL,
 "TABLE_ID" VARCHAR(50) NOT NULL,
 "INCREMENTAL_DELETE" CLOB NULL,
 "INCREMENTAL_ADD" CLOB NULL
);

CREATE TABLE "DATASET_TABLE_FUNCTION"
(
 "ID" BIGINT NOT NULL,
 "NAME" VARCHAR(255) NULL,
 "FUNC" VARCHAR(500) NULL,
 "DB_TYPE" VARCHAR(255) NULL,
 "FUNC_TYPE" INT NULL,
 "DESC" CLOB NULL
);

CREATE TABLE "DATASET_TABLE_FIELD"
(
 "ID" VARCHAR(50) NOT NULL,
 "TABLE_ID" VARCHAR(50) NOT NULL,
 "ORIGIN_NAME" VARCHAR(255) NULL,
 "NAME" VARCHAR(255) NOT NULL,
 "DATAINS_NAME" VARCHAR(255) NOT NULL,
 "GROUP_TYPE" VARCHAR(50) NULL,
 "TYPE" VARCHAR(50) NOT NULL,
 "SIZE" INT NULL,
 "DE_TYPE" INT NOT NULL,
 "DE_TYPE_FORMAT" INT NULL,
 "DE_EXTRACT_TYPE" INT NOT NULL,
 "EXT_FIELD" INT NULL,
 "CHECKED" TINYINT DEFAULT 1
 NOT NULL,
 "COLUMN_INDEX" INT NOT NULL,
 "LAST_SYNC_TIME" BIGINT NULL
);

CREATE TABLE "DATASET_TABLE"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(128) NULL,
 "SCENE_ID" VARCHAR(50) NOT NULL,
 "DATA_SOURCE_ID" VARCHAR(50) NULL,
 "TYPE" VARCHAR(50) NULL,
 "MODE" INT DEFAULT 0
 NULL,
 "INFO" CLOB NULL,
 "CREATE_BY" VARCHAR(50) NULL,
 "CREATE_TIME" BIGINT NULL,
 "QRTZ_INSTANCE" VARCHAR(1024) NULL,
 "SYNC_STATUS" VARCHAR(45) NULL,
 "LAST_UPDATE_TIME" BIGINT DEFAULT 0
 NULL
);

CREATE TABLE "DATASET_ROW_PERMISSIONS"
(
 "ID" VARCHAR(64) NOT NULL,
 "AUTH_TARGET_TYPE" VARCHAR(255) NULL,
 "AUTH_TARGET_ID" BIGINT NULL,
 "DATASET_ID" VARCHAR(64) NULL,
 "DATASET_FIELD_ID" VARCHAR(64) NULL,
 "FILTER_TYPE" VARCHAR(64) NULL,
 "LOGIC" VARCHAR(64) NULL,
 "FILTER" CLOB NULL,
 "ENUM_CHECK_FIELD" CLOB NULL,
 "UPDATE_TIME" BIGINT NULL
);

CREATE TABLE "DATASET_GROUP"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(64) NOT NULL,
 "PID" VARCHAR(50) NULL,
 "LEVEL" INT NULL,
 "TYPE" VARCHAR(50) NULL,
 "CREATE_BY" VARCHAR(50) NULL,
 "CREATE_TIME" BIGINT NULL
);

CREATE TABLE "DATASET_COLUMN_PERMISSIONS"
(
 "ID" VARCHAR(64) NOT NULL,
 "AUTH_TARGET_TYPE" VARCHAR(255) NULL,
 "AUTH_TARGET_ID" BIGINT NULL,
 "DATASET_ID" VARCHAR(64) NULL,
 "PERMISSIONS" CLOB NULL,
 "UPDATE_TIME" BIGINT NULL
);

CREATE TABLE "DATAINS_CODE_VERSION"
(
 "INSTALLED_RANK" INT NOT NULL,
 "DESCRIPTION" VARCHAR(255) NULL,
 "INSTALLED_ON" TIMESTAMP(0) NULL,
 "SUCCESS" TINYINT NOT NULL
);

CREATE TABLE "CHART_VIEW_CACHE"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(1024) NULL,
 "TITLE" VARCHAR(1024) NULL,
 "SCENE_ID" VARCHAR(50) NOT NULL,
 "TABLE_ID" VARCHAR(50) NOT NULL,
 "TYPE" VARCHAR(50) NULL,
 "RENDER" VARCHAR(50) NULL,
 "RESULT_COUNT" INT NULL,
 "RESULT_MODE" VARCHAR(50) NULL,
 "X_AXIS" CLOB NULL,
 "X_AXIS_EXT" CLOB NULL,
 "Y_AXIS" CLOB NULL,
 "Y_AXIS_EXT" CLOB NULL,
 "EXT_STACK" CLOB NULL,
 "EXT_BUBBLE" CLOB NULL,
 "CUSTOM_ATTR" CLOB NULL,
 "CUSTOM_STYLE" CLOB NULL,
 "CUSTOM_FILTER" CLOB NULL,
 "DRILL_FIELDS" CLOB NULL,
 "SENIOR" CLOB NULL,
 "CREATE_BY" VARCHAR(50) NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL,
 "SNAPSHOT" CLOB NULL,
 "STYLE_PRIORITY" VARCHAR(255) DEFAULT 'panel'
 NULL,
 "CHART_TYPE" VARCHAR(255) DEFAULT 'private'
 NULL,
 "IS_PLUGIN" BIT NULL,
 "DATA_FROM" VARCHAR(255) DEFAULT 'dataset'
 NULL
);

CREATE TABLE "CHART_VIEW"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(1024) NULL,
 "TITLE" VARCHAR(1024) NULL,
 "SCENE_ID" VARCHAR(50) NOT NULL,
 "TABLE_ID" VARCHAR(50) NOT NULL,
 "TYPE" VARCHAR(50) NULL,
 "RENDER" VARCHAR(50) NULL,
 "RESULT_COUNT" INT NULL,
 "RESULT_MODE" VARCHAR(50) NULL,
 "X_AXIS" CLOB NULL,
 "X_AXIS_EXT" CLOB NULL,
 "Y_AXIS" CLOB NULL,
 "Y_AXIS_EXT" CLOB NULL,
 "EXT_STACK" CLOB NULL,
 "EXT_BUBBLE" CLOB NULL,
 "CUSTOM_ATTR" CLOB NULL,
 "CUSTOM_STYLE" CLOB NULL,
 "CUSTOM_FILTER" CLOB NULL,
 "DRILL_FIELDS" CLOB NULL,
 "SENIOR" CLOB NULL,
 "CREATE_BY" VARCHAR(50) NULL,
 "CREATE_TIME" BIGINT NULL,
 "UPDATE_TIME" BIGINT NULL,
 "SNAPSHOT" CLOB NULL,
 "STYLE_PRIORITY" VARCHAR(255) DEFAULT 'panel'
 NULL,
 "CHART_TYPE" VARCHAR(255) DEFAULT 'private'
 NULL,
 "IS_PLUGIN" BIT NULL,
 "DATA_FROM" VARCHAR(255) DEFAULT 'dataset'
 NULL
);

CREATE TABLE "CHART_GROUP"
(
 "ID" VARCHAR(50) NOT NULL,
 "NAME" VARCHAR(64) NOT NULL,
 "PID" VARCHAR(50) NULL,
 "LEVEL" INT NULL,
 "TYPE" VARCHAR(50) NULL,
 "CREATE_BY" VARCHAR(50) NULL,
 "CREATE_TIME" BIGINT NULL
);

CREATE TABLE "AREA_MAPPING"
(
 "ID" BIGINT NOT NULL,
 "PROVINCE_NAME" VARCHAR(255) NULL,
 "PROVINCE_CODE" VARCHAR(255) NULL,
 "CITY_NAME" VARCHAR(255) NULL,
 "CITY_CODE" VARCHAR(255) NULL,
 "COUNTY_NAME" VARCHAR(255) NULL,
 "COUNTY_CODE" VARCHAR(255) NULL
);

