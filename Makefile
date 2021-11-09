
# Build and upload docker image
PHONY: build
build:
	sudo docker build --tag thohell/react-todo-mongodb:latest .

PHONY: push
push:
	git add -A
	git commit 
	sudo docker push thohell/react-todo-mongodb:latest
