$(document).ready(function(){
	//localStorage.clear();
	var userName = prompt('What is your name?', 'name');
	var name = document.getElementById('userName');
	name.innerHTML = userName;

	var userStatus = prompt('Enter your status');
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
	    	for(var i = m.length; i < listM.length; i++){
	    		if(listM[i].deleted !== 'yes') {
	    			m.add(listM[i]);	
	    		}
	    		if ((listM[i].author === $(".single.active").text() && listM[i].receiver === userName) || (listM[i].author === userName && listM[i].receiver === $(".single.active").text()) && listM[i].deleted!='yes'){
						if(listM[i].deleted !== 'yes') {
	    					p.add(listM[i]); 	
	    				}

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
		 //$('this').attr('style','height:8px;width:8px');
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
			alert("Choose a chat");
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
			alert("Choose a chat");
		}
	});
	$("#deleteall").click(function(){
		l=new Messages();
		for(var i = 0; i < m.length; i++){
	    			if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === $(".single.active").text()) || (m.models[i].get('author') === $(".single.active").text() && m.models[i].get('receiver') === $("#userName").text())) {
	    				if(m.models[i].get('selected') === 'yes'){
	    					m.models[i].set('selected','');
	    					m.models[i].set('text', 'This message was deleted');
	    					$('label').remove('#messageAuthor');
					    	$('label').remove('#messageText');
					    	$('label').remove('#messageDate');
					    	$('img').remove('.messageDelete');
					    	$('img').remove('.messageEdit');
					    	$('img').remove('.messageColor');
					    	$('input').remove('#selected');
	    				}
	    			}
	    		} 
	    		for(var i = 0; i < m.length; i++){
	    			if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === $(".single.active").text()) || (m.models[i].get('author') === $(".single.active").text() && m.models[i].get('receiver') === $("#userName").text())) {
	    				if(m.models[i].get('deleted') !=='yes') {
	    						l.add(m.models[i]);   	
	    				}
	    			}
	    		}
	    		new MessagesView({
					el: '#chat',
					collection: l
				}).render(); 
	});

	$(".status").click(function(){
		$(".status").css('display', 'none');
	    $('#statusentry')
	        .val($('#userStatus').text())
	        .css('display', '')
	        .focus();
	});
	$("#statusentry").keyup(function(e){
		if(e.keyCode==13){
			var status = document.getElementById('userStatus');
			status.innerHTML = $("#statusentry").val();
			user.set({status: $("#statusentry").val()});
			userManager.changeUserModel(user);
			$("#statusentry").css('display', 'none');
			$(".status").css('display', '');
		}
	});
	$(".title").click(function(){
		$(".title").css('display', 'none');
	    $('#nameentry')
	        .val($('#userName').text())
	        .css('display', '')
	        .focus();
	});
	$("#nameentry").keyup(function(e){
		if(e.keyCode==13){
			var status = document.getElementById('userName');
			status.innerHTML = $("#nameentry").val();
			user.set({status: $("#nameentry").val()});
			userManager.changeUserModel(user);
			$("#nameentry").css('display', 'none');
			$(".title").css('display', '');
		}
	});
	window.p = p;
	$("#deleteChat").click(function(){
		var receiver = $('.single.active').text();
		if(receiver){
				for(var i = 0; i < m.length; i++){
					if((m.models[i].get('author') === receiver && m.models[i].get('receiver') === userName) || (m.models[i].get('receiver') === receiver && m.models[i].get('author') === userName)) {
						m.models[i].set('deleted','yes');

					}
				}
				$("#chat").html("");
		  	
		} else {
			alert("Choose a chat");
		}
	});
	$("#searchMessage").keyup(function(e){
		if(e.keyCode==13){
		l=new Messages();
		var searchedMessage = $("#searchMessage").val();
		var receiver = $('.single.active').text();
		var cnt = 0;
		for(var i = 0; i < m.length; i++){
			if((m.models[i].get('author') === receiver && m.models[i].get('receiver') === userName) || (m.models[i].get('receiver') === receiver && m.models[i].get('author') === userName)) {
				if(m.models[i].get('text') === searchedMessage){
					cnt++;
					l.add(m.models[i])
				}
			}
		}
		alert("There is " + cnt + " messages matched your search.");
		$("#chat").html("");
		new MessagesView({
					el: '#chat',
					collection: l
				}).render(); 
	}
	});

	var renderMessagesInSpan = function(author,text,date,color){
		var message= document.createElement('label');
		message.style.color=color;
		message.innerHTML=text;
  		return '<div style="margin-bottom:20px;"><input id="selected" type="checkbox" style="float:right;"></input><label id = "messageAuthor">'+author+'</label><label id = "messageDate">'+date+'</label>  </div>';
	};
	$("#colorall").click(function(){
		$("#chat").html("");
		var color=prompt('Enter your color name','red,blue,green,yellow');
		for(var i = 0; i < m.length; i++){
	    			if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === $(".single.active").text()) || (m.models[i].get('author') === $(".single.active").text() && m.models[i].get('receiver') === $("#userName").text())) {
	    				if(m.models[i].get('selected') ==='yes') {
	    						m.models[i].set('selected','');
	    						 $("#chat").append(renderMessagesInSpan(m.models[i].get('author'),m.models[i].get('text'),m.models[i].get('date'),color));
	    						 var message= document.createElement('label');
									message.style.color=color;
									message.style.float='left';
									message.innerHTML=m.models[i].get('text'); 	
									message.id="messageText";
									$("#chat").append(message);
									$("#chat").append('<img class="messageEdit" src="img/edit.png"><img class="messageDelete" src="img/trash.png"><img class="messageColor" src="img/color.png"> ')

	    				}
	    				else{
	    						$("#chat").append(renderMessagesInSpan(m.models[i].get('author'),m.models[i].get('text'),m.models[i].get('date'),color));
	    						 var message= document.createElement('label');
									message.style.color='black';
									message.style.float='left';
									message.innerHTML=m.models[i].get('text'); 	
									message.id="messageText";
									$("#chat").append(message);
									$("#chat").append('<img class="messageEdit" src="img/edit.png"><img class="messageDelete" src="img/trash.png"><img class="messageColor" src="img/color.png"> ')
	    				}
	    			}
	    }

	});
})