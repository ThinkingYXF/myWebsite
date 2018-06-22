const link = "ALTER TABLE user_account ADD CONSTRAINT userId FOREIGN KEY (user_id) REFERENCES user_user(id) ON UPDATE CASCADE;"


const login = "create table user_login(`id` int(10) unsigned not null auto_increment, `user_id` int(10) unsigned not null, `user_name` varchar(100) not null, `status` smallint(5) not null default 0, primary key(`id`), foreign key(`user_id`) references `user_user`(`id`)) engine=InnoDB default charset=utf8;"
const user = "create table user_user(`id` int(10) unsigned not null auto_increment, `name` varchar(100) not null, `password` varchar(32) not null, `phone` varchar(20) default null, `email` varchar(100) default null, `createTime` int(10) not null, `userIcon` varchar(100) default null, `friend_id` varchar(100) default null, primary key (`id`)) engine=InnoDB auto_increment=1000 default charset=utf8;"
