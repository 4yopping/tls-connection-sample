First create a pem file if you don't have one use:

````shell
openssl genrsa -out sample-key.pem 2048
openssl req -new -sha256 -key sample-key.pem -out sample-csr.pem
openssl x509 -req -in sample-csr.pem -signkey sample-key.pem -out sample-cert.pem
````

Do the same for your client as follows:

````shell
openssl genrsa -out client-key.pem 2048
openssl req -new -sha256 -key client-key.pem -out client-csr.pem
openssl x509 -req -in client-csr.pem -signkey client-key.pem -out client-cert.pem
````
