import { Test, TestingModule } from '@nestjs/testing';
import { GreetingService } from './greeting.service';
import { PrismaService } from '../../config/prisma.service';

const mockPrisma = {
  greeting: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
};

describe('GreetingService', () => {
  let service: GreetingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GreetingService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<GreetingService>(GreetingService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return greetings ordered by createdAt desc', async () => {
      const greetings = [{ id: 1, message: 'Hello', createdAt: new Date(), updatedAt: new Date() }];
      mockPrisma.greeting.findMany.mockResolvedValue(greetings);

      const result = await service.findAll();

      expect(result).toEqual(greetings);
      expect(mockPrisma.greeting.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('create', () => {
    it('should create a greeting', async () => {
      const greeting = { id: 1, message: 'Hi there', createdAt: new Date(), updatedAt: new Date() };
      mockPrisma.greeting.create.mockResolvedValue(greeting);

      const result = await service.create({ message: 'Hi there' });

      expect(result).toEqual(greeting);
      expect(mockPrisma.greeting.create).toHaveBeenCalledWith({
        data: { message: 'Hi there' },
      });
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException when greeting not found', async () => {
      mockPrisma.greeting.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow('Greeting not found');
    });
  });
});
