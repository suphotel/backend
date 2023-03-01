import { Test, TestingModule } from '@nestjs/testing';
import { HotelImagesController } from './hotel-images.controller';

describe('HotelImagesController', () => {
  let controller: HotelImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelImagesController],
    }).compile();

    controller = module.get<HotelImagesController>(HotelImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
