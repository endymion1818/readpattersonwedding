$(document).ready(function($){

	$('#social-stream').dcSocialStream({
		feeds: {
			twitter: {
				id: '#%23anneandtim2016',
				url: 'http://anneandtimswedding.info/twitter.php',
				images:'large',
			},
			// instagram: {
			// 	id: '!3416107048',
			//     intro: 'Posted',
			// 	search: 'Search',
			//     out: 'intro,thumb,text,user,share,meta',
			// 	accessToken: '609153600.dc21d44.4fd18be42e6f4c69a90ef73737bdad02',
			// 	redirectUrl: 'http://anneandtimswedding.info/instagram.php',
			// 	clientId: 'dc21d445c4cb4e308314ce3f353f528a',
			// 	thumb: 'low_resolution',
			// }
		},
		controls: false,
		wall: true,
		iconPath: 'http://anneandtimswedding.info/img/socialwall/',
		imagePath: 'http://anneandtimswedding.info/img/socialwall/',
		rotate: false,
		days: 920,
	});
});