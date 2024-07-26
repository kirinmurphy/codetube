import { jest } from '@jest/globals';

interface User {
  id: number;
  name: string;
  email: string;
}

const prisma = {
  user: {
    findMany: jest.fn<() => Promise<User[]>>().mockResolvedValue([{
      id: 1,
      name: 'John Doe', 
      email: 'john.doe@example.com',
    }]),
  },
};

export default prisma;
