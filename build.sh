set -e
/usr/local/maven/apache-maven-3.8.1/bin/mvn clean install

docker build --build-arg IMAGE_TAG=1.9.0 -t registry.cn-qingdao.aliyuncs.com/datains/datains:v1.9.1 .

docker save -o datains-v1.9.1.tar.gz registry.cn-qingdao.aliyuncs.com/datains/datains:v1.9.1

#scp datains-v1.9.1.tar.gz root@192.168.3.67:/root

