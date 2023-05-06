/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 74.0, "series": [{"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09", "isController": false}, {"data": [[0.0, 4.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08", "isController": false}, {"data": [[0.0, 35.0], [100.0, 2.0]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en ", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-17", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-16", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-19", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-18", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-13", "isController": false}, {"data": [[0.0, 71.0], [100.0, 3.0]], "isOverall": false, "label": " /api/v1/store/DEFAULT ", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-15", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-14", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-2", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-3", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-0", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-1", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-20", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T05_ChairsTab-22", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T05_ChairsTab-21", "isController": false}, {"data": [[0.0, 36.0], [100.0, 1.0]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en ", "isController": false}, {"data": [[2400.0, 1.0], [1200.0, 1.0], [1300.0, 7.0], [1400.0, 3.0], [2900.0, 1.0], [3000.0, 1.0], [1500.0, 2.0], [3100.0, 1.0], [3200.0, 1.0], [1600.0, 5.0], [1900.0, 2.0]], "isOverall": false, "label": "S01_T01_LaunchApp", "isController": true}, {"data": [[0.0, 37.0]], "isOverall": false, "label": " /api/v1/products/ ", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T05_ChairsTab-24", "isController": false}, {"data": [[0.0, 10.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-23", "isController": false}, {"data": [[0.0, 1.0], [100.0, 9.0], [200.0, 2.0]], "isOverall": false, "label": "S01_T07_AddToCartButton", "isController": true}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10", "isController": false}, {"data": [[0.0, 1.0], [100.0, 16.0], [200.0, 8.0]], "isOverall": false, "label": "S01_T04_AddToCartButton", "isController": true}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-13", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-14", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-11", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-12", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-10", "isController": false}, {"data": [[1100.0, 3.0], [1400.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [900.0, 4.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair", "isController": true}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-19", "isController": false}, {"data": [[600.0, 8.0], [700.0, 4.0], [800.0, 2.0], [400.0, 2.0], [900.0, 2.0], [500.0, 7.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab", "isController": true}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-17", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-18", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-15", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-16", "isController": false}, {"data": [[0.0, 37.0]], "isOverall": false, "label": " /api/v1/category/ ", "isController": false}, {"data": [[0.0, 19.0], [100.0, 6.0]], "isOverall": false, "label": "S01_T01_LaunchApp-02", "isController": false}, {"data": [[300.0, 8.0], [200.0, 9.0], [400.0, 2.0], [900.0, 2.0], [1000.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-03", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-00", "isController": false}, {"data": [[0.0, 18.0], [600.0, 2.0], [400.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T01_LaunchApp-01", "isController": false}, {"data": [[300.0, 8.0], [200.0, 17.0]], "isOverall": false, "label": "S01_T01_LaunchApp-08", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-09", "isController": false}, {"data": [[0.0, 37.0]], "isOverall": false, "label": " /api/v1/content/pages/ ", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-06", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-2", "isController": false}, {"data": [[0.0, 23.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T01_LaunchApp-07", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-1", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-04", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-05", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-3", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 3.0], [200.0, 3.0], [900.0, 3.0], [1000.0, 2.0]], "isOverall": false, "label": "S01_T05_ChairsTab-00", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-31", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-32", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-30", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [1300.0, 1.0], [2700.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout", "isController": true}, {"data": [[0.0, 34.0], [100.0, 3.0]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 ", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-06", "isController": false}, {"data": [[0.0, 9.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-05", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-08", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-0", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-07", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-09", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05", "isController": false}, {"data": [[300.0, 14.0], [200.0, 10.0], [400.0, 10.0], [500.0, 3.0]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-00", "isController": false}, {"data": [[0.0, 22.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-02", "isController": false}, {"data": [[300.0, 5.0], [200.0, 7.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-00", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-01", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-04", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-03", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [1300.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [900.0, 2.0], [1900.0, 2.0], [1000.0, 3.0]], "isOverall": false, "label": "S01_T05_ChairsTab", "isController": true}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-24", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-25", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-22", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-23", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-20", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T01_LaunchApp-21", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12", "isController": false}, {"data": [[0.0, 22.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-28", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-29", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-26", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T01_LaunchApp-27", "isController": false}, {"data": [[300.0, 6.0], [600.0, 1.0], [700.0, 1.0], [400.0, 13.0], [500.0, 4.0]], "isOverall": false, "label": "S01_T03_ClickOnTable", "isController": true}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-11", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-10", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-13", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-12", "isController": false}, {"data": [[0.0, 36.0], [100.0, 1.0]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en ", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-15", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-14", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22", "isController": false}, {"data": [[0.0, 3.0], [300.0, 1.0], [200.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25", "isController": false}, {"data": [[0.0, 1.0], [200.0, 3.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27", "isController": false}, {"data": [[0.0, 6.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [1200.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-29", "isController": false}, {"data": [[0.0, 3.0], [200.0, 1.0], [100.0, 3.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-28", "isController": false}, {"data": [[0.0, 23.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18", "isController": false}, {"data": [[0.0, 19.0], [100.0, 4.0], [200.0, 2.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19", "isController": false}, {"data": [[0.0, 24.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16", "isController": false}, {"data": [[0.0, 25.0]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17", "isController": false}, {"data": [[0.0, 7.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21", "isController": false}, {"data": [[0.0, 5.0], [100.0, 2.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20", "isController": false}, {"data": [[0.0, 11.0], [100.0, 1.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09", "isController": false}, {"data": [[0.0, 74.0]], "isOverall": false, "label": " /actuator/health/ping ", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12", "isController": false}, {"data": [[0.0, 37.0]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ ", "isController": false}, {"data": [[300.0, 2.0], [200.0, 7.0], [400.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-17", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11", "isController": false}, {"data": [[0.0, 12.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 3200.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 8.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 2574.0, "series": [{"data": [[0.0, 2574.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 17.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 8.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 4.39554485249849, "minX": 1.6795938E12, "maxY": 4.991949910554561, "series": [{"data": [[1.6795938E12, 4.991949910554561], [1.67959386E12, 4.39554485249849]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67959386E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 7875.816666666667, "minX": 1.6795938E12, "maxY": 39454.166666666664, "series": [{"data": [[1.6795938E12, 21771.233333333334], [1.67959386E12, 39454.166666666664]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6795938E12, 7875.816666666667], [1.67959386E12, 11652.683333333332]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.67959386E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 5.0, "minX": 1.6795938E12, "maxY": 2448.0, "series": [{"data": [[1.6795938E12, 14.333333333333334], [1.67959386E12, 7.5]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-01", "isController": false}, {"data": [[1.6795938E12, 14.333333333333334], [1.67959386E12, 9.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-00", "isController": false}, {"data": [[1.6795938E12, 43.0], [1.67959386E12, 52.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-03", "isController": false}, {"data": [[1.6795938E12, 83.0], [1.67959386E12, 44.75]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-02", "isController": false}, {"data": [[1.6795938E12, 59.0], [1.67959386E12, 41.75]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-05", "isController": false}, {"data": [[1.6795938E12, 6.333333333333333], [1.67959386E12, 6.25]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-04", "isController": false}, {"data": [[1.6795938E12, 53.333333333333336], [1.67959386E12, 41.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-07", "isController": false}, {"data": [[1.6795938E12, 32.333333333333336], [1.67959386E12, 13.75]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-06", "isController": false}, {"data": [[1.6795938E12, 47.5], [1.67959386E12, 55.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-09", "isController": false}, {"data": [[1.6795938E12, 70.66666666666667], [1.67959386E12, 81.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-08", "isController": false}, {"data": [[1.6795938E12, 48.0], [1.67959386E12, 59.5]], "isOverall": false, "label": " /api/v1/content/pages/?page=0&count=20&store=DEFAULT&lang=en ", "isController": false}, {"data": [[1.6795938E12, 7.0], [1.67959386E12, 10.5]], "isOverall": false, "label": "S01_T05_ChairsTab-17", "isController": false}, {"data": [[1.6795938E12, 30.25], [1.67959386E12, 36.625]], "isOverall": false, "label": "S01_T05_ChairsTab-16", "isController": false}, {"data": [[1.6795938E12, 15.25], [1.67959386E12, 19.375]], "isOverall": false, "label": "S01_T05_ChairsTab-19", "isController": false}, {"data": [[1.6795938E12, 14.25], [1.67959386E12, 19.625]], "isOverall": false, "label": "S01_T05_ChairsTab-18", "isController": false}, {"data": [[1.6795938E12, 56.2], [1.67959386E12, 50.42857142857143]], "isOverall": false, "label": "S01_T05_ChairsTab-13", "isController": false}, {"data": [[1.6795938E12, 30.633333333333333], [1.67959386E12, 31.97727272727273]], "isOverall": false, "label": " /api/v1/store/DEFAULT ", "isController": false}, {"data": [[1.6795938E12, 55.75], [1.67959386E12, 81.625]], "isOverall": false, "label": "S01_T05_ChairsTab-15", "isController": false}, {"data": [[1.6795938E12, 42.75], [1.67959386E12, 49.75]], "isOverall": false, "label": "S01_T05_ChairsTab-14", "isController": false}, {"data": [[1.6795938E12, 23.0], [1.67959386E12, 22.2]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-12", "isController": false}, {"data": [[1.6795938E12, 12.5], [1.67959386E12, 9.6]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-11", "isController": false}, {"data": [[1.6795938E12, 10.0], [1.67959386E12, 14.8]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-14", "isController": false}, {"data": [[1.6795938E12, 5.5], [1.67959386E12, 8.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-13", "isController": false}, {"data": [[1.6795938E12, 49.0], [1.67959386E12, 17.4]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-16", "isController": false}, {"data": [[1.6795938E12, 41.5], [1.67959386E12, 39.6]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-15", "isController": false}, {"data": [[1.6795938E12, 10.0], [1.67959386E12, 6.6]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-18", "isController": false}, {"data": [[1.6795938E12, 19.0], [1.67959386E12, 21.2]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-17", "isController": false}, {"data": [[1.6795938E12, 53.25], [1.67959386E12, 40.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-2", "isController": false}, {"data": [[1.6795938E12, 22.75], [1.67959386E12, 19.750000000000004]], "isOverall": false, "label": "S01_T07_AddToCartButton-3", "isController": false}, {"data": [[1.6795938E12, 64.0], [1.67959386E12, 41.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-19", "isController": false}, {"data": [[1.6795938E12, 51.75], [1.67959386E12, 51.0]], "isOverall": false, "label": "S01_T07_AddToCartButton-0", "isController": false}, {"data": [[1.6795938E12, 36.0], [1.67959386E12, 36.62499999999999]], "isOverall": false, "label": "S01_T07_AddToCartButton-1", "isController": false}, {"data": [[1.6795938E12, 20.75], [1.67959386E12, 12.375]], "isOverall": false, "label": "S01_T05_ChairsTab-20", "isController": false}, {"data": [[1.6795938E12, 16.5], [1.67959386E12, 13.625]], "isOverall": false, "label": "S01_T05_ChairsTab-22", "isController": false}, {"data": [[1.6795938E12, 55.75], [1.67959386E12, 64.75]], "isOverall": false, "label": "S01_T05_ChairsTab-21", "isController": false}, {"data": [[1.6795938E12, 51.0], [1.67959386E12, 48.333333333333336]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/?lang=en ", "isController": false}, {"data": [[1.6795938E12, 2187.909090909091], [1.67959386E12, 1501.6428571428573]], "isOverall": false, "label": "S01_T01_LaunchApp", "isController": true}, {"data": [[1.6795938E12, 21.4375], [1.67959386E12, 22.523809523809526]], "isOverall": false, "label": " /api/v1/products/ ", "isController": false}, {"data": [[1.6795938E12, 16.25], [1.67959386E12, 35.12499999999999]], "isOverall": false, "label": "S01_T05_ChairsTab-24", "isController": false}, {"data": [[1.6795938E12, 46.5], [1.67959386E12, 62.875]], "isOverall": false, "label": "S01_T05_ChairsTab-23", "isController": false}, {"data": [[1.6795938E12, 163.75], [1.67959386E12, 147.37499999999997]], "isOverall": false, "label": "S01_T07_AddToCartButton", "isController": true}, {"data": [[1.6795938E12, 36.5], [1.67959386E12, 43.6]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-10", "isController": false}, {"data": [[1.6795938E12, 181.10000000000002], [1.67959386E12, 164.60000000000002]], "isOverall": false, "label": "S01_T04_AddToCartButton", "isController": true}, {"data": [[1.6795938E12, 56.63636363636364], [1.67959386E12, 48.142857142857146]], "isOverall": false, "label": "S01_T01_LaunchApp-13", "isController": false}, {"data": [[1.6795938E12, 10.636363636363637], [1.67959386E12, 8.0]], "isOverall": false, "label": "S01_T01_LaunchApp-14", "isController": false}, {"data": [[1.6795938E12, 51.36363636363637], [1.67959386E12, 52.28571428571428]], "isOverall": false, "label": "S01_T01_LaunchApp-11", "isController": false}, {"data": [[1.6795938E12, 43.81818181818182], [1.67959386E12, 52.785714285714285]], "isOverall": false, "label": "S01_T01_LaunchApp-12", "isController": false}, {"data": [[1.6795938E12, 34.36363636363636], [1.67959386E12, 23.214285714285715]], "isOverall": false, "label": "S01_T01_LaunchApp-10", "isController": false}, {"data": [[1.6795938E12, 1040.25], [1.67959386E12, 1241.25]], "isOverall": false, "label": "S01_T06_SelectRandomChair", "isController": true}, {"data": [[1.6795938E12, 37.54545454545455], [1.67959386E12, 42.64285714285714]], "isOverall": false, "label": "S01_T01_LaunchApp-19", "isController": false}, {"data": [[1.6795938E12, 667.8], [1.67959386E12, 644.4666666666666]], "isOverall": false, "label": "S01_T02_OpenTablesTab", "isController": true}, {"data": [[1.6795938E12, 44.36363636363636], [1.67959386E12, 48.5]], "isOverall": false, "label": "S01_T01_LaunchApp-17", "isController": false}, {"data": [[1.6795938E12, 44.36363636363636], [1.67959386E12, 49.35714285714286]], "isOverall": false, "label": "S01_T01_LaunchApp-18", "isController": false}, {"data": [[1.6795938E12, 11.363636363636363], [1.67959386E12, 10.214285714285714]], "isOverall": false, "label": "S01_T01_LaunchApp-15", "isController": false}, {"data": [[1.6795938E12, 10.545454545454545], [1.67959386E12, 9.857142857142858]], "isOverall": false, "label": "S01_T01_LaunchApp-16", "isController": false}, {"data": [[1.6795938E12, 12.133333333333333], [1.67959386E12, 11.590909090909092]], "isOverall": false, "label": " /api/v1/category/ ", "isController": false}, {"data": [[1.6795938E12, 84.07692307692308], [1.67959386E12, 34.75]], "isOverall": false, "label": "S01_T01_LaunchApp-02", "isController": false}, {"data": [[1.6795938E12, 620.0], [1.67959386E12, 334.99999999999994]], "isOverall": false, "label": "S01_T01_LaunchApp-03", "isController": false}, {"data": [[1.6795938E12, 15.076923076923078], [1.67959386E12, 6.250000000000001]], "isOverall": false, "label": "S01_T01_LaunchApp-00", "isController": false}, {"data": [[1.6795938E12, 220.92307692307693], [1.67959386E12, 63.583333333333336]], "isOverall": false, "label": "S01_T01_LaunchApp-01", "isController": false}, {"data": [[1.6795938E12, 289.8181818181818], [1.67959386E12, 283.35714285714283]], "isOverall": false, "label": "S01_T01_LaunchApp-08", "isController": false}, {"data": [[1.6795938E12, 25.818181818181817], [1.67959386E12, 17.42857142857143]], "isOverall": false, "label": "S01_T01_LaunchApp-09", "isController": false}, {"data": [[1.6795938E12, 9.133333333333335], [1.67959386E12, 8.545454545454545]], "isOverall": false, "label": " /api/v1/content/pages/ ", "isController": false}, {"data": [[1.6795938E12, 60.54545454545455], [1.67959386E12, 40.35714285714286]], "isOverall": false, "label": "S01_T01_LaunchApp-06", "isController": false}, {"data": [[1.6795938E12, 64.4], [1.67959386E12, 59.06666666666668]], "isOverall": false, "label": "S01_T04_AddToCartButton-2", "isController": false}, {"data": [[1.6795938E12, 58.18181818181818], [1.67959386E12, 44.71428571428572]], "isOverall": false, "label": "S01_T01_LaunchApp-07", "isController": false}, {"data": [[1.6795938E12, 38.5], [1.67959386E12, 39.2]], "isOverall": false, "label": "S01_T04_AddToCartButton-1", "isController": false}, {"data": [[1.6795938E12, 19.454545454545453], [1.67959386E12, 8.642857142857142]], "isOverall": false, "label": "S01_T01_LaunchApp-04", "isController": false}, {"data": [[1.6795938E12, 9.636363636363637], [1.67959386E12, 5.0]], "isOverall": false, "label": "S01_T01_LaunchApp-05", "isController": false}, {"data": [[1.6795938E12, 22.900000000000002], [1.67959386E12, 23.0]], "isOverall": false, "label": "S01_T04_AddToCartButton-3", "isController": false}, {"data": [[1.6795938E12, 856.6], [1.67959386E12, 538.7142857142857]], "isOverall": false, "label": "S01_T05_ChairsTab-00", "isController": false}, {"data": [[1.6795938E12, 18.272727272727273], [1.67959386E12, 12.928571428571429]], "isOverall": false, "label": "S01_T01_LaunchApp-31", "isController": false}, {"data": [[1.6795938E12, 19.818181818181817], [1.67959386E12, 12.5]], "isOverall": false, "label": "S01_T01_LaunchApp-32", "isController": false}, {"data": [[1.6795938E12, 19.636363636363637], [1.67959386E12, 13.285714285714288]], "isOverall": false, "label": "S01_T01_LaunchApp-30", "isController": false}, {"data": [[1.6795938E12, 2448.0], [1.67959386E12, 1339.4]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout", "isController": true}, {"data": [[1.6795938E12, 58.375], [1.67959386E12, 57.047619047619044]], "isOverall": false, "label": " /api/v1/products/?&store=DEFAULT&lang=en&page=0&count=15&category=50 ", "isController": false}, {"data": [[1.6795938E12, 12.8], [1.67959386E12, 14.533333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-06", "isController": false}, {"data": [[1.6795938E12, 65.0], [1.67959386E12, 59.75]], "isOverall": false, "label": "S01_T06_SelectRandomChair-04", "isController": false}, {"data": [[1.6795938E12, 19.9], [1.67959386E12, 16.799999999999997]], "isOverall": false, "label": "S01_T03_ClickOnTable-05", "isController": false}, {"data": [[1.6795938E12, 51.0], [1.67959386E12, 57.375]], "isOverall": false, "label": "S01_T06_SelectRandomChair-03", "isController": false}, {"data": [[1.6795938E12, 57.199999999999996], [1.67959386E12, 50.2]], "isOverall": false, "label": "S01_T03_ClickOnTable-08", "isController": false}, {"data": [[1.6795938E12, 55.3], [1.67959386E12, 43.333333333333336]], "isOverall": false, "label": "S01_T04_AddToCartButton-0", "isController": false}, {"data": [[1.6795938E12, 9.25], [1.67959386E12, 6.375]], "isOverall": false, "label": "S01_T06_SelectRandomChair-02", "isController": false}, {"data": [[1.6795938E12, 11.7], [1.67959386E12, 9.799999999999999]], "isOverall": false, "label": "S01_T03_ClickOnTable-07", "isController": false}, {"data": [[1.6795938E12, 12.75], [1.67959386E12, 29.999999999999996]], "isOverall": false, "label": "S01_T06_SelectRandomChair-01", "isController": false}, {"data": [[1.6795938E12, 12.5], [1.67959386E12, 12.125000000000002]], "isOverall": false, "label": "S01_T06_SelectRandomChair-08", "isController": false}, {"data": [[1.6795938E12, 60.900000000000006], [1.67959386E12, 47.06666666666667]], "isOverall": false, "label": "S01_T03_ClickOnTable-09", "isController": false}, {"data": [[1.6795938E12, 20.0], [1.67959386E12, 17.375]], "isOverall": false, "label": "S01_T06_SelectRandomChair-07", "isController": false}, {"data": [[1.6795938E12, 11.5], [1.67959386E12, 13.625]], "isOverall": false, "label": "S01_T06_SelectRandomChair-06", "isController": false}, {"data": [[1.6795938E12, 40.0], [1.67959386E12, 45.375]], "isOverall": false, "label": "S01_T06_SelectRandomChair-05", "isController": false}, {"data": [[1.6795938E12, 364.1875], [1.67959386E12, 357.52380952380946]], "isOverall": false, "label": "Transaction Controller", "isController": true}, {"data": [[1.6795938E12, 13.000000000000002], [1.67959386E12, 11.533333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-00", "isController": false}, {"data": [[1.6795938E12, 60.4], [1.67959386E12, 51.86666666666667]], "isOverall": false, "label": "S01_T03_ClickOnTable-02", "isController": false}, {"data": [[1.6795938E12, 259.25], [1.67959386E12, 290.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-00", "isController": false}, {"data": [[1.6795938E12, 7.6], [1.67959386E12, 6.666666666666666]], "isOverall": false, "label": "S01_T03_ClickOnTable-01", "isController": false}, {"data": [[1.6795938E12, 44.599999999999994], [1.67959386E12, 47.86666666666667]], "isOverall": false, "label": "S01_T03_ClickOnTable-04", "isController": false}, {"data": [[1.6795938E12, 44.6], [1.67959386E12, 47.33333333333333]], "isOverall": false, "label": "S01_T03_ClickOnTable-03", "isController": false}, {"data": [[1.6795938E12, 1615.8], [1.67959386E12, 1403.142857142857]], "isOverall": false, "label": "S01_T05_ChairsTab", "isController": true}, {"data": [[1.6795938E12, 50.63636363636364], [1.67959386E12, 39.35714285714286]], "isOverall": false, "label": "S01_T01_LaunchApp-24", "isController": false}, {"data": [[1.6795938E12, 18.727272727272727], [1.67959386E12, 16.28571428571429]], "isOverall": false, "label": "S01_T01_LaunchApp-25", "isController": false}, {"data": [[1.6795938E12, 58.0], [1.67959386E12, 39.5]], "isOverall": false, "label": "S01_T01_LaunchApp-22", "isController": false}, {"data": [[1.6795938E12, 60.36363636363637], [1.67959386E12, 42.5]], "isOverall": false, "label": "S01_T01_LaunchApp-23", "isController": false}, {"data": [[1.6795938E12, 37.63636363636364], [1.67959386E12, 39.214285714285715]], "isOverall": false, "label": "S01_T01_LaunchApp-20", "isController": false}, {"data": [[1.6795938E12, 10.5], [1.67959386E12, 10.533333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-14", "isController": false}, {"data": [[1.6795938E12, 53.00000000000001], [1.67959386E12, 42.785714285714285]], "isOverall": false, "label": "S01_T01_LaunchApp-21", "isController": false}, {"data": [[1.6795938E12, 14.399999999999999], [1.67959386E12, 13.933333333333332]], "isOverall": false, "label": "S01_T02_OpenTablesTab-15", "isController": false}, {"data": [[1.6795938E12, 45.50000000000001], [1.67959386E12, 45.73333333333333]], "isOverall": false, "label": "S01_T02_OpenTablesTab-12", "isController": false}, {"data": [[1.6795938E12, 53.6], [1.67959386E12, 58.199999999999996]], "isOverall": false, "label": "S01_T02_OpenTablesTab-13", "isController": false}, {"data": [[1.6795938E12, 12.181818181818182], [1.67959386E12, 15.071428571428571]], "isOverall": false, "label": "S01_T01_LaunchApp-28", "isController": false}, {"data": [[1.6795938E12, 17.636363636363637], [1.67959386E12, 15.857142857142856]], "isOverall": false, "label": "S01_T01_LaunchApp-29", "isController": false}, {"data": [[1.6795938E12, 16.909090909090907], [1.67959386E12, 15.214285714285715]], "isOverall": false, "label": "S01_T01_LaunchApp-26", "isController": false}, {"data": [[1.6795938E12, 16.454545454545453], [1.67959386E12, 13.785714285714285]], "isOverall": false, "label": "S01_T01_LaunchApp-27", "isController": false}, {"data": [[1.6795938E12, 510.70000000000005], [1.67959386E12, 441.06666666666666]], "isOverall": false, "label": "S01_T03_ClickOnTable", "isController": true}, {"data": [[1.6795938E12, 12.7], [1.67959386E12, 9.4]], "isOverall": false, "label": "S01_T03_ClickOnTable-11", "isController": false}, {"data": [[1.6795938E12, 69.7], [1.67959386E12, 50.733333333333334]], "isOverall": false, "label": "S01_T03_ClickOnTable-10", "isController": false}, {"data": [[1.6795938E12, 12.1], [1.67959386E12, 10.266666666666667]], "isOverall": false, "label": "S01_T03_ClickOnTable-13", "isController": false}, {"data": [[1.6795938E12, 10.4], [1.67959386E12, 8.466666666666667]], "isOverall": false, "label": "S01_T03_ClickOnTable-12", "isController": false}, {"data": [[1.6795938E12, 59.400000000000006], [1.67959386E12, 50.86363636363635]], "isOverall": false, "label": " /api/v1/category/?count=20&page=0&store=DEFAULT&lang=en ", "isController": false}, {"data": [[1.6795938E12, 18.4], [1.67959386E12, 12.533333333333335]], "isOverall": false, "label": "S01_T03_ClickOnTable-15", "isController": false}, {"data": [[1.6795938E12, 54.7], [1.67959386E12, 46.0]], "isOverall": false, "label": "S01_T03_ClickOnTable-14", "isController": false}, {"data": [[1.6795938E12, 7.5], [1.67959386E12, 9.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-23", "isController": false}, {"data": [[1.6795938E12, 10.0], [1.67959386E12, 14.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-22", "isController": false}, {"data": [[1.6795938E12, 310.5], [1.67959386E12, 119.6]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-25", "isController": false}, {"data": [[1.6795938E12, 226.0], [1.67959386E12, 151.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-24", "isController": false}, {"data": [[1.6795938E12, 59.0], [1.67959386E12, 32.2]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-27", "isController": false}, {"data": [[1.6795938E12, 55.0], [1.67959386E12, 71.4]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-26", "isController": false}, {"data": [[1.6795938E12, 758.5], [1.67959386E12, 203.0]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-29", "isController": false}, {"data": [[1.6795938E12, 168.5], [1.67959386E12, 68.4]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-28", "isController": false}, {"data": [[1.6795938E12, 60.2], [1.67959386E12, 57.6]], "isOverall": false, "label": "S01_T02_OpenTablesTab-18", "isController": false}, {"data": [[1.6795938E12, 62.60000000000001], [1.67959386E12, 56.400000000000006]], "isOverall": false, "label": "S01_T02_OpenTablesTab-19", "isController": false}, {"data": [[1.6795938E12, 53.49999999999999], [1.67959386E12, 48.599999999999994]], "isOverall": false, "label": "S01_T02_OpenTablesTab-16", "isController": false}, {"data": [[1.6795938E12, 14.0], [1.67959386E12, 12.066666666666665]], "isOverall": false, "label": "S01_T02_OpenTablesTab-17", "isController": false}, {"data": [[1.6795938E12, 26.0], [1.67959386E12, 31.4]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-21", "isController": false}, {"data": [[1.6795938E12, 99.5], [1.67959386E12, 60.6]], "isOverall": false, "label": "S01_T08_CartIcon-->Checkout-20", "isController": false}, {"data": [[1.6795938E12, 81.25], [1.67959386E12, 54.25]], "isOverall": false, "label": "S01_T06_SelectRandomChair-09", "isController": false}, {"data": [[1.6795938E12, 12.749999999999998], [1.67959386E12, 9.952380952380953]], "isOverall": false, "label": " /actuator/health/ping ", "isController": false}, {"data": [[1.6795938E12, 41.5], [1.67959386E12, 48.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-15", "isController": false}, {"data": [[1.6795938E12, 12.25], [1.67959386E12, 12.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-14", "isController": false}, {"data": [[1.6795938E12, 15.75], [1.67959386E12, 10.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-13", "isController": false}, {"data": [[1.6795938E12, 7.75], [1.67959386E12, 8.625]], "isOverall": false, "label": "S01_T06_SelectRandomChair-12", "isController": false}, {"data": [[1.6795938E12, 19.249999999999996], [1.67959386E12, 14.047619047619047]], "isOverall": false, "label": " /api/v1/content/boxes/headerMessage/ ", "isController": false}, {"data": [[1.6795938E12, 292.5], [1.67959386E12, 459.25000000000006]], "isOverall": false, "label": "S01_T06_SelectRandomChair-17", "isController": false}, {"data": [[1.6795938E12, 15.5], [1.67959386E12, 14.0]], "isOverall": false, "label": "S01_T06_SelectRandomChair-16", "isController": false}, {"data": [[1.6795938E12, 37.5], [1.67959386E12, 53.125]], "isOverall": false, "label": "S01_T06_SelectRandomChair-11", "isController": false}, {"data": [[1.6795938E12, 55.0], [1.67959386E12, 48.5]], "isOverall": false, "label": "S01_T06_SelectRandomChair-10", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.67959386E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 3600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
    }
