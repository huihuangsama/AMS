<?php
return array(
    //'配置项'=>'配置值'
    // 'APP_DEBUG' => true,
    'DB_TYPE'=>'mysql',
    'DB_HOST'=>'127.0.0.1',
    'DB_NAME'=>'am',
    'DB_USER'=>'<db-user-name>',
    'DB_PWD'=>'<db-password>',
    'DB_CHARSET'=>'utf8',
    'DB_PORT'=>3306,
    'DB_PREFIX'=>'AMS_',
    'LOG_RECORD'=>true,  // 进行日志记录       
    'LOG_RECORD_LEVEL' => array('EMERG','ALERT','CRIT','ERR','WARN','NOTIC','INFO','DEBUG','SQL'),  // 允许记录的日志级别
    'DB_FIELDS_CACHE'=> false //数据库字段缓存
);
