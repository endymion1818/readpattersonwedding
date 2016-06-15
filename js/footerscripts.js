$('.responsiveIframeEmbed').click(function () {
    $('.responsiveIframeEmbed iframe').css("pointer-events", "auto");
});
/*
 * DC jQuery Social Stream
 * Copyright (c) 2013 Design Chemical
 * http://www.designchemical.com/blog/index.php/premium-jquery-plugins/jquery-social-stream-plugin/
 * Version 1.5.15 (2-12-2015)
 *
 */
 
(function($){

	SocialStreamObject = function(el, options) {
		this.create(el, options);
	};
	
	$.extend(SocialStreamObject.prototype, {
		
		version   : '1.5.15',
		
		create: function(el, options) {
		
			this.defaults = {
				feeds: {
					facebook: {
						id: '',
						intro: 'Posted',
						out: 'intro,thumb,title,text,user,share',
						text: 'content',
						comments: 3,
						image_width: 4, //3 = 600 4 = 480 5 = 320 6 = 180,
						url: 'facebook.php',
						feed: 'feed', // feed, posts
						icon: 'facebook.png'
					},
					twitter: {
						id: '',
						intro: 'Tweeted',
						search: 'Tweeted',
						out: 'intro,thumb,text,share',
						retweets: false,
						replies: false,
						images: '', // large w: 786 h: 346, thumb w: 150 h: 150, medium w: 600 h: 264, small w: 340 h 150
						url: 'twitter.php',
						icon: 'twitter.png'
					},
					google: {
						id: '',
						intro: 'Shared',
						out: 'intro,thumb,title,text,share',
						api_key: 'AIzaSyAWNgUpUj_W26tP3yev5Ysr4Zb53OIPgR4',
						image_height: 75,
						image_width: 75,
						shares: true,
						icon: 'google.png'
					},
					youtube: {
						id: '',
						intro: 'Uploaded',
						search: 'Search',
						out: 'intro,thumb,title,text,user,share',
						text: 0,
						api_key: 'AIzaSyB1zptnRspzltRVLGQJMBCH2yYujYp7ytI',
						thumb: 'medium', //default 120 x 90, medium 320 x 180, high 480 x 360, standard 640 x 480
						icon: 'youtube.png'
					},
					flickr: {
						id: '',
						intro: 'Uploaded',
						out: 'intro,thumb,title,text,share',
						lang: 'en-us',
						icon: 'flickr.png'
					},
					delicious: {
						id: '',
						intro: 'Bookmarked',
						out: 'intro,thumb,title,text,user,share',
						icon: 'delicious.png'
					},
					pinterest: {
						id: '',
						intro: 'Pinned',
						out: 'intro,thumb,text,user,share',
						url: 'rss.php',
						icon: 'pinterest.png'
					},
					rss: {
						id: '',
						intro: 'Posted',
						out: 'intro,title,text,user,share',
						url: 'rss.php',
						text: 'contentSnippet',
						icon: 'rss.png'
					},
					lastfm: {
						id: '',
						intro: 'Listened to,Loved,Replied',
						out: 'intro,thumb,title,text,user,share',
						feed: 'recenttracks,lovedtracks,replytracker',
						icon: 'lastfm.png'
					},
					dribbble: {
						id: '',
						intro: 'Posted,Liked',
						out: 'intro,thumb,title,text,user,share',
						feed: 'shots,likes',
						icon: 'dribbble.png'
					},
					vimeo: {
						id: '',
						intro: 'Liked,Video,Appeared In,Video,Album,Channel,Group',
						out: 'intro,thumb,title,text,user,share',
						feed: 'likes,videos,appears_in,all_videos,albums,channels,groups',
						thumb: 'medium',
						stats: true,
						icon: 'vimeo.png'
					},
					stumbleupon: {
						id: '',
						intro: 'Shared,Reviewed',
						out: 'intro,thumb,title,text,user,share',
						feed: 'favorites,reviews',
						icon: 'stumbleupon.png'
					},
					deviantart: {
						id: '',
						intro: 'Deviation',
						out: 'intro,thumb,title,text,user,share',
						icon: 'deviantart.png'
					},
					tumblr: {
						id: '',
						intro: 'Posted',
						out: 'intro,title,text,user,share',
						thumb: 100,
						video: 250,
						icon: 'tumblr.png'
					},
					instagram: {
						id: '',
					    intro: 'Posted',
						search: 'Search',
					    out: 'intro,thumb,text,user,share,meta',
						accessToken: '',
						redirectUrl: '',
						clientId: '',
						thumb: 'low_resolution',
					    comments: 3,
						likes: 8,
						icon: 'instagram.png'
					}
				},
				remove: '',
				twitterId: '',
				days: 5,
				limit: 10,
				max: 'days',
				external: true,
				speed: 600,
				height: 550,
				wall: false,
				centre: false,
				order: 'date',
				filter: true,
				controls: true,
				rotate: {
					direction: 'up',
					delay: 8000
				},
				transition: '0.8s',
				cache: true,
				container: 'dcsns',
				cstream: 'stream',
				content: 'dcsns-content',
				iconPath: 'images/dcsns-dark/',
				imagePath: 'images/dcsns-dark/',
				debug: false
			};
			
			this.o = {}, this.timer_on = 0, this.id = 'dcsns-'+$(el).index(), this.timerId = '', this.o = $.extend(true,this.defaults,options), opt = this.o, $load = $('<div class="dcsns-loading">creating stream ...</div>');
			
			$(el).addClass(this.o.container).append('<div class="'+this.o.content+'"><ul class="'+this.o.cstream+'"></ul></div>');
			
			var $c = $('.'+this.o.content,el), $a = $('.'+this.o.cstream,el), $l = $('li',$a);

			if(opt.height > 0 && opt.wall == false){
				$c.css({height:opt.height+'px'});
			}

			if(this.o.filter == true || this.o.controls == true){
				var x = '<div class="dcsns-toolbar">';
				if(this.o.filter == true){
					var fclass = this.o.center == true ? 'option-set filter dc-center' : 'option-set filter';
					x += '<ul id="dcsns-filter" class="' + fclass + '">';
					x += this.o.wall == true ? '<li><a href="#filter" data-group="dc-filter"  data-filter="*" class="selected link-all">all</a></li>' : '' ;
					var $f = $('.filter',el);
					$.each(opt.feeds, function(k,v){
						x += v.id != '' ? '<li class="active f-'+k+'"><a href="#filter" rel="'+k+'" data-group="dc-filter" data-filter=".dcsns-'+k+'"><img src="'+opt.imagePath+opt.feeds[k].icon+'" alt="" /></a></li>' : '' ;
					});
					x += '</ul>';
				}
				if(this.o.controls == true && opt.wall == false){
					var play = this.o.rotate.delay <= 0 ? '' : '<li><a href="#" class="play"></a></li>' ;
					x += '<div class="controls"><ul>'+play+'<li><a href="#" class="prev"></a></li><li><a href="#" class="next"></a></li></ul></div>';
				}
				x += '</div>';
				if(opt.wall == false){
					$(el).append(x);
				} else {
					$(el).before(x);
				}
			}
			
			if(this.o.wall == true){
				$('.dcsns-toolbar').append($load);
				var w = $("#dcsns-filter.dc-center").width()/2;
				$("#dcsns-filter.dc-center").css({'margin-left': -w + "px"}).fadeIn();
				this.createwall($a);
			} else {
				$c.append($load);
			}
			
			this.createstream(el,$a,0,opt.days);
			
			this.addevents(el,$a);
			
			if(this.o.rotate.delay > 0){
				this.rotate(el);
			}
			
			$load.remove();
		},
		
		createstream: function(obj,s,f1,f2){
			$.each(opt.feeds, function(k,v){
				if(opt.feeds[k].id != ''){
					var txt = [];
					$.each(opt.feeds[k].intro.split(','), function(i,v){
						v = $.trim(v);
						txt.push(v);
					});
					$.each(opt.feeds[k].id.split(','), function(i,v){
						v = $.trim(v);
						if(opt.feeds[k].feed && v.split('#').length < 2){
							if(k == 'youtube' && v.split('/').length > 1) {
								getFeed(k,v,opt.iconPath,opt.feeds[k],obj,opt,f1,f2,'posted','',i);
							} else {
								$.each(opt.feeds[k].feed.split(','), function(i,feed){
									getFeed(k,v,opt.iconPath,opt.feeds[k],obj,opt,f1,f2,txt[i],feed,i);
								});
							}
						} else {
							intro = v.split('#').length < 2 ? opt.feeds[k].intro : opt.feeds[k].search ;
							getFeed(k,v,opt.iconPath,opt.feeds[k],obj,opt,f1,f2,intro,'',i);
						}
					});
				}
			});
		},
		
		createwall: function(obj){
				obj.isotope({
					itemSelector : 'li.dcsns-li',
					transitionDuration: opt.transition,
					getSortData : {
						postDate : function( itemElem ){
							return parseInt($(itemElem).attr('rel'),10);
						}
					},
					sortBy : 'postDate',
					masonry: {
						isFitWidth: opt.center
					}
				});
		},
		
		addevents: function(obj,$a){
			var self = this, speed = this.o.speed;
			var $container = $('.stream',obj), filters = {}
			$('.controls',obj).delegate('a','click',function(){
				var x = $(this).attr('class');
				switch(x)
				{
					case 'prev':
					self.pauseTimer();
					ticker($a,'prev',speed);
					break;
					case 'next':
					self.pauseTimer();
					ticker($a,'next',speed);
					break;
					case 'play':
					self.rotate(obj);
					$('.controls .play').removeClass('play').addClass('pause');
					break;
					case 'pause':
					self.pauseTimer();
					break;
				}
				return false;
			});
			$('.filter',obj).delegate('a','click',function(){
				if(opt.wall == false){
					var rel = $(this).attr('rel');
					if($(this).parent().hasClass('active')){
						$('.dcsns-'+rel,$a).slideUp().addClass('inactive');
						$(this).parent().animate({opacity: 0.3},400);
					} else {
						$('.dcsns-'+rel,$a).slideDown().removeClass('inactive');
						$(this).parent().animate({opacity: 1},400);
					}
					$(this).parent().toggleClass('active');
				}
				return false;
			});
			if(this.o.external){
				$a.delegate('a','click',function(){
					if(!$(this).parent().hasClass('section-share')){
						this.target = '_blank';
					}
				});
			}
		},
		rotate: function(a){
			var self = this, stream = $('.'+this.o.cstream,a), speed = this.o.speed, delay = this.o.rotate.delay, r = this.o.rotate.direction == 'up' ? 'prev' : 'next' ;
			this.timer_on = 1;
			$('.controls .play').removeClass('play').addClass('pause');
			this.timerId = setTimeout(function(){
				ticker(stream,r,speed);
				self.rotate(a);
			}, delay);
		},
		pauseTimer: function(){
			clearTimeout(this.timerId);
			this.timer_on = 0;
			$('.controls .pause').removeClass('pause').addClass('play');
		}
	});
	
	$.fn.dcSocialStream = function(options, callback){
		var d = {};
		this.each(function(){
			var s = $(this);
			d = s.data("socialtabs");
			if (!d){
				d = new SocialStreamObject(this, options, callback);
				s.data("socialtabs", d);
			}
		});
		return d;
	};
	
	function getFeed(type,id,path,o,obj,opt,f1,f2,intro,feed,fn){
	
		var stream = $('.stream',obj), list = [],d = '', px = 300, c = [],data, href, url, n = opt.limit, txt = [], src;
		frl = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+n+'&callback=?&q=';
		
		switch (type) {
			
			case 'facebook':
			var cp = id.split('/');
			var curl = o.url.replace(/\&#038;/gi, "&");
			url = url = cp.length > 1 ? curl + '?id='+cp[1]+'&limit='+n+'&feed=photos' : curl + '?id='+id+'&limit='+n+'&feed='+o.feed;
			break;
			
			case 'twitter':
			var curl = o.url.replace(/\&#038;/gi, "&");
			var cp = id.split('/'), cq = id.split('#'), cu = o.url.split('?'), replies = o.replies == true ? '&exclude_replies=false' : '&exclude_replies=true' ;
			var param = '&include_entities=true&include_rts='+o.retweets+replies;
			url1 = cu.length > 1 ? curl + '&' : curl + '?';
			url = cp.length > 1 ? url1 + 'url=list&list_id='+cp[1]+'&per_page='+n+param : url1 + 'url=timeline&screen_name='+id+'&count='+n+param;
			if(cq.length > 1){
				var rts = o.retweets == false ? '+exclude:retweets' : '' ;
				url = url1 + 'url=search&q='+cq[1]+'&count='+n;
			}
			break;

			case 'google': 
			n = n > 100 ? 100 : n ;
			href = 'https://plus.google.com/'+id;
			url = 'https://www.googleapis.com/plus/v1/people/'+id+'/activities/public';
			data = {key: o.api_key, maxResults: n, prettyprint: false, fields: "items(id,kind,object(attachments(displayName,fullImage,id,image,objectType,url),id,objectType,plusoners,replies,resharers,url),published,title,url,verb)"};
			break;

			case 'youtube': 
			n = n > 50 ? 50 : n ;
			var cp = id.split('/'), cq = decodeURIComponent(id).split('#'), cc = id.split('!');
			if(cq.length > 1){
				url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + o.api_key + '&pageToken=&order=date&maxResults=' + n + '&q=' + cq[1];
				href = 'https://www.youtube.com/results?search_query=' + cq[1];
			} else {
				if(cc.length > 1){
					id = cc[1];
					id = 'UU' + cc[1].substring(2);
					href = 'https://www.youtube.com/channel/UC' + id.substring(2);
				} else {
					id = cp.length > 1 ? cp[1] : id ;
					if(id.substr(0,2) != 'UU'){
						if(id.substr(0,2) != 'UC'){
							// is playlist ID
							href = 'https://www.youtube.com/playlist?list=' + id;
						} else {
							// is channel ID
							href = 'https://www.youtube.com/channel/' + id;
							id = 'UU' + id.substring(2);
						}
					} else {
						// is list ID
						href = 'https://www.youtube.com/channel/UC' + id.substring(2);
					}
				}
				url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=' + id + '&key=' + o.api_key + '&pageToken=&maxResults=' + n;
			}
			break;
			
			case 'flickr':
			var cq = id.split('/'), fd = cq.length > 1 ? 'groups_pool' : 'photos_public' ;
			id = cq.length > 1 ? cq[1] : id ;
			href = 'https://www.flickr.com/photos/'+id;
			url = 'https://api.flickr.com/services/feeds/'+fd+'.gne?id='+id+'&lang='+o.lang+'&format=json&jsoncallback=?';
			break;
			
			case 'delicious':
			href = 'https://www.delicious.com/'+id;
			url = 'http://feeds.delicious.com/v2/json/'+id;
			break;
			
			case 'pinterest':
			var cp = id.split('/');
			url = 'https://www.pinterest.com/'+id;
			var curl = o.url.replace(/\&#038;/gi, "&");
			href = 'http://www.pinterest.com/'+id;
			url = cp.length > 1 ? curl + '?id='+id+'&limit='+n+'&feed=board&type='+type : curl + '?id='+id+'&limit='+n+'&feed=user&type='+type;
			break;

			case 'rss':
			href = id;
			var cp = id.split('://');
			var curl = o.url.replace(/\&#038;/gi, "&");
			url = curl + '?id='+encodeURIComponent(cp[1])+'&limit='+n+'&type='+type;
			break;
			
			case 'lastfm':
			href = 'https://www.last.fm/user/'+id;
			var ver = feed == 'lovedtracks' ? '2.0' : '1.0' ;
			url = frl + encodeURIComponent('https://ws.audioscrobbler.com/'+ver+'/user/'+id+'/'+feed+'.rss');
			break;
			
			case 'dribbble':
			href = 'https://www.dribbble.com/'+id;
			url = feed == 'likes' ? 'http://api.dribbble.com/players/'+id+'/shots/likes' : 'http://api.dribbble.com/players/'+id+'/shots' ;
			break;
			
			case 'vimeo':
			href = 'https://www.vimeo.com/'+id;
			url = 'https://vimeo.com/api/v2/'+id+'/'+feed+'.json';
			break;
			
			case 'stumbleupon':
			href = 'https://www.stumbleupon.com/stumbler/'+id;
			url = frl + encodeURIComponent('http://rss.stumbleupon.com/user/'+id+'/'+feed);
			break;
			
			case 'deviantart':
			href = 'https://'+id+'.deviantart.com';
			url = frl + encodeURIComponent('https://backend.deviantart.com/rss.xml?type=deviation&q=by%3A'+id+'+sort%3Atime+meta%3Aall');
			break;
			
			case 'tumblr':
			href = 'http://'+id+'.tumblr.com';
			url = 'http://'+id+'.tumblr.com/api/read/json?callback=?&num='+n;
			break;
			
			case 'instagram':
			href = '#';
			url = 'https://api.instagram.com/v1';
			var cp = id.substr(0,1), cq = id.split(cp), url1 = cq[1], qs = '', ts = 0;
			switch(cp)
			{
				case '?':
				var p = cq[1].split('/');
				qs = '&lat='+p[0]+'&lng='+p[1]+'&distance='+p[2];
				url += '/media/search';
				break;
				case '#':
				url += '/tags/'+url1+'/media/recent';
				ts = 1;
				break;
				case '!':
				url += '/users/'+url1+'/media/recent';
				break;
				case '@':
				url += '/locations/'+url1+'/media/recent';
				break;
			}
			if(o.accessToken == '' && ts == 0){
				if (location.hash) {
					o.accessToken = location.hash.split('=')[1] ;
				} else {
					location.href="https://instagram.com/oauth/authorize/?client_id="+o.clientId+"&redirect_uri="+o.redirectUrl+"&response_type=token"; 
				}
			}
			url += '?access_token='+o.accessToken+'&client_id='+o.clientId+'&count='+n+qs;
			break;
		}
		var dataType = type == 'twitter' || type == 'facebook' || type == 'rss' || type == 'pinterest' ? 'json' : 'jsonp';
		jQuery.ajax({
			url: url,
			data: data,
			cache: opt.cache,
			dataType: dataType,
			success: function(a){
				var error = '';
				switch(type)
				{
					case 'facebook':
						if(cp.length > 1){
							a = a.data;
						} else {
							a = a.responseData.feed.entries ? a.responseData.feed.entries : '';
						}
					break;
					case 'google':
						error = a.error ? a.error : '' ;
						a = a.items;
					break;
					case 'flickr':
						a = a.items;
					break;
					case 'instagram':
						a = a.data;
					break;
					case 'pinterest':
						a = a.item;
					break;
					case 'twitter':
						error = a.errors ? a.errors : '' ;
						if(cq.length > 1){a = a.statuses} ;
					break;
					case 'youtube':
						a = a.items;
					break;
					case 'dribbble':
						a = a.shots;
					break;
					case 'tumblr':
						a = a.posts;
					break;
					case 'delicious':
					break;
					case 'vimeo':
					break;
					case 'rss':
						a = a.item;
					break;
					default:
						if(a.responseStatus == 200){
							a = a.responseData.feed.entries;
						} else {
							error = a.responseDetails;
						}
					break;
				}
				if(error == ''){
					$.each(a, function(i,item){
						if(i < n){
							var html = [], q = item.link, u='<a href="'+href+'">'+id+'</a>', w='', x = '<a href="'+q+'">'+item.title+'</a>', y='', z='', zz='', m='', d = item.publishedDate, sq = q, st = item.title, s = '';
							switch(type)
							{
								case 'facebook':
								if(cp.length > 1){
									id = item.from.id;
									var d = new Date();
									d = d.setFbAlbum(item.created_time);
									var set = parseQ(item.link);
									st = cp[0] != '' ? cp[0] : item.from.name ;
									u = '<a href="'+item.link+'">'+st+'</a>';
									x = '';
									if(item.images[o.image_width] == undefined){o.image_width = 0;}
									z = '<a href="'+item.link+'"><img src="'+item.images[o.image_width].source+'" alt="" /></a>';
									if(item.name){
										z +='<p>'+item.name+'</p>';
									}
									if(o.comments > 0 && item.comments){
										i = 0;
										m += '<span class="meta"><span class="comments">comments</span></span>';
										$.each(item.comments.data, function(i,cmt){
											if(o.comments > i){
												m += '<span class="meta item-comments"><a href="http://facebook.com/'+cmt.from.id+'">'+cmt.from.name+'</a>'+cmt.message+'</span>';
												i++;
											} else {
												return false;
											}
										});
									}
									z += m;
								} else {
									x = '';
									thumb = item.thumb;
									if(thumb != null)
									{
										if(thumb.indexOf('safe_image.php') != -1) {
											thumb = unescape(thumb.match(/url=([^&]+)/)[1]);
										} 
										y = '<a href="'+q+'"><img src="'+thumb+'" alt="" /></a>';
									}
									u = '<a href="'+item.pageLink+'">'+item.pageName+'</a>';
									href = item.pageLink;
									z = linkify(item.content,type);
									st = item.content;
								}
								break;
								
								case 'twitter':
								d = parseTwitterDate(item.created_at);
								var un = item.user.screen_name, ua = item.user.profile_image_url_https ;
								href = 'https://www.twitter.com/'+un;
								q = href;
								y = '<a href="'+q+'" class="thumb"><img src="'+ua+'" alt="" /></a>' ;
								z = '<span class="twitter-user"><a href="https://www.twitter.com/'+un+'"><strong>'+item.user.name+' </strong>@'+un+'</a></span>';
								z += linkify(item.text,type);
								if(o.images != '' && item.entities.media){
									$.each(item.entities.media, function(i,media){
										z += '<a href="'+media.media_url_https+'"><img src="'+media.media_url_https+':'+o.images+'" alt="" /></a>';
									});
								}
								sq = item.id_str;
								break;
								
								case 'delicious':
								var d = new Date();
								d = d.setRFC3339(item.dt);
								x = '<a href="'+item.u+'">'+item.d+'</a>';
								q = item.u;
								z = item.n;
								sq = item.u;
								st = item.d;
								break;
								
								case 'rss':
								z = item.text;
								break;

								case 'pinterest':
								var src = $('img',item.description).attr('src');
								y = src ? '<a href="'+q+'"><img src="'+src+'" alt="" /></a>' : '' ;
								z = item.text;
								st = z;
								break;
								
								case 'youtube':
								x =	item.snippet.title;
								var vidId = cq.length > 1 ? item.id.videoId : item.snippet.resourceId.videoId ;
								var ytthumb = o.thumb == '0' ? 'medium' : o.thumb ;
								q = 'https://www.youtube.com/watch?v='+vidId+'&feature=youtube_gdata';
								sq = q;
								if(item.snippet.thumbnails){
									y = '<a href="'+q+'" title="'+item.snippet.title+'"><img src="'+item.snippet.thumbnails[ytthumb].url+'" alt="" /></a>';
								} else {
									opt.remove += ','+q;
								}
								z = o.text > 0 ? cut(item.snippet.description,o.text) : item.snippet.description ;
								d = item.snippet.publishedAt;
								var profile = 'Youtube';
								if(cq.length > 1){
									profile = decodeURIComponent(id);
								} else if(cp.length > 1){
									profile = cp[0];
								} else if(cc.length > 1){
									profile = cc[0];
								}
								u='<a href="'+href+'">'+profile+'</a>';
								st = item.snippet.title;
								break;
								
								case 'flickr':
								d = parseTwitterDate(item.published);
								x =	item.title;
								y = '<a href="' + q + '" title="'+ item.title +'"><img src="' + item.media.m + '" alt="" /></a>';
								break;
								
								case 'lastfm':
								q = item.content;
								break;
								
								case 'dribbble':
								q = item.url;
								d = item.created_at;
								x = '<a href="'+q+'">'+item.title+'</a>';
								y = '<a href="'+q+'"><img src="' + item.image_teaser_url + '" alt="' + item.title + '" /></a>';
								z = '<span class="meta"><span class="views">'+num(item.views_count)+'</span><span class="likes">'+num(item.likes_count)+'</span><span class="comments">'+num(item.comments_count)+'</span></span>';
								sq = item.url;
								break;
								
								case 'instagram':
								d = parseInt(item.created_time * 1000,10);
								x = '';
								y = '<a href="'+ q +'"><img src="' + item.images[o.thumb].url + '" alt="" /></a>';
								z = item.caption !=null ? htmlEncode(item.caption.text) : '' ;
								if(item.comments.count > 0 && o.comments > 0){
									i = 0;
									m += '<span class="meta"><span class="comments">'+num(item.comments.count)+' comments</span></span>';
									$.each(item.comments.data, function(i,cmt){
										if(o.comments > i){
											m += '<span class="meta item-comments"><img src="'+cmt.from.profile_picture+'" />';
											m += cmt.from.full_name+' - '+cmt.text+'</span>';
											i++;
										} else {
											return false;
										}
									});
								}
								if(item.likes.count > 0 && o.likes > 0){
									i = 0;
									m += '<span class="meta"><span class="likes">'+num(item.likes.count)+' likes</span></span>';
									m += '<span class="meta item-likes">';
									$.each(item.likes.data, function(i,lk){
										if(o.likes > i){
											m += '<img src="'+lk.profile_picture+'" />';
											i++;
										} else {
											return false;
										}
									});
									m += '</span>';
								}
								u = '<a href="'+q+'">'+item.user.username+'</a>';
								href = 'https://instagram.com/'+item.user.username;
								st = item.caption !=null ? item.caption.text : '' ;
								break;

								case 'vimeo':
								f = feed, at = item.name, tx = item.description, q = item.url;
								if(f == 'channels'){
									y = item.logo != '' ? '<a href="'+q+'" class="logo"><img src="'+item.logo+'" alt="" width="'+px+'" /></a>' : '' ;
								} else if(f == 'groups'){
									y = '<a href="'+q+'"><img src="'+item.thumbnail+'" alt="" /></a>';
								} else {
									var thumb = 'thumbnail_'+o.thumb, at = item.title, tx = f != 'albums' ? item.duration+' secs' : item.description ;
									y = '<a href="'+item.url+'" title="'+at+'"><img src="'+item[thumb]+'" alt="" /></a>';
								}
								x = '<a href="'+q+'">'+at+'</a>';
								z = tx;
								if(o.stats == true){
									var m = '';
									m += f == 'albums' || f == 'channels' || f == 'groups' ? '<span class="videos">'+num(item.total_videos)+'</span>' : '' ;
									if(f == 'channels'){
										m += '<span class="users">'+num(item.total_subscribers)+'</span>';
									} else if(f == 'groups'){
										m += '<span class="users">'+num(item.total_members)+'</span>';
									} else if(f != 'albums'){
										m += '<span class="likes">'+num(item.stats_number_of_likes)+'</span><span class="views">'+num(item.stats_number_of_plays)+'</span><span class="comments">'+num(item.stats_number_of_comments)+'</span>';
									}
									z += '<span class="meta">'+m+'</span>';
								}
								var dt = item.upload_date;
								if(f == 'likes'){
									dt = item.liked_on;
								} else if(f == 'albums' || f == 'channels' || f == 'groups'){
									dt = item.created_on;
								}
								var d = new Date();
								d = d.setVimeo(dt);
								sq = q;
								st = at;
								break;	
								
								case 'stumbleupon':
								var src = $('img',item.content).attr('src');
								y = src != '' && feed == 'favorites' ? '<a href="'+q+'"><img src="'+src+'" alt="" /></a>' : '' ;
								z = item.contentSnippet;
								break;
								
								case 'deviantart':
								var src = $('img',item.content).attr('src');
								y = src ? '<a href="'+q+'"><img src="'+src+'" alt="" /></a>' : '' ;
								z = item.contentSnippet;
								break;
								
								case 'tumblr':
								q = item['url-with-slug'];
								d = item.date;
								x = '<a href="'+q+'">';
								switch(item.type)
								{
									case 'photo':
									x = item['photo-caption'];
									z = '<a href="'+q+'"><img src="'+item['photo-url-'+o.thumb]+'" alt="" /></a>';
									st = x;
									break;
									case 'video':
									x += item['video-caption'];
									z = o.video != '400' ? item['video-player-'+o.video] : item['video-player'] ;
									st = x;
									break;
									case 'regular':
									x += item['regular-title'];
									z = item['regular-body'];
									st = x;
									break;
									case 'quote':
									x += item['quote-source'];
									z = item['quote-text'];
									st = x;
									break;
									case 'audio':
									x = item['id3-artist'] ? '<a href="'+q+'">'+item['id3-artist']+' - '+item['id3-album']+'</a>' : '' ;
									x += item['id3-title'] ? '<a href="'+q+'" class="track">'+item['id3-title']+'</a>' : '' ;
									z = item['audio-caption'];
									z += item['audio-player'];
									st = item['id3-artist']+' - '+item['id3-album']+' - '+item['id3-title'];
									break;
									case 'conversation':
									x += item['conversation-title'];
									z = item['conversation-text'];
									st = x;
									break;
									case 'link':
									var ltxt = item['link-text'].replace(/:/g, '').replace(/\?/g, '').replace(/\!/g, '').replace(/\./g, '').replace(/\'/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\@/g, '').replace(/\#/g, '').replace(/\|/g, '').replace(/\&/g, '');
									x = '<a href="'+item['link-url']+'">'+ltxt+'</a>';
									z = item['link-description'];
									st = ltxt;
									break;
								}
								x += item.type != 'photo' || item.type != 'audio' ? '</a>' : '' ;
								st = stripHtml(st);
								sq = q;
								break;
								
								case 'google':
								var g = item.object.replies ? num(item.object.replies.totalItems) : 0, m = item.object.plusoners ? num(item.object.plusoners.totalItems) : 0, p = item.object.resharers ? num(item.object.resharers.totalItems) : 0, dl;
								var d = new Date();
								d = d.setRFC3339(item.published);
								dl = {src: "",imgLink: "",useLink: "",useTitle: ""};
								var k = item.object.attachments;
								if (k) if (k.length){
									for (var l = 0; l < k.length; l++) {
										var h = k[l];
										if (h.image) {
											dl.src = h.image.url;
											dl.imgLink = h.url;
											if (h.fullImage) {
												dl.w = h.fullImage.width || 0;
												dl.h = h.fullImage.height || 0
											}
										}
										if (h.objectType == "article") dl.useLink = h.url;
										if (h.displayName) dl.useTitle = h.displayName
									}
									if (!dl.useLink) dl.useLink = dl.imgLink;
									var img_h = o.image_height ? o.image_height : 75 ;
									var img_w = o.image_width ? o.image_width : 75 ;
									if (dl.src.indexOf("resize_h") >= 0) dl.src = dl.w >= dl.h ? dl.src.replace(/resize_h=\d+/i, "resize_h=" + img_h) : dl.src.replace(/resize_h=\d+/i, "resize_w=" + img_w)
								}
								dl = dl;
								q = dl.useLink;
								y = (dl.src ? (dl.useLink ? '<a href="' + dl.useLink + '">' : '')+'<img src="' + dl.src + '" />'+(dl.useLink ? '</a>' : '') : '');
								var t1 = px/(dl.w/dl.h) < px/3 ? ' class="clear"' : '' ;
								x = (dl.useLink ? '<a href="' + dl.useLink + '"'+t1+'>' : '')+(item.title ? item.title : dl.useTitle)+(dl.useLink ? '</a>' : '');
								if(o.shares){
									z = '<span class="meta"><span class="plusones">+1s '+m+'</span><span class="shares">'+p+'</span><span class="comments">'+g+'</span></span>';
								}
								sq = q;
								st = dl.useTitle;
								break;
							}
							
							icon = '<a href="'+href+'"><img src="'+path+o.icon+'" alt="" class="icon" /></a>';

							if(type == 'twitter'){
								var intent = 'https://twitter.com/intent/';
								s = '<a href="'+intent+'tweet?in_reply_to='+sq+'&via='+opt.twitterId+'" class="share-reply"></a>';
								s += '<a href="'+intent+'retweet?tweet_id='+sq+'&via='+opt.twitterId+'" class="share-retweet"></a>';
								s += '<a href="'+intent+'favorite?tweet_id='+sq+'" class="share-favorite"></a>';
								s += share('','https://twitter.com/'+un+'/status/'+sq,opt.twitterId);
							} else {
								s = share(st,sq,opt.twitterId);
							}

							$.each(o.out.split(','), function(i,v){
								
								zz += v != 'intro' ? '<span class="section-'+v+'">' : '' ;
								switch(v)
								{
									case 'intro':
									if(type == 'twitter'){
										zintro = '<span class="section-'+v+'"><a href="'+q+'">'+decodeURIComponent(intro)+'</a> <span><a href="https://twitter.com/'+un+'/status/'+item.id_str+'">'+nicetime(new Date(d).getTime(),0)+'</a></span></span>';
									} else {
										zintro = '<span class="section-'+v+'"><a href="'+q+'">'+decodeURIComponent(intro)+'</a> <span>'+nicetime(new Date(d).getTime(),0)+'</span></span>';
									}
									break;
									case 'title':
									zz += x;
									break;
									case 'thumb':
									if(type == 'rss'){
										var src = item.description.indexOf("img") >= 0 ? $('img',item.description).attr('src') : '' ;
										y = src ? '<a href="'+q+'" class="thumb"><img src="'+src+'" alt="" /></a>' : '' ;
									}
									zz += y;
									break;
									case 'text':
									zz += z;
									break;
									case 'user':
									zz += u;
									break;
									case 'meta':
									zz += m;
									break;
									case 'share':
									zz += s;
									break;
								}
								zz += v != 'intro' ? '</span>' : '' ;
							});
							
							var df = type == 'instagram' ? nicetime(d,1) : nicetime(new Date(d).getTime(),1);
							var ob = df;
							switch(opt.order)
							{
								case 'random':
								ob = randomish(6);
								break;
								case 'none':
								ob = 1;
								break;
							}
							var out = '<li rel="'+ob+'" class="dcsns-li dcsns-'+type+' dcsns-feed-'+fn+'">'+w+'<div class="inner">'+zz+'<span class="clear"></span></div>'+zintro+icon+'</li>', str = decodeURIComponent(opt.remove), rem = q;
							if(type == 'twitter'){
								rem = 'https://twitter.com/'+un+'/status/'+item.id_str;
							}
							if( str.indexOf( rem ) !== -1 && rem != '' ){
								n = n + 1;
							} else {
								if(opt.max == 'days'){
									if(df <= f2 * 86400 && df >= f1 * 86400){
										list.push(out);
									} else if(df > f2 * 86400) {
										return false;
									}
								} else {
									list.push(out);
								}
							}
						}
					});
				} else if(opt.debug == true){
					list.push('<li class="dcsns-li dcsns-error">Error. '+error+'</li>');
				}
			},
			complete: function(){
				var $newItems = $(list.join(''));
				if(opt.wall == true){
					stream.isotope( 'insert', $newItems );	
					if(type == 'facebook' && cp.length < 2){
						$('img',stream).on('load', function(){ stream.isotope('layout'); });
					}
					if(type == 'pinterest'){
						$('li.dcsns-pinterest .section-thumb img',stream).css('opacity',0).show().fadeTo(800,1);
						$('img',stream).on('load', function(){ stream.isotope('layout'); });
					}
					if(type == 'rss'){
						$('li.dcsns-rss .section-thumb img',stream).css('opacity',0).show().fadeTo(800,1);
						$('img',stream).on('load', function(){ stream.isotope('layout'); });
					}
					if(type == 'twitter'){
						setTimeout(function(){
							stream.isotope('layout');
						},1000);
						$('img',stream).on('load', function(){ stream.isotope('layout'); });
					}
				} else {
					stream.append($newItems);
					sortstream(stream,'asc');
				}
				if(type == 'flickr' && cq.length > 1){
					flickrHrefLink(cq[1],$newItems);
				}
			}
			
		});
		return;
	}

	function linkify(text,type){
		text = text.replace(
			/((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
			function(url){
				var full_url = !url.match('^https?:\/\/') ? 'http://' + url : url ;
				return '<a href="' + full_url + '">' + url + '</a>';
			}
		);
		if(type == 'twitter'){
			text = text.replace(/(^|\s)@(\w+)/g, '$1@<a href="http://www.twitter.com/$2">$2</a>');
			text = text.replace(/(^|\s)#(\w+)/g, '$1#<a href="http://twitter.com/search/%23$2">$2</a>');
		} else if(type == 'facebook'){
			text = text.replace(/(^|\s)#(\w+)/g, '$1#<a href="http://facebook.com/hashtag/%23$2">$2</a>');
		}
		return text;
	}
	
	function cut(text,n){
		var short = text.substr(0, n);
		if (/^\S/.test(text.substr(n)))
		short = short.replace(/\s+\S*$/, "");
		return short;
	}
	
	function htmlEncode(v){
		return $('<div/>').text(v).html();
	}
	
	function stripHtml(v){
		var $html = $(v);
		return $html.text();
	}

	Date.prototype.setRFC3339 = function(dString){
	   var utcOffset, offsetSplitChar;
	   var offsetMultiplier = 1;
	   var dateTime = dString.split('T');
	   var date = dateTime[0].split('-');
	   var time = dateTime[1].split(':');
	   var offsetField = time[time.length - 1];
	   var offsetString;
	   offsetFieldIdentifier = offsetField.charAt(offsetField.length - 1);
	   if (offsetFieldIdentifier == 'Z') {
		  utcOffset = 0;
		  time[time.length - 1] = offsetField.substr(0, offsetField.length - 2);
	   } else {
		  if (offsetField[offsetField.length - 1].indexOf('+') != -1) {
			 offsetSplitChar = '+';
			 offsetMultiplier = 1;
		  } else {
			 offsetSplitChar = '-';
			 offsetMultiplier = -1;
		  }
		  offsetString = offsetField.split(offsetSplitChar);
		  time[time.length - 1] == offsetString[0];
		  offsetString = offsetString[1].split(':');
		  utcOffset = (offsetString[0] * 60) + offsetString[1];
		  utcOffset = utcOffset * 60 * 1000;
	   }
	   this.setTime(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) + (utcOffset * offsetMultiplier ));
	   return this;
	};
	
	Date.prototype.setFbAlbum = function(dString){
	   var utcOffset, offsetSplitChar = '+', offsetMultiplier = 1, dateTime = dString.split('T'), date = dateTime[0].split('-'), time = dateTime[1].split(':'), offsetField = time[time.length - 1], offsetString;
		  if (offsetField[offsetField.length - 1].indexOf('+') != -1) {
			 offsetSplitChar = '-';
			 offsetMultiplier = -1;
		  }
		  offsetTime = offsetField.split(offsetSplitChar);
		  utcOffset = parseInt((offsetTime[1]/100),10) * 60 * 1000;
	   this.setTime(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], offsetTime[0]) + (utcOffset * offsetMultiplier ));
	   return this;
	};
	
	Date.prototype.setVimeo = function(dString){
	   var utcOffset = 0, offsetSplitChar, offsetMultiplier = 1;
	   var dateTime = dString.split(' ');
	   var date = dateTime[0].split('-');
	   var time = dateTime[1].split(':');
	   this.setTime(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) + (utcOffset * offsetMultiplier ));
	   return this;
	};

	function parseTwitterDate(a){
		var out = !!navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.indexOf("MSIE")>= 0 ? a.replace(/(\+\S+) (.*)/, '$2 $1') : a ; 
		return out;
	}
	
	function nicetime(a,out){
        var d = Math.round((+new Date - a) / 1000), fuzzy = '', n = 'mins', d = d < 0 ? 0 : d ;
        if(out == 1) {
            return d;
        } else if(out == 0) {
            var chunks = new Array();
                    chunks[0] = [60 * 60 * 24 * 365 , 'year', 'years'];
                    chunks[1] = [60 * 60 * 24 * 30 , 'month', 'months'];
                    chunks[2] = [60 * 60 * 24 * 7, 'week', 'weeks'];
                    chunks[3] = [60 * 60 * 24 , 'day', 'days'];
                    chunks[4] = [60 * 60 , 'hr', 'hrs'];
                    chunks[5] = [60 , 'min', 'mins'];
                    var i = 0, j = chunks.length;
                    for (i = 0; i < j; i++) {
                        s = chunks[i][0];
                        if ((xj = Math.floor(d / s)) != 0)
                        {
                            n = xj == 1 ? chunks[i][1] : chunks[i][2] ;
                            break;
                        }
                    }
                    fuzzy += xj == 1 ? '1 '+n : xj+' '+n ;
                    if (i + 1 < j) {
                        s2 = chunks[i + 1][0];
                        if ( ((xj2 = Math.floor((d - (s * xj)) / s2)) != 0) )
                        {
                            n2 = (xj2 == 1) ? chunks[i + 1][1] : chunks[i + 1][2] ;
                            fuzzy += (xj2 == 1) ? ' + 1 '+n2 : ' + '+xj2+' '+n2 ;
                        }
                    }
					fuzzy += ' ago';
            return fuzzy;
            }
        }

		function num(a){
            var b = a;
            if (a > 999999) b = Math.floor(a / 1E6) + "M";
            else if (a > 9999) b = Math.floor(a / 1E3) + "K";
            else if (a > 999) b = Math.floor(a / 1E3) + "," + a % 1E3;
            return b
        }
		
		function parseQ(url){
			var v = [], hash, q = url.split('?')[1];
			if(q != undefined){
				q = q.split('&');
				for(var i = 0; i < q.length; i++){
					hash = q[i].split('=');
					v.push(hash[1]);
					v[hash[0]] = hash[1];
				}
			}
			return v;
		}
		
		function getImg(content){
			var imgArr = new Array(), reg = /<img .*?src=["\']([^ ^"^\']*)["\']/gi, check, image;
			while (check = reg.exec(content)){
				imgArr.push(check[1]);
			}
			if(imgArr.length > 0 && imgArr[0].indexOf('sndcdn.com') === -1){
				var image = imgArr[0];
				if(image.indexOf('instagram.com/profiles') !== -1) { image = imgArr[1]; }
				image = image.replace("_m.jpg", ".jpg");
				if(image.indexOf('fbcdn') == -1) {
					image = image.replace("_b.jpg", "_f.jpg");
					image = image.replace("_b.png", "_f.png");
				} else {
					if(image.indexOf('safe_image.php') == -1) {
						var id = image.split("_"), object_id = id[1];
						image = 'http://graph.facebook.com/'+object_id+'/picture?type=normal';
					}
				}
				image = image.replace("_s.jpg", "_b.jpg");
				image = image.replace("_m.png", ".png");
				image = image.replace("_s.png", "_b.png");
				image = image.replace(/\&amp;/g,'&');
				if(image.indexOf('safe_image.php') != -1){
					image = unescape(image.match(/url=([^&]+)/)[1]);
				}
				if(image.indexOf('app_full_proxy.php') != -1){
					image = unescape(image.match(/src=([^&]+)/)[1]);
				}
				if(this.prefix == 'https://'){
					var image_tmp = image.replace('http://', 'https://');
					image = image_tmp;
				}
			} else {
				return false
			}
			return image;
		}
		
		function sortstream(obj,d){
			var $l = $('li',obj);
			$l.sort(function(a, b){
				var keyA = parseInt($(a).attr('rel'),10), keyB = parseInt($(b).attr('rel'),10);
				if(d == 'asc'){
					return (keyA > keyB) ? 1 : -1;
				} else {
					return (keyA < keyB) ? 1 : -1;
				}
				return 0;
			});
			$.each($l, function(index, row){
				obj.append(row);
			});
			$('.dcsns-loading').slideUp().remove();
			return;
		}
		
		function randomish(l){
			var i = 0, out = '';
			while(i < l){
				out += Math.floor((Math.random()*10)+1)+'';
				i++;
			}
			return out;
		}
		
		function ticker(s,b,speed){
			var $a = $('li:last',s),$b = $('li:first',s),$gx,bh = $b.outerHeight(true);
			if($('li',s).not('.inactive').length > 2){
				if(b == 'next'){
					$gx = $a.clone().hide();
					$b.before($gx);
					$a.remove();
					if($a.hasClass('inactive')){
						ticker(s,b,speed);
					} else {
						$('.inner',$gx).css({opacity: 0});
						$gx.slideDown(speed,'linear',function(){
							$('.inner',this).animate({opacity: 1},speed);
						});
						return;
					}
				} else {
					$gx = $b.clone();
					if($b.hasClass('inactive')){
						$a.after($gx);
						$b.remove();
						ticker(s,b,speed);
					} else {
						$b.animate({marginTop: -bh+'px'},speed,'linear',function(){
							$a.after($gx);
							$b.remove();
						});
						$('.inner',$b).animate({opacity: 0},speed);
					}
				}
			}
		}

		function flickrHrefLink(id,obj){
			jQuery.ajax({
				url: 'http://api.flickr.com/services/feeds/groups_pool.gne?id='+id+'&format=json&jsoncallback=?',
				dataType: 'jsonp',
				success: function(a){
					$('.icon',obj).each(function(){
						$(this).parent().attr('href',a.link);
					});
				}
			});
		}
		
		function share(st,sq,twitterId){
			var s = '', sq = encodeURIComponent(sq), st = encodeURIComponent(st);
			s = '<a href="http://www.facebook.com/sharer.php?u='+sq+'&t='+st+'" class="share-facebook" target="_blank"></a>';
			s += '<a href="https://twitter.com/share?url='+sq+'&text='+st+'&via='+twitterId+'" class="share-twitter" target="_blank"></a>';
			s += '<a href="https://plus.google.com/share?url='+sq+'" class="share-google" target="_blank"></a>';
			s += '<a href="http://www.linkedin.com/shareArticle?mini=true&url='+sq+'&title='+st+'" class="share-linkedin" target="_blank"></a>';
			return s;
        }
})(jQuery);

jQuery(window).load(function(){
	jQuery.getScript("//platform.twitter.com/widgets.js", function(){});
	jQuery('.section-share a').click(function(){
		var u = jQuery(this).attr('href');
		window.open(u,'sharer','toolbar=0,status=0,width=626,height=436');
		return false;
	});
});
/*!
 * Isotope PACKAGED v2.0.0
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

(function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function n(e,i){t.fn[e]=function(n){if("string"==typeof n){for(var s=o.call(arguments,1),a=0,u=this.length;u>a;a++){var p=this[a],h=t.data(p,e);if(h)if(t.isFunction(h[n])&&"_"!==n.charAt(0)){var f=h[n].apply(h,s);if(void 0!==f)return f}else r("no such method '"+n+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+n+"'")}return this}return this.each(function(){var o=t.data(this,e);o?(o.option(n),o._init()):(o=new i(this,n),t.data(this,e,o))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),n(t,e)},t.bridget}}var o=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i(t.jQuery)})(window),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,o=function(){};i.addEventListener?o=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(o=function(t,i,o){t[i+o]=o.handleEvent?function(){var i=e(t);o.handleEvent.call(o,i)}:function(){var i=e(t);o.call(t,i)},t.attachEvent("on"+i,t[i+o])});var n=function(){};i.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(o){t[e+i]=void 0}});var r={bind:o,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(this),function(t){function e(t){"function"==typeof t&&(e.isReady?t():r.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==n.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var o=0,s=r.length;s>o;o++){var a=r[o];a()}}}function o(o){return o.bind(n,"DOMContentLoaded",i),o.bind(n,"readystatechange",i),o.bind(t,"load",i),e}var n=t.document,r=[];e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],o)):t.docReady=o(t.eventie)}(this),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var o=t.prototype,n=this,r=n.EventEmitter;o.getListeners=function(t){var e,i,o=this._getEvents();if(t instanceof RegExp){e={};for(i in o)o.hasOwnProperty(i)&&t.test(i)&&(e[i]=o[i])}else e=o[t]||(o[t]=[]);return e},o.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},o.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},o.addListener=function(t,i){var o,n=this.getListenersAsObject(t),r="object"==typeof i;for(o in n)n.hasOwnProperty(o)&&-1===e(n[o],i)&&n[o].push(r?i:{listener:i,once:!1});return this},o.on=i("addListener"),o.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},o.once=i("addOnceListener"),o.defineEvent=function(t){return this.getListeners(t),this},o.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},o.removeListener=function(t,i){var o,n,r=this.getListenersAsObject(t);for(n in r)r.hasOwnProperty(n)&&(o=e(r[n],i),-1!==o&&r[n].splice(o,1));return this},o.off=i("removeListener"),o.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},o.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},o.manipulateListeners=function(t,e,i){var o,n,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(o=i.length;o--;)r.call(this,e,i[o]);else for(o in e)e.hasOwnProperty(o)&&(n=e[o])&&("function"==typeof n?r.call(this,o,n):s.call(this,o,n));return this},o.removeEvent=function(t){var e,i=typeof t,o=this._getEvents();if("string"===i)delete o[t];else if(t instanceof RegExp)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];else delete this._events;return this},o.removeAllListeners=i("removeEvent"),o.emitEvent=function(t,e){var i,o,n,r,s=this.getListenersAsObject(t);for(n in s)if(s.hasOwnProperty(n))for(o=s[n].length;o--;)i=s[n][o],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},o.trigger=i("emitEvent"),o.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},o.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},o._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return n.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof o[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,n=0,r=i.length;r>n;n++)if(e=i[n]+t,"string"==typeof o[e])return e}}var i="Webkit Moz ms Ms O".split(" "),o=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var o=s[e];t[o]=0}return t}function o(t){function o(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var o=r(t);if("none"===o.display)return i();var n={};n.width=t.offsetWidth,n.height=t.offsetHeight;for(var h=n.isBorderBox=!(!p||!o[p]||"border-box"!==o[p]),f=0,c=s.length;c>f;f++){var d=s[f],l=o[d];l=a(t,l);var y=parseFloat(l);n[d]=isNaN(y)?0:y}var m=n.paddingLeft+n.paddingRight,g=n.paddingTop+n.paddingBottom,v=n.marginLeft+n.marginRight,_=n.marginTop+n.marginBottom,I=n.borderLeftWidth+n.borderRightWidth,L=n.borderTopWidth+n.borderBottomWidth,z=h&&u,S=e(o.width);S!==!1&&(n.width=S+(z?0:m+I));var b=e(o.height);return b!==!1&&(n.height=b+(z?0:g+L)),n.innerWidth=n.width-(m+I),n.innerHeight=n.height-(g+L),n.outerWidth=n.width+v,n.outerHeight=n.height+_,n}}function a(t,e){if(n||-1===e.indexOf("%"))return e;var i=t.style,o=i.left,r=t.runtimeStyle,s=r&&r.left;return s&&(r.left=t.currentStyle.left),i.left=e,e=i.pixelLeft,i.left=o,s&&(r.left=s),e}var u,p=t("boxSizing");return function(){if(p){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[p]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var o=r(t);u=200===e(o.width),i.removeChild(t)}}(),o}var n=t.getComputedStyle,r=n?function(t){return n(t,null)}:function(t){return t.currentStyle},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],o):"object"==typeof exports?module.exports=o(require("get-style-property")):t.getSize=o(t.getStyleProperty)}(window),function(t,e){function i(t,e){return t[a](e)}function o(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function n(t,e){o(t);for(var i=t.parentNode.querySelectorAll(e),n=0,r=i.length;r>n;n++)if(i[n]===t)return!0;return!1}function r(t,e){return o(t),i(t,e)}var s,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,o=t.length;o>i;i++){var n=t[i],r=n+"MatchesSelector";if(e[r])return r}}();if(a){var u=document.createElement("div"),p=i(u,"div");s=p?i:r}else s=n;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return s}):window.matchesSelector=s}(this,Element.prototype),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){for(var e in t)return!1;return e=null,!0}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function n(t,n,r){function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var u=r("transition"),p=r("transform"),h=u&&p,f=!!r("perspective"),c={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[u],d=["transform","transition","transitionDuration","transitionProperty"],l=function(){for(var t={},e=0,i=d.length;i>e;e++){var o=d[e],n=r(o);n&&n!==o&&(t[o]=n)}return t}();e(a.prototype,t.prototype),a.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=n(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var o=l[i]||i;e[o]=t[i]}},a.prototype.getPosition=function(){var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,o=e.isOriginTop,n=parseInt(t[i?"left":"right"],10),r=parseInt(t[o?"top":"bottom"],10);n=isNaN(n)?0:n,r=isNaN(r)?0:r;var a=this.layout.size;n-=i?a.paddingLeft:a.paddingRight,r-=o?a.paddingTop:a.paddingBottom,this.position.x=n,this.position.y=r},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var y=f?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),r=parseInt(e,10),s=n===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,u=e-o,p={},h=this.layout.options;a=h.isOriginLeft?a:-a,u=h.isOriginTop?u:-u,p.transform=y(a,u),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=h?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var m=p&&o(p)+",opacity";a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:m,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(c,this,!1))},a.prototype.transition=a.prototype[u?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=g[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(c,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(v)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!u||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}var r=t.getComputedStyle,s=r?function(t){return r(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],n):(t.Outlayer={},t.Outlayer.Item=n(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===f.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=d(e,t);-1!==i&&e.splice(i,1)}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,f,d,l,y){function m(t,i){if("string"==typeof t&&(t=a.querySelector(t)),!t||!c(t))return u&&u.error("Bad "+this.constructor.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.constructor.defaults),this.option(i);var o=++g;this.element.outlayerGUID=o,v[o]=this,this._create(),this.options.isInitLayout&&this.layout()}var g=0,v={};return m.namespace="outlayer",m.Item=y,m.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(m.prototype,f.prototype),m.prototype.option=function(t){e(this.options,t)},m.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},m.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},m.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0,r=e.length;r>n;n++){var s=e[n],a=new i(s,this);o.push(a)}return o},m.prototype._filterFindItemElements=function(t){t=o(t);for(var e=this.options.itemSelector,i=[],n=0,r=t.length;r>n;n++){var s=t[n];if(c(s))if(e){l(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),u=0,p=a.length;p>u;u++)i.push(a[u])}else i.push(s)}return i},m.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},m.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},m.prototype._init=m.prototype.layout,m.prototype._resetLayout=function(){this.getSize()},m.prototype.getSize=function(){this.size=d(this.element)},m.prototype._getMeasurement=function(t,e){var i,o=this.options[t];o?("string"==typeof o?i=this.element.querySelector(o):c(o)&&(i=o),this[t]=i?d(i)[e]:o):this[t]=0},m.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},m.prototype._getItemsForLayout=function(t){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i];n.isIgnored||e.push(n)}return e},m.prototype._layoutItems=function(t,e){function i(){o.emitEvent("layoutComplete",[o,t])}var o=this;if(!t||!t.length)return i(),void 0;this._itemsOn(t,"layout",i);for(var n=[],r=0,s=t.length;s>r;r++){var a=t[r],u=this._getItemLayoutPosition(a);u.item=a,u.isInstant=e||a.isLayoutInstant,n.push(u)}this._processLayoutQueue(n)},m.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},m.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];this._positionItem(o.item,o.x,o.y,o.isInstant)}},m.prototype._positionItem=function(t,e,i,o){o?t.goTo(e,i):t.moveTo(e,i)},m.prototype._postLayout=function(){this.resizeContainer()},m.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},m.prototype._getContainerSize=h,m.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},m.prototype._itemsOn=function(t,e,i){function o(){return n++,n===r&&i.call(s),!0}for(var n=0,r=t.length,s=this,a=0,u=t.length;u>a;a++){var p=t[a];p.on(e,o)}},m.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},m.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},m.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var o=t[e];this.ignore(o)}}},m.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var o=t[e];n(o,this.stamps),this.unignore(o)}},m.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o(t)):void 0},m.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},m.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},m.prototype._manageStamp=h,m.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,o=d(t),n={left:e.left-i.left-o.marginLeft,top:e.top-i.top-o.marginTop,right:i.right-e.right-o.marginRight,bottom:i.bottom-e.bottom-o.marginBottom};return n},m.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},m.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},m.prototype.unbindResize=function(){this.isResizeBound&&i.unbind(t,"resize",this),this.isResizeBound=!1},m.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},m.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},m.prototype.needsResizeLayout=function(){var t=d(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},m.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},m.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},m.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},m.prototype.reveal=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.reveal()}},m.prototype.hide=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.hide()}},m.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];if(o.element===t)return o}},m.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i],r=this.getItem(n);r&&e.push(r)}return e}},m.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,r=e.length;r>i;i++){var s=e[i];s.remove(),n(s,this.items)}}},m.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];o.destroy()}this.unbindResize(),delete this.element.outlayerGUID,p&&p.removeData(this.element,this.constructor.namespace)},m.data=function(t){var e=t&&t.outlayerGUID;return e&&v[e]},m.create=function(t,i){function o(){m.apply(this,arguments)}return Object.create?o.prototype=Object.create(m.prototype):e(o.prototype,m.prototype),o.prototype.constructor=o,o.defaults=e({},m.defaults),e(o.defaults,i),o.prototype.settings={},o.namespace=t,o.data=m.data,o.Item=function(){y.apply(this,arguments)},o.Item.prototype=new y,s(function(){for(var e=r(t),i=a.querySelectorAll(".js-"+e),n="data-"+e+"-options",s=0,h=i.length;h>s;s++){var f,c=i[s],d=c.getAttribute(n);try{f=d&&JSON.parse(d)}catch(l){u&&u.error("Error parsing "+n+" on "+c.nodeName.toLowerCase()+(c.id?"#"+c.id:"")+": "+l);continue}var y=new o(c,f);p&&p.data(c,t,y)}}),p&&p.bridget&&p.bridget(t,o),o},m.Item=y,m}var a=t.document,u=t.console,p=t.jQuery,h=function(){},f=Object.prototype.toString,c="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},d=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){function e(t){function e(){t.Item.apply(this,arguments)}return e.prototype=new t.Item,e.prototype._create=function(){this.id=this.layout.itemGUID++,t.Item.prototype._create.call(this),this.sortData={}},e.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}},e}"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window),function(t){function e(t,e){function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}return function(){function t(t){return function(){return e.prototype[t].apply(this.isotope,arguments)}}for(var o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],n=0,r=o.length;r>n;n++){var s=o[n];i.prototype[s]=t(s)}}(),i.prototype.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!==this.isotope.size.innerHeight},i.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},i.prototype.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},i.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=new i,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window),function(t){function e(t,e){var o=t.create("masonry");return o.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},o.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},o.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},o.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,o=e&&1>e?"round":"ceil",n=Math[o](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var r=this._getColGroup(n),s=Math.min.apply(Math,r),a=i(r,s),u={x:this.columnWidth*a,y:s},p=s+t.size.outerHeight,h=this.cols+1-r.length,f=0;h>f;f++)this.colYs[a+f]=p;return u},o.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;i>o;o++){var n=this.colYs.slice(o,o+t);e[o]=Math.max.apply(Math,n)}return e},o.prototype._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this.options.isOriginLeft?o.left:o.right,r=n+i.outerWidth,s=Math.floor(n/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?o.top:o.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(u,this.colYs[p])},o.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},o.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},o}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++){var n=t[i];if(n===e)return i}return-1};"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,i){var o=t.create("masonry"),n=o.prototype._getElementOffset,r=o.prototype.layout,s=o.prototype._getMeasurement;e(o.prototype,i.prototype),o.prototype._getElementOffset=n,o.prototype.layout=r,o.prototype._getMeasurement=s;var a=o.prototype.measureColumns;o.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,a.call(this)};var u=o.prototype._manageStamp;return o.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,u.apply(this,arguments)},o}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],i):i(t.Isotope.LayoutMode,t.Masonry)}(window),function(t){function e(t){var e=t.create("fitRows");return e.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0},e.prototype._getItemLayoutPosition=function(t){t.getSize(),0!==this.x&&t.size.outerWidth+this.x>this.isotope.size.innerWidth&&(this.x=0,this.y=this.maxY);var e={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=t.size.outerWidth,e},e.prototype._getContainerSize=function(){return{height:this.maxY}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t){var e=t.create("vertical",{horizontalAlignment:0});return e.prototype._resetLayout=function(){this.y=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},e.prototype._getContainerSize=function(){return{height:this.y}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===h.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=f(e,t);-1!==i&&e.splice(i,1)}function r(t,i,r,u,h){function f(t,e){return function(i,o){for(var n=0,r=t.length;r>n;n++){var s=t[n],a=i.sortData[s],u=o.sortData[s];if(a>u||u>a){var p=void 0!==e[s]?e[s]:e,h=p?1:-1;return(a>u?1:-1)*h}}return 0}}var c=t.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});c.Item=u,c.LayoutMode=h,c.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),t.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var e in h.modes)this._initLayoutMode(e)},c.prototype.reloadItems=function(){this.itemGUID=0,t.prototype.reloadItems.call(this)},c.prototype._itemize=function(){for(var e=t.prototype._itemize.apply(this,arguments),i=0,o=e.length;o>i;i++){var n=e[i];n.id=this.itemGUID++}return this._updateItemsSortData(e),e},c.prototype._initLayoutMode=function(t){var i=h.modes[t],o=this.options[t]||{};this.options[t]=i.options?e(i.options,o):o,this.modes[t]=new i(this)},c.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?(this.arrange(),void 0):(this._layout(),void 0)},c.prototype._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},c.prototype.arrange=function(t){this.option(t),this._getIsInstant(),this.filteredItems=this._filter(this.items),this._sort(),this._layout()},c.prototype._init=c.prototype.arrange,c.prototype._getIsInstant=function(){var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=t,t},c.prototype._filter=function(t){function e(){f.reveal(n),f.hide(r)}var i=this.options.filter;i=i||"*";for(var o=[],n=[],r=[],s=this._getFilterTest(i),a=0,u=t.length;u>a;a++){var p=t[a];if(!p.isIgnored){var h=s(p);h&&o.push(p),h&&p.isHidden?n.push(p):h||p.isHidden||r.push(p)}}var f=this;return this._isInstant?this._noTransition(e):e(),o},c.prototype._getFilterTest=function(t){return s&&this.options.isJQueryFiltering?function(e){return s(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return r(e.element,t)}},c.prototype.updateSortData=function(t){this._getSorters(),t=o(t);var e=this.getItems(t);e=e.length?e:this.items,this._updateItemsSortData(e)
},c.prototype._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=d(i)}},c.prototype._updateItemsSortData=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];o.updateSortData()}};var d=function(){function t(t){if("string"!=typeof t)return t;var i=a(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),r=n&&n[1],s=e(r,o),u=c.sortDataParsers[i[1]];return t=u?function(t){return t&&u(s(t))}:function(t){return t&&s(t)}}function e(t,e){var i;return i=t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&p(i)}}return t}();c.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},c.prototype._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=f(e,this.options.sortAscending);this.filteredItems.sort(i),t!==this.sortHistory[0]&&this.sortHistory.unshift(t)}},c.prototype._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw Error("No layout mode: "+t);return e.options=this.options[t],e},c.prototype._resetLayout=function(){t.prototype._resetLayout.call(this),this._mode()._resetLayout()},c.prototype._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},c.prototype._manageStamp=function(t){this._mode()._manageStamp(t)},c.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},c.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},c.prototype.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},c.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps();var o=this._filterRevealAdded(e);this.layoutItems(i),this.filteredItems=o.concat(this.filteredItems)}},c.prototype._filterRevealAdded=function(t){var e=this._noTransition(function(){return this._filter(t)});return this.layoutItems(e,!0),this.reveal(e),t},c.prototype.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;n>i;i++)o=e[i],this.element.appendChild(o.element);var r=this._filter(e);for(this._noTransition(function(){this.hide(r)}),i=0;n>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;n>i;i++)delete e[i].isLayoutInstant;this.reveal(r)}};var l=c.prototype.remove;return c.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(l.call(this,t),e&&e.length)for(var i=0,r=e.length;r>i;i++){var s=e[i];n(s,this.filteredItems)}},c.prototype._noTransition=function(t){var e=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.call(this);return this.options.transitionDuration=e,i},c}var s=t.jQuery,a=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},u=document.documentElement,p=u.textContent?function(t){return t.textContent}:function(t){return t.innerText},h=Object.prototype.toString,f=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],r):t.Isotope=r(t.Outlayer,t.getSize,t.matchesSelector,t.Isotope.Item,t.Isotope.LayoutMode)}(window);

jQuery(window).load(function(){
				
	var filters = {}, $container = jQuery('.stream');

	jQuery('.filter a').click(function(){
      	var $i = jQuery(this), isoFilters = [], prop, selector, $a = $i.parents('.dcsns-toolbar'), $b = $a.next(), $c = jQuery('.stream',$b);
		
		jQuery('.filter a',$a).removeClass('iso-active');
		$i.addClass('iso-active');
      	filters[ $i.data('group') ] = $i.data('filter');
      	for (prop in filters){
        	isoFilters.push(filters[ prop ])
      	}
      	selector = isoFilters.join('');
      	$c.isotope({filter: selector, sortBy : 'postDate'});

      	return false;
    });
	
	jQuery.each($container,function(){
		jQuery('li .section-thumb img, li .section-text img',jQuery(this)).css('opacity',0).show().fadeTo(800,1);
		jQuery(this).isotope('layout');
	});
	
	function sortstream(obj,d){
		var $l = jQuery('li.dcsns-li',obj);
		$l.sort(function(a, b){
			var keyA = parseInt(jQuery(a).attr('rel'),10), keyB = parseInt(jQuery(b).attr('rel'),10);
			if(d == 'asc'){return (keyA > keyB) ? 1 : -1;} 
			else {return (keyA < keyB) ? 1 : -1;}
			return 0;
		});
		jQuery.each($l, function(index, row){
			obj.append(row);
		});
		return;
	}
});
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 1) {
        $(".navigation").addClass("scrolled");
    } else {
        $(".navigation").removeClass("scrolled");
    }
});
$("#homelink").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#home").offset().top
    }, 2000);
});
$("#locationlink").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#location").offset().top
    }, 2000);
});
$("#programmelink").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#programme").offset().top
    }, 2000);
});
$("#contactlink").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 2000);
});
$("#contactlink2").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#contact").offset().top
    }, 2000);
});
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
$('#replyform').submit(function() {
    if ($.trim($("#name").val()) === "" || $.trim($("#email").val()) === "") {
        alert('you did not fill out one of the fields');
        return false;
    }
});
$('.waypoint').waypoint({
	handler: function(direction) {
			$(this.element).addClass('animated fadeInUp');
	},
	offset: '75%',
	triggerOnce: true
});
