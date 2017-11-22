pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'apk update && apk add'
                sh 'apt-get update'
                sh 'apt-get install git'
                sh 'npm install'
            }
        }
    }
}