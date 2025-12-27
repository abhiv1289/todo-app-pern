import { Button, Checkbox, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Check } from "lucide-react";
import CheckboxList from "../components/CheckboxList";
import { axiosInstance } from "../utility/axios";
const Todopage = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const limit = 5;
  const handleAddTask = async (task) => {
    try {
      const res = await axiosInstance.post("/v1/todos/", {
        title: task,
        description: "",
      });
      console.log(res);

      setTasks((prev) => [...prev, res.data.data]);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/v1/todos?page=${page}&limit=${limit}`
        );
        console.log(res);
        setTasks(res.data.data.todos);
        setPagination(res.data.data.pagination);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [page, tasks.length]);
  return (
    <>
      <h1 className="text-center text-2xl bg-blue-300 my-2 p-2">
        Manage your tasks here!
      </h1>
      <div className="flex gap-2 mx-2">
        <TextField
          sx={{
            marginLeft: 2,
          }}
          id="outlined-basic"
          label={tasks.length + 1 + ". New Task"}
          variant="outlined"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <Button
          sx={{
            marginRight: 2,
          }}
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => handleAddTask(task)}
        >
          Add Task
        </Button>
      </div>
      <div>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            <CheckboxList tasks={tasks} />
            <div className="flex justify-between mx-2 my-2">
              <Button
                variant="contained"
                disabled={!pagination?.hasPrevPage}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <Typography variant="body1">
                Page {pagination?.currentPage} of {pagination?.totalPages}
              </Typography>
              <Button
                variant="contained"
                disabled={!pagination?.hasNextPage}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Todopage;
