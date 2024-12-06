
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
3. Begin cleaning the ocean by clicking on waste icons (`déchets`) before they pile up!

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
import { Component } from '@angular/core';

@Component({
  selector: 'app-beach',
  templateUrl: './beach.component.html',
  styleUrls: ['./beach.component.scss'],
})
export class BeachComponent {
  images: { src: string; position: [number, number] }[] = [];
  imageCount = 0;
  maxImages = 100;
  score = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.updateImagePosition();
  }

  randomScreenCoordinates(): [number, number] {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return [
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height),
    ];
  }

  addImage() {
    if (this.imageCount < this.maxImages) {
      const newImage = {
        src: './assets/images/Picture' + (Math.floor(Math.random() * 6) + 1) + '.png',
        position: this.randomScreenCoordinates(),
      };
      this.images.push(newImage);
      this.imageCount++;
    }
  }

  updateImagePosition() {
    this.intervalId = setInterval(() => this.addImage(), 500);
  }

  imgClick(event: { src: string; position: [number, number] }) {
    this.images = this.images.filter((img) => img !== event);
    this.imageCount--;
    this.score++;
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

## License

This project is licensed under the [MIT License](LICENSE).

---

Join us in the mission to **Clean the Ocean** and protect marine life! 🌊🦈🐟
