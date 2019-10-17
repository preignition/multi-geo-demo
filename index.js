import { LitElement, html, css } from '/web_modules/lit-element.js';
import './src/01-basic/basic-demos.js';
import './src/02-charts/charts-demos.js';
// import './03-advanced/advanced-demos.js';

// import '/web_modules/@preignition/multi-chart.js';
import '/web_modules/@preignition/multi-geo.js';
// import '@preignition/multi-chart';

import '/web_modules/@polymer/paper-card.js';
import '/web_modules/@vaadin/vaadin-tabs.js';

import { github } from './assets/github.js';
import { openWc } from './assets/open-wc.js';
import { Router } from '/web_modules/@vaadin/router.js';
import { installMediaQueryWatcher } from '/web_modules/pwa-helpers/media-query.js';

/**
 * This component combines all the examples to be displayed. See the basic/intermediate/advanced folders for the actual examples.
 */

class OpenWcDemo extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        h2 {
          font-size: 20px;
          color: #217FF9;
        }

        h1 {
          margin-top: 0px;
          color: #217FF9;
        }

        #header {
          display: flex;
        }

        a {
          text-decoration: none;
        }

        a:visited {
          color: #217FF9;
        }

        #header h1 { flex: 1; }
        #header svg { margin: 8px 0 8px 0; }
        .github {transform: scale(1.2, 1.2);}
        .logo {
          margin-top: -3px;
          margin-right: 8px;
        }

        .nav { margin-bottom: 20px; }
        .footer { text-align: center; color: #a8a8a8;}
      `,
    ];
  }

  static get properties() {
    return {
      activeTab: { type: String },
      tabs: { type: Array },
      smallScreen: { type: Boolean }
    }
  }

  constructor(){
    super();
    this.activeTab = location.pathname === '/' ? 'basic' : location.pathname.replace('/', '');
    this.tabs = ['basic', 'charts', 'advanced'];

    installMediaQueryWatcher(`(min-width: 600px)`, (matches) => {
      this.smallScreen = !matches;
    });
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'));
    router.setRoutes([
      {path: '/',     component: 'basic-demos'},
      // {path: '/',     component: 'charts-demos'},
      {path: '/basic',  component: 'basic-demos'},
      {path: '/charts',  component: 'charts-demos'},
      {path: '(.*)', redirect: '/', action: () => {
        this.activeTab = 'basic';
        }
      }
    ]);
  }

  switchRoute(route) {
    this.activeTab = route;
    Router.go(`/${route}`); 
  }

  render() {
    return html`
      <div id="header">
        <span class="logo"><a href="https://open-wc.org">${openWc}</a></span>
        <h1>${this.capitalize(this.activeTab)} demos</h1>
        <a class="github" href="https://www.github.com/open-wc/lit-demos" target="_blank">${github}</a>
      </div>

      <vaadin-tabs class="${this.smallScreen ? 'nav' : ''}" orientation="${this.smallScreen ? 'vertical' : 'horizontal'}" selected=${this.tabs.indexOf(this.activeTab)} theme="${this.smallScreen ? '' : 'centered'}">
        <vaadin-tab @click=${() => this.switchRoute('basic')}>Feature</vaadin-tab>
        <vaadin-tab @click=${() => this.switchRoute('charts')}>Choropleth</vaadin-tab>
      </vaadin-tabs>

      <div id="outlet">
      </div>
      <p class="footer">🚽 Made with love by <a target="_blank" href="https://open-wc.org/">open-wc</a>.</p>
    `;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

customElements.define('open-wc-demo', OpenWcDemo);