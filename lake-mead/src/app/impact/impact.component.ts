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

    isModalVisible : boolean = true;

    /* Conservation and consumption details */ 
    conservationDetail1 : IConservationDetails = {waterEffect: 5, additionalDetails: 'The Water Authority identifies property owners who violate water regulations and fines them $80, with the fine doubling for every subsequent violation.', checked: false};
    conservationDetail2 : IConservationDetails = {waterEffect: 15, additionalDetails: 'Replacing ornamental lawns with water-saving desert landscape saves an average of 3.4 billion gallons annually.', checked: false}
    conservationDetail3 : IConservationDetails = {waterEffect: 10, additionalDetails: 'The Las Vegas Valley Water District projects that this limitation will save 32 million gallons over the next decade.', checked: false}
    conservationDetail4 : IConservationDetails = {waterEffect: 5, additionalDetails: 'Turning off irrigation during extreme rains in August 2022 saved 250 million gallons of water.', checked: false}
    conservationDetail5 : IConservationDetails = {waterEffect: 5, additionalDetails: '40% of water usage is indoors and nearly 100% of that is reclaimed. This is how the Strip is able to contribute to only using 5% of the community\'s total water supply.', checked: false}
    conservationDetail6 : IConservationDetails = {waterEffect: 15, additionalDetails: 'In the beginning of Januaray 2022, about 8.1 billion gallons a year will be reduced from Southern Nevada usage.', checked: false}
    conservationDetail7 : IConservationDetails = {waterEffect: 10, additionalDetails: 'Ocean Spray saved 5.7 million gallons of water a year by developing a way to use water 3 times in their manufacturing process before expelling it as wastewater.', checked: false}

    conservationMap : Map<string, IConservationDetails> = new Map<string, IConservationDetails>([
        ["Impose water penalties on over-consumers", this.conservationDetail1],
        ["Replace grass with desert landscaping", this.conservationDetail2],
        ["Limit residential pools to 600 square feet", this.conservationDetail3],
        ["Turn off irrigation systems during monsoon weather", this.conservationDetail4],
        ["Reclamation of indoor water into Lake Mead with high-treatment facility", this.conservationDetail5],
        ["Drought Contingency plan tier 2 limits the amount of water Southern Nevada can pull", this.conservationDetail6],
        ["Promote water efficiency in manufacturing", this.conservationDetail7]
    ]);

    consumptionDetail1 : IConservationDetails = {waterEffect: -30, additionalDetails: 'Water demand could exceed supply by an estimated 3.2 million acre-feet, which is more than 1.0 trillion gallons per year.', checked: false};
    consumptionDetail2 : IConservationDetails = {waterEffect: -20, additionalDetails: '70 percent of single and multi-family water usage is for landscaping.', checked: false};
    consumptionDetail3 : IConservationDetails = {waterEffect: -30, additionalDetails: 'This decreased the runoff into the Colorado River, leaving Lake Mead more than three trillion gallons below capacity', checked: false}
    consumptionDetail4 : IConservationDetails = {waterEffect: -35, additionalDetails: 'Higher temperatures increase water demand, accelerates soil aridification, and increases the amount of water the atmosphere sponges up from bodies of water.', checked: false}
    consumptionDetail5 : IConservationDetails = {waterEffect: -15, additionalDetails: 'Golf courses about 236 million gallons of water a year, or 6% of Las Vegas\'s total water usage.', checked: false}

    consumptionMap : Map<string, IConservationDetails> = new Map<string, IConservationDetails>([
        ["State population grows to 3.3 million by 2030", this.consumptionDetail1],
        ["No changes in landscaping habits", this.consumptionDetail2],
        ["Rocky Mountains having below-average snowfall for several years", this.consumptionDetail3],
        ["Temperatures in Clark County are projected to warm 10 degrees Fahrenheit by the end of the century.", this.conservationDetail4],
        ["Continue building new golf courses", this.consumptionDetail5]
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

    exitModal(){
        this.isModalVisible = false;
    }

    enterModal(){
        this.isModalVisible = true;
    }
}

