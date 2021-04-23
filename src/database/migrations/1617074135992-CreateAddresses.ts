import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddresses1617074135992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "addresses",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
          },
          {
            name: "street",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "number",
            type: "int",
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cep",
            type: "bigint",
            isNullable: false,
          },
          {
            name: "city",
            type: "varchar",
            default: false,
          },
          {
            name: "state",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("addresses");
  }
}
