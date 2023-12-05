compile_static:
	# compile l10n files
	for f in src/l10n/*.ini; do (cat "$${f}"; echo) >> dist/data.ini; done

	# copy over static assets
	cp -r src/img src/opensource.htm src/help.htm src/privacy.htm dist/
	mkdir dist/help
	mv dist/help.htm dist/help/index.html	
	mkdir dist/privacy
	mv dist/privacy.htm dist/privacy/index.html
build_dev:
	#add manifest-dev.appcache empty manifest
	cp src/manifest-dev.appcache dist/manifest.appcache
	echo "# Updated $(shell date +%x_%H:%M:%S:%N)" >> dist/manifest.appcache
build_prod:
	#run compile_static
	$(MAKE) compile_static

	# manifest
	cp -r src/manifest.appcache dist/
	echo "# Updated $(shell date +%x_%H:%M:%S:%N)" >> dist/manifest.appcache