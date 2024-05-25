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
        stage('Checkout') {
            steps {
                // Clone the repository containing your Groovy and Node.js scripts
                git 'https://github.com/dilhash/sit737-trackandstock-QA.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
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
