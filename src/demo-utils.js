import { randomUniform } from '/web_modules/d3-random.js';
import { range } from '/web_modules/d3-array.js';

export const rnd = (keys, max) => {
  var r = randomUniform(max);
  return keys.map(function(d, i) {
    return { key: d, value: { count: r() } };
  });
}
export const multipleRnd = (keys, max, size = 8) => {
  return range(size).map(function(d, i) {
    var value = {};
    var r = randomUniform(max);
    keys.forEach(function(k) {
      value[k] = r().toFixed(1) * 1;
    });
    return { key: i, value: value };
  });
}