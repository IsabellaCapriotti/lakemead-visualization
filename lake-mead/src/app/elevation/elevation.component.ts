import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'elevation',
    templateUrl: './elevation.component.html',
    styleUrls: ['./elevation.component.css']    
})

export class ElevationComponent implements OnInit{

    static readonly dataJsonUrl : string = "https://www.usbr.gov/uc/water/hydrodata/reservoir_data/921/json/49.json";

    elevationDataJson : string = "";

    constructor(private http : HttpClient){}

    ngOnInit(){
        this.readElevationData().subscribe((waterData : string) => {
            console.log('got water data');
            console.log(waterData);
        });
    }

    readElevationData(){
        return this.http.get<string>(ElevationComponent.dataJsonUrl);
    }
}