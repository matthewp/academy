@page learn-angular/building-our-first-app Generate an App
@parent learn-angular 2

@description Learn how to generate an Angular application with it's command line interface (CLI).

@body

## Overview

In this part, we will:

- Explore tools that aid Angular Development
- Install Angular's CLI
- Generate a new app
- Look at the files generated by the cli
- Learn to serve our app

## Problem

We want to create a new Angular application and update it to say __Place My Order App: Coming Soon!__ in an `<h1>` element.

<img src="../static/img/angular/2-generate-an-app/after.png"
  style="border: solid 1px black; max-width: 320px;"/>

## What You Need to Know

To complete this exercise, you are going to want:

- Select a code editor / IDE
- To install Angular's CLI
- Use the CLI to generate a new app
- Understand the files generated
- Serve the app

## Selecting a code editor

If you're looking for a code editor (aka IDE) to improve your Angular development - VS Code is widely used by the community but editors like Atom and Webstorm are fine as well. Plugins can go a long way in aiding the development process.

### Visual Studio Code

<a href="https://code.visualstudio.com/" target="\_blank">VS Code</a> is Microsoft's modern take on an IDE for app development (P.S. TypeScript is a Microsoft Open Source project).  VS Code has built in TypeScript support for syntax highlighting, IntelliSense code completion, and linting.

<a href="../static/img/vs-code-screenshot.png" target="\_blank"><img src="../static/img/vs-code-screenshot.png" width="100%" alt="Visual Studio Code screenshot" /></a>

Helpful Plugins:
- <a href="https://marketplace.visualstudio.com/items?itemName=natewallace.angular2-inline" target="\_blank">Angular Inline</a>
- <a href="https://marketplace.visualstudio.com/items?itemName=Angular.ng-template" target="\_blank">Angular Language Service</a>
- <a href="https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2" target="\_blank">Angular Snippets</a>

### Atom

Atom is another good modern IDE that easily supports and aids in TypeScript development with the installation of the <a href="https://atom.io/packages/atom-typeScript" target="\_blank"> atom-typeScript plugin</a>.

<a href="../static/img/atom-screenshot.png" target="\_blank"><img src="../static/img/atom-screenshot.png" width="100%" alt="Atom screenshot" /></a>

Helpful Plugins:
- <a href="https://atom.io/packages/atom-typescript" target="\_blank">atom-typescript</a>
- <a href="https://atom.io/packages/emmet" target="\_blank">emmmet</a>
- <a href="https://atom.io/packages/autocomplete-modules" target="\_blank">autocomplete-modules</a>
- <a href="https://atom.io/packages/angular2-snippets-atom" target="\_blank">angular2-snippets</a>

### Webstorm

<a href="https://www.jetbrains.com/webstorm/download/" target="\_blank">Webstorm</a> is a platform by JetBrains that is loved for its great code refactoring assistance and version control integration, but it does require a paid subscription.

<a href="../static/img/webstorm-screenshot.png" target="\_blank"><img src="../static/img/webstorm-screenshot.png" width="100%" alt="Webstorm screenshot" /></a>

Helpful Plugins:
- <a href="https://next.angular.io/guide/language-service" target="\_blank">Angular Language Service</a>

## Installing the CLI

Angular has a command line interface or CLI that does a lot of the initial legwork in setting up a minimal app, as well as letting you easily create and include new components on the fly.

We'll start by globally installing the Angular CLI.

✏️ Run the following:

```shell
npm install -g @angular/cli@7
```

## Generating a new app

We're going to build a restaurant menu and ordering application. The final result will look like this:

![Place My Order App screenshot](../static/img/place-my-order.png "Place My Order App screenshot")

