import { Component } from '@angular/core';

@Component({
  selector: 'app-beach',
  standalone: true,
  imports: [],
  templateUrl: './beach.component.html',
  styleUrl: './beach.component.scss',
})
export class BeachComponent {
  imageSrc = '/assets/images/tropical-pixel-beach-with-surf_573660-418.png';
  images: { src: string; position: [number, number] }[] = [];
  imagePosition: [number, number] = [0, 0];
  private intervalId: any;
  private imageCount = 0;
  private maxImages = 15;

  constructor() {
    this.updateImagePosition();
  }

  randomScreenCoordinates(): [number, number] {
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    return [x, y];
  }

  addImage() {
    if (this.imageCount < this.maxImages) {
      const newImage = {
        src: '/assets/images/trash1.png', // Replace with the actual path to your image
        position: this.randomScreenCoordinates(),
      };
      this.images.push(newImage);
      this.imageCount++;
    } else {
      clearInterval(this.intervalId);
    }
  }

  updateImagePosition() {
    // Generate random x and y coordinates within the window during 60 seconds
    this.intervalId = setInterval(() => {
      this.addImage();
    }, 2);
  }

  imgClick(event: { src: string; position: [number, number] }) {
    console.log('Image clicked', event);
    // Remove the image from the screen and decrease the image count
    this.images = this.images.filter((img) => img !== event);
    this.imageCount--;
  }
}
