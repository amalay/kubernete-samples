# Simple NodeJS App With Kubernete

## Learning Steps


### Code setup from github
1. Clone the repository from https://github.com/amalay/kubernete-samples/tree/main/node-simple
2. Start Visual Studio Code and open go to the "node-simple" folder
3. Run npm install on your terminal to install the required packages.
4. Open Docker Dektop at your local machine. If it not install then install it first.

Required packages and commands to install
> npm install express --save-dev

> npm install nodemon --save-dev

> npm install body-parser --save-dev

> npm install dotenv --save

### Create docker image of your app
You can below command on any terminal to build docker image.
``` 
> "docker build -t <IMAGE NAME> ." Ex: "docker build -t avimg-kubernete-node-simple". It will take a default tag as latest automatically.
```

OR
```
> "docker build -t <DOCKER HUB ACCOUNT ID>/<REPO NAME>:<TAG NAME> ."	Ex: "docker build -t amalayverma/avimg-kubernete-node-simple[:latest] ."
```

Once docker image is created successfully, you can see it in your Docker Desktop.

### Publish your docker image to your Docker hub
Before publishing your docker image to your Docker hub, you have to login to docker hub by executing below command:
> docker login

After successfull login to Docker hub, you can execute the below command to push your image to your Docker hub:
> "docker push `<DOCKER HUB ACCOUNT ID>`/`<YOUR IMAGE NAME>`:`<TAG NAME>`"    Ex: "docker push amalayverma/avimg-kubernete-node-simple:latest"

After successfull execution of this command, you can see your image into your Docker hub under Repositories section. You can also see it in your Docker Desktop under Remote Repositories section as below:


### Deploy your docker image to Kubernete cluster
Before deploying your docker image to Kubernete cluster, you have create secret key to access your Docker hub then you can use this secret key to deploy your docker image to kubernete as below:

> kubectl create secret docker-registry `<SECRET NAME>` --docker-server = `<YOUR REGISTRY SERVER>` --docker-username = `<YOUR DOCKER HUB ID>` --docker-password = `<YOUR DOCKER HUB PASSWORD>` --docker-email = `<YOUR DOCKER HUB EMAIL>`

1. `<SECRET NAME>`: You can give any name.
2. `<YOUR REGISTRY SERVER>`: It si your Private Docker Registry FQDN. You can use https://index.docker.io/v2/ for DockerHub.
3. `<YOUR DOCKER HUB ID>`: Your docker hub id/username.
4. `<YOUR DOCKER HUB PASSWORD>`: Your docker hub password. But if 2FA enabled on your then you have to create Personal Access Token (PAT) and use it as a password here.
5. `<YOUR DOCKER HUB EMAIL>`: Your docker hub email id.

Example:
> kubectl create secret docker-registry mydockerhubsecretkey --docker-server=https://index.docker.io/v2/ --docker-username=xxxxx --docker-password=849x19xx-4757-42xx-x710-47x8x37xxx7a --docker-email=xxxx@xxxxx.com

Once secret key is created, you can see it by executing below command:

> kubectl get secret mydockerhubsecretkey --output=yaml

Output:
``` json
apiVersion: v1
data:
  .dockerconfigjson: eyJhdsadsad6eyJodHRwczovL2luZGV4dasdasdasdMi8iOnsidXNlcm5qweqweWFsYXl2ZXJtYSIsInBhc3N3b3JkIjoiMTQ2YTE5YmUtNTc0Ny00OWFiLWI3NzSADFSDFVSDFSDFSFSFW1haWwiOiJhbWFsYXl2ZXJtYUBvdXRsb29rLmNvasdasdsaiJZVzFoYkdGNWasdasdasd2TVRRMllURTVZbVV0TlRjME55MDBPV0ZpTFdJM056QSDSDSDSDhaalpoIn19fQ==
kind: Secret
metadata:
  creationTimestamp: "2021-08-08T12:52:39Z"
  name: mydockerhubsecretkey
  namespace: default
  resourceVersion: "106853"
  uid: 69f4asde345-2687-42424-a317-40e9324dsf36c5
type: kubernetes.io/dockerconfigjson
```

Now you can use this secret key (mydockerhubsecretkey) in your <b>deployment.yaml</b> file as below:

