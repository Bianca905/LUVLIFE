# Depolyment

1. AWS Setup
    - EC2
    - Elastic IP
    - Security Group -> Inbould -> Custom TCP 8080 Anywhere

2. SSH
    - VSCode -> Extensions -> Remote-SSH
    - ssh -i .\final-project.pem ubuntu@3.1.38.128

3. Ubuntu Update / Package Install
    - sudo su
    - apt-get update -y && apt-get upgrade -y
    - apt-get install docker.io