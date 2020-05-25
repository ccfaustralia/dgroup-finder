import {MigrationInterface, QueryRunner} from "typeorm";
import {User} from "../entities/User";

export class CreateAdminUser1589806348548 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "ccfadmin";
        user.password = "matthew28";
        user.hashPassword();
        user.role = "ADMIN";
        await user.save();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
