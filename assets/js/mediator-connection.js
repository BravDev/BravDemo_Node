		//allow to get microphone and camera
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			var url = document.URL;
			var id = url.substring(url.lastIndexOf('/')+1);
      var clientA = id.substr(0, 5);
			var clientB = id.substr(5, 5);
			var clientC = id.substr(10, 5);

			var isMediator = false;
			var isCaucused = false;

			var BinCall = false;
			var CinCall = false;

			//log the id's
			console.log(clientA);
			console.log(clientB);
			console.log(clientC);
			//wait to load jquery
			$(document).ready(function() {
				//connect to the peering server
				var peer = new Peer(clientA, {host: '/', port: 9000, path:'../api'});

				//get mediators list from server
				getMediators();

				//set my stream
				init();
				// $(document).on("domReady", "videocam-off", function(){
				// 	$('.videocam-off').hide();	
				// });
				
				//events
				peer.on('open', function(id) {
					setInterval(callFirstPerson, 2000);
					setInterval(callSecondPerson, 2000);
					setOnlineStatus('A', 'online');
				});

				peer.on('connection', function(conn) {
					conn.on('data', function(data) {
						if(data === 'caucus') {
							$('#my-video').attr('muted', true);
							$('#videoA').attr('muted', true);
							$('#videoB').attr('muted', true);
							showDialog({
								title: 'Caucus',
								text: 'You were caucused',
								negative: false,
								positive: false,
								cancelable: false
							});

						} else if(data === 'uncaucus') {
							$('#my-video').attr('muted', false);
							$('#videoA').attr('muted', false);
							$('#videoB').attr('muted', false);

							//hide dialog
							$('#orrsDiag').css('opacity', 0);
						} else {
							//change mute property
							var mutedId;
							if(data === clientB) {
								mutedId = 'videoA';
							} else {
								mutedId = 'videoB';
							}
							if($('#' + mutedId).attr('muted') === true) {
								$('#' + mutedId).attr('muted', 'false');
							} else {
								$('#' + mutedId).attr('muted', 'true');
							}

						}

						});
					});


				peer.on('call', function(call) {
					call.answer(window.localStream);

					call.on('stream', function(stream) {
						if(call.peer == clientB) {
							$('#videoA').prop('src', URL.createObjectURL(stream));
						} else {
							$('#videoB').prop('src', URL.createObjectURL(stream));
						}

					 });

				});

				$('#caucusA').click(function() {
					if(isMediator === true) {
						//caucus clientB
						var conn = peer.connect(clientB);
						conn.on('open', function() {

							var conn2 = peer.connect(clientC);
							conn2.on('open', function() {
									conn2.send(clientB);
							});

							if(isCaucused === true) {
								$('#videoA').attr('muted', 'false');
								conn.send('uncaucus');
								isCaucused = false;
							} else {
								//mute client B
								$('#videoA').attr('muted', 'true');
								conn.send('caucus');
								isCaucused = true;
							}
						});
					}
				});

				$('#caucusB').click(function() {
					if(isMediator === true) {
						//caucus clientB
						var conn = peer.connect(clientC);
						conn.on('open', function() {

							var conn2 = peer.connect(clientB);
							conn2.on('open', function() {
									conn2.send(clientC);
							});

							if(isCaucused === true) {
								$('#videoB').attr('muted', 'false');
								conn.send('uncaucus');
								isCaucused = false;
							} else {
								//mute client B
								$('#videoB').attr('muted', 'true');
								conn.send('caucus');
								isCaucused = true;
							}
						});
					}
				});

				$('#silentA').click(function() {
					$('#videoA').attr('muted', 'true');
				});

				$('#silentB').click(function() {
					$('#videoB').attr('muted', 'true');
				});
				$(document).on("click", "#btn_hangoff", function(){
					debugger;
					if($('.videocam-off').css('display') === 'none'){
						$('.videocam-on').hide();
						$('.videocam-off').show();
						//$('#my-video').pause();
						$('#my-video').prop('src', "");
						window.localStream.getVideoTracks()[0].enabled = false;	
						peer.on('call', function(call) {
							call.answer("");
						});
					} else {
						$('.videocam-off').hide();
						$('.videocam-on').show();
						window.localStream.getVideoTracks()[0].enabled = true;
						init();
					};
					
					
				});
			

				function init() {
					navigator.getUserMedia({audio: true, video: true}, function(stream) {
						$('#my-video').prop('src', URL.createObjectURL(stream));

						window.localStream = stream;
					}, function(err) {
							 alert(err);
						});
					}	

				function callFirstPerson() {
					console.log('call attemp');
					if(BinCall == false) {
						var call = peer.call(clientB, window.localStream);
						var conn = peer.connect(clientB);
							conn.on('open', function() {
								BinCall = true;
								setOnlineStatus('B', 'online');

							});

							conn.on('close', function() {
								BinCall = false;
								setOnlineStatus('B', 'offline');
							});

					}

				}

				function callSecondPerson() {
					if(CinCall == false) {
						var call = peer.call(clientC, window.localStream);
						var conn = peer.connect(clientC);
							conn.on('open', function() {
								CinCall = true;
								setOnlineStatus('C', 'online');
							});

							conn.on('close', function() {
								CinCall = false;
								setOnlineStatus('C', 'offline');
							});
					}
				}

				function setOnlineStatus(client, status) {
					$('#client' + client +'_status').text('(' + status + ')');
				}

				function addVideoElement(videoId) {
					$('#video-container').append('<div class="video-window"><video id="' + videoId + '" class="client-video" muted="false" autoplay ></video></div>');
				}

				function getMediators() {
					$.ajax({
  					url: '../mediators.json',
  					success: function(data) {
							for(var i in data) {
								if(data[i].id === clientA) {
									isMediator = true;
									break;
								}
							}
						},
						error: function(err) {
							console.log(err);
							alert(err);
						},
  					dataType: 'JSON'
					});
				}

			});
