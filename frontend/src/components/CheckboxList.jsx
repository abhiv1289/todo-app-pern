import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Collapse from "@mui/material/Collapse";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { axiosInstance } from "../utility/axios.js";
import { Box } from "@mui/material";

export default function CheckboxList({ tasks, onUpdate }) {
  const [expanded, setExpanded] = React.useState(null);
  const [editData, setEditData] = React.useState({});

  const handleToggle = async (task) => {
    const updatedCompleted = !task.is_completed;
    try {
      await axiosInstance.put(`/v1/todos/${task.id}`, {
        is_completed: updatedCompleted,
      });
      onUpdate(task.id, { is_completed: updatedCompleted });
    } catch (error) {
      console.error("Checkbox update error:", error);
    }
  };

  const toggleExpand = (task) => {
    setExpanded(expanded === task.id ? null : task.id);
    setEditData({
      title: task.title,
      description: task.description ?? "",
      is_completed: task.is_completed,
    });
  };

  const handleDelete = async (taskId) => {
    try {
      await axiosInstance.delete(`/v1/todos/${taskId}`);
      onUpdate(taskId, "delete");
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSave = async (taskId) => {
    try {
      await axiosInstance.put(`/v1/todos/${taskId}`, editData);
      onUpdate(taskId, editData);
      setExpanded(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 480 },
        mx: "auto",
        px: { xs: 1, sm: 0 },
      }}
    >
      {tasks.map((task) => (
        <React.Fragment key={task.id}>
          {/* 📝 Task Row */}
          <ListItem
            sx={{
              backgroundColor: "#fafafa",
              borderRadius: 2,
              mb: 1.5,
              px: { xs: 1, sm: 2 },
              py: { xs: 0.5, sm: 1 },
              display: "flex",
              flexWrap: "wrap",
            }}
            secondaryAction={
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  aria-label="edit-description"
                  onClick={() => toggleExpand(task)}
                  size="small"
                >
                  <CommentIcon fontSize="small" />
                </IconButton>

                <IconButton
                  aria-label="delete-task"
                  onClick={() => handleDelete(task.id)}
                  size="small"
                >
                  <DeleteIcon color="error" fontSize="small" />
                </IconButton>
              </Box>
            }
          >
            <ListItemButton dense sx={{ pr: 10 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Checkbox
                  checked={task.is_completed}
                  onChange={() => handleToggle(task)}
                  sx={{ px: 0 }}
                />
              </ListItemIcon>

              <ListItemText
                primary={task.title}
                sx={{
                  textDecoration: task.is_completed ? "line-through" : "none",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* 🔽 Editable Dropdown Section */}
          <Collapse
            in={expanded === task.id}
            timeout="auto"
            unmountOnExit
            sx={{ mb: 2 }}
          >
            <Paper
              elevation={2}
              sx={{
                p: { xs: 2, sm: 3 },
                mx: { xs: 0, sm: 1 },
                borderLeft: "4px solid #1976d2",
                borderRadius: 2,
              }}
            >
              <TextField
                fullWidth
                label="Edit Title"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                sx={{ mb: 2 }}
                size="small"
              />

              <TextField
                fullWidth
                multiline
                minRows={2}
                label="Edit Description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                size="small"
              />

              <Button
                variant="contained"
                fullWidth
                onClick={() => handleSave(task.id)}
                sx={{
                  mt: 2,
                  py: { xs: 1, sm: 1.2 },
                  fontWeight: "bold",
                }}
              >
                💾 Save Changes
              </Button>
            </Paper>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
}
