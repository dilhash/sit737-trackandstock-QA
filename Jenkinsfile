pipeline {
    agent any

    environment {
        // Load the MongoDB connection string from Jenkins credentials
        MONGODB_URI = credentials('MONGODB_URI')
    }

    tools {
        // Specify the NodeJS tool name configured in Global Tool Configuration
        nodejs 'NodeJS 14'
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
                git url: 'https://github.com/dilhash/sit737-trackandstock-QA.git', branch: 'master', credentialsId: 'your-credentials-id'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('sit737-trackandstock-QA') { // Assuming the repo is cloned to this directory within the workspace
                    sh 'npm install'
                }
            }
        }
        stage('Backup Data') {
            steps {
                dir('sit737-trackandstock-QA') { // Assuming the repo is cloned to this directory within the workspace
                    sh 'node backupData.js'
                }
            }
        }
        stage('Delete Data') {
            steps {
                dir('sit737-trackandstock-QA') { // Assuming the repo is cloned to this directory within the workspace
                    sh 'node deleteData.js'
                }
            }
        }
        stage('Insert Data') {
            steps {
                dir('sit737-trackandstock-QA') { // Assuming the repo is cloned to this directory within the workspace
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
