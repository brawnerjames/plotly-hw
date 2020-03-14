// read in samples.json file

// const samples = "data/samples.json"

d3.json("samples.json").then(function(data) {
    console.log(data);
});

// d3.json("data/samples.json").then((incomingData) => {
//     console.log(incomingData)
// });

// d3.json("samples.json").then((data) => {
//     console.log()
//   });
  