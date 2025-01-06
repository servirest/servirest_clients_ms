import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeopleService {
  
  constructor(@InjectRepository(Person) private readonly peopleRepository : Repository<Person>) {}
  
  findOneByEmail(email: string) {
    return this.peopleRepository.findOneBy({ email });
  }

  findOneByDocument(document: string) {
    return this.peopleRepository.findOneBy({ document });
  }
}
