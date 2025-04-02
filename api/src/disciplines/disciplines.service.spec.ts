import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinesService } from './disciplines.service';
import { PrismaService } from 'src/@shared/prisma/prisma.service';
import { Course, Department } from '@prisma/client';

describe('DisciplinesService', () => {
  let service: DisciplinesService;
  let prisma: PrismaService;
  let course: Course;
  let department: Department;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplinesService, PrismaService],
    }).compile();

    service = module.get<DisciplinesService>(DisciplinesService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.$connect();
    course = await prisma.course.create({
      data: {
        name: 'Course',
      },
    });
    department = await prisma.department.create({
      data: {
        name: 'Department',
        course_id: course.id,
      },
    });
  });

  afterAll(async () => {
    await prisma.department.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.discipline.deleteMany({});
  });

  describe('when creating a discipline', () => {
    it('must create a discipline', async () => {
      const discipline = {
        code: 'CODE01',
        name: 'Discipline',
        credits: 3,
        department_id: department.id,
      };

      const createdDiscipline = await service.create(discipline);
      expect(createdDiscipline).toMatchObject(discipline);
    });

    it('must throw conflict error', async () => {
      const discipline = {
        code: 'CODE01',
        name: 'Discipline',
        credits: 3,
        department_id: department.id,
      };

      await service.create(discipline);
      await expect(service.create(discipline)).rejects.toThrowError(
        expect.objectContaining({
          message: expect.stringContaining('code'),
        }),
      );
    });
  });

  it('must return all disciplines', async () => {
    const discipline1 = {
      code: 'CODE01',
      name: 'Discipline',
      credits: 3,
      department_id: department.id,
    };

    const discipline2 = {
      code: 'CODE02',
      name: 'Discipline Two',
      credits: 4,
      department_id: department.id,
    };

    await service.create(discipline1);
    await service.create(discipline2);

    const response = await service.findAll();
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining(discipline1),
        expect.objectContaining(discipline2),
      ]),
    );
  });

  describe('when getting a discipline', () => {
    it('must return a discipline', async () => {
      const discipline = {
        code: 'CODE01',
        name: 'Discipline',
        credits: 3,
        department_id: department.id,
      };

      await service.create(discipline);
      const response = await service.findOne(discipline.code);
      expect(response).toMatchObject(discipline);
    });

    it('must throw an error', async () => {
      await expect(service.findOne('1')).rejects.toThrow(
        'Discipline not found',
      );
    });
  });

  describe('when updating a discipline', () => {
    it('must update a discipline', async () => {
      const discipline = {
        code: 'CODE01',
        name: 'Discipline',
        credits: 3,
        department_id: department.id,
      };

      await service.create(discipline);

      const disciplineUpdatedData = {
        name: 'Discipline Updated',
      };

      const response = await service.update(
        discipline.code,
        disciplineUpdatedData,
      );

      expect(response).toMatchObject(disciplineUpdatedData);
    });

    it('must return student not found', async () => {
      await expect(service.update('1', {})).rejects.toThrow(
        'Discipline not found',
      );
    });
  });

  describe('when deleting a discipline', () => {
    it('must delete a discipline', async () => {
      const discipline = {
        code: 'CODE01',
        name: 'Discipline',
        credits: 3,
        department_id: department.id,
      };

      await service.create(discipline);

      const response = await service.remove(discipline.code);

      expect(response).toMatchObject(discipline);
    });

    it('must return student not found', async () => {
      await expect(service.remove('1')).rejects.toThrow('Discipline not found');
    });
  });
});
