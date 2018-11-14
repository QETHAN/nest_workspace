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
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './DTO/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/exceptions/forbidden.exception';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
// import { ValidationPipe } from 'src/pipes/validation.pipe';

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

  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validationError: {
        target: false,
      },
    }),
  )
  @Post()
  // @UseFilters(HttpExceptionFilter)
  async create(@Body() createCatDto: CreateCatDto) {
    // throw new ForbiddenException();
    return this.catsService.create(createCatDto);
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
