$('.waypoint').waypoint({
	handler: function(direction) {
			$(this.element).addClass('animated fadeInUp');
	},
	offset: '75%',
	triggerOnce: true
});
