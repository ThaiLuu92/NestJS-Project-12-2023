import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/categories.entity";
import { CategoryRepository } from "./category.repository";
import { JwtModule } from "@nestjs/jwt";



@Module({
    imports:[TypeOrmModule.forFeature([CategoryEntity]),JwtModule],
    controllers: [CategoryController],
    providers:[CategoryService,CategoryRepository]    
})

export class CategoryModule {}