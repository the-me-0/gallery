# Gallery

A gallery web app, with similar technologies as my last project [Groove](https://github.com/the-me-0/groove) (NextJS)

It uses updated versions of the technologies used in Groove, and is very much up to date with my latest coding skills.

## Dependencies

This project uses the following dependencies :
- **FFmpeg** : I use FFmpeg to generate thumbnails for the videos. I don't know for unix systems, but on windows it's as simple as running `winget install "FFmpeg (Essentials Build)"` in a powershell. You might as well need to set up some PATH variables such as `FFMPEG_PATH` and `FFPROBE_PATH`.
- **Docker** : docker is used in order to run the database.

## How to start

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run db:start` to start the database
4. *only at first start* Run `npm run db:migrate` to create the tables
5. Run `npm run dev` to start the development server
6. Go to `http://localhost:3000` to see the app

## ESLint & Prettier

This project is using ESLint and prettier, and is using the following packages to do so :

- prettier-plugin-tailwindcss,
- eslint-config-prettier
  ESlint was provided by Next.js during project init.

## Licence

This project is under the CC BY-NC-SA 4.0 licence, more info at the end of this README.

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/the-me-0/gallery">Gallery</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/the-me-0">Noah PHILIPPE</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>
