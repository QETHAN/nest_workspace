import {
  Controller,
  Get,
  Query,
  Post,
  HttpCode,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateCatDto } from './DTO/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(@Query('name') name): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params) {
    console.log(params.id);
    return `this action returns a #${params.id} cat`;
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() updateCatDto) {
    return `this action updates a #${id} cat`;
  }

  @Delete(':id')
  async remove(@Param('id') id) {
    return `this action removes a #${id} cat`;
  }
}
