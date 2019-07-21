/*!======================================================================*\
|| #################################################################### ||
|| # Package - YjsgSlider			 							        ||
|| # version 1.0.0
|| # Copyright (C) 2010  Youjoomla.com. All Rights Reserved.            ||
|| # Author - Dragan Todorovic and Stefan Stojanovic                    ||
|| # license - PHP files are licensed under  GNU/GPL V2                 ||
|| # license - CSS  - JS - IMAGE files  are Copyrighted material        ||
|| # bound by Proprietary License of Youjoomla.com                      ||
|| # for more information visit http://www.youjoomla.com/license.html   ||
|| # Redistribution and  modification of this software                  ||
|| # is bounded by its licenses                                         ||
|| # websites - http://www.youjoomla.com | http://www.yjsimplegrid.com  ||
|| #################################################################### ||
\*======================================================================!*/
;(function(f,h,i,d){var g="yjsgSlider",e={slide:".yjsgsliderSlide",controls:".yjsgsliderControls",pagination:".yjsgsliderPagination",navigation:".yjsgsliderNav",stopvideos:".yjsgsliderStopAll",activeclass:"yjsgsliderActive",effectduration:600,autoslide:3000,effect:"fade",type:"slider"};function j(n,m){this.element=n;this.settings=f.extend({},e,m);this._defaults=e;this._name=g;this.init()}j.prototype={init:function(){var m=this;this.settings.container=this.element;this.allslides=f(m.settings.container).find(m.settings.slide);this.settings.totalSlides=m.allslides.length;this.settings.controlList=f(m.settings.container).parent().find(m.settings.controls);this.sliderLoader=f(m.settings.container).parent().find(".yjsgsliderLoader");this.auto=false;if(m.settings.autoslide>1500){this.auto=true}this.activeSlide=0;this.runing=false;this.setTimer=null;this.yt_players=a;this.yt_player_state=k;this.vm_state=c;this.videoPlaying=0;this.loadSlides();this.setControls();this.animateNav();this.pauseonEnter();this.swipeAction();this.resizeHeight();this.stopallVideos()},setHeights:function(n){var m=f(n).find("div");f(n).height(f(m).height())},setHolderHeight:function(){var n=this;var m=f(n.settings.controlList).find(n.settings.pagination);var o=n.allslides.eq(n.activeSlide).find("div").height();f(n.sliderLoader).fadeOut(300);if(n.settings.type=="tabs"){m.animate({opacity:1})}f(n.settings.controls).css("display","block");f(n.settings.container).stop(true,true,true).animate({opacity:1,height:o},300,function(){if(n.settings.type=="slider"){m.animate({opacity:1})}if(n.auto){n.getNext()}n.videosState();f(n.settings.container).removeClass("loadingSlides")})},loadSlides:function(){var m=this;m.allslides.each(function(n,o){f(o).css("opacity",0);m.setHeights(o);f(o).eq(n).css({"z-index":2,opacity:1}).addClass(m.settings.activeclass)}).promise().done(function(){m.setHolderHeight()})},setControls:function(){var o=this;var n=f(o.settings.container).parent();var m=f(o.settings.controlList).find(o.settings.pagination);if(o.settings.type=="slider"){for(var q=0;q<o.settings.totalSlides;q++){m.append('<li class="getslide" data-getslide="'+q+'"><a class="yjsgslider-button">'+(q+1)+"</a></li>")}}f(o.settings.controlList).find(o.settings.navigation).css("opacity",0);f(o.settings.controlList).find(o.settings.pagination).css("opacity",0);o.showStopVideos();var p=m.find(".getslide");p.eq(0).addClass("active");n.find(".getslide").bind("click",function(r){r.preventDefault();var s=f(this).attr("data-getslide");clearTimeout(o.setTimer);o.switchSlides(s)})},switchSlides:function(n){var m=this;if(n=="next"){nextSlide=(m.activeSlide*1)+1;if(nextSlide>m.settings.totalSlides-1){nextSlide=0}}else{if(n=="prev"){nextSlide=(m.activeSlide*1)-1;if(nextSlide<0){nextSlide=m.settings.totalSlides-1}}else{nextSlide=n}}m.animateSlides(m.activeSlide,nextSlide)},videosState:function(){var n=this;var o=f("."+n.settings.activeclass).find(".yjsgsliderYoutube").attr("id");var m=f("."+n.settings.activeclass).find(".yjsgsliderVimeo").attr("id");if(typeof o!="undefined"&&typeof n.yt_player_state[o]!="undefined"){n.videoPlaying=n.yt_player_state[o]}if(typeof m!="undefined"&&typeof n.vm_state[m]!="undefined"){if(n.vm_state[m]=="play"){n.videoPlaying=1}else{n.videoPlaying=0}}return n.videoPlaying},getNext:function(){var m=this;m.videosState();if(m.auto&&m.videoPlaying==0){m.setTimer=setTimeout(function(){m.switchSlides("next")},m.settings.autoslide)}},pauseonEnter:function(){var m=this;f(m.settings.container).parent().on("mouseover",function(){m.pauseSlides()}).on("mouseleave",function(){m.pauseSlides();m.getNext()})},animateNav:function(){var o=this;var n=f(o.settings.container).parent();var m=n.find(o.settings.navigation);var p=f(o.settings.stopvideos);m.css({opacity:0});n.on("mouseover",function(){p.stop().animate({opacity:1});m.stop().animate({opacity:1})}).on("mouseleave",function(){m.stop().animate({opacity:0});p.stop().animate({opacity:0})});m.on("mouseover",function(){f(this).stop().animate({opacity:1})});p.on("mouseover",function(){f(this).stop().animate({opacity:1})})},pauseSlides:function(){var m=this;clearTimeout(m.setTimer)},pauseallVideos:function(o){var n=this;var m=n.allslides.eq(o).find("iframe");f(n.settings.container).find(".yjsgsliderYoutube").each(function(){var p=this.id;if(n.yt_players[p].getPlayerState()==1){n.yt_players[p].pauseVideo();n.videoPlaying=0}});f(n.settings.container).find(".yjsgsliderVimeo").each(function(){var p=this.id;if(n.vm_state[p]=="play"){b("pause","pause",p);n.videoPlaying=0}});f(n.settings.container).find("video").each(function(){this.pause();n.videoPlaying=0})},showStopVideos:function(){var m=this;var o=f(m.settings.container).find("iframe,video,object");if(o.length){var n=o.parent().position().top;f(m.settings.container).parent().find(m.settings.controls).append('<span class="yjsgsliderStopAll" data-toggle="tooltip" data-placement="top" title="Stop all videos"></span>');f(m.settings.stopvideos).css({opacity:0});if(typeof(f.fn.popover)!="undefined"){f(m.settings.stopvideos).tooltip({container:"body"})}}},stopallVideos:function(){var m=this;f(m.settings.stopvideos).on("click",function(){f(m.settings.container).find("video").each(function(){this.pause();this.load();m.videoPlaying=0});f("."+m.settings.activeclass).find(".yjsgsliderVimeo").each(function(){var n=this.id;f(this).attr("src",f(this).attr("src"));m.videoPlaying=0});f(m.settings.container).find(".yjsgsliderYoutube").each(function(){var n=this.id;m.yt_players[n].seekTo(0).stopVideo();m.videoPlaying=0})})},pauseVideos:function(r){var o=this;var n=o.allslides.eq(r).find("iframe");var m=o.allslides.eq(r).find("video");o.pauseallVideos(r);if(n.length){var q=n.attr("id");var p=n.attr("src");if(p.indexOf("youtube")!=-1&&o.yt_players[q].getPlayerState()==2){o.yt_players[q].playVideo();o.videoPlaying=1}if(p.indexOf("vimeo")!=-1&&o.vm_state[q]=="pause"){b("play","play",q);o.videoPlaying=1}o.videosState()}if(m.length){var q=m.attr("id");if(f("#"+q).get(0).currentTime>0&&!f("#"+q).get(0).ended){f("#"+q).get(0).pause();o.videoPlaying=1}if(f("#"+q).get(0).currentTime>0&&(f("#"+q).get(0).paused&&!f("#"+q).get(0).ended)){f("#"+q).get(0).play();o.videoPlaying=1}}},animateSlides:function(q,n){var o=this;if(o.runing||q==n){return false}o.runing=true;var r=o.allslides.eq(n).height();if(o.settings.effect=="fade"){o.allslides.eq(q).css("z-index",1).animate({opacity:0},o.settings.effectduration);o.allslides.eq(n).css("z-index",2).animate({opacity:1},o.settings.effectduration)}else{if(o.settings.effect=="slide"||o.settings.effect=="slidefade"){activePoz=q<n?"-100%":"100%",newPoz=q<n?"100%":"-100%";if(n==0&&q==o.settings.totalSlides-1){activePoz="-100%",newPoz="100%"}if(q==0&&n==o.settings.totalSlides-1){activePoz="100%",newPoz="-100%"}if(o.settings.effect=="slidefade"){o.allslides.eq(n).css({left:newPoz,zIndex:3}).animate({opacity:1,left:0},o.settings.effectduration);o.allslides.eq(q).animate({opacity:0,left:activePoz},o.settings.effectduration)}else{o.allslides.eq(n).css({left:newPoz,opacity:1,zIndex:3}).animate({left:0},o.settings.effectduration);o.allslides.eq(q).animate({left:activePoz},o.settings.effectduration)}}}f(o.settings.container).animate({height:r},o.settings.effectduration,function(){o.pauseVideos(o.activeSlide)});o.activeSlide=n;o.runing=false;o.getNext();var m=f(o.settings.controlList).find(o.settings.pagination);var p=m.find(".getslide");p.removeClass("active");p.eq(n).addClass("active");o.allslides.removeClass(o.settings.activeclass);o.allslides.eq(n).addClass(o.settings.activeclass)},resizeHeight:function(){var o=this;var n=f(h).width(),m=f(h).height();f(h).resize(function(){var q=f(h).width(),p=f(h).height();if(n!=q||m!=p){o.allslides.each(function(r,s){var t=f(this).find("div").height();f(this).css("height",t)}).promise().done(function(){var r=o.allslides.eq(o.activeSlide).find("div").height();f(o.settings.container).stop().animate({height:r},300)})}n=q;m=p})},swipeAction:function(){var m=this;if(f.fn.swipe!==d){f(m.settings.container).swipe({swipeLeft:function(o,q,r,p,n){m.switchSlides("next")},swipeRight:function(o,q,r,p,n){m.switchSlides("prev")}})}}};f.fn[g]=function(m){return this.each(function(){if(!f.data(this,"plugin_"+g)){f.data(this,"plugin_"+g,new j(this,m))}else{if(f.isFunction(j.prototype[m])){f.data(this,"plugin_"+g)[m]()}}})};var a=[];var k=[];var c=[];f(function(){f(".yjsgsliderChrome").each(function(m,o){var n="iframe[src*=vimeo],iframe[src*=youtube]";f(this).addClass("loadingSlides");f(this).find(n).each(function(){var r=f(this).attr("src");var s="youvid"+Math.floor(Math.random()*1000);if(r.indexOf("youtube")!=-1){var v="yjsgsliderYoutube";var t="enablejsapi=1&wmode=transparent&autohide=0&hd=1&modestbranding=0&showinfo=1"}else{v="yjsgsliderVimeo";t="api=1&player_id="}f(this).attr("id",s).addClass(v);var u="?";var q="";if(r.indexOf("?")!=-1){var u="&"}if(r.indexOf("http:")!=1){var q="http:"}if(r.indexOf("youtube")!=-1){var p=t}else{p=t+f(this).attr("id")}f(this).attr("src",q+r+u+p);f(this).parent().fitVids()})})});protocol="http:"==location.protocol?"http":"https";f.getScript(protocol+"://www.youtube.com/player_api");h.onYouTubeIframeAPIReady=function(){f(".yjsgsliderYoutube").each(function(){var m=f(this).attr("id");var n=f(this).attr("src").split("/embed/")[1].split("?")[0];a[m]=new YT.Player(m,{videoId:n,events:{onReady:function(o){},onStateChange:function(o){if(o.data==1){k[m]=o.data}else{k[m]=0}}}})})};if(h.addEventListener){h.addEventListener("message",l,false)}else{h.attachEvent("onmessage",l,false)}function b(q,p,m){var o={method:q};if(p){o.value=p}var n=f("#"+m)[0];n.contentWindow.postMessage(JSON.stringify(o),f(n).attr("src").split("?")[0])}function l(p){if(-1==p.origin.search("player.vimeo.com")){return}var o=f.parseJSON(p.data),m=o.player_id,n=f("#"+m).attr("class");if(n!="yjsgsliderVimeo"){return}switch(o.event){case"ready":b("addEventListener","play",m);b("addEventListener","pause",m);b("addEventListener","seek",m);b("addEventListener","finish",m);c[m]=o.event;break;case"play":c[m]=o.event;break;case"pause":c[m]=o.event;break;case"seek":c[m]=o.event;break;case"finish":c[m]=o.event;break}}})(jQuery,window,document);