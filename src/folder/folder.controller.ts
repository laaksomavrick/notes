import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateFolderDto, UpdateFolderDto } from './folder.dto';

@Controller('folders')
// @UseGuards(AuthGuard('bearer'))
export class FoldersController {
    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createFolderDto: CreateFolderDto) {
        return {};
    }

    @Get()
    async findAll(@Query() query) {
        return [];
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
