pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'sudo apt-get update && sudo apt-get upgrade && sudo apt-get install git'
                sh 'npm install'
            }
        }
    }
}