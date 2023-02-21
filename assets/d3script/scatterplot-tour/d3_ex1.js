// https://observablehq.com/@d3/scatterplot-tour@153
var FishRecordJsonData = [];
$.ajax({
  type: "get",
  async: false,
  url: "/db/fish_record",
  dataType: "json",
  success: function (statistics_fish_record) {
    FishRecordJsonData = statistics_fish_record; //JSON.parse(statistics_fish_record)->statistics_fish_record
  },
  error: function (XMLHttpRequest, textStatus, errorThrown) {
    alert(XMLHttpRequest.status);
    alert(XMLHttpRequest.readyState);
    alert(textStatus);
  }
});
var x_axes = 7;
var y_axes = 8;
var totalFish = [];
// var FishRecordDate = [];
// var FishRecordCage = [];
// var FishRecordSample = [];
var FishRecordSpecie = [];
// var FishRecordBodyHeight = [];
// var FishRecordBodyWidth = [];
var FishRecordBody = [];
// var FishRecordBodyLen = [];
// var FishRecordBodyTailHeight = [];
// var FishRecordBodyEyeRadius = [];
// var FishRecordBodyWeight = [];
// Record Species
for (var i = 0; i < FishRecordJsonData.length; i++) {
  const species = (element) => element == FishRecordJsonData[i].Specie;
  if ((totalFish.findIndex(species) == -1) && (FishRecordJsonData[i].Specie != 'Specie')) totalFish.push(FishRecordJsonData[i].Specie);
}

for (var i = 0; i < totalFish.length; i++) {
  // FishRecordDate[i] = new Array();
  // FishRecordCage[i] = new Array();
  // FishRecordSample[i] = new Array();
  FishRecordSpecie[i] = new Array();
  FishRecordBody[i] = new Array();
  // FishRecordBodyHeight[i] = new Array();
  // FishRecordBodyWidth[i] = new Array();
  // FishRecordBodyLen[i] = new Array();
  // FishRecordBodyTailHeight[i] = new Array();
  // FishRecordBodyEyeRadius[i] = new Array();
  // FishRecordBodyWeight[i] = new Array();
}

for (var i = 0; i < FishRecordJsonData.length; i++) {
  const species = (element) => element == FishRecordJsonData[i].Specie;
  var FS = totalFish.findIndex(species);
  if ((FS != -1) && (FishRecordJsonData[i][0] != "0000-00-00")) {
    // FishRecordDate[FS].push(FishRecordJsonData[i][0].replaceAll('-', '/'));
    // FishRecordCage[FS].push(FishRecordJsonData[i][1]);
    // FishRecordSample[FS].push(FishRecordJsonData[i][2]);
    FishRecordSpecie[FS].push(FishRecordJsonData[i].Specie);
    FishRecordBody[FS].push({
      x: FishRecordJsonData[i].Tail_height,
      y: FishRecordJsonData[i].Eye_radius
    })
    // FishRecordBodyHeight[FS].push(FishRecordJsonData[i][4]);
    // FishRecordBodyWidth[FS].push(FishRecordJsonData[i][5]);
    // FishRecordBodyLen[FS].push(FishRecordJsonData[i][6]);
    // FishRecordBodyTailHeight[FS].push(FishRecordJsonData[i][7]);
    // FishRecordBodyEyeRadius[FS].push(FishRecordJsonData[i][8]);
    // FishRecordBodyWeight[FS].push(FishRecordJsonData[i][9]);
  }
}

