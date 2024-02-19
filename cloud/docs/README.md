# Cloud Technical Assessment

## Key Concepts

- Implement a viable CI-CD that automate deployments
- Design a scalable cloud architecture
- Implement the designed architecture into a cloud platform of your choose
- Justify the design decisions made, including budget, security, performance and scalability

## Resources

This is just a list of resources that are relevant. You don't have to go through all of them.

- [What is DevOps? REALLY understand it | DevOps vs SRE](https://www.youtube.com/watch?v=0yWAtQ6wYNM)
- [What is GitOps, How GitOps works and Why it's so useful](https://www.youtube.com/watch?v=f5EpcWp0THw)
- [DevOps CI/CD Explained in 100 Seconds](https://www.youtube.com/watch?v=scEDHsr3APg)
- [Containers on AWS Overview: ECS | EKS | Fargate | ECR](https://www.youtube.com/watch?v=AYAh6YDXuho&pp=ygUPYXdzIGVjcyBmYXJnYXRl)
- [What is Infrastructure as Code? Difference of Infrastructure as Code Tools](https://www.youtube.com/watch?v=POPP2WTJ8es)
- [Terraform Tutorial for Beginners + Labs: Complete Step by Step Guide!](https://www.youtube.com/watch?v=YcJ9IeukJL8&list=WL&index=44)
- [AWS ECS](https://aws.amazon.com/ecs/)

## Tasks

It is entirely up to you how you want to approach this cloud section. You do not have to deploy everything to the cloud. You have freedom to choose how you want to deploy. For instance, you can choose to containerise the applications and deploy them, make them serverless functions and deploy them, etc. However, you will need to justify all your choices in the end.

1. Set up a CI-CD pipeline that automates the deployment of the application.
    - Some examples of CI-CD tools are Github Actions, AWS CodeBuild, Google Cloud Build, Jenkins, Buildkite, etc.
2. Deploy applications to the cloud (using any infrastructure of code solution such as Terraform, Ansible, CloudFormation, etc. is preferred). You can choose any cloud platform of your choice.
3. The deployed software should work as expected. You will need to demonstrate the working software to the interviewers.
4. During the demonstration, the interviewers may ask questions related to the solution and you will need to justify decisions made.

## Considerations

- This is a **free-form assessment**. You can implement the cloud solutions to this problem in anyway that you see fit.
- DAQ wants to implement a local weather station collection system as the race engineers want to correlate local weather data with vehicle performance. The weather station will be set up on trackdays to monitor temperature, air, humidity, track temperature, wind, and wind direction.
- You can design the weather station to transmit data in any protocol you see fit.
- `Onboard Firmware` currently connects to the `streaming-service` via websocket
- Redback uses Terraform (Infrastructure as Code (IaC)) to deploy their systems. Write about how you would use Terraform to deploy the services required for the weather station.
- Consider where weather station data can be stored.
  - Currently, log files in the car are stored in S3 Buckets