``` json
# We can define "app deployment" and "service deployment" scripts in two seperate files (Ex. "deployment-app.yaml" and "deployment-service.yaml") or
# We can also merge both scripts in single file (Ex. "deployment.yaml") as below:

apiVersion: apps/v1
kind: Deployment
metadata:
  name: node-app-deployment # You can give any name.
  labels:
    app: node-simple  # You can give any name
spec:
  replicas: 1 # How many instance do you want to replicate for this app on Kubernete cluster? Ex. 1 or 2 or 3 and so on.
  selector:
    matchLabels:
      app: node-simple  # You can give any name
  template:
    metadata:
      labels:
        app: node-simple  # You can give any name
    spec:
      containers:
      - name: avcon-kubernete-node-simple # You can give any name. 
        # Set docker image path (Ex. Docker hub path or Github container registry path or local path) where image exist.
        image: amalayverma/avimg-kubernete-node-simple:latest # Point to Docker hub image
        # image: ghcr.io/amalay/avimg-kubernete-node-simple:latest # Point to Github container registry.
        # image: http://localhost/avimg-kubernete-node-simple # Point to local docker desktop image        
        ports:
        - containerPort: 3000 # You can give any port
      imagePullSecrets:
        - name: mydockerhubsecretkey # Secret key to access private docker hub image
---
apiVersion: v1
kind: Service
metadata:
  name: node-app-service  # You can give any name
spec:
  selector:
    app: node-simple  # You can give any name
  type: LoadBalancer
  ports:
  - protocol: TCP
    port: 3000
    targetPort: 3000
    nodePort: 31110
```

### Access image from docker hub and deploy to Kubernete cluster

To deploy your image onto Kubernete, you have to execute below command:

> "kubectl create -f deployment.yaml --save-config" OR "kubectl apply -f deployment.yaml"

Output
``` json
deployment.apps/node-app-deployment created
service/node-app-service created
```

After successfull execution of this command you can execute below command to check it:

> "kubectl get deployments."

Output:

``` json
NAME                  READY   UP-TO-DATE   AVAILABLE   AGE
node-app-deployment   1/1     1            1           48m
```

> "kubectl get pods"

Output:
``` json
NAME                                 READY   STATUS              RESTARTS   AGE
node-app-deployment-76758f6b-hppgz   0/1     ContainerCreating   0          5s
```

To see in more detail, you can execute below command:

> "kubectl describe pod node-app-deployment-76758f6b-hppgz"

Output:
``` json
Name:         node-app-deployment-76758f6b-hppgz
Namespace:    default
Priority:     0
Node:         docker-desktop/192.168.65.4
Start Time:   Sun, 08 Aug 2021 19:51:10 +0530
Labels:       app=node-simple
              pod-template-hash=76758f6b
Annotations:  <none>
Status:       Running
IP:           10.1.0.61
IPs:
  IP:           10.1.0.61
Controlled By:  ReplicaSet/node-app-deployment-76758f6b
Containers:
  avcon-kubernete-node-simple:
    Container ID:   docker://9fsdfsfad58b601792d1fb64dsfsdfa34f8b1bdsdfsdf4d70933cf
    Image:          amalayverma/avimg-kubernete-node-simple:latest
    Image ID:       docker-pullable://amalayverma/avimg-kubernete-node-simple@sha256:9csdffsdfe35152888sdfsdfsf09cd86be5ff1sdfsdfsd3516sdfsdfsdf716b
    Port:           3000/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Sun, 08 Aug 2021 19:51:18 +0530
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-mgmcj (ro)
Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True
Volumes:
  kube-api-access-mgmcj:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  28s   default-scheduler  Successfully assigned default/node-app-deployment-76758f6b-hppgz to docker-desktop
  Normal  Pulling    28s   kubelet            Pulling image "amalayverma/avimg-kubernete-node-simple:latest"
  Normal  Pulled     21s   kubelet            Successfully pulled image "amalayverma/avimg-kubernete-node-simple:latest" in 7.7368407s
  Normal  Created    21s   kubelet            Created container avcon-kubernete-node-simple
  Normal  Started    21s   kubelet            Started container avcon-kubernete-node-simple
```

> "kubectl get pod --watch"

Output:
``` json
NAME                                 READY   STATUS    RESTARTS   AGE
node-app-deployment-76758f6b-hppgz   1/1     Running   0          49m
```

> "kubectl logs `<POD NAME>`"     Ex: "kubectl logs node-app-deployment-76758f6b-hppgz"

Output:

``` json
Server is listening on port 3000
```

To see the services, you can execute the below command:

> "kubectl get service"

Output:
``` json
NAME               TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes         ClusterIP      10.96.0.1       <none>        443/TCP          6d
node-app-service   LoadBalancer   10.111.224.64   localhost     3000:31110/TCP   51s
```

Now to test this application, you can open the browser and navigate to http://localhost:3000 and you will see the result.


Finally you can destroy the service by running the below command:

> "kubectl delete -f deployment.yaml"

Output:

``` json
deployment.apps "node-app-deployment" deleted
service "node-app-service" deleted
```
