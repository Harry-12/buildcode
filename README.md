yq e '.spec.template.spec.containers[].env[] | select(.value == "icr.io/**").value' deployment.yaml
INTERNAL_REPO=ocp.artifactory.org
IMAGE_PREFIX=${INTERNAL_REPO}/ibm-license
docker login ${INTERNAL_REPO} --username ${ARTIFACTORY_USR} --password ${ARTIFACTORY_PSW}
for i in `cat images.txt`; do 
    echo docker image pull $i; 
    echo docker tag $i ${IMAGE_PREFIX}/${i};
    echo docker push ${IMAGE_PREFIX}/${i}
done# buildcode
