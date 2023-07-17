import { Flex, Checkbox, Box, Text } from "@chakra-ui/react";
import { MyInsertTask } from "./entites/MyInsertTask";
import { IMyDayProps } from "@/models/Day.props.model";
import { TaskUpdateServices } from "@/services";
import { ITask } from "@/models";
import { useMyModalTask } from "./entites/useMyModalTask";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import MyTask from "./entites/MyTask";

const MyDay = ({
  day,
  month,
  year,
  tasks,
  selectedDate,
  onSelectDate,
}: IMyDayProps) => {
  const handleClick = () => {
    onSelectDate(day);
  };
  const isSelected = selectedDate?.getDate() === day;
  const { fetchTasks, updateTask, setTasks } = useContext(TaskContext)!;
  const taskUpdateService = new TaskUpdateServices();

  const updateTaskInState = (updatedTask: ITask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const { onTaskOpen, ModalComponent } = useMyModalTask(
    selectedDate || undefined,
    fetchTasks,
    updateTaskInState
  );

  const handleCheckboxChange = async (task: ITask) => {
    task.toggle = !task.toggle;
    try {
      await taskUpdateService.updateTask(task._id, task);
      fetchTasks();
    } catch (error: unknown) {
      console.log("Hubo un error al actualizar la tarea", error);
    }
  };

  const handleTaskClick = (task: ITask) => {
    onTaskOpen(task);
  };

  return (
    <Flex
      className={`aspect-content flex-grow border border-gray-800 ${
        isSelected ? "bg-gray-950" : ""
      }`}
      style={{
        flexBasis: "14.2857%",
        flexShrink: 0,
        aspectRatio: "1 / 1",
      }}
      direction="column"
      position="relative"
      onClick={handleClick}
    >
      <span
        style={{
          position: "absolute",
          top: "4px",
          left: "4px",
        }}
      >
        {day}
      </span>
      <MyTask
        tasks={tasks}
        handleTaskClick={handleTaskClick}
        handleCheckboxChange={handleCheckboxChange}
      ></MyTask>
      <MyInsertTask
        selectedDate={selectedDate}
        setTasks={setTasks}
        fetchTasks={fetchTasks}
      />
      {ModalComponent}
    </Flex>
  );
};

export default MyDay;
