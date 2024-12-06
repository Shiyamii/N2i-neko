import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-beach',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './beach.component.html',
  styleUrl: './beach.component.scss',
})
export class BeachComponent implements OnInit {
  images: { src: string; position: [number, number] }[] = [];
  imageCount = 0;
  private maxImages = 100;
  private rdm: number = 1;
  score: number = 0;
  styles = {
    '--css-prefix': 'url(' + environment.prefix + '/assets/images/tropical-pixel-beach-with-surf_573660-418.png)',
  };
  isGameOver: boolean = false;

  ngOnInit(): void {
    this.gameEngine();
  }

  gameEngine() {
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
    this.rdm = Math.floor((Math.random() * 6) + 1);
    const newImage = {
      src: environment.prefix + '/assets/images/Picture' + this.rdm + '.png', // Replace with the actual path to your image
      position: this.randomScreenCoordinates(),
    };
    this.images.push(newImage);
    this.imageCount++;
  }

  updateImagePosition() {
    const baseDelay = 500; // Délai initial en millisecondes
    const minDelay = 100;  // Délai minimum
    const scoreFactor = 10; // Réduction de délai par tranche de score

    const executeWithDynamicDelay = () => {
      this.addImage();

      if (this.imageCount >= this.maxImages) {
        this.isGameOver = true;
        return;
      }

      let delay = baseDelay - this.score * scoreFactor;
      if (delay < minDelay) {
        delay = minDelay;
      }
      setTimeout(executeWithDynamicDelay, delay);
    };
    executeWithDynamicDelay();
  }

  imgClick(event: { src: string; position: [number, number] }) {
    if (this.imageCount < this.maxImages) {
      this.images = this.images.filter((img) => img !== event);
      this.imageCount--;
      this.score++;
    }
  }

  replay() {
    this.isGameOver = false;
    this.images = [];
    this.imageCount = 0;
    this.score = 0;
    this.gameEngine();
  }

  getImageCountColor(): { [key: string]: string } {
    const ratio = Math.min(this.imageCount / this.maxImages, 1); // Normalisation entre 0 et 1
    const red = Math.floor(255 * ratio);  // Plus nbImages approche de 15, plus le rouge devient intense
    const green = Math.floor(255 * (1 - ratio)); // Le vert diminue à mesure que nbImages augmente
    return { 'color': `rgb(${red}, ${green}, 0)` }; // Retourne un objet avec la propriété CSS 'color'
  }
}
