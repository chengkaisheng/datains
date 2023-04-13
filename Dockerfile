FROM registry.cn-qingdao.aliyuncs.com/datains/fabric8-java-alpine-openjdk8-jre:edge-chromium

ARG IMAGE_TAG

RUN mkdir -p /opt/apps /opt/datains/data/feature/full /opt/datains/drivers

ADD mapFiles/* /opt/datains/data/feature/full/

ADD drivers/* /opt/datains/drivers/

ADD backend/target/backend-$IMAGE_TAG.jar /opt/apps

ENV JAVA_APP_JAR=/opt/apps/backend-$IMAGE_TAG.jar

ENV AB_OFF=true

ENV JAVA_OPTIONS=-Dfile.encoding=utf-8

HEALTHCHECK --interval=15s --timeout=5s --retries=20 --start-period=30s CMD curl -f 127.0.0.1:8081

CMD ["/deployments/run-java.sh"]
