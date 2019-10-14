// LitElement and html are the basic required imports
import { LitElement, html, css } from '/web_modules/lit-element.js';
import * as format from '/web_modules/d3-time-format.js';
import { schemeCategory10 } from '/web_modules/d3-scale-chromatic.js';
import { scaleOrdinal } from '/web_modules/d3-scale.js';


const parseDate = (d) => {
  return new Date(2001,
    d.substring(0, 2) - 1,
    d.substring(2, 4),
    d.substring(4, 6),
    d.substring(6, 8));
}

// Create a class definition for your component and extend the LitElement base class
class DemoFlight extends LitElement {
  // The render callback renders your element's template. This should be a pure function,
  // it should always return the same template given the same properties. It should not perform
  // any side effects such as setting properties or manipulating the DOM. See the updated
  // or first-updated examples if you need side effects.
  render() {
    // Return the template using the html template tag. lit-html will parse the template and
    // create the DOM elements
    return html `
        <d3-fetch type="csv" url="/data/flight.csv" @data-changed="${e => this.data = e.detail.value}"></d3-fetch>
        <multi-verse id="universe" log
          .data="${this.data}" 
          @universe-changed="${e => this.universe = e.detail.value}" 
          .columns="${this.columns}"
          .generatedColumns="${this.generatedColumns}"
          .preProcess="${this.preProcess}">
          <multi-group .universe="${this.universe}" @data-changed="${ e=> this.dataDistance = e.detail.value}"  group-by="distances">
            <multi-verse-line .data="${this.dataDistance}" left-axis bottom-axis left-text="count" bottom-text="distance (in km)">
              <h4 slot="header">Count of flights by distance</h4>
              <vaadin-grid-sort-column path="origin" header="Origin"></vaadin-grid-sort-column>
            </multi-verse-line>
          </multi-group>
          <multi-group .universe="${this.universe}" @data-changed="${ e=> this.dataDistance = e.detail.value}" group-by="distances">
            <multi-verse-bar left-axis bottom-axis left-continuous .data="${this.dataDistance}">
              <h3 slot="header">distance (bar chart)</h3>
            </multi-verse-bar>
          </multi-group>
          <multi-group .universe="${this.universe}" @data-changed="${e => this.dataDay = e.detail.value}" group-by="day">
            <multi-verse-bar left-axis bottom-axis .data="${this.dataDay}"  >
              <h3 slot="header">day (chart)</h3>
            </multi-verse-bar>
          </multi-group>
          <multi-group .universe="${this.universe}" @data-changed="${e => this.dataDay = e.detail.value}" group-by="day">
            <multi-verse-pie .data="${this.dataDay}"  .colorScale="${this.dayScale}" >
              <h3 slot="header">day (pie)</h3>
              <multi-legend .scale="${this.dayScale}" position="top-right"></multi-legend>
            </multi-verse-pie>
          </multi-group>
        </multi-verse>
            

    `;
  }

  static get properties() {
    return {
      data: { type: Array },
      universe: { type: Function },
      columns: { type: Object },
      generatedColumns: { type: Object },
      preProcess: { type: Function },
      dataDistance: { type: Array },
      dataDay: { type: Array },
      colorScale: { type: Function },
      dayScale: { type: Function },


    }
  }

  constructor() {
    super();
    this.columns = { $index: '$index' }
    this.preProcess = (d, i) => {
      d.date = parseDate(d.date);
      d.$index = i;
    };
    this.colorScale = scaleOrdinal().range(schemeCategory10);
    this.dayScale = scaleOrdinal().range(schemeCategory10);
    this.generatedColumns = {
      day: d => format.timeFormat('%A')(d.date),
      hour: d => Number(format.timeFormat('%H')(d.date)),
      dayOfWeek: d => format.timeFormat('%A')(d.date),
      arrivalDelay: d => Math.floor(+d.delay / 30) * 30,
      distances: d => Math.floor(+d.distance / 200) * 200
    };
  }
}

// Register your element to custom elements registry, pass it a tag name and your class definition
// The element name must always contain at least one dash
customElements.define('demo-flight', DemoFlight);