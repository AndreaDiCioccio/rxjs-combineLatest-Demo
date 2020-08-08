import { MockService } from './mock.service';
import { Component, OnInit } from '@angular/core';
import { Item, ItemAndRating, Rating } from './models';
import { Observable, pipe, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators'

@Component({
    selector: 'app-root',
    template:`
        <h1> rxjs combineLatest Demo</h1>
        <pre>{{itemsAndRatings$ | async | json}}</pre>
    
    `
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

        // combina i valori di 2 observable restituendo un Observable di array di oggetti Item
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
                            
                            if(item.id == rating.itemId){
                                count++
                                totalRate += rating.rate
                                itemsRating[index] = {...item, rating: totalRate, ratingCount:count}
                            }

                        })
                        index++
                    })

                    return itemsRating
                }),
                map( (items:Item[]) => items.map( (item:Item) => ({...item, rating:Number((item.rating / item.ratingCount).toFixed(1))})))
            )

        this.itemsAndRatings$.subscribe()

    }
}
