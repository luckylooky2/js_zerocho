up:
	@docker build -t js .
	@docker run -p 3000:3000 -v $(PWD):/app/frontend --name js js

start:
	@docker start js

stop:
	@docker stop js

down :
	@make stop
	@docker rm js

fclean :
	@docker rmi js