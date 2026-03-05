# Angular Tour of Heroes — Project Documentation

**Module:** M335
**Project:** Angular Tour of Heroes
**Chapters:** 1 – 5

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Chapter 1 — The Hero Editor](#2-chapter-1--the-hero-editor)
3. [Chapter 2 — Display a List](#3-chapter-2--display-a-list)
4. [Chapter 3 — Feature Component](#4-chapter-3--feature-component)
5. [Chapter 4 — Add Services](#5-chapter-4--add-services)
6. [Chapter 5 — Navigation & Routing](#6-chapter-5--navigation--routing)
7. [Final File Structure](#7-final-file-structure)
8. [Key Concepts Summary](#8-key-concepts-summary)

---

## 1. Project Overview

The Angular Tour of Heroes is a step-by-step tutorial application. It demonstrates the core building blocks of Angular:

- Components and Templates
- Data Binding (one-way and two-way)
- Angular Pipes
- Services and Dependency Injection
- RxJS Observables
- Routing and Navigation
- Component Input/Output communication

**Tech Stack:**
- Angular 19 (standalone components)
- TypeScript
- SCSS
- RxJS

---

## 2. Chapter 1 — The Hero Editor

### Goal
Create the first component, define a `Hero` data model, and display hero data with data binding and pipes.

---

### 2.1 Hero Interface

**File created:** `src/app/hero.ts`

**Before:** File did not exist.

**After:**
```ts
export interface Hero {
  id: number;
  name: string;
  power?: string | undefined;
}
```

**What was learned:**
- A TypeScript `interface` defines the shape of an object
- `power?` means the property is optional (can be `undefined`)
- Interfaces are used for type safety throughout the application

---

### 2.2 Global Styles

**File modified:** `src/styles.scss`

**Before:** Empty / default Angular styles.

**After:**
```scss
h1 {
  color: #369;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 250%;
}
h2, h3 {
  color: #444;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: lighter;
}
body {
  margin: 2em;
}
body, input[type="text"], button {
  color: #333;
  font-family: Cambria, Georgia, serif;
}
button {
  background-color: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
button:hover {
  background-color: black;
  color: white;
}
* {
  font-family: Arial, Helvetica, sans-serif;
}
```

---

### 2.3 App Component — Data Binding and Pipes

**File modified:** `src/app/app.ts`

The root component received a `hero` object and the title.

**Key concepts introduced:**
- `{{ hero.name }}` — Interpolation (one-way binding, TS → HTML)
- `[(ngModel)]` — Two-way data binding (HTML ↔ TS), requires `FormsModule`
- `| uppercase` — Angular Pipe to transform displayed text

**Template example:**
```html
<h1>{{ title }}</h1>
<h2>{{ hero.name | uppercase }} Details</h2>
<div><span>id: </span>{{ hero.id }}</div>
<div>
  <label for="hero-name">Hero name: </label>
  <input id="hero-name" [(ngModel)]="hero.name" placeholder="Hero name" />
</div>
```

---

## 3. Chapter 2 — Display a List

### Goal
Create a list of mock heroes, display them using `@for`, and allow selecting a hero to view its details.

---

### 3.1 Mock Heroes

**File created:** `src/app/mock-heroes.ts`

**Before:** File did not exist.

**After:**
```ts
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 12, name: 'Dr. Nice',   power: 'Healing' },
  { id: 13, name: 'Bombasto',   power: 'Explosions' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta',    power: 'Magnetism' },
  { id: 16, name: 'RubberMan',  power: 'Elasticity' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ',     power: 'Genius Intelligence' },
  { id: 19, name: 'Magma',      power: 'Lava Manipulation' },
  { id: 20, name: 'Tornado',    power: 'Wind Control' },
];
```

**What was learned:**
- Mock data is stored in a separate file to simulate a real data source
- `power` is optional — heroes without a power simply omit the property

---

### 3.2 Heroes Component

**Files created:** `src/app/heroes/heroes.ts` and `heroes.html`

The Heroes component displays all heroes in a list. At this stage heroes were shown with click-selection (before routing was added in Chapter 5).

**heroes.ts (Chapter 2 state):**
```ts
import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
  standalone: true,
})
export class Heroes {
  heroes = HEROES;
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
```

**heroes.html (Chapter 2 state):**
```html
<h2>My Heroes</h2>
<ul class="heroes">
  @for (hero of heroes; track hero.id) {
    <li (click)="onSelect(hero)">
      <span class="badge">{{ hero.id }}</span> {{ hero.name }}
    </li>
  }
</ul>

@if (selectedHero) {
  <div>
    <h2>{{ selectedHero.name | uppercase }} Details</h2>
    <div><span>id: </span>{{ selectedHero.id }}</div>
  </div>
}
```

**What was learned:**
- `@for` — Angular control flow to loop over an array
- `track hero.id` — tells Angular how to identify items (performance optimization)
- `@if` — conditionally renders content
- `(click)="onSelect(hero)"` — event binding

---

## 4. Chapter 3 — Feature Component

### Goal
Extract hero detail into its own reusable child component. Pass data from parent to child using Angular `input()`.

---

### 4.1 HeroDetail Component

**Files created:**
- `src/app/hero-detail/hero-detail.ts`
- `src/app/hero-detail/hero-detail.html`

**hero-detail.ts (Chapter 3 state — input signal):**
```ts
import { Component, input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.html',
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
})
export class HeroDetailComponent {
  hero = input<Hero>();
}
```

**hero-detail.html (Chapter 3 state):**
```html
@if (hero(); as hero) {
  <div>
    <h2>{{ hero.name | uppercase }} Details</h2>
    <div><span>id: </span>{{ hero.id }}</div>
    <div>
      <label for="hero-name">Hero name: </label>
      <input id="hero-name" [(ngModel)]="hero.name" placeholder="Hero name" />
    </div>
  </div>
}
```

**Used in heroes.html:**
```html
<app-hero-detail [hero]="selectedHero" />
```

**What was learned:**
- `input<T>()` — Angular signal-based input for receiving data from a parent
- `[hero]="selectedHero"` — Property binding passes data into the child component
- Components can be composed — parent controls which hero is shown, child handles display
- `| uppercase` pipe applied inside the child component

---

## 5. Chapter 4 — Add Services

### Goal
Move data access out of components into a dedicated service. Introduce RxJS Observables and a MessageService for app-wide logging.

---

### 5.1 HeroService

**File created:** `src/app/hero.service.ts`

**Before:** Heroes were imported directly from `mock-heroes.ts` inside the component.

**After:**
```ts
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private messageService = inject(MessageService);

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
```

**What was learned:**
- `@Injectable({ providedIn: 'root' })` — registers the service globally (singleton)
- `inject(Service)` — Angular's modern way to inject dependencies (replaces constructor injection)
- `Observable<T>` — an asynchronous stream of data from RxJS
- `of(value)` — creates an Observable that emits a single value immediately
- Services separate data access from display logic (Single Responsibility Principle)

---

### 5.2 MessageService

**File created:** `src/app/message.service.ts`

**Before:** File did not exist.

**After:**
```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
```

**What was learned:**
- A service can be injected into another service (`MessageService` into `HeroService`)
- Provides a global logging mechanism across the application

---

### 5.3 MessagesComponent

**Files created:**
- `src/app/messages/messages.ts`
- `src/app/messages/messages.html`

**messages.ts:**
```ts
import { Component, inject } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrls: ['./messages.scss'],
  standalone: true,
})
export class MessagesComponent {
  public messageService = inject(MessageService);
}
```

**messages.html:**
```html
@if (messageService.messages.length) {
  <div>
    <h2>Messages</h2>
    <button type="button" class="clear" (click)="messageService.clear()">
      Clear messages
    </button>
    @for (message of messageService.messages; track message) {
      <div>{{ message }}</div>
    }
  </div>
}
```

---

### 5.4 Heroes Component — Updated to Use Service

**Before (Chapter 2):** Imported `HEROES` directly.

**After (Chapter 4):**
```ts
import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
  standalone: true,
})
export class Heroes implements OnInit {
  heroes: Hero[] = [];

  private heroService = inject(HeroService);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
```

**What was learned:**
- `OnInit` lifecycle hook — runs `ngOnInit()` once after the component loads
- `.subscribe()` — subscribes to the Observable and receives the data when it arrives
- Never call data-fetching in the constructor — use `ngOnInit()` instead

---

## 6. Chapter 5 — Navigation & Routing

### Goal
Add the Angular Router to navigate between views. Create a Dashboard, enable deep-linking to hero detail, add a "go back" button, extract a reusable `HeroItemComponent`, and apply the `AsyncPipe`.

---

### 6.1 Routes Configuration

**File created:** `src/app/app.routes.ts`

**Before:** File did not exist. All views were shown in a single component.

**After:**
```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'heroes',
    loadComponent: () =>
      import('./heroes/heroes').then((m) => m.Heroes),
  },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./hero-detail/hero-detail').then((m) => m.HeroDetailComponent),
  },
];
```

**What was learned:**
- `Routes` defines URL paths and which component to load
- `redirectTo` — redirects empty path to `/dashboard` by default
- `loadComponent` — lazy loading: the component is only downloaded when the route is visited
- `:id` — a URL parameter (e.g. `/detail/15` passes `id = 15`)

---

### 6.2 App Root Component

**File modified:** `src/app/app.ts`

**Before:**
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = 'Tour of Heroes';
}
```

**After:**
```ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MessagesComponent } from './messages/messages';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MessagesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = 'Tour of Heroes';
}
```

**What was learned:**
- `RouterOutlet` — placeholder in the template where the current route's component is rendered
- `RouterLink` — used in templates to create navigation links (`routerLink="/heroes"`)
- `MessagesComponent` — displayed globally at the bottom of every page

---

### 6.3 Dashboard Component

**Files created:**
- `src/app/dashboard/dashboard.ts`
- `src/app/dashboard/dashboard.html`
- `src/app/dashboard/dashboard.scss`

**dashboard.ts:**
```ts
import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
  imports: [RouterLink],
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  private heroService = inject(HeroService);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
```

**dashboard.html:**
```html
<h2>Top Heroes</h2>
<div class="heroes-menu">
  @for (hero of heroes; track hero.id) {
    <a routerLink="/detail/{{ hero.id }}">
      {{ hero.name }}
    </a>
  }
</div>
```

**dashboard.scss:**
```scss
.heroes-menu {
  padding: 0;
  margin: auto;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
}

.heroes-menu a {
  text-decoration: none;
  color: white;
  background-color: #42545c;
  padding: 1rem;
  border-radius: 4px;
  min-width: 8em;
  text-align: center;
  display: inline-block;
}

.heroes-menu a:hover {
  background-color: #eee;
  color: #607d8b;
}
```

**What was learned:**
- `.slice(1, 5)` — shows only heroes at index 1 to 4 (4 heroes total)
- `routerLink="/detail/{{ hero.id }}"` — generates a dynamic link per hero

---

### 6.4 HeroDetail Component — Refactored for Routing

**Before (Chapter 3):** Used `input()` signal to receive a Hero from a parent component.

**After (Chapter 5):** Reads the hero ID from the URL, fetches the hero from the service.

**hero-detail.ts:**
```ts
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.html',
  styleUrls: ['./hero-detail.scss'],
  standalone: true,
  imports: [FormsModule, UpperCasePipe],
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  private route = inject(ActivatedRoute);
  private heroService = inject(HeroService);
  private location = inject(Location);

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }
}
```

**hero-detail.html:**
```html
@if (hero) {
  <div>
    <h2>{{ hero.name | uppercase }} Details</h2>
    <div><span>id: </span>{{ hero.id }}</div>
    <div>
      <label for="hero-name">Hero name: </label>
      <input id="hero-name" [(ngModel)]="hero.name" placeholder="Hero name" />
    </div>
    <button type="button" (click)="goBack()">go back</button>
  </div>
}
```

**What was learned:**
- `ActivatedRoute` — gives access to URL parameters of the current route
- `route.snapshot.paramMap.get('id')` — reads the `:id` from the URL
- `Location.back()` — navigates to the previous page in browser history
- `@if (hero)` — only renders detail if the hero was found

---

### 6.5 HeroItem Component (Chapter 5 Extra Exercise)

**Files created:**
- `src/app/heroes/hero-item/hero-item.ts`
- `src/app/heroes/hero-item/hero-item.html`
- `src/app/heroes/hero-item/hero-item.scss`

**Goal:** Extract a single hero list item into its own component. The component receives the hero via `input()` and emits the hero's ID via `output()` when clicked.

**hero-item.ts:**
```ts
import { Component, input, output } from '@angular/core';
import { Hero } from '../../hero';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.html',
  styleUrl: './hero-item.scss',
  standalone: true,
})
export class HeroItemComponent {
  hero = input.required<Hero>();
  heroSelected = output<number>();

