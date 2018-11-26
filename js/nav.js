
new Vue({
	el: ".nav",
	data: {
		salle: "cool",
		ACCEUIL:false,
		ROOM:false,
		ADMIN:false,
		CONNEXION:false
	},

	methods: {
		toAdmin: function(){
			this.ACCEUIL=false;
			this.ROOM=false;
			this.ADMIN=true;
			this.CONNEXION=false
		},
		initiatNav: function(){
			this.ACCEUIL=false;
			this.ROOM=true;
			this.ADMIN=false;
			this.CONNEXION=false
		},
		toRooms: function(RoomId){
			this.ACCEUIL=false;
			this.ROOM=true;
			this.ADMIN=false;
			this.CONNEXION=false
			// this.SALLE= RoomId
		},
		toDeconnect: function(){
			this.ACCEUIL=false;
			this.ROOM=false;
			this.ADMIN=false;
			this.CONNEXION=true
		},
		toAcceuil: function(){
			this.ACCEUIL=true;
			this.ROOM=false;
			this.ADMIN=false;
			this.CONNEXION=false
		}
	}
});
new Vue({
	el: '#rooms',
	data: {
		ROOM:true,
		title:  "salle",
		nombreNow: "18",
		nombreTot: "110",
		max: "700",
		alerte: "500",
		salle: "cool"
	}
})

