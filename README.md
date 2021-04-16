# system-design

## What It Is
The back-end API that stores data for the Questions & Answers section of a retail website. The goal was to replace the existing API with a back end system that can support the existing data set and can scale to meet the demands of production traffic.

## Tools and Technologies
 - Express
 - Node
 - PostgreSQL
 - Docker
 - AWS (ec2)
 - Loader.io
 - New Relic
 - K6
 
 ## Process
 - Performed ETL using Node streams to validate and load 18 million rows of CSV data. Validation includes using pattern-matching with regex to validate email addresses
 - Created PostgreSQL compound indexes to optimize query speeds containing aggregate functions that returned data in nested JSON objects, reducing initial query speed of 750ms to 0.127ms
 - Containerized services with Docker to deploy server and database across multiple AWS ec2 micro instances
 - Repeated stress-tests with loader.io and scaled system to support 0 – 10,000rps in 20 seconds with 0% error rate
 
 ## Set Up (With 2 EC2 Instances)
 - In the first instance, run Docker-Compose file inside pg-image folder or pull latest PostgreSQL docker image (expose port 5432)
 - Use AWS S3 to upload large, cleaned CSV files to a bucket. Transfer files into EC2 Ubuntu host. (Sorry, data isn't shared publicly on github)
 - Use Docker Copy to copy files into first instance running PostgreSQL
 - Pull latest web server image from Dockerhub (audreee/sdc_modular)
 - In the second instance, run the Docker-Compose file inside the server-image folder to spin up a web server container
 - Navigate to port 3000 (or you can redirect traffic by running ```sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000```)
 - Test out the functioning back end by typing valid routes into the URL or by using Postman