  onClick(): void {
    this.heroSelected.emit(this.hero().id);
  }
}
```

**hero-item.html:**
```html
<a (click)="onClick()">
  <span class="badge">{{ hero().id }}</span> {{ hero().name }}
</a>
```

**What was learned:**
- `input.required<T>()` — signal input that must always be provided by the parent
- `output<T>()` — emits an event to the parent component
- `this.heroSelected.emit(value)` — fires the output event with the hero's ID
- Parent listens with `(heroSelected)="onHeroSelected($event)"`

---

### 6.6 Heroes Component — Final State with Async Pipe

**Before (Chapter 4):** Subscribed manually, stored heroes in an array.

**After (Chapter 5):** Exposes an Observable directly, uses `AsyncPipe` in the template.

**heroes.ts:**
```ts
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Router } from '@angular/router';
import { HeroItemComponent } from './hero-item/hero-item';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
  standalone: true,
  imports: [HeroItemComponent, AsyncPipe],
})
export class Heroes implements OnInit {
  heroes$!: Observable<Hero[]>;

  private heroService = inject(HeroService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes$ = this.heroService.getHeroes();
  }

  onHeroSelected(id: number): void {
    this.router.navigate(['/detail', id]);
  }
}
```

**heroes.html:**
```html
<h2>My Heroes</h2>
<ul class="heroes">
  @if (heroes$ | async; as heroes) {
    @for (hero of heroes; track hero.id) {
      <li>
        <app-hero-item [hero]="hero" (heroSelected)="onHeroSelected($event)" />
      </li>
    }
  }
