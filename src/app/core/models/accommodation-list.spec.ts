import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { defer } from 'rxjs';
import { Accommodation } from 'src/app/core/models/accommodation.model';
import { Region } from 'src/app/core/models/region.model';
import { TypeAccommodation } from 'src/app/core/models/type-accommodation.model';
import { AccommodationService } from 'src/app/core/services/accommodation.service';

let httpClientSpy: jasmine.SpyObj<HttpClient>;
let accommodationService: AccommodationService;

beforeEach(() => {
  // TODO: spy on other methods too
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  accommodationService = new AccommodationService(httpClientSpy);
});

it('should return expected accommodations (HttpClient called once)', (done: DoneFn) => {
  const expectedAccommodation: Accommodation[] = [
    {
      id: 1,
      name: 'Acco1',
      price: 234,
      surface: 34,
      zipCode: '75000',
      description: 'test acco',
      address: '26 Avenue du Test',
      city: 'Paris',
      region: new Region(),
      nbSleeping: 4,
      capacityAdult: 5,
      capacityChild: 1,
      imageUrl: '',
      typeAccommodation: new TypeAccommodation(),
      reviews: [
        { id: 2, comment: 'text', score: 4 },
        { id: 5, comment: 'text', score: 4 },
      ],
    },
    {
      id: 2,
      name: 'Acco2',
      price: 235,
      surface: 35,
      zipCode: '75000',
      description: 'test acco',
      address: '26 Avenue du Test',
      city: 'Paris',
      region: new Region(),
      nbSleeping: 4,
      capacityAdult: 5,
      capacityChild: 1,
      imageUrl: '',
      typeAccommodation: new TypeAccommodation(),
      reviews: [
        { id: 2, comment: 'text', score: 4 },
        { id: 5, comment: 'text', score: 4 },
      ],
    },
  ];
  httpClientSpy.get.and.returnValue(
    defer(() => Promise.resolve(expectedAccommodation))
  );

  accommodationService.getAllAccommodations().subscribe({
    next: (accommodations) => {
      expect(accommodations)
        .withContext('expected accommodations')
        .toEqual(accommodations);
      done();
    },
    error: done.fail,
  });
  expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
});

it('should return an error when the server returns a 404', (done: DoneFn) => {
  const errorResponse = new HttpErrorResponse({
    error: 'test 404 error',
    status: 404,
    statusText: 'Not Found',
  });

  httpClientSpy.get.and.returnValue(defer(() => Promise.reject(errorResponse)));

  accommodationService.getAllAccommodations().subscribe({
    next: (accommodations) =>
      done.fail('expected an error, not accommodations'),
    error: (error) => {
      expect(error.error).toContain('test 404 error');
      done();
    },
  });
});
