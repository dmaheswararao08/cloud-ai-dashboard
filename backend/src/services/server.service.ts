import { InstancesClient } from "@google-cloud/compute";

const computeClient = new InstancesClient();

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
    console.error("Error fetching running VMs:", error);
    throw error;
  }
};
