
# Build and upload docker image
PHONY: build
build:
	docker build --tag thohell/react-todo-mongodb:latest .

PHONY: push
push:
	git add -A 
	git commit 
	git push
	docker push thohell/react-todo-mongodb:latest
