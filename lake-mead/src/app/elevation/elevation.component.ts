import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'elevation',
    templateUrl: './elevation.component.html',
    styleUrls: ['./elevation.component.css']    
})

export class ElevationComponent implements OnInit{

    static readonly elevationDataEndpoint : string = "elevation_data";

    elevationData! : object[];
    elevationDataByYear : Map<number, number[]> = new Map<number, number[]>();
    elevationDataByYearAveraged : Map<number, number> = new Map<number, number>();

    sliderYearValue : any = 1935;
    minYear : number = 1935;
    maxYear : number = 2022;

    constructor(private http : HttpClient){}

    ngOnInit(){
        this.readElevationData().subscribe((elevationData : any) => {
            this.elevationData = elevationData.data;
            console.log(this.elevationData);
            this.aggregateElevationDataByYear();
        });
    }

    readElevationData(){
        return this.http.get<any>(environment.backend_base_url + ElevationComponent.elevationDataEndpoint);
    }

    aggregateElevationDataByYear(){

        // Get all elevation levels per year
        this.elevationData.map((datapoint:any) => {
            var year = new Date(datapoint[0]).getUTCFullYear();
            var elevation = datapoint[1];

            // Add elevation data to list for existing year or create list for new year
            if(this.elevationDataByYear.has(year)){
                this.elevationDataByYear.get(year)?.push(elevation);
            }
            else{
                this.elevationDataByYear.set(year, [elevation]);
            }
        });

        var keysArr = Array.from(this.elevationDataByYear.keys());
        this.minYear = keysArr[0];
        this.maxYear = keysArr[keysArr.length - 1];
        
        // Average them together
        this.elevationDataByYear.forEach((elevations, year) => {
            var sum = 0
            for(var i=0; i < elevations.length; i++){
                sum += elevations[i];
            }
            this.elevationDataByYearAveraged.set(year, sum/elevations.length)
        });

        console.log('got aggregated data');
        console.log(this.elevationDataByYearAveraged);
    }
}