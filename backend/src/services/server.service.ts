import { InstancesClient } from "@google-cloud/compute";
import { Server } from "socket.io";
import { ClusterManagerClient } from "@google-cloud/container";

const containerClient = new ClusterManagerClient();
const computeClient = new InstancesClient();

export interface Pod {
  podName: string;
  status: string;
  logs: string;
}

// ✅ Get Running Servers
export const getRunningServersService = async (
  projectId: string,
  zone: string,
) => {
  try {
    const [response] = await containerClient.listClusters({
      parent: `projects/${projectId}/locations/-`, // Fetch all locations
    });

    if (!response.clusters) return [];

    // Fetch pod count for each cluster
    const clusterData = await Promise.all(
      response.clusters.map(async (cluster) => {
        const podCount = await getPodCount(
          cluster.name || "",
          "us-central1",
          projectId,
        );
        return {
          name: cluster.name,
          status: cluster.status,
          podCount:2,
        };
      }),
    );

    return clusterData;
  } catch (error) {
    console.error("❌ Error fetching clusters:", error);
    throw error;
  }
};

// Function to get pod count using `kubectl`
const getPodCount = async (
  clusterName: string,
  zone: string,
  projectId: string,
): Promise<number> => {
  try {
    const k8s = await import("@kubernetes/client-node");
    const namespace = "default";
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    ;
    kc.setCurrentContext(`gke_${projectId}_${zone}_${clusterName}`);
    const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
    const response = await k8sApi.listNamespacedPod(namespace);
    console.log(`📦 Pod count for ${clusterName}:`, response.body.items.length);
    return response.body.items.length;
  } catch (error) {
    console.error(`❌ Error fetching pod count for ${clusterName}:`, error);
    return 0;
  }
};

// ✅ Start a VM
export const startVM = async (
  projectId: string,
  zone: string,
  instanceName: string,
  io: Server,
) => {
  try {
    const [operation] = await computeClient.start({
      project: projectId,
      zone,
      instance: instanceName,
    });

    console.log(`🚀 Starting VM: ${instanceName}...`);
    await operation.promise();

    io.emit("updateServers", await getRunningServersService(projectId, zone)); // Emit update
    return { message: `VM ${instanceName} started successfully.` };
  } catch (error) {
    console.error(`❌ Error starting VM ${instanceName}:`, error);
    throw error;
  }
};

// ✅ Stop a VM
export const stopVM = async (
  projectId: string,
  zone: string,
  instanceName: string,
  io: Server,
) => {
  try {
    const [operation] = await computeClient.stop({
      project: projectId,
      zone,
      instance: instanceName,
    });

    console.log(`🛑 Stopping VM: ${instanceName}...`);
    await operation.promise();

    io.emit("updateServers", await getRunningServersService(projectId, zone)); // Emit update
    return { message: `VM ${instanceName} stopped successfully.` };
  } catch (error) {
    console.error(`❌ Error stopping VM ${instanceName}:`, error);
    throw error;
  }
};

// ✅ Scale Up: Create a New Instance
export const scaleUpVM = async (
  projectId: string,
  zone: string,
  templateInstance: string,
  io: Server,
) => {
  try {
    const instanceName = `${templateInstance}-clone-${Date.now()}`;
    const [operation] = await computeClient.insert({
      project: projectId,
      zone,
      instanceResource: {
        name: instanceName,
        machineType: `zones/${zone}/machineTypes/e2-medium`,
        disks: [
          {
            boot: true,
            autoDelete: true,
            initializeParams: {
              sourceImage:
                "projects/debian-cloud/global/images/family/debian-11",
            },
          },
        ],
        networkInterfaces: [{ network: "global/networks/default" }],
      },
    });

    console.log(`➕ Scaling up: Creating new VM ${instanceName}...`);
    await operation.promise();

    io.emit("updateServers", await getRunningServersService(projectId, zone)); // Emit update
    return { message: `VM ${instanceName} created successfully.` };
  } catch (error) {
    console.error(`❌ Error scaling up VM:`, error);
    throw error;
  }
};

// ✅ Scale Down: Delete an Instance
export const scaleDownVM = async (
  projectId: string,
  zone: string,
  instanceName: string,
  io: Server,
) => {
  try {
    const [operation] = await computeClient.delete({
      project: projectId,
      zone,
      instance: instanceName,
    });

    console.log(`➖ Scaling down: Deleting VM ${instanceName}...`);
    await operation.promise();

    io.emit("updateServers", await getRunningServersService(projectId, zone)); // Emit update
    return { message: `VM ${instanceName} deleted successfully.` };
  } catch (error) {
    console.error(`❌ Error scaling down VM ${instanceName}:`, error);
    throw error;
  }
};

export const getPodsByService = async (serviceName: string): Promise<Pod[]> => {
  // Mock data - Replace with actual DB/API calls
  const pods: Pod[] = [
    { podName: "pod-1", status: "Running", logs: "Pod started successfully" },
    { podName: "pod-2", status: "Stopped", logs: "Pod stopped due to error" },
  ];

  return pods;
};

// export const getPodsInClusterService = async (clusterName: string) => {
//   try {
//     const kc = new k8s.KubeConfig();
//     kc.loadFromDefault();

//     const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//     const response = await k8sApi.listPodForAllNamespaces();

//     return response.items.map((pod) => ({
//       podName: pod.metadata?.name,
//       status: pod.status?.phase,
//       namespace: pod.metadata?.namespace,
//     }));
//   } catch (error) {
//     console.error("❌ Error fetching pods:", error);
//     throw error;
//   }
// };
