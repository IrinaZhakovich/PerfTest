node {

//  stage('clone git repo'){

//  git 'https://github.com/IrinaZhakovich/PerfTest.git'

//  }

 

//  stage('configure') {

//         sh "mkdir $WORKSPACE/$BUILD_NUMBER/"

//     }

 

 
 stage('run test'){

//  sh "mkdir /tmp/reports"

 bat "cd C:/Tools/apache-jmeter-5.5/apache-jmeter-5.5/bin"

      bat "jmeter -n -t C:/Tools/apache-jmeter-5.5/apache-jmeter-5.5/bin/templates/Task2_Test_Plan2.jmx -l C:/Tools/apache-jmeter-5.5/apache-jmeter-5.5/bin/Logs123.jtl -e -o C:/Tools/apache-jmeter-5.5/apache-jmeter-5.5/bin/HtmlReport1"

 }

 

//  stage('publish results'){

//  sh "mv /tmp/reports/* $WORKSPACE/$BUILD_NUMBER/"

//  archiveArtifacts artifacts: '$WORKSPACE/$BUILD_NUMBER/JMeter.jtl, $WORKSPACE/$BUILD_NUMBER/HtmlReport/index.html'

//     } 

  }

// test

