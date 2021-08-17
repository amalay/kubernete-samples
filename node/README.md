# Configure CI/CD pipelines with Azure DevOps

Lets say you have already checked-in your project in Azure DevOps as below:

![image](https://user-images.githubusercontent.com/84455469/129723328-a9171504-ffc7-449b-82fd-4a9ecb78c256.png)

Go to pipelines and click on new pipeline and select Azure Repos Git as below:

![image](https://user-images.githubusercontent.com/84455469/129724534-666e73d1-c82e-405d-ba84-8951a1cc6eb2.png)

Select your repository and then select Deploy to Azure Kubernet Service as below:

![image](https://user-images.githubusercontent.com/84455469/129724945-679bffb1-0ad4-4f35-ae9b-aa347c6718fe.png)

It will aks you to select your azure subscription which you want to use for it. Then you have to select cluster, namespace, container registry. After that you enter image name and port number as per your choice. Finally click on Validate and Configure button as below:

![image](https://user-images.githubusercontent.com/84455469/129727088-41edc381-e4fb-4f0d-90ac-d01f3eee8527.png)

It will do some processing in the backend and create an Enviornment, Service Connection for Container Registry and Service Connection for Kubernete Service and couple of yaml files as below:

##### Enviornment
![image](https://user-images.githubusercontent.com/84455469/129727885-5d02b41a-87a1-415a-8cb7-a233c701a109.png)

##### Service Connections
![image](https://user-images.githubusercontent.com/84455469/129728416-83952a5e-0255-48d4-8d70-a327d261fa75.png)

##### YAML Files
1. azure-pipeline.yml
2. deployment.yml
3. service.yml

Once processing is done, it will show you YAML code in "azure-pipelines.yml" and ask you to Save it or Save and Run it as below:

![image](https://user-images.githubusercontent.com/84455469/129727540-cd077768-bd9c-42d3-ac71-6d20e79ec2f4.png)

If you click on Save or Save and Run button, it will present below screen to checked-in comments and branch. After that it will be saved or saved and run based on your selection as below:

![image](https://user-images.githubusercontent.com/84455469/129728809-fe3a68d5-9bff-4b7b-b898-34147344197a.png)

I have saved all the .ymls file in one folder call manifests in the project.

While creating the service connections, it take the name automatically but if you want to give your name according to your choice then you can edit both service connection and rename it.

Ex. MyContainerServiceConnection, MyKuberneteServiceConnection

After renaming, you have to update this name in the azure-pipeline.yml file as well. You can also give value of imagePullSecret as per your choice as below:

![image](https://user-images.githubusercontent.com/84455469/129732452-46b42d74-4a61-4a50-b7b6-63e1b8629cb1.png)

Once you run your build and release pipeline successfully, you will see the below screen:

![image](https://user-images.githubusercontent.com/84455469/129733843-eecea4ca-efdf-4f50-85cb-64ef96601a86.png)