export default function define(runtime, observer) {
  const main = runtime.module();

  main.variable(observer()).define(["md"], function (md) {
    return (
      md`TITLE`
    )
  });

  main.variable(observer("viewof transform")).define("viewof transform", ["html", "transforms", "invalidation"], function (html, transforms, invalidation) {
    const form = html`<form style="font: 12px var(--sans-serif); display: flex; height: 33px; align-items: center;">
  ${transforms.map(([name, transform], i) => html`<label style="margin-right: 1em; display: inline-flex; align-items: center;">
    <input type="radio" name="radio" value="${i}" style="margin-right: 0.5em;" ${i === 0 ? "checked" : ""}> ${name}
  </label>`)}
</form>`;
    const timeout = setInterval(() => {
      form.value = transforms[form.radio.value = (+form.radio.value + 1) % transforms.length][1];
      form.dispatchEvent(new CustomEvent("input"));
    }, 2500);
    form.onchange = () => form.dispatchEvent(new CustomEvent("input")); // Safari
    form.oninput = event => {
      if (event.isTrusted) clearInterval(timeout), form.onchange = null;
      form.value = transforms[form.radio.value][1];
    };
    form.value = transforms[form.radio.value][1];
    invalidation.then(() => clearInterval(timeout));
    return form;
  });

  main.variable(observer("transform")).define("transform", ["Generators", "viewof transform"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3", "width", "height", "data", "x", "y", "z", "viewof transform", "xAxis", "yAxis"], function (d3, width, height, data, x, y, z, $0, xAxis, yAxis) {
    const zoom = d3.zoom()
      .on("zoom", zoomed);

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

    const g = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-linecap", "round");

    g.selectAll("path")
      .data(data)
      .join("path")
      .attr("d", d => `M${x(d[0])},${y(d[1])}h0`)
      .attr("stroke", d => z(d[2]));

    const gx = svg.append("g");

    const gy = svg.append("g");

    svg.call(zoom.transform, $0.value);

    function zoomed(event) {
      const { transform } = event;
      g.attr("transform", transform).attr("stroke-width", 5 / transform.k);
      gx.call(xAxis, transform.rescaleX(x));
      gy.call(yAxis, transform.rescaleY(y));
    }

    return Object.assign(svg.node(), {
      update(transform) {
        svg.transition()
          .duration(1500)
          .call(zoom.transform, transform);
      }
    });
  });

  main.variable(observer()).define(["chart", "transform"], function (chart, transform) {
    return (
      chart.update(transform)
    )
  });

  main.variable(observer("data")).define("data", ["d3"], function (d3) {
    var array = [];
    for (var i = 0; i < FishRecordBody.length; i++) {
      for (var j = 0; j < FishRecordBody[i].length; j++) {
        array.push([parseFloat(FishRecordBody[i][j]["x"]), parseFloat(FishRecordBody[i][j]["y"]), i]);
      }
    }
    return array;
  });

  main.variable(observer("transforms")).define("transforms", ["d3", "data", "x", "y", "width", "height"], function (d3, data, x, y, width, height) {
    return (
      [["Overview", d3.zoomIdentity]].concat(d3.groups(data, d => d[2]).map(([key, data]) => {
        const [x0, x1] = d3.extent(data, d => d[0]).map(x);
        const [y1, y0] = d3.extent(data, d => d[1]).map(y);
        const k = 0.9 * Math.min(width / (x1 - x0), height / (y1 - y0));
        const tx = (width - k * (x0 + x1)) / 2;
        const ty = (height - k * (y0 + y1)) / 2;
        return [totalFish[`${key}`], d3.zoomIdentity.translate(tx, ty).scale(k)];
      }))
    )
  });

  main.variable(observer("x")).define("x", ["d3", "width"], function (d3, width) {
    return (
      d3.scaleLinear()
        .domain([0, 7])
        .range([0, width])
    )
  });

  main.variable(observer("y")).define("y", ["d3", "k", "height"], function (d3, k, height) {
    return (
      d3.scaleLinear()
        .domain([0, 9 * k])
        .range([height, 0])
    )
  });
  main.variable(observer("z")).define("z", ["d3", "data"], function (d3, data) {
    return (
      d3.scaleOrdinal()
        .domain(data.map(d => d[2]))
        .range(d3.schemeCategory10)
    )
  });
  main.variable(observer("xAxis")).define("xAxis", ["height", "d3"], function (height, d3) {
    return (
      (g, x) => g
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisTop(x).ticks(12))
        .call(g => g.select(".domain").attr("display", "none"))
    )
  });
  main.variable(observer("yAxis")).define("yAxis", ["d3", "k"], function (d3, k) {
    return (
      (g, y) => g
        .call(d3.axisRight(y).ticks(12 * k))
        .call(g => g.select(".domain").attr("display", "none"))
    )
  });
  main.variable(observer("k")).define("k", ["height", "width"], function (height, width) {
    return (
      height / width
    )
  });
  main.variable(observer("height")).define("height", function () {
    return (
      600
    )
  });
  main.variable(observer("d3")).define("d3", ["require"], function (require) {
    return (
      require("d3@6")
    )
  });


  return main;
}
