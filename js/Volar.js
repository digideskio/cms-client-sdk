/*! Volar v0.1 | (c) 2013 Volar Video, Inc.
//	contains 1 function that takes an object argument describing the request.
//	note that jquery is not required - calls to the Volar.broadcasts() function without
//		jquery installed will result in new script tags being inserted into your document
*/

var Volar = {
	'base_url' : 'vcloud.volarvideo.com',

	/**
	 *	gets list of broadcasts
	 *	@param object opts
	 *			recognized parameters in object:
	 *				- required -
	 *				'site' OR 'sites'	slug of site to filter to.
	 *										if passing 'sites', users can include a comma-delimited list of sites.
	 *										results will reflect all broadcasts in the listed sites.
	 *				'callback'			javascript function name that should be executed once the jsonp call is completed.
	 *										Actual function pointers are supported.
	 *				- optional -
	 *				'list'				type of list.  allowed values are 'all', 'archived', 'scheduled' or 'upcoming', 'upcoming_or_streaming', 'streaming' or 'live'
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of broadcasts to display per page
	 *				'section_id'		id of section you wish to limit list to
	 *				'playlist_id'		id of playlist you wish to limit list to
	 *				'id'				id of broadcast - useful if you only want to get details of a single broadcast
	 *				'title'				title of broadcast.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'autoplay'			1 (true) or 0 (false).  defaults to false.  used in embed code to prevent player from immediately playing
	 *				'embed_width'		width (in pixels) that embed should be.  defaults to 640.
	 *				'before' 			return broadcasts that occur before specified date.  can be a date string or integer timestamp.  note that date strings should be in standard formats.
	 *				'after' 			return broadcasts that occur after specified date.  can be a date string or integer timestamp.  note that date strings should be in standard formats.
	 *										note - if both before and after are included, broadcasts between the supplied dates are returned.
	 *				'sort_by'			data field to use to sort.  allowed fields are date, status, id, title, description
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending)
	 *	Because the function operates on jsonp, the function supplied in the 'callback' argument is called with the returned data.
	 *	The function should be able to handle an object that is structured with the data as listed on 
	 *		https://github.com/volarvideo/cms-client-sdk/wiki/Creating-API-Connections-without-the-SDK-code#wiki-broadcast-list
	 */

	'broadcasts' : function(opts) {
		if(!('callback' in opts))
		{
			this.log('"callback" argument is required.')
			return;
		}
		if(!('site' in opts) && !('sites' in opts))
		{
			this.log('"site" or "sites" arguments are required.')
			return;
		}
		var api_url = ('https:' == document.location.protocol ? 'https://' : 'http://') + this.base_url + '/api/client/broadcast';
		this.execute(api_url, opts);
	},

	/**
	 *	gets list of broadcast data templates
	 *	@param object opts
	 *			recognized parameters in object:
	 *				- required -
	 *				'site' OR 'sites'		slug of site to filter to.
	 *											if passing 'sites', users can include a comma-delimited list of sites.
	 *											results will reflect all templates in the listed sites.
	 *				'callback'				javascript function name that should be executed once the jsonp call is completed.
	 *											Actual function pointers are supported.
	 *				- optional -
	 *				'page'					current page of listings.  pages begin at '1'
	 *				'per_page'				number of templates to display per page
	 *				'section_id'			id of section you wish to limit list to
	 *				'broadcast_id'			id of broadcast you wish to limit list to
	 *				'id'					id of broadcast - useful if you only want to get details of a single broadcast
	 *				'title'					title of broadcast.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'date_modified_before' 	return templates that were modified before specified date.  can be a date string or integer timestamp.  note that date strings should be in standard formats.
	 *				'date_modified_after' 	return templates that were modified after specified date.  can be a date string or integer timestamp.  note that date strings should be in standard formats.
	 *										note - if both before and after are included, templates between the supplied dates are returned.
	 *				'sort_by'				data field to use to sort.  allowed fields are date_modified, id, title, description
	 *				'sort_dir'				direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending)
	 *	Because the function operates on jsonp, the function supplied in the 'callback' argument is called with the returned data.
	 *	The function should be able to handle an object that is structured with the data as listed on 
	 *		https://github.com/volarvideo/cms-client-sdk/wiki/Creating-API-Connections-without-the-SDK-code#wiki-listing-meta-data-templates
	 */

	'templates' : function(opts) {
		if(!('callback' in opts))
		{
			this.log('"callback" argument is required.')
			return;
		}
		if(!('site' in opts) && !('sites' in opts))
		{
			this.log('"site" or "sites" arguments are required.')
			return;
		}
		var api_url = ('https:' == document.location.protocol ? 'https://' : 'http://') + this.base_url + '/api/client/template';
		this.execute(api_url, opts);
	},

	/**
	 *	gets list of sections
	 *	@param array $params associative array
	 *			recognized parameters in array:
	 *				- required -
	 *				'site' OR 'sites'	slug of site to filter to.
	 *										if passing 'sites', users can include a comma-delimited list of sites.
	 *										results will reflect all sections in the listed sites.
	 *				'callback'			javascript function name that should be executed once the jsonp call is completed.
	 *										Actual function pointers are supported.
	 *				- optional -
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of broadcasts to display per page
	 *				'broadcast_id'		id of broadcast you wish to limit list to.  will always return 1
	 *				'video_id'			id of video you wish to limit list to.  will always return 1.  note this is not fully supported yet.
	 *				'id'				id of section - useful if you only want to get details of a single section
	 *				'title'				title of section.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'sort_by'			data field to use to sort.  allowed fields are id, title. defaults to title
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending). defaults to asc
	 *	Because the function operates on jsonp, the function supplied in the 'callback' argument is called with the returned data.
	 *	The function should be able to handle an object that is structured with the data as listed on 
	 *		https://github.com/volarvideo/cms-client-sdk/wiki/Creating-API-Connections-without-the-SDK-code#wiki-section-list
	 */

	'sections' : function(opts) {
		if(!('callback' in opts))
		{
			this.log('"callback" argument is required.')
			return;
		}
		if(!('site' in opts) && !('sites' in opts))
		{
			this.log('"site" or "sites" arguments are required.')
			return;
		}
		var api_url = ('https:' == document.location.protocol ? 'https://' : 'http://') + this.base_url + '/api/client/section';
		this.execute(api_url, opts);
	},

	/**
	 *	gets list of playlists
	 *	@param array $params associative array
	 *			recognized parameters in array:
	 *				- required -
	 *				'site' OR 'sites'	slug of site to filter to.
	 *										if passing 'sites', users can include a comma-delimited list of sites.
	 *										results will reflect all playlists in the listed sites.
	 *				'callback'			javascript function name that should be executed once the jsonp call is completed.
	 *										Actual function pointers are supported.
	 *				- optional -
	 *				'page'				current page of listings.  pages begin at '1'
	 *				'per_page'			number of broadcasts to display per page
	 *				'broadcast_id'		id of broadcast you wish to limit list to.
	 *				'video_id'			id of video you wish to limit list to.  note this is not fully supported yet.
	 *				'section_id'		id of section you wish to limit list to
	 *				'id'				id of playlist - useful if you only want to get details of a single playlist
	 *				'title'				title of playlist.  useful for searches, as this accepts incomplete titles and returns all matches.
	 *				'sort_by'			data field to use to sort.  allowed fields are id, title. defaults to title
	 *				'sort_dir'			direction of sort.  allowed values are 'asc' (ascending) and 'desc' (descending). defaults to asc
	 *	Because the function operates on jsonp, the function supplied in the 'callback' argument is called with the returned data.
	 *	The function should be able to handle an object that is structured with the data as listed on 
	 *		https://github.com/volarvideo/cms-client-sdk/wiki/Creating-API-Connections-without-the-SDK-code#wiki-playlist-list
	 */

	'playlists' : function(opts) {
		if(!('callback' in opts))
		{
			this.log('"callback" argument is required.')
			return;
		}
		if(!('site' in opts) && !('sites' in opts))
		{
			this.log('"site" or "sites" arguments are required.')
			return;
		}
		var api_url = ('https:' == document.location.protocol ? 'https://' : 'http://') + this.base_url + '/api/client/playlist';
		this.execute(api_url, opts);
	},

	'execute' : function(api_url, opts) {

		opts['cache_breaker'] = Math.random();

		var fake = '';
		if(typeof opts['callback'] == 'function')
		{
			//function was passed.  since we have to translate it to a string, we have to stick it into a fake function name
			do
			{
				fake = 'Volar_' + Math.floor(Math.random() * 100000);
			}
			while((fake in window));
			window[fake] = function(data) {
				opts['callback'](data);
			}
		}

		if('jQuery' in window)
		{
			var data = {};
			for(i in opts)
			{
				if(i == 'callback' && fake != '')
				{
					data[i] = fake;
				}
				else if(opts[i] != null)
				{
					data[i] = opts[i];
				}
			}
			jQuery.ajax({
				// 'url' : 'http://local.platypus.com/api/client/broadcast',
				'url' : api_url,
				'data' : data,
				'dataType' : 'jsonp',
				'jsonpCallback' : fake ? fake : opts['callback']
			});
		}
		else
		{
			var args = '';
			for(i in opts)
			{
				if(i == 'callback' && fake != '')
				{
					args += (args == '' ? '?' : '&') + 'callback' + '=' + fake;
				}
				else if(opts[i] != null)
				{
					args += (args == '' ? '?' : '&') + i + '=' + opts[i];
				}
			}
			(function() {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.async = true;
				script.src = api_url + args;
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(script, s);
			})();
		}

	},
	'log' : function(message) {
		window.console && console.log(message);
	}
}