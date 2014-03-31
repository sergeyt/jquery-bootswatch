if (Meteor.isClient) {
	Meteor.startup(function () {
		Meteor.bootswatch($('.themes'));
	});
}
