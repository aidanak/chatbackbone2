/*---------------------------messages---------------------------------*/
var MessageView = Marionette.View.extend({
	template: '#messageView',
	ui: {
		text: '#messageText',
		edit: '.messageEdit',
		delete: '.messageDelete',
		color:'.messageColor',
		select:'#selected'
	}, 
	events: {
		'click @ui.select':function(){
			for(var i = 0; i < m.length; i++){
	    			if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === $(".single.active").text()) || (m.models[i].get('author') === $(".single.active").text() && m.models[i].get('receiver') === $("#userName").text())) {
	    				if(m.models[i].get('text') === this.ui.text.text()){
	    					if(m.models[i].get('selected')==''){
	    						m.models[i].set('selected', 'yes');
	    					}
	    					else{
	    						m.models[i].set('selected', '');
	    					}
	    				}
	    			}
	    		} 
		},
		'click @ui.delete': function() {
			var l = new Messages();
				for(var i = 0; i < m.length; i++){
	    			if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === $(".single.active").text()) || (m.models[i].get('author') === $(".single.active").text() && m.models[i].get('receiver') === $("#userName").text())) {
	    				if(m.models[i].get('text') === this.ui.text.text()){
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
		},
		'click @ui.edit':function(){
				var l = new Messages();
					var newMessageText = prompt('Enter your message', this.ui.text.text());
					for(var i = 0; i < m.length; i++){
		    			if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === $(".single.active").text()) || (m.models[i].get('author') === $(".single.active").text() && m.models[i].get('receiver') === $("#userName").text())) {
		    				if(m.models[i].get('text') === this.ui.text.text()){
		    					var res = newMessageText.concat(" (edited)");
		    					m.models[i].set('text', res);
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
				
		},
		'click @ui.color':function(){
					var l = new Messages();
						var newMessageColor = prompt('Enter your color name','red,blue,green,yellow');
						for(var i = 0; i < m.length; i++){
			    			if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === $(".single.active").text()) || (m.models[i].get('author') === $(".single.active").text() && m.models[i].get('receiver') === $("#userName").text())) {
			    				if(m.models[i].get('text') === this.ui.text.text()){
			    					m.models[i].set('color', newMessageColor);
									this.ui.text.css("color", newMessageColor);
			    				}
			    			}
			    		} 
					
				new MessagesView({
					el: '#chat',
					collection: l
				}).render();
		}
			 
		
	}
});

var MessagesView = Marionette.CollectionView.extend({
	tagName: 'div',
	childView: MessageView
});

/*---------------------------contacts---------------------------------*/

var ContactView = Marionette.View.extend({
	template: '#contactView',
	ui: {
		div: '.friend',
		contact: '.single',
		delete: '#trash',
	},
	events: {
		'click @ui.contact': function(){
			items = document.querySelectorAll('.single.active');
			if (items.length) {
	        	items[0].className = 'single';
	    	}
			this.ui.contact.addClass('active');

			$('label').remove('#messageAuthor');
			$('label').remove('#messageText');
			$('label').remove('#messageDate');
			$('img').remove('.messageDelete');
			$('img').remove('.messageEdit');
			$('img').remove('.messageColor');
			$('input').remove('#selected');
	    	var k = new Messages();

	    	for(var i = 0; i < m.length; i++){
	    		if ((m.models[i].get('author') === $("#userName").text() && m.models[i].get('receiver') === this.ui.contact.text()) || (m.models[i].get('author') === this.ui.contact.text() && m.models[i].get('receiver') === $("#userName").text())) {
	    				if(m.models[i].get('deleted') !=='yes') {
	    					k.add(m.models[i]);   	
	    				}
	    		}
	    	}  
			new MessagesView({
				el: '#chat',
				collection: k
			}).render();	
		},
		'click @ui.delete': function(){
			if(confirm("Are you sure you want to delete conversation?")) {
				if($(".single.active").text()===this.ui.contact.text()){
					$('label').remove('#messageAuthor');
			    	$('label').remove('#messageText');
			    	$('label').remove('#messageDate');
			    	$('img').remove('.messageDelete');
					$('img').remove('.messageEdit');
					$('img').remove('.messageColor');
					$('input').remove('#selected');
				}
				this.ui.div.addClass('deleted');
				$('div').remove('.friend.deleted');
		  	}
		}
	}
});

var ContactsView = Marionette.CollectionView.extend({
	tagName: 'div',
	childView: ContactView

});
