import { Component, OnInit, Input, EventEmitter, Output, NgModule } from '@angular/core';

    @Component({
      selector: 'tooltip-view',
      template: `
        <div class="nodelist" ngbTooltip="You see, I show up on click!" triggers="click:blur">{{rowData.eNodeB}}</div>
      `,
    })

    @NgModule()
    export class TooltipComponent{
      renderValue: string;

      constructor(){
          console.log("entro")
      }

      @Input() value: string | number;
      @Input() rowData: any;

    }