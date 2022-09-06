sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(Controller, JSONModel, MessageBox) {
	"use strict";

	var oJsonModel = new JSONModel();
	var that = this;
	return Controller.extend("OdataService.controller.View1", {
		
		onInit: function() {
			// debugger;
			var oModel = new sap.ui.model.odata.ODataModel("/V2/Northwind/Northwind.svc/", true);
			oModel.read("/Employees", {
				success: function(oData) {
					oJsonModel.setData(oData.results);
					that.getView().byId("idTable").setModel(oModel);
				}
			});
		},
		onPress: function(){
			var oFName = this.getView().byId("fname").getValue();
			var oLName = this.getView().byId("lname").getValue();
			var oBirth = this.getView().byId("date").getValue();
			var oCity = this.getView().byId("city").getValue();
		
		var oItems = {
			"FirstName" : oFName,
			"LastName" : oLName,
			"BirthDate" : oBirth,
			"City" : oCity
		};
		this.getView().getModel().create(oItems,{
			success : function() {
				MessageBox.show("Data Saved Successfully");
			},
			error : function (error) {
				MessageBox.error(error);
			}
		});
		}
	});
});