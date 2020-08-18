import { items, ratings } from './mock';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Rating, Item } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MockService {

    getAllItems():Observable<Item[]>{
        return of(items)
    }

    getAllRatings():Observable<Rating[]>{
        return of(ratings)
    }

}
