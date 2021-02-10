# accubits machine test

accubits by using mongo and node.js

RUN NODE JS:
node .\server.jS

RUN RabbitMQ:
node ./email/emailWorker.js consumeMessage

please configure details in .env
configuration :

MONGODB_URI=mongodb://localhost/accubits

AWS_ACCESS_KEY_ID='YOUR_AWS_ID'	

AWS_SECRET_ACCESS_KEY='YOUR_AWS_SECRET_KEY'

AMQP_SERVER= amqp://localhost

SMTP_ADDRESS='<SMTP>'
  
PORT='<PORT>'
  
USER_NAME='<USER NAME>'
  
PASSWORD='<PASSWORD>'
  
FROM='<FROM>'
