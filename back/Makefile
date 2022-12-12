api:
	go run cmd/api/main.go

docker:
	cd docs/ && docker-compose up -d

migrateup:
	migrate -path ./internal/db/migrations -database "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=disable" -verbose up

migratedown:
	migrate -path ./internal/db/migrations -database "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=disable" -verbose down