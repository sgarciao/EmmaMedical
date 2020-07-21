import {Component, Input, OnInit,ViewChild} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AngularFileUploaderModule, AngularFileUploaderComponent } from 'angular-file-uploader';

@ViewChild('fileUpload1', {static: true})

@Component({
  selector: 'app-ngbd-accordion-basic',
  templateUrl: 'upload.component.html'
})

export class UploadComponent {

  private fileUpload1: AngularFileUploaderComponent;

  resetUpload1: boolean;
  resetUpload2: boolean;
  resetUpload3: boolean;
  
  afuConfig1 = {
    multiple: true,
    uploadAPI: {
      url: 'https://slack.com/api/files.upload'
    }
  };

  afuConfig2 = {
    theme: 'attachPin',
    hideProgressBar: 'true',
    hideResetBtn: 'true',
    maxSize: '1',
    uploadAPI: {
      url: 'https://slack.com/api/files.upload',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    },
    formatsAllowed: '.jpg,.png',
    multiple: 'true'
  };
  afuConfig3 = {
    theme: 'dragNDrop',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    maxSize: '1',
    uploadAPI: {
      url: 'https://slack.com/api/files.upload'
    },
    formatsAllowed: '.jpg,.png',
    multiple: true
  };

  DocUpload(env) {
    console.log(env);
  }

  resetfu(id) {
    // this.rfu.resetFileUpload(id);
    // id == 1 ? this.afuref1.resetFileUpload() : this.afuref2.resetFileUpload();
    this[`afuref${id}`].resetFileUpload();
    // this.resetUpload1 = true;
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}
