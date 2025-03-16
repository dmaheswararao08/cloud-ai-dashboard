export const getServiceLogs = async (serviceName: string) => {
    const logs: { [key: string]: string[] } = {
      "Service A": ["Started", "Running", "No errors"],
      "Service B": ["Restarted", "CPU usage high"],
      "Service C": ["Crashed", "Memory Leak detected"],
    };
    return logs[serviceName] || ["No logs found for this service."];
  };
  