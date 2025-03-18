import { useState } from "react";
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography 
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { styled } from "@mui/material/styles";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "& th": {
        color: theme.palette.common.white,
        fontWeight: "bold",
    },
}));

const mockVMData = [
    { id: 1, name: "vm-instance-1", ip: "34.120.10.15", status: "RUNNING" },
    { id: 2, name: "vm-instance-2", ip: "35.221.5.21", status: "TERMINATED" },
];

const DeveloperResources = () => {
    const [vmData, setVmData] = useState(mockVMData);

    const handleVmAction = (id: number, currentStatus: string) => {
        const updatedVMs = vmData.map((vm) =>
            vm.id === id ? { ...vm, status: currentStatus === "RUNNING" ? "TERMINATED" : "RUNNING" } : vm
        );
        setVmData(updatedVMs);
    };

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>Developer Resources</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            <TableCell>VM Name</TableCell>
                            <TableCell>VM IP</TableCell>
                            <TableCell>VM Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {vmData.map((vm) => (
                            <TableRow key={vm.id}>
                                <TableCell>{vm.name}</TableCell>
                                <TableCell>{vm.ip}</TableCell>
                                <TableCell>{vm.status}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color={vm.status === "RUNNING" ? "error" : "primary"}
                                        onClick={() => handleVmAction(vm.id, vm.status)}
                                    >
                                        {vm.status === "RUNNING" ? <StopIcon /> : <PlayArrowIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DeveloperResources;
