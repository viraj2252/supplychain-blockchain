pipeline {
    agent {
        docker {
            image 'node'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'apt-get update && apt-get -y upgrade && apt-get -y install git'
                sh 'npm install'
            }
        }
    }
}