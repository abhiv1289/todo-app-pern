import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckboxList from "../components/CheckboxList";
import { axiosInstance } from "../utility/axios";

const Todopage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const limit = 5;

  const handleAddTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await axiosInstance.post("/v1/todos/", {
        title: task,
        description: "",
      });
      setTasks((prev) => [...prev, res.data.data]);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskUpdate = (taskId, updatedData) => {
    if (updatedData === "delete") {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      return;
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updatedData } : t))
    );
  };

  const handleAllDelete = async () => {
    try {
      await axiosInstance.delete("/v1/todos/");
      setTasks([]);
    } catch (error) {
      console.error("Delete all error:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/v1/todos?page=${page}&limit=${limit}`
        );
        setTasks(res.data.data.todos);
        setPagination(res.data.data.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [page]);

  return (
    <Container sx={{ pt: 4, pb: 6 }}>
      {/* 🏷️ PAGE TITLE */}
      <Typography
        textAlign="center"
        sx={{
          fontSize: { xs: "1.6rem", sm: "2rem" },
          fontWeight: "bold",
          mb: 3,
          p: 2,
          bgcolor: "primary.main",
          color: "white",
          borderRadius: 2,
        }}
      >
        Manage Your Tasks
      </Typography>

      {/* ➕ INPUT AREA */}
      <Paper
        sx={{
          p: { xs: 2, sm: 3 },
          mb: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: "center",
        }}
        elevation={3}
      >
        <TextField
          fullWidth
          label={`${tasks.length + 1}. New Task`}
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTask}
          sx={{
            width: { xs: "100%", sm: "auto" },
            py: { xs: 1.2, sm: 1 },
          }}
        >
          Add Task
        </Button>
      </Paper>

      {/* ❌ CLEAR ALL */}
      <Button
        variant="outlined"
        color="error"
        fullWidth
        sx={{ mb: 3, py: { xs: 1, sm: 1.2 }, fontWeight: "bold" }}
        onClick={handleAllDelete}
      >
        ❌ Clear All
      </Button>

      {/* 📋 TASKS LIST */}
      {loading ? (
        <Typography textAlign="center" mt={3}>
          Loading...
        </Typography>
      ) : tasks.length === 0 ? (
        <Typography
          textAlign="center"
          color="text.secondary"
          sx={{ mt: 3, fontSize: { xs: "1rem", sm: "1.2rem" } }}
        >
          No tasks found. Add your first task above!
        </Typography>
      ) : (
        <CheckboxList tasks={tasks} onUpdate={handleTaskUpdate} />
      )}

      {/* 🔄 PAGINATION */}
      {tasks.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            disabled={!pagination?.hasPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
            sx={{ flex: 1 }}
          >
            Previous
          </Button>

          <Typography
            textAlign="center"
            sx={{ flex: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}
          >
            Page {pagination?.currentPage} of {pagination?.totalPages}
          </Typography>

          <Button
            variant="contained"
            disabled={!pagination?.hasNextPage}
            onClick={() => setPage((prev) => prev + 1)}
            sx={{ flex: 1 }}
          >
            Next
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Todopage;
