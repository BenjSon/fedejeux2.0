new Vue({
  el: '#salles',
  data: {
    fort: {affluence: 500, seuil: 600, capacité: 650},
    montaigne: {affluence: 500, seuil: 700, capacité: 750},
    chapiteau: {affluence: 500, seuil: 800, capacité: 850}
  },
  methods: {
    myStyle: function(salle){
      color='green';
      if (salle.affluence>=salle.capacité) color='red';
      else if(salle.affluence>=salle.seuil) color='orange';
      return {backgroundColor: color}
    }
  }
});
