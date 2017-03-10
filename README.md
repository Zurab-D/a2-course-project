# a2-course-project
This is an Angular 2 project - app looking like Gmail.
You can create/edit/delete letters and you can do the same with records in address book (users)
Project includes authorisation, auto saving of new email addresses, forms validation & autocompletion of email addresses in letters.
Project includes some unit tests.

Project design was taken here: https://github.com/khalifenizar/gmail-clone
Backend API: http://test-api.javascript.ru/v1
And here is backend project src : https://github.com/Zurab-D/mailbox

This project was generated with angular-cli version 1.0.0-rc.1

> Live Production Build [Demo projrct](https://zurab-d.github.io/a2-course-project)


## Development server

- For a dev server run
```bush
ng serve
```
- Navigate to http://localhost:4200/.
- The app will automatically reload if you change any of the source files.


## Build

To build the project run:
```bush
ng build
```
The build artifacts will be stored in the dist/ directory.
Use the `-prod` flag for a production build.


## Running unit tests

To execute the unit tests via Karma run:
```bush
ng test
```


## Running end-to-end tests

To execute the end-to-end tests via Protractor run:
```bush
ng e2e
```
Before running the tests make sure you are serving the app via `ng serve`.


## In this project I used
- Bootstrap framework (getbootstrap.com)
- and "mydatepicker" - Angular 2 date picker (https://github.com/kekeh/mydatepicker)


### How to deploy to Github Pages articles:
    - First of all read this article: http://developer.telerik.com/featured/quick-angular-2-hosting-angular-cli-github-pages
    - and this, if prev one doesn't help: http://colinmorris.github.io/blog/ng2-poor-mans-deploy
    - After all preparations run `ng github-pages:deploy` to deploy to Github Pages.

    --- UPD: command `ng github-pages:deploy` doesn't work anymore with last version of angular-cli (1.0.0-rc.1)
