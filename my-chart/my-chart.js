"use strict"
var MyCharts = (function(){
	var chartObjectParameter, 
		defaultValue, 
		constructor, 
		validate,
		errorMessages,
		raiseError,
		chartType,
		startPreparingTheChart,
		misc,
		events,
		attributes,
		settingUpCommonAttributesNotSpecified,
		setupChartContainer;

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
		"bullseye",
		"triangle"
	];

	/**
	*	This object holds the basic attribute value
	*/
	attributes = {
		common: {
			// common attributes are applicable for all chart types
			captionSpaceWidth: 0,
			captionSpaceHeight: 0,
			xAxisHeight: 0,
			yAxisWidth: 0,
			isAnimate: 0,
			backgroundColor: ""	
		},
		chartSpecific: {
			// chart specific attributes are only for specific charts
			bullseye: {
				minRadius: 0
			},
			triangle: {

			}
		}
		
	};

	/*
	*	Holds all the error messages
	*/
	errorMessages = {
		invalidId: "The provided chart ID is invalid",
		invalidContainerId: "The provided container id is not valid",
		containerNotFound: "Can't find the container in page",
		chartTypeNotSupported: "Provided chartType not supported"
	},

	/**
	* Holds all the supported events
	*/
	events = {
		common: {
			beforeRender: null,
			afterRender: null	
		},
		chartSpecific: {
			bullseye: {

			},
			triangle: {

			}
		}
		
	};

	raiseError = (function(message){
		console.error(message);
	});

	/**
	*	This object holds all the validation methods
	*/
	validate = {
		chartId: function(id) {
			if(id.trim()=="") {
				return false;
			}
			if(id.trim().indexOf(" ")!=-1) {
				raiseError(errorMessages.invalId);
				return false;
			}
			return true;
		},
		chartContainerId: function(id) {
			if(id.trim()=="") {
				return false;
			}
			if(id.trim().indexOf(" ") !== -1) {
				raiseError(errorMessages.invalidContainerId);
				return false;
			}
			
			return true;
		},
		chartType: function(type) {
			if(type.trim()=="") {
				return false;
			}
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

	/**
	* This object holds all the miscellaneous methods which used throughout the program
	*/
	misc = {
		sort: function(data) {
			var index1, index2, tempData, length;
			length = data.length;
			for(index1=0; index1<length; index1++) {
				for(index2=0; index2<(length-index1-1); index2++) {
					if(data[index2].value > data[index2+1].value) {
						tempData = data[index2];
						data[index2+1] = data[index2];
						data[index2+1] = tempData;
					}
				}
			}
			return data;
		}
	}

	/**
	*	This object is fullfilled by constructor and holds the things needed to populate the chart
	*/
	chartObjectParameter = {
		chartId: defaultValue.chartId,
		chartContainer: document.getElementById(defaultValue.chartContainerId),
		chartType: defaultValue.chartType,
		width: defaultValue.width,
		height: defaultValue.height,
		dataType: defaultValue.dataType,
		dataSource: defaultValue.dataSource,
		attributes: {},
		events: {}
	};

	/**
	*	This is the constructor and it's purpose is to validate and prepare the chartObjectParameter object
	*	arguments[0][0] = chartId
	*	arguments[0][1] = chartContainerId
	*	arguments[0][2] = chartType
	*	arguments[0][3] = width
	*	arguments[0][4] = height
	*	arguments[0][5] = chartDataType
	*	arguments[0][6] = dataSource
	*	arguments[0][7] = attributesOptions
	*	arguments[0][8] = events
	*/
	constructor = (function(){
		var chartSpecificAttributes,
			commonAttributes,
			index,
			commonEvents,
			chartSpecificEvents;
		if(validate.chartId(arguments[0][0])){
			chartObjectParameter.chartId = arguments[0][0].trim();
		}

		if(validate.chartContainerId(arguments[0][1])){
			chartObjectParameter.chartContainer = arguments[0][1].trim();
		}

		if(validate.chartType(arguments[0][2])) {
			chartObjectParameter.chartType = arguments[0][2].trim().toLowerCase();
		}

		if(validate.checkWidthHeight(arguments[0][3], arguments[0][4])) {
			chartObjectParameter.width = arguments[0][3];
			chartObjectParameter.height = arguments[0][4];		
		}

		if(validate.checkDataType(arguments[0][5])) {
			chartObjectParameter.dataType = arguments[0][5].trim().toUpperCase();
		}

		if(validate.checkData(arguments[0][6], chartObjectParameter.dataType)) {
			chartObjectParameter.dataSource = misc.sort(arguments[0][6]);
		} else {
			return false;
		}

		if(typeof arguments[0][7] !== "undefined") {
			chartObjectParameter.attributes = arguments[0][7];
			commonAttributes = attributes.common;
			for(index in commonAttributes) {
				if(typeof chartObjectParameter.attributes[commonAttributes[index]] === "undefined") {
					chartObjectParameter.attributes[commonAttributes[index]] = attributes.chartSpecific[chartObjectParameter.chartType][chartSpecificAttributes[index]];
				}
			}

			chartSpecificAttributes = Object.keys(attributes.chartSpecific[chartObjectParameter.chartType]);
			for(index in chartSpecificAttributes) {
				if(typeof chartObjectParameter.attributes[chartSpecificAttributes[index]] === "undefined") {
					chartObjectParameter.attributes[chartSpecificAttributes[index]] = attributes.chartSpecific[chartObjectParameter.chartType][chartSpecificAttributes[index]];
				}
			}
		} else { 
			// merging common attributes and chart specific attributes to chartObjectParameter
			chartObjectParameter.attributes = attributes.common;
			chartSpecificAttributes = Object.keys(attributes.chartSpecific[chartObjectParameter.chartType]);
			for(index in chartSpecificAttributes) {
				chartObjectParameter.attributes[chartSpecificAttributes[index]] = attributes.chartSpecific[chartObjectParameter.chartType][chartSpecificAttributes[index]];
			}
		}

		if(typeof arguments[0][8] !== "undefined") {
			chartObjectParameter.events = arguments[0][8];
			commonEvents = events.common;
			for(index in commonEvents) {
				if(typeof chartObjectParameter.events[commonEvents[index]] === "undefined") {
					chartObjectParameter.events[commonEvents[index]] = events.chartSpecific[chartObjectParameter.chartType][chartSpecificAttributes[index]];
				}
			}

			chartSpecificEvents = Object.keys(events.chartSpecific[chartObjectParameter.chartType]);
			for(index in chartSpecificEvents) {
				if(typeof chartObjectParameter.events[chartSpecificEvents[index]] === "undefined") {
					chartObjectParameter.events[chartSpecificEvents[index]] = events.chartSpecific[chartObjectParameter.chartType][chartSpecificEvents[index]];
				}
			}
		} else { 
			// merging common events and chart specific events to chartObjectParameter
			chartObjectParameter.events = events.common;
			chartSpecificEvents = Object.keys(events.chartSpecific[chartObjectParameter.chartType]);
			for(index in chartSpecificEvents) {
				chartObjectParameter.events[chartSpecificEvents[index]] = events.chartSpecific[chartObjectParameter.chartType][chartSpecificEvents[index]];
			}
		}

	})(arguments);
		
	/**
	* This function checks wheather the specified chart container exists or not if exists then collect the object
	* else it raises error
	*/
	setupChartContainer = (function() {console.log(chartObjectParameter.chartContainer);
		var tempObject = document.getElementById(chartObjectParameter.chartContainer);
		if(!tempObject) {
			raiseError(errorMessages.containerNotFound);
			return false;
		} else {
			chartObjectParameter.chartContainer = tempObject;
		}
		return true;
	});

	/**
	* This function will setup the attributes which is not specified by user
	*/
	settingUpCommonAttributesNotSpecified = (function(){
		if(!chartObjectParameter.attributes.xAxisHeight) {
			chartObjectParameter.attributes.xAxisHeight = ((chartObjectParameter.width*1.67)/100);
		}
		if(!chartObjectParameter.attributes.yAxisWidth) {
			chartObjectParameter.attributes.yAxisWidth = ((chartObjectParameter.height*1.67)/100);
		}
		if(!chartObjectParameter.attributes.captionSpaceWidth) {
			chartObjectParameter.attributes.captionSpaceWidth = ((chartObjectParameter.width*1.67)/100);
		}
		if(!chartObjectParameter.attributes.captionSpaceHeight) {
			chartObjectParameter.attributes.captionSpaceHeight = ((chartObjectParameter.height*1.67)/100);
		}
		if(chartObjectParameter.attributes.backgroundColor.trim() === "") {
			chartObjectParameter.attributes.backgroundColor = "#ccffcc";
		}
	});

	startPreparingTheChart = (function() {
		console.log(chartObjectParameter);
		settingUpCommonAttributesNotSpecified();
		// if before render event is specified, firing the evenet
		if(chartObjectParameter.events.beforeRender) {
			chartObjectParameter.events.beforeRender();
		}
	});

	this.render = (function(){
		if(!setupChartContainer()) {
			return false;
		}
		
		startPreparingTheChart();

		// if after render event is specified, firing the event
		if(chartObjectParameter.events.afterRender) {
			chartObjectParameter.events.afterRender();
		}
	});

	// Following section will holds all the event methods, this will be called by the user if they specify a function 
	// to be fired on an event

	this.beforeRender = (function(fn) {
		chartObjectParameter.events.beforeRender = fn;
	});

	this.afterRender = (function(fn) {
		chartObjectParameter.events.afterRender = fn;
	});

});