</ul>
```

**What was learned:**
- `heroes$` — naming convention: `$` suffix indicates an Observable
- `| async` — Angular pipe that subscribes and unsubscribes automatically
- `as heroes` — unwraps the Observable value into a local template variable
- No risk of memory leaks — `async` pipe handles cleanup when component is destroyed
- `Router.navigate(['/detail', id])` — programmatic navigation from TypeScript

---

### 6.7 Nav Styles

**File modified:** `src/app/app.scss`

**Before:** Empty.

**After:**
```scss
nav {
  a {
    padding: 1rem;
    text-decoration: none;
    margin-top: 10px;
    display: inline-block;
    background-color: #e8e8e8;
    border-radius: 4px;
    margin-right: 4px;
    color: #3d3d3d;

    &:hover {
      color: white;
      background-color: #42545c;
    }

    &.active {
      color: white;
      background-color: black;
    }
  }
}
```

---

## 7. Final File Structure

```
src/
├── styles.scss                          # Global styles
└── app/
    ├── app.ts                           # Root component
    ├── app.html                         # Root template (nav + router-outlet)
    ├── app.scss                         # Nav styles
    ├── app.routes.ts                    # Route definitions
    ├── hero.ts                          # Hero interface
    ├── mock-heroes.ts                   # Mock data array
    ├── hero.service.ts                  # Data access service
    ├── message.service.ts               # Global message logging service
    ├── dashboard/
    │   ├── dashboard.ts                 # Dashboard component
    │   ├── dashboard.html               # Top 4 heroes as cards
    │   └── dashboard.scss               # Card grid styles
    ├── heroes/
    │   ├── heroes.ts                    # Heroes list component (async pipe)
    │   ├── heroes.html                  # List template
    │   ├── heroes.scss                  # List item styles
    │   └── hero-item/
    │       ├── hero-item.ts             # Single hero item (input/output)
    │       ├── hero-item.html           # Badge + name link
    │       └── hero-item.scss           # Item styles
    ├── hero-detail/
    │   ├── hero-detail.ts               # Detail component (route-based)
    │   ├── hero-detail.html             # Edit form + go back button
    │   └── hero-detail.scss             # Detail styles
    └── messages/
        ├── messages.ts                  # Messages display component
        └── messages.html                # Message list + clear button
