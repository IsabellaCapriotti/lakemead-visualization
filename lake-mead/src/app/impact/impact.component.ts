import { Component } from '@angular/core';

@Component({
    selector: 'impact',
    templateUrl: './impact.component.html',
    styleUrls: ['impact.component.css']
})
export class ImpactComponent{

    waveHeightStyle : string = "20vh";
    sideNavExpanded : boolean = true; 
    showFiller : boolean = false;
}

