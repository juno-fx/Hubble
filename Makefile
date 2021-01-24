
dev:
	curl --request GET -sL \
	     --url 'https://raw.githubusercontent.com/juno-fx/Stacks/main/full.yaml'\
	     --output './.stack.yaml'
	docker-compose -f .stack.yaml -f docker-compose.yaml up --build