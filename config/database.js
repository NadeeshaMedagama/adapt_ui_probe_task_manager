/**
 * Database Configuration
 * MongoDB connection setup for Cloud Native Task Manager
 */

const mongoose = require('mongoose')

const connectDatabase = async () => {
  try {
    const connectionString = process.env.MONGO_URI ||
        'mongodb://localhost:27017/adapt_ui_probe_task_manager'

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    }

    await mongoose.connect(connectionString, options)

    console.log(`MongoDB connected: ${mongoose.connection.host}`)

    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`)
    })

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected. Attempting reconnect...')
    })

  } catch (error) {
    console.error(`Database connection failed: ${error.message}`)
    process.exit(1)
  }
}

module.exports = { connectDatabase }