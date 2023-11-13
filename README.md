# Inspiration
College students love "Find My Friends". Whether it's to check in on a friend who's running late, or finding locations of events on campus, or simply seeing what others are up to on a particular day, access to locations of an inner circle is something many of us now take for granted. Unfortunately, Find My has its limitations. Knowing someone's location doesn't give you very much information about their availability, and also doesn't always warrant an invitation to come by. This gap in an existing product, combined with the desire to make social gatherings amongst college students more casual and spontaneous, led to the development of Loc8.

# What it does
After creating an account and logging in, a user is presented with three different pages. The first page, "profile", allows the user to toggle their availability. If they choose to turn on their availability, they're presented with an optional tagging feature to set a more specific status for themselves (studying, eating, working out, chilling, etc). Their current location, as well as their status, if they choose, will appear to their friends. If they choose to turn off their availability, their location will not be shared and all status tags will be turned off. The second page, map, is where all of a user's friends are centralized. A user can see in real time where their friends are and what status they are sharing. If a user is interested in joining one of their friends, all they have to do is "nudge" them via a button- this sends the friend a notification indicating that a friend wants to join them in their activity. The third page, friends, is where a user can add more friends, as well as see existing ones. With just a friend's email address, a user can send a friend request. Any incoming friend requests are also shown on this page.

# How we built it
The entire frontend is built with React Native, and the backend is pure Javascript. The database is hosted on Firebase.

# Challenges we ran into
This was our entire team's first attempt at a mobile project, so the project structure definitely took some getting used to. The frontend and database were also particularly difficult to reconcile.

# Accomplishments that we're proud of
Live user location
A fully functional database that can be used to pull and push data (account creation and login) as well as
parsed (add friends)
Notification integration
Maps integration

# What we learned
So much about mobile development.

# What's next for Loc8
Adding pictures to status updates
Creating "circles" of friends
A message board to invite and plan for future events

# How to run
First install the necessary packages by running npm install in terminal. Then, run the app by calling command -npx expo start. If it doesn't work, try -npx expo start --tunnel
