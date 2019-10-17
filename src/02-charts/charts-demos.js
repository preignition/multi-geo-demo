import { LitElement, html, css } from '/web_modules/lit-element.js';
import './01-demo-choropleth-compose.js';
import './02-demo-choropleth-chart.js';

class ChartDemos extends LitElement {
 
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
        }
        a {
          text-decoration: none;
        }
        .demo > *:not(h2):not(a):not(button) {
          display: block;
          border: 1px solid	#e2e2e2;
          border-radius: 5px;
          padding: 8px;
          margin: 8px 0; 
          line-height: 32px;
        }
        paper-card { 
          border-radius: 5px;
          flex: 1; 
          padding: 12px;
          margin: 0 0 32px 0;
        }
        h2 {
          font-size: 20px;
          color: #2c3e50;
        }
        h2:hover::after { 
          color: #9B35FA;
          content: " #";
        }
        h1 {
          margin-top: 0px;
          color: #9B35FA;
        }
      `,
    ];
  }

  render() {
    return html`
      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=02-intermediate%2F01-first-updated.js" target="_blank"><h2>Choropleth - Compose</h2></a>
          <div>
            <p>This example composes appropriate web-composants. A simpler approach for rendering a choropleth chart is to use multi-chart-choropleth element, see below</p>
            <demo-choropleth-compose></demo-choropleth-compose></div>
        </div>
      </paper-card>
      <paper-card>
        <div class="demo">
          <a href="https://stackblitz.com/edit/open-wc-lit-demos?file=02-intermediate%2F01-first-updated.js" target="_blank"><h2>Choropleth - Chart</h2></a>
          <div>
            <p>Use of <code>multi-chart-choropleth</code></p>
            <p>Example largely inspired from this <a target="_blank" href="http://bl.ocks.org/mbostock/4060606">this block</a>!</p>
            <demo-choropleth-chart></demo-choropleth-chart>
          </div>
        </div>
      </paper-card>
      
    `;
  }
}

customElements.define('charts-demos', ChartDemos);