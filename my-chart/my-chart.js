"use strict"
var MyCharts = (function(){
	var chartObjectParameter, 
		defaultValue, 
		constructor, 
		validate,
		errorMessages,
		raiseError,
		chartType,
		startPreparingTheChart;

	defaultValue = {
		chartId: "chart1",
		chartContainerId: "chart",
		chartType: "bullseye",
		height: "300px",
		width: "300px",
		dataType: "JSON",
		dataSource: []
	};
	
	chartType = [
		"bullseye"
	];

	errorMessages = {
		ivalidId: "The provided chart ID is invalid",
		invalidContainerId: "The provided container id is not valid",
		containerNotFound: "Can't find the container in page",
		chartTypeNotSupported: "Provided chartType not supported"
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
		},
		chartContainerId: function(id) {
			if(id.trim().indexOf(" ") !== -1) {
				raiseError(errorMessages.invalidContainerId);
				return false;
			}
			if(document.getElementById(id.trim()) === null) {
				raiseError(errorMessages.containerNotFound);
				return false;	
			}
			return true;
		},
		chartType: function(type) {
			type = type.trim().toLowerCase();
			if(chartType.indexOf(type) === -1) {
				raiseError(errorMessages.chartTypeNotSupported);
				return false;		
			}
			return true;
		},
		checkWidthHeight: function(width, height) {
			return true;
		},
		checkDataType: function(dataType) {
			return true;
		},
		checkData: function(data, dataType) {
			return true;
		}
	}

	chartObjectParameter = {
		chartId: defaultValue.chartId,
		chartContainer: document.getElementById(defaultValue.chartContainerId),
		chartType: defaultValue.chartType,
		width: defaultValue.width,
		height: defaultValue.height,
		dataType: defaultValue.dataType,
		dataSource: defaultValue.dataSource
	};

	startPreparingTheChart = (function() {
		alert("x");
		console.log(chartObjectParameter);
	});
	
	/**
	*	arguments[0][0] = chartId
	*	arguments[0][1] = chartContainerId
	*	arguments[0][2] = chartType
	*	arguments[0][3] = width
	*	arguments[0][4] = height
	*	arguments[0][5] = chartDataType
	*	arguments[0][6] = dataSource
	*/
	constructor = (function(){
		
		if(validate.chartId(arguments[0][0])){
			chartObjectParameter.chartId = arguments[0][0].trim();
		}

		if(validate.chartContainerId(arguments[0][1])){
			chartObjectParameter.chartContainer = document.getElementById(arguments[0][0].trim());
		}

		if(validate.chartType(arguments[0][2])) {
			chartObjectParameter.chartType = arguments[0][2].trim().toLowerCase();
		}

		if(validate.checkWidthHeight(arguments[0][3], arguments[0][4])) {
			chartObjectParameter.width = arguments[0][3] + "px";
			chartObjectParameter.width = arguments[0][4] + "px";		
		}

		if(validate.checkDataType(arguments[0][5])) {
			chartObjectParameter.dataType = arguments[0][5].trim().toUpperCase();
		}

		if(validate.checkData(arguments[0][6], chartObjectParameter.dataType)) {
			chartObjectParameter.dataSource = arguments[0][6];
		}
		startPreparingTheChart();
		return false;
	})(arguments);

	

});