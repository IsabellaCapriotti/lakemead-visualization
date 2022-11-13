import { Component } from '@angular/core';

@Component({
    selector: 'impact',
    templateUrl: './impact.component.html',
    styleUrls: ['impact.component.css']
})
export class ImpactComponent{

    waveHeightStyle : string = "";
    currWaveHeight : any = 20;
    
    constructor(){
        this.waveHeightStyle = this.currWaveHeight + "vh";
    }

    readonly conservationMap : Map<string, number> = new Map<string, number>([
        ["Impose water penalties on businesses", 10],
        ["Replace grass with desert landscaping", 15]
    ]);

    readonly consumptionMap : Map<string, number> = new Map<string, number>([
        ["Impose water penalties on businesses", 10],
        ["Replace grass with desert landscaping", 15]
    ]);

    updateWaterHeightConservation(event:any){
        
        var optionKey = event.source._labelElement.nativeElement.innerText;
        var optionValue = this.conservationMap.get(optionKey);
        if(optionValue == null){
            optionValue = 0;
        }

        if(event.checked){
            this.currWaveHeight += optionValue;
            if(this.currWaveHeight > 100){
                this.currWaveHeight = 100;
            }
        }
        else{
            this.currWaveHeight -= optionValue;
            if(this.currWaveHeight < 20){
                this.currWaveHeight = 20;
            }
        }

        this.waveHeightStyle = this.currWaveHeight + "vh";
    }
}

