import { Component, AfterViewInit } from '@angular/core';
import { IConservationDetails } from '../interfaces/conservation_details';

@Component({
    selector: 'impact',
    templateUrl: './impact.component.html',
    styleUrls: ['impact.component.css']
})
export class ImpactComponent{

    waveHeightStyle : string = "";
    currWaveHeight : any = 40;

    /* Conservation and consumption details */ 
    conservationDetail1 : IConservationDetails = {waterEffect: 5, additionalDetails: 'The Water Authority identifies property owners who violate water regulations and fines them $80, with the fine doubling for every subsequent violation.', checked: false};
    conservationDetail2 : IConservationDetails = {waterEffect: 15, additionalDetails: 'Replacing ornamental lawns with water-saving desert landscape saves an average of 3.4 billion gallons annually.', checked: false}
    conservationDetail3 : IConservationDetails = {waterEffect: 10, additionalDetails: 'The Las Vegas Valley Water District projects that this limitation will save 32 million gallons over the next decade.', checked: false}
    conservationDetail4 : IConservationDetails = {waterEffect: 5, additionalDetails: 'Turning off irrigation during extreme rains in August 2022 saved 250 million gallons of water.', checked: false}

    conservationMap : Map<string, IConservationDetails> = new Map<string, IConservationDetails>([
        ["Impose water penalties on over-consumers", this.conservationDetail1],
        ["Replace grass with desert landscaping", this.conservationDetail2],
        ["Limit residential pools to 600 square feet", this.conservationDetail3],
        ["Turn off irrigation systems during monsoon weather", this.conservationDetail4]
    ]);

    consumptionDetail1 : IConservationDetails = {waterEffect: 40, additionalDetails: 'Water demand could exceed supply by an estimated 3.2 million acre-feet, which is more than 1.0 trillion gallons per year.', checked: false};
    consumptionDetail2 : IConservationDetails = {waterEffect: 20, additionalDetails: '70 percent of single and multi-family water usage is for landscaping.', checked: false};

    consumptionMap : Map<string, IConservationDetails> = new Map<string, IConservationDetails>([
        ["State population grows to 3.3 million by 2030", this.consumptionDetail1],
        ["No changes in landscaping habits", this.consumptionDetail2]
    ]);

        
    constructor(){
        this.waveHeightStyle = this.currWaveHeight + "vh";
    }

    updateWaterHeightConservation(event:any){
        
        var optionKey = event.source._labelElement.nativeElement.innerText;
        var optionValue = this.conservationMap.get(optionKey);
        var waterEffect;

        if(optionValue != undefined){
            waterEffect = optionValue.waterEffect
            optionValue.checked = event.checked;
        }

        if(event.checked){
            this.currWaveHeight += waterEffect;
            if(this.currWaveHeight > 100){
                this.currWaveHeight = 100;
            }
        }
        else{
            if(waterEffect != undefined){
                this.currWaveHeight -= waterEffect;
            }
            if(this.currWaveHeight < 20){
                this.currWaveHeight = 20;
            }
        }

        this.waveHeightStyle = this.currWaveHeight + "vh";
    }

    updateWaterHeightConsumption(event:any){
        
        var optionKey = event.source._labelElement.nativeElement.innerText;
        var optionValue = this.consumptionMap.get(optionKey);
        var waterEffect;

        if(optionValue != undefined){
            waterEffect = optionValue.waterEffect
            optionValue.checked = event.checked;
        }

        if(event.checked){
            this.currWaveHeight += waterEffect;
            if(this.currWaveHeight > 100){
                this.currWaveHeight = 100;
            }
        }
        else{
            if(waterEffect != undefined){
                this.currWaveHeight -= waterEffect;
            }
            if(this.currWaveHeight < 20){
                this.currWaveHeight = 20;
            }
        }

        this.waveHeightStyle = this.currWaveHeight + "vh";
    }
}

