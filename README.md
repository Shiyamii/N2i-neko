
# CleanTheOcean 🌊

## Overview

**CleanTheOcean** is a fun and educational web application developed in **Angular** during the **Nuit de l'Info** by the MIAGE team "**Neko x Ficsit Corporations**".

The project aims to raise awareness about the importance of protecting our oceans by simulating a game where players must clean up waste from the sea. However, the challenge intensifies as the waste continues to increase over time, requiring quick actions to keep the ocean clean!

By playing, users learn about the urgency of keeping our seas healthy, as they are vital to sustaining life on Earth. 🌍

---

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Code Snippets](#code-snippets)
- [Contributors](#contributors)
- [License](#license)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/CleanTheOcean.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CleanTheOcean
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Usage

1. Start the development server:
   ```bash
   ng serve
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```
3. Begin cleaning the ocean by clicking on waste icons before they pile up!

---

## Features

- **Interactive Gameplay**:  
  Players click on randomly appearing waste images to clean the ocean. The waste increases over time, challenging players to act quickly.

- **Score Tracking**:  
  Your score increases with every waste item you clean.  

- **Dynamic Difficulty**:  
  Waste spawns at increasing rates, simulating the urgency of ocean conservation.  

- **Visual Feedback**:  
  The UI changes dynamically to reflect game progress and score.

---

## Code Snippets

### Main Game Logic
Here’s an example of the Angular component driving the game:

```typescript
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
```

---

## Contributors

This project was created by the MIAGE team "**Neko x Ficsit Corporations**" during the **Nuit de l'Info**:  
- **PALOTAS Tamas**  
- **LENTINI Matthieu**  
- **EL ARMOUZI Rayan**  
- **GARCIA--GIMENEZ Matthieu**  
- **DENEUX Thomas**  

---

Join us in the mission to **Clean the Ocean** and protect marine life! 🌊🦈🐟
