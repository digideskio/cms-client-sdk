import volar, pprint

v = volar.Volar(base_url = 'local.platypus.com', api_key = '934bf28ae6c5575b3bb6e3e94da47cde', secret = 'JVJys$vZ-d8im2E:zLRO5UzWXd.A#V$i')
#print v.build_signature(route = 'api/client/broadcast')
"""
response = v.request(route = 'api/client/broadcast')
if response == False:
	print v.error
else:
	pprint.pprint(response)
"""

print "-- SITES --"
response = v.sites()
if response == False:
        print v.error
else:
        pprint.pprint(response)

print "-- BROADCASTS --"
response = v.broadcasts({'site':'default'})
if response == False:
        print v.error
else:
        pprint.pprint(response)

print "-- SECTIONS --"
response = v.sections({'site':'default'})
if response == False:
        print v.error
else:
        pprint.pprint(response)

print "-- PLAYLISTS --"
response = v.playlists({'site':'default'})
if response == False:
        print v.error
else:
        pprint.pprint(response)

