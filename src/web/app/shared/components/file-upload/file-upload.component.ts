import { Component, HostBinding, ChangeDetectionStrategy } from '@angular/core';

import { slideInDownAnimation } from '@animation/search.animation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'file-upload-demo',
  styleUrls: ['./file-upload.component.scss'],
  templateUrl: './file-upload.component.html',
  animations: [slideInDownAnimation],
  preserveWhitespaces: true,
})
export class FileUploadDemoComponent {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('class.td-route-animation') classAnimation = true;

  fileSelectMsg = 'No file selected yet.';
  fileUploadMsg = 'No file uploaded yet.';
  fileSelectMultipleMsg = 'No file(s) selected yet.';
  fileUploadMultipleMsg = 'No file(s) uploaded yet.';
  disabled = false;
  files: FileList | File;

  cancelEvent(): void {
    this.fileSelectMsg = 'No file selected yet.';
    this.fileUploadMsg = 'No file uploaded yet.';
  }

  selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
  }

  uploadEvent(file: File): void {
    this.fileUploadMsg = file.name;
  }

  selectMultipleEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      const names: string[] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
      this.fileSelectMultipleMsg = names.join(',');
    } else {
      this.fileSelectMultipleMsg = files.name;
    }
  }

  uploadMultipleEvent(files: FileList | File): void {
    if (files instanceof FileList) {
      const names: string[] = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
      this.fileUploadMultipleMsg = names.join(',');
    } else {
      this.fileUploadMultipleMsg = files.name;
    }
  }

  cancelMultipleEvent(): void {
    this.fileSelectMultipleMsg = 'No file(s) selected yet.';
    this.fileUploadMultipleMsg = 'No file(s) uploaded yet.';
  }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }
}
