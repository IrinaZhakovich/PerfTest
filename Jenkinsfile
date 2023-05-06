pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Clone your Git repository
                git branch: 'main', url: 'https://github.com/OliaMychko/JmeterReport.git'
            }
        }

        stage('Build') {
            steps {
                // Set the CSP property to enable JavaScript in the Jenkins UI
                script {
                    System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
                }
                
                // Run your JMeter script using the 'jmeter' command
                // with appropriate options and parameters, including the output format property
                timeout(time: 10, unit: 'MINUTES') {
                    sh 'jmeter -Jjmeter.save.saveservice.output_format=csv -Jjmeter.save.saveservice.print_field_names=true -n -t ${WORKSPACE}/MyTestPlanCorrected.jmx -l ${WORKSPACE}/results.jtl -Jusers=5'
                }

            }
        }

        stage('Publish Report') {
            steps {
                // Convert JMeter test results to an HTML report
                sh 'jmeter -g ${WORKSPACE}/results.jtl -o ${WORKSPACE}/html-report'

                // Archive the HTML report as an artifact in Jenkins
                archiveArtifacts artifacts: 'html-report/**/*', fingerprint: true
            }
        }
    }
}
