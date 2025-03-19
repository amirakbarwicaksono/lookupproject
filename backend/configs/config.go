package config

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

// ConnectDB initializes a MongoDB connection
func ConnectDB() *mongo.Client {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found. Using environment variables.")
	}

	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Fatal("MONGODB_URI is not set in environment variables")
	}

	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}

	// Ping the database
	if err := client.Ping(context.Background(), nil); err != nil {
		log.Fatalf("MongoDB connection error: %v", err)
	}

	log.Println("Connected to MongoDB")
	DB = client
	return DB
}

// GetCollection provides a helper function to get a MongoDB collection
func GetCollection(collectionName string) *mongo.Collection {
	dbName := os.Getenv("MONGODB_DATABASE")
	if dbName == "" {
		log.Fatal("MONGODB_DATABASE is not set in environment variables")
	}
	return DB.Database(dbName).Collection(collectionName)
}
