import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1677589948988 implements MigrationInterface {
    name = 'migration1677589948998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`buddy\` (\`id\` varchar(36) NOT NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedOn\` datetime(6) NULL, \`buddy\` varchar(255) NOT NULL, \`accceptance\` enum ('pending', 'accepted', 'declined') NOT NULL DEFAULT 'pending', \`savingPlanId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedOn\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`saving_plan\` (\`id\` varchar(36) NOT NULL, \`createdOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedOn\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedOn\` datetime(6) NULL, \`title\` varchar(255) NOT NULL, \`number_of_saving_buddies\` varchar(255) NOT NULL, \`target_set\` tinyint NOT NULL, \`saving_process\` varchar(255) NOT NULL, \`saving_frequency\` enum ('daily', 'weekly', 'monthly') NOT NULL, \`twelve_month_saving_target\` int NOT NULL, \`saving_start\` datetime NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`buddy\` ADD CONSTRAINT \`FK_0d776be7cf7ab34f0224691724d\` FOREIGN KEY (\`savingPlanId\`) REFERENCES \`saving_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`saving_plan\` ADD CONSTRAINT \`FK_ba401fa28ede94b4995127f40d1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`saving_plan\` DROP FOREIGN KEY \`FK_ba401fa28ede94b4995127f40d1\``);
        await queryRunner.query(`ALTER TABLE \`buddy\` DROP FOREIGN KEY \`FK_0d776be7cf7ab34f0224691724d\``);
        await queryRunner.query(`DROP TABLE \`saving_plan\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`buddy\``);
    }

}
