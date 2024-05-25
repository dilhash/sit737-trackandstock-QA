pipeline {
    agent any

    environment {
        // Load the MongoDB connection string from Jenkins credentials
        MONGODB_URI = credentials('MONGODB_URI')
    }

    stages {

        stage('Start') {
            steps {
                echo 'Groovy started..'
            }
        }
        stage('Change Directory') {
            steps {
                 // Change to the specific directory
                dir('/Users/dilumbal/Desktop/Gemini/sit737-trackandstock-QA') {
                    echo "Changed directory to /Users/dilumbal/Desktop/Gemini/sit737-trackandstock-QA"
               
            }
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                //sh 'npm install'
            }
        }
        stage('Backup Data') {
            steps {
                script {
                    // Run the backupData.js script
                    sh 'node backupData.js'
                }
            }
        }
        stage('Delete Data') {
            steps {
                script {
                    // Run the deleteData.js script
                    sh 'node deleteData.js'
                }
            }
        }
        stage('Insert Data') {
            steps {
                script {
                    // Run the insertData.js script
                    sh 'node insertData.js'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
