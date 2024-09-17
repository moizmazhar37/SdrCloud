pipeline {
    agent {
        label 'int-node-stg-1'
    }
    environment {
        PROJECT_NAME = '$PROJECT_NAME'
        BUILD_NUMBER = '$BUILD_NUMBER'
        BUILD_STATUS = '#' 
        CUSTOM_BUILD_URL = '$BUILD_URL'
    }
    stages {
        stage("Collecting Requirements") {
            steps {
                sh "echo Please wait.."
                sh "sudo npm install"
            }
        }
        
        stage("Build") {
            steps {
               
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rsync -rav --delete build/* administrator@172.16.0.235:/var/www/html/react-pipeline/ai-video-generator-scott-harris-23054103-reactjs-pune"
                sh "echo aivideo-generatorpune.mobiloitte.io"
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('mobiloitte-sonar') {
                    script {
                        def scannerHome = tool 'mobiloitte-sonar-scanner';
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                // Update BUILD_STATUS based on build result
                def buildOutcome = currentBuild.resultIsBetterOrEqualTo('SUCCESS') ? 'SUCCESS' : 'FAILURE'
                BUILD_STATUS = buildOutcome

                emailext to: 'rahul.kumar@mobiloitte.com, csu-green-team@mobiloitte.com,team-it@mobiloitte.com ,ravi.kumar@mobiloitte.com',
                         subject: 'PROJECT BUILD STATUS via JENKINS',
                         body: """<html>
                                    <head>
                                        <style>
                                            .build-status {
                                                color: ${BUILD_STATUS == 'SUCCESS' ? 'green' : 'red'};
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <p>Hello,</p>
                                        <b><p>This notification is to inform you about your project's build has been $BUILD_STATUS .</p></b>
                                        <ul>
                                            <li><strong>Project Name:</strong> $PROJECT_NAME</li>
                                            <li><strong>Build Status:</strong> <span class="build-status">$BUILD_STATUS</span></li>
                                            <li><strong>Build Number:</strong> $BUILD_NUMBER</li>
                                               <b><p> Please click on the URL to check sonar report of your project !!</p></b>
                                            <li><strong>SonarQube Report:</strong> http://172.16.0.200:9000/dashboard?id=ai-video-generator-scott-harris-23054103-reactjs-pune</li>

                                            <li><strong>Build Log:</strong> <b><p>Attached Below</p></b></li>
                                        </ul>
                                    </body>
                                </html>""",
                         mimeType: 'text/html',
                         attachLog: true
            }
        }
    }
}
