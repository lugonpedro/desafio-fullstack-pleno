import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { StudentStatus } from '@prisma/client';
import { PrismaService } from 'src/@shared/prisma/prisma.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsService, PrismaService],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.student.deleteMany({});
  });

  it('must create a student', async () => {
    const student = {
      name: 'John Doe',
      birth_date: new Date(15, 3, 2000).toISOString(),
      status: StudentStatus.ACTIVE,
    };

    const createdStudent = await service.create(student);
    expect(createdStudent).toMatchObject({
      ...student,
      birth_date: expect.any(Date),
    });
  });

  it('must return all students', async () => {
    const student1 = {
      name: 'John Doe',
      birth_date: new Date(15, 3, 2000).toISOString(),
      status: StudentStatus.ACTIVE,
    };

    const student2 = {
      name: 'Doe John',
      birth_date: new Date(7, 8, 1995).toISOString(),
      status: StudentStatus.ACTIVE,
    };

    await service.create(student1);
    await service.create(student2);

    const response = await service.findAll();
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ ...student1, birth_date: expect.any(Date) }),
        expect.objectContaining({ ...student2, birth_date: expect.any(Date) }),
      ]),
    );
  });

  describe('when getting a student', () => {
    it('must return a student', async () => {
      const student = {
        name: 'John Doe',
        birth_date: new Date(15, 3, 2000).toISOString(),
        status: StudentStatus.ACTIVE,
      };

      const createdStudent = await service.create(student);
      const response = await service.findOne(createdStudent.registration);
      expect(response).toMatchObject({
        ...student,
        birth_date: expect.any(Date),
      });
    });

    it('must throw an error', async () => {
      await expect(service.findOne('1')).rejects.toThrow('Student not found');
    });
  });

  describe('when updating a student', () => {
    it('must update a student', async () => {
      const student = {
        name: 'John Doe',
        birth_date: new Date(15, 3, 2000).toISOString(),
        status: StudentStatus.ACTIVE,
      };

      const createdStudent = await service.create(student);

      const studentUpdatedData = {
        name: 'Doe John',
      };

      const response = await service.update(
        createdStudent.registration,
        studentUpdatedData,
      );

      expect(response).toMatchObject({
        ...studentUpdatedData,
        birth_date: expect.any(Date),
      });
    });

    it('must return student not found', async () => {
      await expect(service.update('1', {})).rejects.toThrow(
        'Student not found',
      );
    });
  });

  describe('when activating a student', () => {
    it('must activate a student', async () => {
      const student = {
        name: 'John Doe',
        birth_date: new Date(15, 3, 2000).toISOString(),
      };

      const createdStudent = await service.create(student);

      const response = await service.activate(
        createdStudent.registration,
      );

      expect(response).toMatchObject({
        ...student,
        birth_date: expect.any(Date),
        status: StudentStatus.ACTIVE
      });
    });

    it('must return student not found', async () => {
      await expect(service.activate('1')).rejects.toThrow('Student not found');
    });
  });

  describe('when inactivating a student', () => {
    it('must inactivate a student', async () => {
      const student = {
        name: 'John Doe',
        birth_date: new Date(15, 3, 2000).toISOString(),
        status: StudentStatus.ACTIVE
      };

      const createdStudent = await service.create(student);

      const response = await service.inactivate(
        createdStudent.registration,
      );

      expect(response).toMatchObject({
        ...student,
        birth_date: expect.any(Date),
        status: StudentStatus.INACTIVE
      });
    });

    it('must return student not found', async () => {
      await expect(service.inactivate('1')).rejects.toThrow(
        'Student not found',
      );
    });
  });

  describe('when leaving a student', () => {
    it('must leave a student', async () => {
      const student = {
        name: 'John Doe',
        birth_date: new Date(15, 3, 2000).toISOString(),
      };

      const createdStudent = await service.create(student);

      const response = await service.leave(
        createdStudent.registration,
      );

      expect(response).toMatchObject({
        ...student,
        birth_date: expect.any(Date),
        status: StudentStatus.ON_LEAVE
      });
    });

    it('must return student not found', async () => {
      await expect(service.leave('1')).rejects.toThrow('Student not found');
    });
  });
});
