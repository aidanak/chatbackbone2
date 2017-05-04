var UserModel = Backbone.Model.extend({
	defaults: {
		name: "",
		status: "", 
		lastActiveDate: ""
	}
});

var Users = Backbone.Collection.extend({
	model: UserModel
});

var MessageModel = Backbone.Model.extend({
	defaults: {
		author: "", 
		text: "",
		receiver: "",
		date: "",
		deleted: "",
		color: ""
	}
});

var Messages = Backbone.Collection.extend({
	model: MessageModel
});

	
	

