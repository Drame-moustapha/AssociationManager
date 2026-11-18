import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="page">
      <p class="eyebrow">Socle de l’application</p>
      <h1>AssociationManager</h1>
      <p>La base technique est prête. Les fonctionnalités de gestion seront ajoutées étape par étape.</p>
      <span class="status">Étape 1 — Initialisation</span>
    </main>
  `,
  styles: [`
    .page { max-width: 720px; margin: 12vh auto; padding: 2rem; font-family: Arial, sans-serif; color: #172033; }
    .eyebrow { color: #3157a4; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
    h1 { font-size: clamp(2rem, 6vw, 3.5rem); margin: .5rem 0 1rem; }
    p { line-height: 1.6; }
    .status { display: inline-block; margin-top: 1rem; padding: .5rem .75rem; border-radius: 999px; background: #e8f4ec; color: #21643b; }
  `]
})
export class AppComponent {}
