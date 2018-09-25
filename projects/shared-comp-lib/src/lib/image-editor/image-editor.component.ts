import { Component, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'scl-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.css']
})
export class ImageEditorComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('imageUrl') imageUrl:string; 
  @ViewChild('myCanvas') myCanvas: ElementRef;
  @ViewChild('savedImage') savedImage: ElementRef;
  public context: CanvasRenderingContext2D;
  canvasEl: HTMLCanvasElement;
  savedImageEl:HTMLImageElement;
  textToAdd: string = "";
  mouseDrawingSubscription: Subscription;
  touchDrawingSubscription: Subscription;

  //-------------- imported vars 
  currentIndex: number;
  length: number;
  rotate: string;
  selectedColour;
  files: FileList;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.canvasEl = this.myCanvas.nativeElement;
    this.savedImageEl = this.savedImage.nativeElement;
    this.context = this.canvasEl.getContext('2d');

    this.canvasEl.width = 700;
    this.canvasEl.height = 525;

    this.context.lineWidth = 3;
    this.context.lineCap = 'round';
    this.context.strokeStyle = this.selectedColour;

    var image = new Image();
    image.onload = () => {
      this.context.drawImage(image, 0, 0, 700, 525);
    }
    image.src = this.imageUrl;

    this.captureEvents(this.canvasEl);
    this.captureTouchEvents(this.canvasEl);

  }


  addTextToImage() {
    this.context.font = "italic 18px Arial";
    this.context.textAlign = "bottom";
    this.context.textBaseline = "middle";
    this.context.fillStyle = this.selectedColour;
    this.context.fillText(this.textToAdd, 50, 50);
  }

  saveNewImage() {

    var dataUrl = this.canvasEl.toDataURL();

    

    this.savedImageEl.src = dataUrl;
  }

  reset() {
    var image = new Image();
    image.onload = () => {
      this.context.drawImage(image, 0, 0, 700, 525);
    }
    image.src = this.imageUrl; // "assets/images/IMG_0540.JPG";

    this.savedImageEl.src = "";
  }

  drawing = false;
  mousePos = { x: 0, y: 0 }
  lastPos = this.mousePos;

  captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from teh canvas element
    this.mouseDrawingSubscription = fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap(e => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {

        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  captureTouchEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from teh canvas element
    this.touchDrawingSubscription = fromEvent(canvasEl, 'touchstart')
      .pipe(
        switchMap(e => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'touchmove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'touchend')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res: [TouchEvent, TouchEvent]) => {
        res[0].preventDefault();
        res[1].preventDefault();

        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].touches[0].clientX - rect.left,
          y: res[0].touches[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].touches[0].clientX - rect.left,
          y: res[1].touches[0].clientY - rect.top
        };

        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    // incase the context is not set
    if (!this.context) {
      return;
    }

    // start our drawing path
    this.context.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.context.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      this.context.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.context.stroke();
    }
  }

  onColourChange() {
    // localStorage.setItem('AnnotationColour', this.selectedColour);
    this.context.strokeStyle = this.selectedColour;
  }

  ngOnDestroy() {
    // this will remove event lister when this component is destroyed
    this.mouseDrawingSubscription.unsubscribe();
    this.touchDrawingSubscription.unsubscribe();
  }

}
