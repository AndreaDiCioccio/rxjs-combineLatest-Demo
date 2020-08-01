import { MockService } from './mock.service';
import { Component, OnInit } from '@angular/core';
import { Item, ItemAndRating, Rating } from './models';
import { Observable, pipe, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    
    items$:Observable<Item[]>
    ratings$:Observable<Rating[]>
    itemsAndRatings$:Observable<Item[]>
    itemsAndRatings:Item[]

    constructor(private mockService:MockService){}


    ngOnInit(): void {

        this.items$ = this.mockService.getAllItems()
        this.ratings$ = this.mockService.getAllRatings()

        this.itemsAndRatings$ = combineLatest([this.items$, this.ratings$])
            .pipe(
                map( ([items, ratings]) => {
                    let itemsRating:Item[] = []
                    let index:number = 0

                    items.map( item => {
						let totalRate:number = 0
						let count:number = 0
                        itemsRating.push(null)
                        
                        ratings.map( rating => {
                            item.id == rating.itemId ? count++ : null
                            item.id == rating.itemId ? totalRate += rating.rate : null
                            item.id == rating.itemId ? itemsRating[index] = {...item, rating:totalRate, ratingCount:count} : null
                        })
                        index++
                    })

                    return itemsRating
                }),
                map( (items:Item[]) => items.map( (item:Item) => ({...item, rating:item.rating / item.ratingCount}))),
                tap( items => console.log(items))
            )

        this.itemsAndRatings$.subscribe()

    }
}
