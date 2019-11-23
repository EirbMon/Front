pipeline {
  agent any
  stages {
    stage('Check dependencies') {
      agent {
        docker {
          image 'node:8'
        }

      }
      steps {
        sh 'npm install'
        echo 'Everything is okay, we can continue !'
      }
    }
    stage('Build') {
      parallel {
        stage('Build dev') {
          when {
            branch "dev"
          }
          steps {
            sh 'docker build -t eirbmon/front-dev .'
            echo 'Docker dev image built'
          }
        }
        stage('Build prod') {
          when {
            branch "master"
          }
          steps {
            sh 'docker build -t eirbmon/front .'
            echo 'Docker prod image built'
          }
        }
        stage('Stop old dev') {
          when {
            branch "dev"
          }
          steps {
            sh 'docker stop eirbmon-front-dev || true'
            sh 'docker rm eirbmon-front-dev || true'
            sh 'docker rmi eirbmon/front-dev || true'
            echo 'Old dev container stopped'
          }
        }
        stage('Stop old prod') {
          when {
            branch "master"
          }
          steps {
            sh 'docker stop eirbmon-front || true'
            sh 'docker rm eirbmon-front || true'
            sh 'docker rmi eirbmon/front || true'
            echo 'Old prod container stopped'
          }
        }
      }
    }
    stage('Run dev container') {
      when {
        branch "dev"
      }
      steps {
        sh 'docker run -p 3300:3000 -d --name eirbmon-front-dev -v /home/eirbmon/Documents/SharedFile:/build/contracts eirbmon/front-dev'
        echo 'Dev container ready !'
      }
    }
    stage('Run prod container') {
      when {
        branch "master"
      }
      steps {
        sh 'docker run -p 3000:3000 -d --name eirbmon-front eirbmon/front'
        echo 'Prod container ready !'
      }
    }
  }
  // environment {
  //   HOME = '.'
  // }
}
