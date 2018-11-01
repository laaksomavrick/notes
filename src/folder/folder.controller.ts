import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFolderDto, UpdateFolderDto } from './folder.dto';
import { FolderService } from './folder.service';

@Controller('folders')
@UseGuards(AuthGuard('bearer'))
export class FoldersController {
    constructor(private readonly folderService: FolderService) {}
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createFolderDto: CreateFolderDto) {
        return {};
    }

    @Get()
    async findAll(@Req() req) {
        const { user } = req;
        return this.folderService.findAllByUser(user);
    }

    @Get(':id')
    async findOne(@Param('id') id) {
        return {};
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    async update(@Param('id') id, @Body() updateFolderDto: UpdateFolderDto) {
        return {};
    }

    @Delete(':id')
    async remove(@Param('id') id) {
        return true;
    }
}
