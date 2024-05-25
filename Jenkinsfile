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
        // stage('Checkout') {
        //     steps {
        //         // Clone the repository containing your Groovy and Node.js scripts
        //         git url: 'https://github.com/dilhash/sit737-trackandstock-QA.git', branch: 'master', credentialsId: 'your-credentials-id'
        //     }
        // }
        stage('Install Dependencies') {
            steps {
                dir('/Users/dilumbal/Desktop/Gemini/sit737-trackandstock-QA') {
                    sh 'npm install'
                }
            }
        }
        stage('Backup Data') {
            steps {
                dir('/Users/dilumbal/Desktop/Gemini/sit737-trackandstock-QA') {
                    sh 'node backupData.js'
                }
            }
        }
        stage('Delete Data') {
            steps {
                dir('/Users/dilumbal/Desktop/Gemini/sit737-trackandstock-QA') {
                    sh 'node deleteData.js'
                }
            }
        }
        stage('Insert Data') {
            steps {
                dir('/Users/dilumbal/Desktop/Gemini/sit737-trackandstock-QA') {
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
