import { InstancesClient } from "@google-cloud/compute";
import { Server } from "socket.io";

const computeClient = new InstancesClient();

export interface Pod {
  podName: string;
  status: string;
  logs: string;
}

// ✅ Get Running Servers
export const getRunningServersService = async (projectId: string, zone: string) => {
  try {
    const [instances] = await computeClient.list({
      project: projectId,
      zone: zone,
    });

    return instances
      ? instances.map((vm) => ({
          name: vm.name,
          status: vm.status,
        }))
      : [];
  } catch (error) {
    console.error("❌ Error fetching running VMs:", error);
    throw error;
  }
};

// ✅ Start a VM
export const startVM = async (projectId: string, zone: string, instanceName: string, io: Server) => {
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
export const stopVM = async (projectId: string, zone: string, instanceName: string, io: Server) => {
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
export const scaleUpVM = async (projectId: string, zone: string, templateInstance: string, io: Server) => {
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
              sourceImage: "projects/debian-cloud/global/images/family/debian-11",
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
export const scaleDownVM = async (projectId: string, zone: string, instanceName: string, io: Server) => {
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