sqp_353bf8f09738d3da00757f8d6e7120f5e7641407



sonar-scanner \
  -Dsonar.projectKey=sps \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://54.175.148.241:9000 \
  -Dsonar.token=sqp_353bf8f09738d3da00757f8d6e7120f5e7641407


  ./bin/linux-x86-64/sonar.sh start

username: admin
password: databasepassword123


cmd to connect : 
    mysql -h database-1.ch5xfq1yvx7p.us-east-1.rds.amazonaws.com -P 3306 -u admin -p


jenkin:
username: shivanshudev
password: Itone@123

docker build --no-cache -t backend .
 sudo docker run -p 3000:80 frontend:latest

sudo docker run -p 8081:8081 -e NODE_ENV=production -e DB_HOST=host.docker.internal backend:latest


/home/ubuntu/sonar-scanner-6.2.0.4584-linux-x64/bin/sonar-scanner -Dsonar.projectKey=sps -Dsonar.projectName=sps -Dsonar.projectVersion=1.0 -Dsonar.sources=server -Dsonar.tests=server -Dsonar.test.inclusions=server/*.test.js -Dsonar.javascript.lcov.reportPaths=server/coverage/lcov.info -Dsonar.host.url=http://54.175.148.241:9000 -Dsonar.token=sqp_353bf8f09738d3da00757f8d6e7120f5e7641407