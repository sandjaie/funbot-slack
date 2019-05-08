pipeline {
    agent { docker { image 'node:11.9' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
