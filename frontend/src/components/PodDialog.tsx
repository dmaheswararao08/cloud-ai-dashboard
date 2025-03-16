import { Dialog, DialogTitle, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";

interface Pod {
  podName: string;
  status: string;
  logs: string;
}

interface PodDialogProps {
  open: boolean;
  onClose: () => void;
  serviceName: string | null;
  pods: Pod[];
}

const PodDialog: React.FC<PodDialogProps> = ({ open, onClose, serviceName, pods }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Pods for {serviceName || "Service"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {pods.length === 0 ? (
          <Typography variant="body1">No pods available.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Pod Name</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Logs</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pods.map((pod, index) => (
                  <TableRow key={index}>
                    <TableCell>{pod.podName}</TableCell>
                    <TableCell>
                      <Chip
                        label={pod.status}
                        color={pod.status === "Running" ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>{pod.logs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PodDialog;
