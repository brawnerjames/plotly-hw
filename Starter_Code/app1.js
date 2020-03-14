
// read in samples.json file

//dropdown menu
function init() {
    d3.json("samples1.json").then(function(data) {
        var dropdownFirst = d3.select("#selDataset");
        data.names.forEach((name)=>{
            dropdownFirst.append("option").text(name).property("value", name);
        })

        //run graph and infobox functions for initial page content
        graphs(data.names[0]);
        infobox(data.names[0])

    });
}
init();


// function for infobox contents
function infobox(name) {
    d3.json("samples1.json").then(function(data) {
        console.log(data);

        var filteredInfoData = data.metadata.filter(metadatum => metadatum.id == name)[0]
        var infoID = filteredInfoData.id;
        var ethnicity = filteredInfoData.ethnicity;
        var gender = filteredInfoData.gender;
        var age = filteredInfoData.age;
        var location = filteredInfoData.location;
        var bbtype = filteredInfoData.bbtype;
        var wfreq = filteredInfoData.wfreq;

        var infoTable = document.getElementById("sample-metadata");
        var row1 = document.getElementById('row1');
        var cell12 = document.getElementById('cell12');
        cell12.innerHTML = infoID;
        var row2 = document.getElementById('row2');
        var cell22 = document.getElementById('cell22');
        cell22.innerHTML = ethnicity;
        var row3 = document.getElementById('row3');
        var cell32 = document.getElementById('cell32');
        cell32.innerHTML = gender;
        var row4 = document.getElementById('row4');
        var cell42 = document.getElementById('cell42');
        cell42.innerHTML = age;
        var row5 = document.getElementById('row5');
        var cell52 = document.getElementById('cell52');
        cell52.innerHTML = location;
        var row6 = document.getElementById('row6');
        var cell62 = document.getElementById('cell62');
        cell62.innerHTML = bbtype;
        var row7 = document.getElementById('row7');
        var cell72 = document.getElementById('cell72');
        cell72.innerHTML = wfreq;
    
    });
}


function graphs(name) {
    d3.json("samples1.json").then(function(data) {
        console.log(data);
    
        var filteredData = data.samples.filter(sample => sample.id == name)[0]
        var totalValues = filteredData.sample_values;
        var TotalotuIDs = filteredData.otu_ids;
        var otuLabels = filteredData.otu_labels;
    
        var values = totalValues.slice(0, 10).reverse();
        var otuIDs = TotalotuIDs.slice(0, 10).map(id => `OTU ${id}`).reverse();
    
        var traceBar = {
            x: values,
            y: otuIDs,
            text: otuLabels.slice(0, 10).reverse(),
            type: 'bar',
            orientation: 'h',
            width: 0.75
        };
    
        var traceBubble = {
            x: TotalotuIDs,
            y: totalValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                size: totalValues,
                color: TotalotuIDs
            }
        };
    
        var samplesBar = [traceBar];
        var samplesBubble = [traceBubble];
    
        var layoutbar = {
            title: "Most Common OTUs",
            margin: {t:30, l:100}
        };

        var layoutBubble = {
            xaxis: {title: "OTU ID"}
        }
    
        Plotly.newPlot("bar", samplesBar, layoutbar);
        Plotly.newPlot("bubble", samplesBubble, layoutBubble)
    });
    
}




function optionChanged(name) {
  graphs(name)
  infobox(name)
};

