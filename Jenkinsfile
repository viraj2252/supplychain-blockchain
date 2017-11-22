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
                sh 'apt-get update && apt-get upgrade && apt-get install git'
                sh 'npm install'
            }
        }
    }
}