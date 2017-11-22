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
                sh 'apk update && apk upgrade && apk add --no-cache bash git openssh'
                sh 'npm install'
            }
        }
    }
}