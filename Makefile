up:
	@docker build -t js .
	@docker run -it -p 3000:3000 -v $(PWD):/app/frontend --name js js

start:
	@docker start -a js

stop:
	@docker stop js

down :
	@make stop
	@docker rm js

fclean :
	@docker rmi js

re : 
	@make down
	@make fclean
	@make up