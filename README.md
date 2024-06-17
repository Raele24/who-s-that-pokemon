# Who's That Pokémon?

Welcome to the "Who's That Pokémon?" repository! This project is a fun and interactive web application where users can guess the name of the Pokémon based on their silhouette. The application is hosted on Firebase and can be accessed [here](https://who-s-that-pokemon-3d4b2.web.app/).

![image](https://github.com/Raele24/who-s-that-pokemon/assets/119336725/5f1d4635-2c3a-40ef-bec9-a9b2a9148a95)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

"Who's That Pokémon?" is inspired by the classic segment from the Pokémon anime series where viewers guess the Pokémon based on its silhouette. This project aims to bring that nostalgic experience to the web with a simple, user-friendly interface.

## Features

- Display a silhouette of a Pokémon and prompt the user to guess its name.
- Reveal the correct Pokémon after the user makes a guess.
- Keep track of the user's score.
- Responsive design that works on both desktop and mobile devices.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase Firestore
- **Hosting**: Firebase Hosting

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Raele24/who-s-that-pokemon.git
    cd who-s-that-pokemon
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up Firebase:**
    - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
    - Replace the Firebase configuration in `public/firebase-config.js` with your project's configuration details.

4. **Start the development server:**
    ```sh
    npm start
    ```

5. Open your browser and navigate to `http://localhost:5000`.

## Usage

1. **Open the application**: Visit [Who's That Pokémon?](https://who-s-that-pokemon-3d4b2.web.app/).
2. **Start guessing**: A silhouette of a Pokémon will be displayed. Type your guess into the input box.
3. **Submit your guess**: Press the "Guess" button.
4. **View the result**: The correct Pokémon will be revealed, along with your current score.
5. **Next Pokémon**: A new silhouette will be shown for you to guess.

## Screenshots

### Correct Answer Mobile - Easy Mode
![image](https://github.com/Raele24/who-s-that-pokemon/assets/119336725/df30a130-d810-46ae-a787-fe915ab0a822)

### Correct Answer Desktop - Classic Mode
![image](https://github.com/Raele24/who-s-that-pokemon/assets/119336725/f8fe70b1-c3ad-4a6a-a461-c0307ca454db)

### Selectable Gens
![image](https://github.com/Raele24/who-s-that-pokemon/assets/119336725/3434ce71-1d24-4ce8-98b3-98898536ac55)

## Contributing

Contributions are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out "Who's That Pokémon?"! We hope you enjoy playing the game as much as we enjoyed creating it. If you have any questions or feedback, feel free to open an issue in the repository. Happy guessing!
