$(document).ready(function(){
	var userName = prompt('What is your name?', 'name');
	var name = document.getElementById('userName');
	name.innerHTML = userName;

	var userStatus = prompt('Enter your status (active, passive, bored etc)', 'mood');
	var status = document.getElementById('userStatus');
	status.innerHTML = userStatus;

	var date = new Date();
	var time = date.getHours() + ':' + date.getMinutes();

	user.set({name: userName, status: userStatus, lastActiveDate: time});
	userManager.addNewUser(user);
 
	var p = new Messages();

	for(var i = 0; i < m.length; i++){
		if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === $(".single.active").text()) || (m.models[i].get('author') === $(".single.active").text() && m.models[i].get('receiver') === $("#userName").text())) {
			p.add(m.models[i]);
		}
	}   

	var timerAddNewUsers = setInterval(function(){
		list = userManager.getUsersCollection();
	    if(list.length !== u.length){
	    	for(var i = u.length; i < list.length; i++){
	    		u.add(list[i]);
	    	}
	    }
	    for(var i = 0; i < list.length; i++){
			for (var j = 0; j < u.length; j++) {
				if(list[i].name === u.models[j].get('name') && list[i].status !== u.models[j].get('status')) {
					var date = new Date();
					var time = date.getHours() + ':' + date.getMinutes();
					var model = new UserModel();
					model.set({name: list[i].name, status: list[i].status, lastActiveDate: time});
					u.remove(u.models[j]);
					u.add(model, {at: j});
				}
			}
		}
	}, 1000);

	var timerAddNewMessages = setInterval(function(){
		listM = messageManager.getMessagesCollection();
		if(m.length<listM.length){
			console.log("here");
	    	for(var i = m.length; i < listM.length; i++){
	    		m.add(listM[i]);
	    		if ((listM[i].author === $(".single.active").text() && listM[i].receiver === userName) || (listM[i].author === userName && listM[i].receiver === $(".single.active").text()) && listM[i].deleted!='yes'){
						p.add(listM[i]);
				}
	    	}	
	    }
	}, 1000);


	new ContactsView({
		el: '#chatslist',
		collection: u
	}).render();

	new MessagesView({
		el: '#chat',
		collection: p
	}).render();
	$("#sendMessage").click(function(){
		var receiver = $('.single.active').text();
		if(receiver) {
			var date = new Date();
		  	var time = date.getHours() + ':' + date.getMinutes();
			// user.set({lastActiveDate: time});
			var text = $('#messageInput').val();
			var message = new MessageModel;
			message.set({author: userName, text: text, receiver: receiver, date: time, deleted: "no", color: "black"});
			messageManager.addNewMessage(message);
			$('#messageInput').val('');

			for(var i = 0; i < u.length; i++){
				if(u.models[i].get('name') === receiver) {
					var model = u.models[i];
					u.remove(u.models[i]);
					u.add(model, {at: 0});
				}
			}
			var receiver = document.querySelector('.single');
			receiver.className = 'single active';
		} else {
			alert("Please choose a chat");
		}
	});
	$("#smiley img").click(function(){
		var receiver = $('.single.active').text();
		 var image = $(this).attr("src").replace("image","")
		 $('this').attr('style','height:8px;width:8px');
		if(receiver) {
			var date = new Date();
		  	var time = date.getHours() + ':' + date.getMinutes();
			var text = "<img src='" + image + "'>";
			var message = new MessageModel;
			message.set({author: userName, text: text, receiver: receiver, date: time, deleted: "no", color: "black"});
			messageManager.addNewMessage(message);
			for(var i = 0; i < u.length; i++){
				if(u.models[i].get('name') === receiver) {
					var model = u.models[i];
					u.remove(u.models[i]);
					u.add(model, {at: 0});
				}
			}
			var receiver = document.querySelector('.single');
			receiver.className = 'single active';
		} else {
			alert("Please choose a chat");
		}
	});
	$("#link").click(function(){
		var receiver = $('.single.active').text();
		var link = $('#messageInput').val();
		$('#messageInput').val('');
		if(receiver) {
			var date = new Date();
		  	var time = date.getHours() + ':' + date.getMinutes();
			var text = '<a href="'+link+'">'+link+'</a>'
			var message = new MessageModel;
			message.set({author: userName, text: text, receiver: receiver, date: time, deleted: "no", color: "black"});
			messageManager.addNewMessage(message);
			for(var i = 0; i < u.length; i++){
				if(u.models[i].get('name') === receiver) {
					var model = u.models[i];
					u.remove(u.models[i]);
					u.add(model, {at: 0});
				}
			}
			var receiver = document.querySelector('.single');
			receiver.className = 'single active';
		} else {
			alert("Please choose a chat");
		}
	});
	$("#options").click(function(){
		var newUserStatus = userStatus;
		if(confirm("Would you like to change your status?")){
			var newUserStatus = prompt('Enter your new status (active, passive, bored etc)', userStatus);
			var status = document.getElementById('userStatus');
			status.innerHTML = newUserStatus;
			user.set({status: newUserStatus});
			userManager.changeUserModel(user);
		}
	});
	window.p = p;
	$("#deleteChat").click(function(){
		var receiver = $('.single.active').text();
		if(receiver){
			if(confirm("Are you sure you want to delete the message history?")) {
				for(var i = 0; i < m.length; i++){
					if((m.models[i].get('author') === receiver && m.models[i].get('receiver') === userName) || (m.models[i].get('receiver') === receiver && m.models[i].get('author') === userName)) {
						m.models[i].set('delete','yes');

					}
				}
				$('label').remove('#messageAuthor');
		    	$('label').remove('#messageText');
		    	$('label').remove('#messageDate');
		    	$('img').remove('.messageDelete');
				$('img').remove('.messageEdit');
				$('img').remove('.messageColor');
		  	}
		} else {
			alert("Please chose a chat");
		}
	});
	$("#searchMessage").click(function(){
		var searchedMessage = prompt('Enter the message you search.', 'message');
		var receiver = $('.single.active').text();
		var cnt = 0;
		for(var i = 0; i < m.length; i++){
			if((m.models[i].get('author') === receiver && m.models[i].get('receiver') === userName) || (m.models[i].get('receiver') === receiver && m.models[i].get('author') === userName)) {
				if(m.models[i].get('text') === searchedMessage){
					cnt++;
				}
			}
		}
		alert("There is " + cnt + " messages matched your search.");
	});
})