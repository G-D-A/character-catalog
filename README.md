# Character Catalog - CLI & UI

## How to Start 

### To use app via the CLI:
```bash
npm run start:cli
````

### Run the WEB
Run Server and WEB
```bash
npm run build
npm run start:server
npm run serve
````


## 1. Introduction

### 1.1 Purpose

The goal of this project is to build a modular and extendable CLI-based application for managing characters, and other entities. The application is designed to support various user scenarios.

### 1.2 Scope

This CLI serves as the primary interface for managing data. It now supports getting characters, local caching of character images, and integration with external APIs for dynamic data updates.

---

## 2. System Overview

The application is based on an N-tier architecture:
- **Presentation Layer (CLI)**: Provides the user interface for interacting with the system via terminal commands.
- **Core Layer**: Contains business logic, models, and core functionalities.
- **Data Layer**: Manages data persistence using JSON files.
- **Infra Layer**: Handles external API integrations and image caching.

---

## 3. Architecture

### 3.1 N-Tier Architecture

The application is divided into the following layers:

#### 3.1.1 CLI (Presentation Layer)
- **Entry point**: `cli/cli.ts`
- Responsible for user interactions, command parsing, and displaying data.

#### 3.1.2 Core (Business Logic Layer)
- **Models**: `Character`, `Enemies`, `Artifacts`, `Bosses`, etc.
- Core logic for handling entities and operations (e.g., equipping weapons).
- Extended logic for managing character interactions.
```plaintext
Character Model

+---------------------+
|      Character      |
+---------------------+
| - name: string      |
| - health: number    |
| - attackPower: num  |
| - defense: number   |
| - resist: number    |
| - level: number     |
| - rarity: string    |
+---------------------+
| + attack(target)    |
| + heal(target)      |
+---------------------+

Enemies Model

+---------------------+
|       Enemies       |
+---------------------+
| - name: string      |
| - health: number    |
| - attackPower: num  |
| - defense: number   |
| - angry: number     |
| - threatLevel: str  |
+---------------------+
| + calculateThreat() |
+---------------------+

Artifacts Model

+---------------------+
|      Artifacts      |
+---------------------+
| - name: string      |
| - lifes: number     |
| - strength: number  |
| - rarity: string    |
+---------------------+
| + enhance()         |
+---------------------+

Bosses Model

+---------------------+
|       Bosses        |
+---------------------+
| - name: string      |
| - health: number    |
| - attackPower: num  |
| - defense: number   |
| - angry: number     |
| - specialAbility: str|
+---------------------+
| + useSpecialAbility()|
+---------------------+

Nations Model

+---------------------+
|       Nations       |
+---------------------+
| - name: string      |
| - alliance: string  |
| - powerLevel: number|
+---------------------+
| + allyWith(nation)  |
+---------------------+

Consumables Model

+---------------------+
|     Consumables     |
+---------------------+
| - name: string      |
| - count: number     |
| - effect: string    |
+---------------------+
| + use()             |
+---------------------+

Elements Model

+---------------------+
|      Elements       |
+---------------------+
| - name: string      |
| - power: number     |
| - count: number     |
| - type: string      |
+---------------------+
| + combineWith(elem) |
+---------------------+
```


#### 3.1.3 Data (Persistence Layer)
- Uses `DataRepository` for saving and loading JSON data.
- Stores user-created characters and game entities.
- Supports saving and loading the game state (`saveGameState` and `loadGameState`).

#### 3.1.4 Infra (Infrastructure Layer)
- **API Client**:
    - Fetches data from `https://genshin.jmp.blue/`.
    - Added functionality to retrieve character images.
- **Image Repository**:
    - Manages caching of character images to reduce server load.
    - Saves images locally in `./assets/images`.

---

## 4. CLI Interface

### 4.1 Commands

#### 4.1.1 View Data Commands
- **viewCharacters**: Displays a list of characters fetched from the API or local storage, along with their cached images.
- **viewEnemies**: Shows enemy data retrieved from the API.
- Similar commands could be added for Artifacts, Bosses, Nations, Consumables, and Elements.

#### 4.1.2 Interactive Commands
- **viewCharacterByName**: Allows users to find a specific character by name.
- **equipWeapon**: Provides an interface for equipping a weapon to a character.

### 4.2 Command Registration
Commands are registered dynamically in the `CommandParser` class. The CLI now includes new commands for saving and loading the state.

---

## 5. GUI Interface

### 5.1 Features

1. **Character Display**
- Renders a scrollable list of character cards with images, names, and details.

2. **Filtering**
- Provides a search bar to filter characters by name.

3. **Data Fetching**
- Interacts with the backend via REST API (`/characters`).

---

### 5.2 Architecture

1. **Frontend**
- **Built with**: HTML
- **HTTP Requests**: Axios

2. **Backend**
- **Framework**: Express server
- **Functionality**: Serves REST endpoints to fetch character data.
- **Data Source**: Uses `DataRepository` for managing character data.

---

## 5. Data Management

### 5.1 Local Storage

#### Character Images
- Images are cached locally in `./assets/images`.
- Managed through the `ImageRepository` class.

### 5.2 API Integration

#### Character Images
- The `ApiClient` fetches URLs for character images.
- Images are downloaded and stored locally using the `ImageRepository`.

#### Other Data
- API endpoints provide data for Characters, Enemies, Artifacts, and more.

---

## 6. Extensibility

### 6.1 Adding New Commands
1. Create a new class implementing `ICommand`.
2. Register the command in `CommandParser`.

### 6.2 Adding New Entities
1. Create a model class in `core/`.
2. Implement a `fromApiData` method for API integration.

### 6.3 Adding New Persistence Features
1. Use the `DataRepository` for new data types.
2. Add methods for saving and loading the data.

### 6.4 Adding New Caching Features
1. Use the `ImageRepository` to manage new types of media files.
2. Extend the caching logic to cover additional requirements.

---

## 7. Repository and Documentation

- **Code Repository**: [GitHub](https://github.com/G-D-A/character-catalog)
- **Documentation**: This document will be updated alongside the project.

---
