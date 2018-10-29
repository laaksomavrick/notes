import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { FoldersController } from './folder.controller';
import { Folder } from './folder.entity';
import { FolderService } from './folder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), forwardRef(() =>  UserModule)],
  controllers: [FoldersController],
  providers: [FolderService]
})
export class FolderModule {}
