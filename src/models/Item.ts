import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: 'items'
})
export class Item extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    price!: number;
}