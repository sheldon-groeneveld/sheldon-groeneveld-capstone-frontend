# Project Title

Balderdash - Beyond Pen and Paper

## Overview

What is your app? Give a brief description in a couple of sentences.

This app is to serve as a pen and paper replacement tool for playing the board game "Balderdash"
Players will be able to submit, read, and vote on answers during the game, without the need to use a paper ticket every time.

### Problem Space

Why is your app needed? Give any background information around any pain points or other reasons.

While playing the game, I noticed that we were using up the provided paper answer cards very quickly, and that they were not reusable. This led to us running out of tickets and needing to print more.
This led to having an incomplete board game to play, and a pretty large waste of paper. With this app, no paper will be needed.

### User Profile

Who will use your app? How will they use it? Add any special considerations that your app must take into account.

This app will be used by groups of 2-6, family members and friends, those who want to casually enjoy a game. Accessibility for the visually impaired will be taken into account.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

Users will be able to create a room that multiple users/clients will be able to connect to and communicate to each other through.

At the start of a round, one user is designated as the "dasher".
Each user will be able to create and submit a answer.
After all users have submitted an answer, answers will be displayed to all users in a random order.
All non-dasher users will be able to vote on an answer (one vote per user).
Voting results (count and associated user) will be displayed so users can mark scoring.
The next round resets all answers and passes the dasher role to the next user.

Users will be able to use text-to-speech to have the webpage read aloud to them, for the visually impaired.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

Client Libraries: - react - react-router
Server Libraries: - express - Socket.io

If there is time for deployement:
-Netlify for frontend
-Render for backend

### APIs

List any external sources of data that will be used in your app.

-Websocket.io
-Web Speech API

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

-Home page
-Create room
-Join room
-Game room

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.
![capstone visuals mockup](/assets/capstone-mockup.jpg)

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.

A database should not be required for the intended final product, but is being considered for future implementations

![Balderdash Cards](/assets/example-card.png))

The project is not intended to replace the game cards, but for demonstration purposes, there will be a small sample of cards that users can access within the app.
Data will be in two tables: cards, and prompts
Cards will include: ID (primary key). When user auth is implemented, they will also contain an author. When content moderation is implemented, they will contain a public/private boolean.
[
{
"id": 1,
"author": "Official Game",
"private": true
}
]

Prompts will contain: card id (foreign key), category, prompt, correct answer.
[
{
"card_id": 1
"category": "weird words"
"prompt": "Bheestie"
"real_answer": "An Indian water boy."
},
{
"card_id": 1
"category": "peculiar people"
"prompt": "Jay Ohrberg"
"real_answer": "He desogmed a 100' long Cadilac limo complete with swimming pool and waterbed."
},
{
"card_id": 1
"category": "incredible initials"
"prompt": "T.F.O.A"
"real_answer": "Things Falling Off Aircraft"
},
{
"card_id": 1
"category": "marvelous movies"
"prompt": "Dirty Dingus Magee"
"real_answer": "Frank Sinatra stars in this western about an outlaw who runs into an old enemy"
},
{
"card_id": 1
"category": "laughable laws"
"prompt": "In Summerside, Prince Edward Island, it is against the law to borrow or lend..."
"real_answer": "Water."
}
]

Prompts will not be directly accessible to clients, but are accessed indirectly through the card.

When user authentication is implemented, I will allow users to create and upload their own cards that they can then play with. Users would only have access to cards that they posted.
This would then create a relationship between users and the game cards they post.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

GET /socket.io/socket.io.js

Future Implementation: (With database and user auth)
** GET /cards ** get all cards that are accessible to everyone
** GET /cards/:userId ** get all cards related to a logged in user
** GET /cards/:id ** get details about a specific card, preferably random from a given list for the game
** POST /cards/:userId ** create a new card related to a loggin in user
** PUT /cards/:userId/:id ** or ** PUT /cards/:id ** edit a card related to the user who posted it
** DELETE /cards/:userId/:id ** delete a card
All endpoints will also be related to the prompts table, indirectly through the related cards.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation working back from the capstone due date.

- Create React client
- Add Homepage that redirects to create room and join game page
- Add Create room page that give the user a random room code and a redirect to the game room
- Add Join room page that user can enter a code to join a room
- Create server with express and socket.io
- Feature: user creates an open room and is shown the room code
- Feature: User connects to room when open room code is submitted
- Feature: Input field and submit buttons for answers, hidden on submission
- Feature: Update all users to see all answers as buttons after all users have submitted. Hide all answers on vote
- Feature: Update all users to see answers and who voted for them.
- Feature: Set one user to be the dasher. Give dasher buttons to force the game forward (in case of disconnect or issues).
- Feature: Pass dasher to next user on round completion and return to input field display

- Bug Fixes
- Demo product

---

## Future Implementations

Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

-Users can set a nickname and choose an icon for the game session.
-Add time limit for answering and voting
-Assign score based on votes
-Persist scores, announce winner at threshold
-Text-to-speech for the
-Allow users to submit a a game card to a database.
-Allow users to share cards with other users
-Allow users to pull a card from the database to use for playing
-Allow users to set whether they want a card to be prevented from showing again for just this session or until they have seen all of the cards they have access to over multiple games
