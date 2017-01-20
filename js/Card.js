// KLASA KANBAN CARD
function Card(id, name, idColumn) {
	var self = this;
	
	this.id = id;
	this.name = name || "Nie podano nazwy";
	this.idColumn = idColumn;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardEditBtn = $('<button class="btn-edit">Edytuj karteczkę</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardEditBtn.click(function(){
			self.editCard();
		});
		
		card.append(cardDeleteBtn);
		card.append(cardEditBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
	  var self = this;
	  $.ajax({
	  	url: baseUrl + "/card/" + self.id,
	  	method: "DELETE",
	  	success: function(){
	  		self.element.remove();
	  	}
	  });
	},
	editCard: function() {
	  var self = this;
	  var cardEdit = prompt("Nowa treść karty");
	  $.ajax({
	  	url: baseUrl + '/card/' + self.id,
	  	method: "PUT",
	  	data: {
			name: cardEdit,
			bootcamp_kanban_column_id: self.idColumn
		},
	  	success: function(response){
	  		self.element.children('.card-description').replaceWith('<p class="card-description">' + cardEdit + '</p>');
	  	}
	  });
	}
}