(reminder: You can see a DoneJS implementation of this application at [www.place-my-order.com](http://www.place-my-order.com))

✏️ To create a new Angular Workspace, run the 'ng new' command:

```shell
ng new place-my-order  --prefix pmo
cd place-my-order
```

This will create a new Angular Workspace, generate an app module, needed config files, and test suite for your new Angular project. You'll be asked a series of set-up questions:
1. Would you like to add Angular routing? (__yes__)
2. Which stylesheet format would you like to use? (__Less__)

Note that we used the prefix property to set our own default prefix. Angular's default is "app", but a good naming convention is to use a short prefix related to your company or application name to easily differentiate from 3rd party utilities.

```html
//this looks like it's one of our own app components
<pmo-header></pmo-header>

//safe to assume this a 3rd party
<tabset>
    <tab heading="Basic title" id="tab1">Basic content</tab>
    <tab heading="Basic Title 1">Basic content 1</tab>
    <tab heading="Basic Title 2">Basic content 2</tab>
</tabset>

```

There are several more helpful properties that customize how a project is set up:

### -root

Main directory for all project files. Default empty.

### -sourceRoot

Directory for all project source files.

### -projectType

Can specify application vs. library

### - targets

Used for customizing task commands (build, serve, test) from the default settings.

## Looking at Our Generated Workspace

Let's walk through some of the files that were generated.

```code
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── tslint.json
├── e2e/
├── src/
|   ├── index.html
|   ├── karma.conf.js
|   ├── main.ts
|   ├── polyfills.ts
|   ├── styles.less
|   ├── test.ts
|   ├── tsconfig.app.json
|   ├── tsconfig.spec.json
|   ├── tslint.json
|   ├── assets/
|   ├── environments/
|   |   ├── environment.ts
|   |   ├── environment.prod.ts
|   ├── app/
|   |   ├── app.module.ts
|   |   ├── app.component.ts
|   |   ├── app.component.spec.ts
|   |   ├── app.component.less
|   |   ├── app.component.html
|   |   ├── app-routing.module.ts
├── node_modules/
```

### angular.json

This file is the config schema for an Angular Workspace. By default Angular configures Webpack for it's build process, and uses the angular.json file for the build information.

(Note, prior to Angular v6, this file was .angular-cli.json. When migrating versions, having the wrong workspace config file name is a cause for problems.)

### tsconfig.json

This file contains our typescript compiling options.

### src/main.ts

This is the entry point of our application, it compiles and bootstraps our app.  

### src/index.html

This should feel familiar - our main index page.

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>PlaceMyOrder</title>
        <base href="/">

        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
    </head>
    <body>
        //our entry component
        <pmo-root></pmo-root>
    </body>
</html>
```

### src/app/app.module.ts

This file is the root module for our app. Every Angular app has at least one module that determines how to compile and launch and app. It uses the @@NgModule decorator with four properties:

- declarations [array]: where we include components, directives, and pipes that will be used by this module.
- imports [array]: where we include any other modules our app needs to use. This may include 3rd party modules like bootstrap datepickers, or modules we've created.
- providers [array]: where we include services that we want used at the global app level
- bootstrap [array]: where we include the root AppModule - this is the main Application view that hosts all of our other app views.

Further reading: <a href="https://angular.io/guide/architecture-services#dependency-injection-di" target="\_blank">Dependency Injection in Angular</a>

### src/app/app.component.ts

This is our root component, you saw it called in our index.html file as ``<app-root></app-root>``

## Serving An Application

✏️ Serve the app with:

```shell
npm run start
```

The `start` script command value is `ng serve` which starts a development server on port 4200 by default using <a href="https://github.com/webpack/webpack-dev-server" target="\_blank">webpack-dev-server</a>, and compiles a development version of the app. Any TypeScript errors will be caught by the compiler here, and once ready we can view our app at <a href="http://localhost:4200" target="\_blank">localhost:4200</a>. `ng serve` also has live-reload functionality, meaning the browser will automatically reload as changes are saved and compiled.

## Running Tests

When we use the CLI to create modules, components, services, etc, it will create spec files
for us.

✏️ Run tests in a __new__ command line with:

```shell
npm run test
```

## How to Verify Your Solution is Correct

The change we needed to make for our tests to pass is on the highlighted line 37.

We also included `schemas` metadata for our module. <a href="https://angular.io/api/core/NO_ERRORS_SCHEMA">NO_ERRORS_SCHEMA</a> will keep the compiler from throwing errors when unknown components are included in the tested components. In unit tests we often only want to test the very small piece of code we're work on and don't care about deeply nested components <a href="https://medium.com/@fivedicephoto/why-you-shouldnt-use-no-errors-schema-in-angular-unit-tests-cdd478c30782" target="\_blank">unless we're testing the props in a parent/child component relationship</a>. For our purposes in this training, it's safe to use here.  

✏️ Update __src/app.component.spec.ts__:

@sourceref ./app.component.spec.ts
@highlight 37

## Solution

Let's change the markup to look like the home page of our place my order app.

✏️ Update __src/app/app.component.html__ to:

```html
<h1>Place My Order App: Coming Soon!</h1>
<router-outlet></router-outlet>
```
@highlight 1-2

When you save your changes, you should see the new h1 tag in your browser at  <a href="http://localhost:4200" target="\_blank">localhost:4200</a>.
