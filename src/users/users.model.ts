import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/posts.model";

interface IUserCreationAttribute {
    email: string,
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttribute> {

    @ApiProperty({ example: '1', description: 'Уникальный id'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'user@email.com', description: 'Email пользователя'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: 'qwerty12345', description: 'Пароль пользователя'})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'true', description: 'Статус бана пользователя'})
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({ example: 'Плохо себя вёл', description: 'Причина бана пользователя'})
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}