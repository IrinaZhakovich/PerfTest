node {

//  stage('clone git repo'){

//  git 'https://github.com/IrinaZhakovich/PerfTest.git'

//  }

 

//  stage('configure') {

//         sh "mkdir $WORKSPACE/$BUILD_NUMBER/"

//     }

 

 stage('run test'){

//  sh "mkdir /tmp/reports"

//  sh "C:/Tools/apache-jmeter-5.5/apache-jmeter-5.5/bin/jmeter -n -t C:/Tools/apache-jmeter-5.5/apache-jmeter-5.5/bin/templates/Task2_Test_Plan2.jmx-l C:/Tools/apache-jmeter-5.5/apache-jmeter-5.5/bin/TestResults05.5.jtl"

//  }
 
 stage('run test'){

 sh "mkdir /tmp/reports"

 sh "cd C:\Tools\apache-jmeter-5.5\apache-jmeter-5.5/bin"

      sh "jmeter -Jjmeter.save.saveservice.output_format=xml

          -n -t C:\Tools\apache-jmeter-5.5\apache-jmeter-5.5\bin\templates\Task2_Test_Plan2.jmx

            -l /tmp/reports/JMeter.jtl -e -o /tmp/reports/HtmlReport"

 }

 

//  stage('publish results'){

//  sh "mv /tmp/reports/* $WORKSPACE/$BUILD_NUMBER/"

//  archiveArtifacts artifacts: '$WORKSPACE/$BUILD_NUMBER/JMeter.jtl, $WORKSPACE/$BUILD_NUMBER/HtmlReport/index.html'

//     } 

  }
// test

