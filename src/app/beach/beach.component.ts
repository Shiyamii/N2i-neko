import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beach',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './beach.component.html',
  styleUrl: './beach.component.scss',
})
export class BeachComponent {
  images: { src: string; position: [number, number] }[] = [];
  imagePosition: [number, number] = [0, 0];
  private intervalId: any;
  imageCount = 0;
  private maxImages = 100;
  private rdm: number = 1;
  score: number = 0;

  ngOnInit(): void {
    this.updateImagePosition();
  }

  randomScreenCoordinates(): [number, number] {
    const height = window.innerHeight;
    const width = window.innerWidth;

    const x = Math.floor(Math.random() * (window.innerWidth - width * 0.1));

    const y = Math.floor(Math.random() * (window.innerHeight - height * 0.75)) + height * 0.35;

    return [x, y];
  }




  addImage() {
    if (this.imageCount < this.maxImages) {
      this.rdm = Math.floor((Math.random() * 6) + 1);
      const newImage = {
        src: '/assets/images/Picture'+ this.rdm +'.png', // Replace with the actual path to your image
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
      // Si le nombre d'images dépasse 15, arrêtez l'intervalle
      if (this.imageCount > this.maxImages) {
        clearInterval(this.intervalId); // Arrêter l'intervalle
      }
    }, 500);
  }

  imgClick(event: { src: string; position: [number, number] }) {
    console.log('Image clicked', event);
    // Remove the image from the screen and decrease the image count
    this.images = this.images.filter((img) => img !== event);
    this.imageCount--;
    this.score++;
  }

  getImageCountColor(): { [key: string]: string } {
    const ratio = Math.min(this.imageCount / this.maxImages, 1); // Normalisation entre 0 et 1
    const red = Math.floor(255 * ratio);  // Plus nbImages approche de 15, plus le rouge devient intense
    const green = Math.floor(255 * (1 - ratio)); // Le vert diminue à mesure que nbImages augmente
    return { 'color': `rgb(${red}, ${green}, 0)` }; // Retourne un objet avec la propriété CSS 'color'
  }
}
