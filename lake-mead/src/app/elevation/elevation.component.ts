import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
    minElevation : number = Infinity;
    maxElevation : number = -1;
    currElevation : number|undefined = 0;
    waveHeightStyle : any = "";

    isIndicatorVisible : boolean = false;
    indicatorText : string = "";
    indicatorHeightStyle : string = "";

    isModalVisible : boolean = true;
    isScreen1Visible : boolean = true;
    isScreen2Visible : boolean = false;
    isScreen3Visible : boolean = false;
    isScreen4Visible : boolean = false;
    imagePath : string = "/assets/aerial_lake_mead.jpg";

    constructor(private http : HttpClient, private router : Router ){}

    ngOnInit(){
        this.readElevationData().subscribe((elevationData : any) => {
            this.elevationData = elevationData.data;
            this.aggregateElevationDataByYear();
            this.calculateElevationForYear();
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
        
        // Average them together, find min and max elevations
        
        this.elevationDataByYear.forEach((elevations, year) => {
            var sum = 0
            for(var i=0; i < elevations.length; i++){
                sum += elevations[i];
            }
            var avg = sum/elevations.length
            if(avg < this.minElevation){
                this.minElevation = avg;
            }
            if(avg > this.maxElevation){
                this.maxElevation = avg;
            }

            this.elevationDataByYearAveraged.set(year, avg)
        });

        console.log('got aggregated data');
        console.log(this.elevationDataByYearAveraged);
    }

    calculateElevationForYear(){
        // >= 1200 ft: almost full
        // 1170-1200: 60%
        // 1125: 40%, drought
        // 1075: 30%, shortage 1
        // 1050: 28%, shortage 2
        // 1025: 15%, shortage 3
        // 1000: 10%, power generation limit
        
        // Get elevation for current year 
        this.currElevation = this.elevationDataByYearAveraged.get(this.sliderYearValue);
        console.log('current elevation: ' + this.currElevation);

        // Get water height corresponding to elevation
        var heightNum = (this.interpolateElevation(this.currElevation) * 100);
        if(this.currElevation != null && this.currElevation < 1090){
            heightNum -= 25;
            if(heightNum < 0){
                heightNum = 20;
            }
        }
        this.waveHeightStyle = heightNum + "vh"; 

        // Show indicator levels
        if(this.currElevation != null && this.currElevation < 1125){
            this.isIndicatorVisible = true;
            this.indicatorHeightStyle = heightNum + "vh";
        }
        else{
            this.isIndicatorVisible = false;
        }

        if(this.currElevation != null && this.currElevation < 950){
            this.indicatorText = "Can no longer generate power";
        }
        else if(this.currElevation != null && this.currElevation < 1025){
            this.indicatorText = "Shortage Condition III";
        }
        else if(this.currElevation != null && this.currElevation < 1050){
            this.indicatorText = "Shortage Condition II";
        }
        else if(this.currElevation != null && this.currElevation < 1075){
            this.indicatorText = "Shortage Condition I";
        }
        else if(this.currElevation != null && this.currElevation < 1125){
            this.indicatorText = "Drought";
        }


        


    }

    interpolateElevation(elev : any){
        const clamp = (a:any, min = 0, max = 1) => Math.min(max, Math.max(min, a));
        const invlerp = (x:any, y:any, a:any) => clamp((a - x) / (y - x));   
        
        return invlerp(this.minElevation, this.maxElevation, elev)
    }

    exitModal(){
        this.isModalVisible = false;
    }

    enterModal(){
        this.isModalVisible = true;
    }

    goToScreen1(){
        this.isScreen1Visible = true;
        this.isScreen2Visible = false;
        this.isScreen3Visible = false;
        this.isScreen4Visible = false;
        this.imagePath = '/assets/aerial_lake_mead.jpg';
    }

    goToScreen2(){
        this.isScreen1Visible = false;
        this.isScreen2Visible = true;
        this.isScreen3Visible = false;
        this.isScreen4Visible = false;
        this.imagePath = '/assets/drought_lake_mead.jpg';
    }

    goToScreen3(){
        this.isScreen1Visible = false;
        this.isScreen2Visible = false;
        this.isScreen3Visible = true;
        this.isScreen4Visible = false;
        this.imagePath = "assets/water_line_lake_mead.jpg"
    }

    
    goToScreen4(){
        this.isScreen1Visible = false;
        this.isScreen2Visible = false;
        this.isScreen3Visible = false;
        this.isScreen4Visible = true;
        this.imagePath = "assets/light_blue.jpg"
    }
    navigateToImpactPage(){
        this.router.navigate(["/impact"]);
    }
}