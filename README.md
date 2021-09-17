# Frequent Terms used in Container World

In the container world, number of terms or terminology used. We listen and use those terms on our daily life and also implement it in the project. But sometimes if someone suddenly ask about those words, we get confused and feel guilty because of unable to answer properly. That is the reason I am summerising some of the important terms together on this page so that we can memorize it quickly. 

Some of the important terms are as below:

#### Virtual Machine (VM), Container, Docker, Kubernete, Cluster, Nodes, Master Node, Worker Nodes, POD, Kubernete Service, Replication Controller or ReplicaSet and Auto Scaling

I am trying to arrange those terms as per their uses and sequence. 

## Virtual Machine (VM):

VM is a kind of a virtual server that you can connect remotely. VM contains whole Operating Systems with all its libraries like any other physical machine that make it heavy in GB in size.

To run an application web/window, you need a machine either (virtual or physical). Let say you have developed one application using React.JS and MySql. That means to run this application, you need a machine which must have Operating Systems (OS), React.JS environment and MySql Database or Service. To deploy this application, you need to setup a VM with these dependencies. After deploying this application on a VM, let say it is serving your purpose for the moment.

In future, if user/demand increase/decrease then definitely you need to scale or de-scale your infrastructure. In case of scale/de-scale or update your app with new version and so on are the very expensive, complex and time consuming task. Its complexity increase more when more than one applications share the common resources. And because of that, all other applications will also be down while upgrading one application. This problem is called as Dependency hell problem and to solve this problem, container come into the picture.

## Container:
A container is the next level of abstraction after virtual machines, in which each component of the whole application is individually packaged into a standalone unit. And each of these unit is called a container.

Containers only contains the required resources not all the resources unnecessary like VMs. That's why it is lighter than VM. In this way, we achieve full portability (the ability to run an app on any OS or environment) by separating code and app services from the underlying architecture.

So for our application, Operating Systems (Windows/Linux/Mac) is one unit (container). React.JS environment and its dependent libraries are second unit (container). MySQL platform and the database are third unit(container).

One important point here is, each container may depend on another container. Example - MySQL container depends on OS container and so on. This concept is called stacked containers. Means each container depends on their below container. Microservices also works on the same concept.

## Docker:
Docker is the most widely used platform to create and manage applications via containers.

## Kubernete:
Lets go back to the dependency hell problem once again, There we understand that container is the good option to scale/de-scale the application based on the demand. Number of users increase to access our application and to serve those request frequently, we can increase the number of containers and then employ the one or more load balancer. This is great and solve the purpose very well but only up to a certain limit.

Lets say number of users are keep increasing from hundreds to thousands to millions then we need dozens or hundreds of load-balancers, which is another headache in itself. To perform any update in the app will need a lot of effort to configure each load balancer.

So what is the solution now?? And the solution is Kubernete. With help of Kubernete, we can roll out all the changes across all containers in one go. Also with the help of Kubernete, we can easily spin-up, orchestrate, new ready-to-go containers whenever we need even in the automated manner.

## How Kubernete works:
Kubernete works on the basis on "Desired State" principle. Which means, whatever the desired state you define for your components. Kubernete engine will automatically take the responsibility to fulfil your desired state. 

For Example - Let say you want your web application to run on 4 containers and your database to run on 3 containers always. This is your desired state. If anyone of these 7 containers fails, the Kubernetes engine will detect this and automatically spin up a new container to ensure the desired state is maintained.

## Cluster:
Cluster is the first setup of the Kubernete. It is a kind of physical area. All other components are part of a cluster. One physical cluster may be divided into multiple virtual cluster, called "namespaces."

Creating the virtual cluster is very much similar to the creating a multiple virtual machines (VMs) on the same physical server. If you will not create any virtual cluster manually, one "default namespace" will be always created automatically.

## Nodes:
Kubernetes runs on nodes, which are individual machines within the cluster. Nodes may correspond to physical machines if you run your own hardware, but more likely correspond to virtual machines running in the cloud.

Nodes are where your application or service is deployed, where the work in Kubernetes gets done. There are 2 types of nodes – the "master node" and "worker nodes".

## Master Node:
Master Node is a special node that controls all the others. On the one hand, it’s a node like any other in the cluster, which means it’s just another machine or virtual instance. On the other hand, it runs the software that controls the rest of the cluster. It sends messages to all the other nodes in the cluster to assign work to them, and they report back via an "API Server" on the master.

The master node also itself contains a component called the "API Server". This API is the only endpoint for communication from the nodes to the control plane. The API Server is critically important because this is the point through which worker nodes and the master communicate about the status of pods, deployments, and all the other Kubernetes API objects.

## Worker nodes:
Worker nodes do the real work in Kubernetes. When you deploy containers or pods (to be defined shortly) in your application, you’re deploying them to be run on the worker nodes. Workers have the resources to host and run one or more containers.

## POD:
Kubernetes’ logical, not physical, unit of work is called a pod. A pod is some what similar to a container in Docker. A Kubernetes pod usually contains one or more Docker containers and all managed as a unit.

A pod allows you to take multiple containers and specify how they come together to create your application. And this further clarifies the relationship between Docker and Kubernetes.

Example: If you create a simple container with isolated units of work, then it can be run independently. But to create complex applications such as a web server, we often need to combine multiple containers, which then run and are managed together in one pod.

## Kubernete Service:
Kubernete service is a logical set/group of PODs which provides a single IP address and DNS name through which you can access all pods within the service. Kubernete service is very easy to set up and manage load balancing. It helps a lot when you need to scale in/out your Kubernetes pods.

## Replication Controller or ReplicaSet:
Replication Controller or ReplicaSet is another key feature of Kubernetes. It is the component responsible for actually managing the pod lifecycle – starting pods when instructed by the service or if pods go offline or are accidentally stopped, and also killing pods if the service instructs to do so, perhaps because of decreased user load.

So in other words, the replication controller helps achieve our desired state regarding the specified number of running pods.

## Auto Scaling
We can use Docker container directly for our purpose but we instead of using it directly we use it through Kubernete because Kubernetes has ability to autoscale the application based demands/workload. Autoscaling is achieved by setting up the cluster to increase the number of nodes when service demand increases, and also reduce the number of nodes when demand decreases.

## Note
Keep in mind that nodes are "physically" exist which means that our cloud platform must allow the Kubernetes engine to create new machines.

