import { Logging } from "@google-cloud/logging";

const logging = new Logging();

export const getGkeClusterLogs = async (projectId: string, clusterName: string) => {
    try {
        const logName = `projects/${projectId}/logs/kubernetes`;
        const filter = `resource.type="k8s_container" AND resource.labels.cluster_name="${clusterName}"`;
        const entries = await logging.getEntries({
            filter,
            orderBy: "timestamp desc",
            pageSize: 10, // Fetch latest 10 logs
        });
        console.log(entries)
        return entries[0].map(entry => ({
            timestamp: entry.metadata.timestamp,
            message: entry.data?.message || JSON.stringify(entry.data),
        }));
    } catch (error) {
        console.error("❌ Error fetching GKE logs:", error);
        throw error;
    }
};
