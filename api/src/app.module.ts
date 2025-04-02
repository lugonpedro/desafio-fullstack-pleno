import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { DepartmentsModule } from './departments/departments.module';
import { CoursesModule } from './courses/courses.module';
import { ImageModule } from './@shared/image/image.module';

@Module({
  imports: [
    StudentsModule,
    DisciplinesModule,
    DepartmentsModule,
    CoursesModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
