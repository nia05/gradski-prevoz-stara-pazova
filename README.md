# Stara Pazova Bus Timetable — Case Study App

A web app that shows the timetable for free public transport in the municipality of Stara Pazova, Serbia, made for phones first. I built it as part of a UX case study.

> **This is not an official app.** It has nothing to do with the Municipality of Stara Pazova, the bus company, or any news site. The timetables here might be wrong or out of date, so check the official ones before you travel.

## About the case study

In Stara Pazova, bus timetables are scanned PDFs, one for each line. To find your bus, you need to know which line stops near you, open the right PDF, and read a big table.

In the case study I tried to make this easier:

- **Find your stop by typing its name.** 
- **See the times for your stop only**, not the whole line.
- **See where a line goes** on a map, with photos of the stops.
- **Find out about changes** to the bus service.

You can read about the whole process (research, user flow, prototype and testing) in the case study: _[link coming soon]_.

## What it does

- Search for a stop by name, with the town 
- Show bus times for a stop on weekdays, Saturdays and Sundays
- List all stops on a line, in both directions
- Show each line on a map
- Local news _(planned)_
- Save your favorite lines and stops on your phone _(planned)_

## Built with

- **Angular 19** for the app
- **JSON files** with the timetables, made from the official PDFs (8 lines, 81 stops)
- **One small serverless function** to get the latest news _(planned)_
- No backend server. The app runs on static hosting.

## Where the data comes from

I took the timetables from the scanned PDFs on the municipality's website.

The stop photos come from Google Street View and can be a few years old.

## Run it locally

You need [Node.js](https://nodejs.org) and the [Angular CLI](https://angular.dev/tools/cli).

```bash
npm install
ng serve
```

Then open `http://localhost:4200/`. The page reloads by itself when you change a file.

Other commands:

| Command | What it does |
|---|---|
| `ng build` | Builds the app into the `dist/` folder, ready to upload |
| `ng test` | Runs the unit tests (Karma) |

The project was set up with Angular CLI 19.2.6.

## Status

🚧 Still in progress. This is a portfolio project, not an app for everyday use yet.

## License

_Not decided yet._