```

---

## 8. Key Concepts Summary

| Concept | Where Used | Purpose |
|---|---|---|
| `interface` | `hero.ts` | Defines the Hero data shape |
| `{{ value }}` | All templates | Interpolation — display data |
| `[(ngModel)]` | `hero-detail.html` | Two-way binding — sync input with property |
| `[property]="value"` | `hero-item` usage | One-way binding — pass data to child |
| `(event)="handler()"` | `hero-item.html` | Event binding — react to user actions |
| `@for` | `heroes.html`, `dashboard.html` | Loop over arrays in templates |
| `@if` | `hero-detail.html`, `messages.html` | Conditional rendering |
| `input<T>()` | `hero-item.ts` | Receive data from parent component |
| `output<T>()` | `hero-item.ts` | Send events to parent component |
| `@Injectable` | `hero.service.ts` | Marks a class as a service |
| `inject()` | All services/components | Dependency injection |
| `Observable<T>` | `hero.service.ts` | Async data stream from RxJS |
| `of()` | `hero.service.ts` | Creates an Observable from a value |
| `.subscribe()` | `hero-detail.ts` | Manually subscribes to an Observable |
| `| async` | `heroes.html` | Auto-subscribes in template, no memory leak |
| `OnInit / ngOnInit()` | All components | Lifecycle hook — runs after component loads |
| `RouterOutlet` | `app.ts` | Renders the active route's component |
| `RouterLink` | `dashboard.ts` | Creates navigation links in templates |
| `ActivatedRoute` | `hero-detail.ts` | Reads URL parameters |
| `Location.back()` | `hero-detail.ts` | Navigate to previous browser history entry |
| `loadComponent` | `app.routes.ts` | Lazy loads components only when needed |