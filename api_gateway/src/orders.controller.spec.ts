import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let appController: OrdersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    appController = app.get<OrdersController>(OrdersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAllOrders).toBe('Hello World!');
    });
  });
});
