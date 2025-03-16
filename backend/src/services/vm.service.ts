import { InstancesClient } from "@google-cloud/compute";

const computeClient = new InstancesClient();

export const stopVirtualMachine = async (vmName: string, zone: string, projectId: string) => {
  try {
    const request = {
      project: projectId,
      zone: zone,
      instance: vmName,
    };

    console.log(`Stopping VM: ${vmName}`);
    const [operation] = await computeClient.stop(request);
    await operation.promise();
    console.log(`VM ${vmName} has been stopped.`);
  } catch (error) {
    console.error("Error stopping VM:", error);
    throw error;
  }
};
