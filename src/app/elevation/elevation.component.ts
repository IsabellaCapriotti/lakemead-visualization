import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'elevation',
    templateUrl: './elevation.component.ts',
    styleUrls: ['./elevation.component.css']    
})

export class ElevationComponent{

    constructor(private http : HttpClient){}
    
}