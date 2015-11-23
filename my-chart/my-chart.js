"use strict"
var MyCharts = (function(){
	var chartObjectParameter, 
		defaultValue, 
		constructor, 
		validate,
		errorMessages,
		raiseError;
	defaultValue = {
		chartId: "chart1"
		chartContainerId: "chart",
		chartType: "bullseye",
		height: "300px",
		width: "300px"
	};
	
	errorMessages = {
		ivalidId: "The provided chart ID is invalid"
	},

	raiseError = (function(message){
		console.error(message);
	});

	validate = {
		chartId: function(id) {
			if(id.trim().indexOf(" ")!=-1) {
				raiseError(errorMessages.invalId);
				return false;
			}
			return true;
		}
	}

	chartObjectParameter = {
		chartId: defaultValue.chartId,
		chartType: defaultValue.chartType,
		chartContainer: document.getElementById(defaultValue.chartContainerId),
		height:defaultValue.height,
		width:defaultValue.width,
		chartData: []
	};

	/**
	*	arguments[0] = chartId
	*	arguments[1] = chartContainerId
	*	arguments[2] = chartType
	*	arguments[3] = height
	*	arguments[4] = width
	*	arguments[5] = chartData
	*/
	constructor = (function(){
		if(){
			
		}
	})(arguments);
});