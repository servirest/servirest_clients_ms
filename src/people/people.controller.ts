import { Body, Controller, ParseIntPipe, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PaginationDto } from 'src/common/dto';

@Controller()
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @MessagePattern({cmd : 'createPerson'})
  create(@Payload() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @MessagePattern({cmd : 'find_all_persons'})
  findAll(@Payload() PaginationDto : PaginationDto) {
    const {page, limit} = PaginationDto
    
    return this.peopleService.findAll();
  }

  @MessagePattern({cmd : 'find_one_person'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.peopleService.findOne(id);
  }

  @MessagePattern({cmd : 'updat_person'})
  update(@Payload() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(updatePersonDto.id, updatePersonDto);
  }

  @MessagePattern({cmd : 'remove_person'})
  remove(@Payload() id: number) {
    return this.peopleService.remove(id);
  }
}
