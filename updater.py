
#	
#	This python script updates the app to latest available version.
#	Current version can be found in package.json and package-lock.json
#	No roll-backs, all updates have to be to higher versions
#	The available version on the origin/master branch is the latest version
#	Stable releases will be branched off as a fall back 
#	The script only alters stuff in resources/app/
#	
#	Make sure you have a stable internet connection
#	
#	Its prolly gonna be converted to .exe so why do I even bother writing this lol
#	
#	In case someone even reads this : Logan is gae, lmfao
#
#	PUT THIS PROGRAM WITHIN THE SAME FOLDER AS Quora.exe or other executable

import requests
import json
import os
import zipfile
import shutil
import time

package_json_url = 'https://raw.githubusercontent.com/DarkGuy10/Quora/master/package.json'
package_json = requests.get(package_json_url)
open('tmp.json', 'wb').write(package_json.content)
latest_version = ''
with open('tmp.json', 'r') as handle:
	package = json.load(handle)
	latest_version = (package['version'])
os.remove('tmp.json')

app_version = ''
with open('resources/app/package.json', 'r') as handle:
	package = json.load(handle)
	app_version = (package['version'])


#	return refrences:
#	0 - no update
#	1 - minor update (change in z)
#	2 - important update (change in y)
#	3 - fkn new release (change in x)
#
#	version format : x.y.z

def check_update(app_version, latest_version):
	print('Installed version : ' +  app_version)
	print('Latest version : ' +  latest_version)
	i = 0
	for latest_unit in latest_version.split('.'):
		app_unit = app_version.split('.')[i]
		if latest_unit > app_unit:
			return (3 - i)
		elif app_unit > latest_unit:
			break
		i += 1
	return 0

def update():
	print('Downloading update....')
	url = 'https://github.com/DarkGuy10/Quora/archive/master.zip'
	update_bytes = requests.get(url)
	print('Installing update....')
	open('master.zip', 'wb').write(update_bytes.content)
	with zipfile.ZipFile('master.zip','r') as zip_ref:
		zip_ref.extractall('resources')
	os.remove('master.zip')
	shutil.rmtree('resources/app')
	os.rename('resources/Quora-master', 'resources/app')
	print('DONE!')
	time.sleep(1)

update_value = check_update(app_version, latest_version)
if update_value == 0:
	print('App is up to date!')
	choice = input('Do you want to force update? (y/N) ').upper()[0]
	if choice == 'Y':
		update()
elif update_value == 1:
	print('Minor fixes, not required!')
	choice = input('Do you still want to update? (y/N) ').upper()[0]
	if choice == 'Y':
		update()
elif update_value == 2:
	print('Important updates available!')
	update()
elif update_value == 3:
	print('NEW RELEASE AVAILABLE!')
	update()
else:
	print('Something went wrong :/')
	print('Run the script again')
	quit()