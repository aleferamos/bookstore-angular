import { convertBase64ToFile } from './../../shared/utils/convertBase64ToFile.utils';
import { CropperComponent } from 'angular-cropperjs';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Output, Input, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-editor-img',
  templateUrl: './editor-img.component.html',
  styleUrls: ['./editor-img.component.scss']
})
export class EditorImgComponent implements AfterViewInit {

  @Output() file = new EventEmitter<any>();

  imageUrl: any;
  imageUrls: any;
  cropperRes: string;
  showCropper: boolean;
  savedImg: boolean;
  resizedBase64: any;
  cropperConfig: object = {
    movable: true,
    scalable: true,
    zoomable: true,
    viewMode: 2,
    checkCrossOrigin: true
  };
  text = '';
  downloadLink = '';
  cropperResults;
  mergedRes: any;
  display: boolean = false;


  @ViewChild('angularCropper') public angularCropper: CropperComponent;
  @ViewChild("canvasEl") canvasEl: ElementRef;
  private context: CanvasRenderingContext2D;


  constructor(
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.context = (this.canvasEl
      .nativeElement as HTMLCanvasElement).getContext("2d")!;
    // this.draw('');
  }


  // private draw(src: string) {
  //   this.context.clearRect(0, 0, (this.canvasEl.nativeElement as HTMLCanvasElement).width, (this.canvasEl.nativeElement as HTMLCanvasElement).height);
  //   const img = new Image();
  //   img.src = src;
  //   img.onload = () => {
  //     const newW = img.width > 700 && img.height > 700 ? img.width / 3 : img.width;
  //     const newH = img.height > 700 && img.width > 700 ? img.height / 3 : img.height;
  //     (this.canvasEl.nativeElement as HTMLCanvasElement).width = newW;
  //     (this.canvasEl.nativeElement as HTMLCanvasElement).height = newH;
  //     this.context.font = "30px Arial";
  //     this.context.textBaseline = "middle";
  //     this.context.textAlign = "center";
  //     this.context.drawImage(img, 0, 0, newW, newH);
  //     this.context.fillText(this.text, newW / 2, newH / 2);
  //     this.downloadLink = this.canvasEl.nativeElement.toDataURL("image/jpg");
  //     this.cropperResults = this.downloadLink;
  //     }
  // }

  onFileSelected(event) {
    const that = this;
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        that.showCropper = false;
        reader.onload = (eventCurr: ProgressEvent) => {
          that.imageUrls = (<FileReader>eventCurr.target).result;
          this.imageUrl = that.imageUrls
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      this.showCropper = true;
  }

  selectImg() {
    this.refreshCrop(this.imageUrls);
  }

  refreshCrop(img) {
    this.imageUrl = img;
    this.showCropper = true;
  }

  cropendImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  readyImage(event) {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  rotate(turn) {
    turn = turn === 'left' ? -45 : 45;
    this.angularCropper.cropper.rotate(turn);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  destroy(event) {
    this.angularCropper.cropper.destroy();
  }

  zoomManual() {
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  zoom(status) {
    status = status === 'positive' ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(status);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  move(offsetX, offsetY) {
    this.angularCropper.cropper.move(offsetX, offsetY);
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  scale(offset) {
    if (offset === 'x') {
      this.angularCropper.cropper.scaleX(-1);
    } else {
      this.angularCropper.cropper.scaleY(-1);
    }
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  clear() {
    this.angularCropper.cropper.clear();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  disable() {
    this.angularCropper.cropper.disable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  enable() {
    this.angularCropper.cropper.enable();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  reset() {
    this.angularCropper.cropper.reset();
    this.cropperRes = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg');
  }

  async saveImg() {
    this.savedImg = true;
    this.file.emit(convertBase64ToFile(this.cropperRes));
  }
}
