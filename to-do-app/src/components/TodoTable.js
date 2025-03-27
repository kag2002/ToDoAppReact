import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import moment from "moment";
import TaskTextDisplay from "./TaskTextDisplay";
import {
  STATUS_FILTERS,
  PRIORITY_OPTIONS,
  TABLE_PAGINATION,
  DATE_FORMAT,
} from "../constants";
import { isOverdue, capitalizeFirstLetter } from "../utils";

// dnd-kit imports
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Custom draggable row with drag handle icon cell
const DraggableBodyRow = (props) => {
  const { children, ...restProps } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: restProps["data-row-key"],
    });
  const style = {
    ...restProps.style,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Render a custom cell for the drag handle
  // Remove the default first cell (which belongs to the drag column) and replace it with our handle.
  return (
    <tr ref={setNodeRef} style={style} {...attributes}>
      {children.length > 0 && (
        <td style={{ cursor: "grab", width: 30 }} {...listeners}>
          ☰
        </td>
      )}
      {
        // Remove the first cell provided by Ant Design's default rendering (it corresponds to our drag column)
        Array.isArray(children) && children.length > 0
          ? children.slice(1)
          : children
      }
    </tr>
  );
};

const TodoTable = ({
  todos,
  onToggleTodo,
  onDeleteClick,
  onEditClick,
  onReorder,
}) => {
  // Local state for maintaining row order
  const [data, setData] = useState(todos);

  useEffect(() => {
    setData(todos);
  }, [todos]);

  const sortByText = (a, b) => a.text.localeCompare(b.text);

  const sortByDate = (a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return moment(a.dueDate, DATE_FORMAT).diff(moment(b.dueDate, DATE_FORMAT));
  };

  // Add a new column at the beginning for the drag handle
  const columns = [
    {
      title: "",
      dataIndex: "drag",
      key: "drag",
      width: 30,
      render: () => null, // empty cell; the drag handle is rendered in the custom row component
    },
    {
      title: "Task",
      dataIndex: "text",
      key: "text",
      sorter: sortByText,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <TaskTextDisplay
          text={text}
          completed={record.completed}
          record={record}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (completed ? "Completed" : "Waiting"),
      filters: STATUS_FILTERS,
      onFilter: (value, record) => record.completed === value,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      filters: PRIORITY_OPTIONS,
      onFilter: (value, record) => record.priority === value,
      render: capitalizeFirstLetter,
    },
    {
      title: "Due Date & Time",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: sortByDate,
      sortDirections: ["descend", "ascend"],
      render: (dueDate, record) => {
        if (!dueDate) return "-";
        return (
          <span
            style={{
              color: isOverdue(dueDate, record.completed) ? "red" : "inherit",
            }}
          >
            {moment(dueDate, DATE_FORMAT).format(DATE_FORMAT)}
          </span>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            color="cyan"
            variant="solid"
            onClick={() => onToggleTodo(record.key)}
            style={{ marginRight: 4 }}
          >
            {record.completed ? "Mark as Undone" : "Mark as Done"}
          </Button>
          <Button
            color="primary"
            variant="solid"
            onClick={() => onEditClick(record)}
            style={{ marginRight: 4 }}
          >
            View / Edit
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => onDeleteClick(record)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // Handler for drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item.key === active.id);
      const newIndex = data.findIndex((item) => item.key === over.id);
      const newData = arrayMove(data, oldIndex, newIndex);
      setData(newData);
      // Optional: notify parent component about reordering
      if (onReorder) {
        onReorder(newData);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={data.map((item) => item.key)}
        strategy={verticalListSortingStrategy}
      >
        <Table
          dataSource={data}
          columns={columns}
          pagination={TABLE_PAGINATION}
          style={{ marginTop: 20 }}
          rowKey="key"
          components={{
            body: {
              row: DraggableBodyRow,
            },
          }}
        />
      </SortableContext>
    </DndContext>
  );
};

export default TodoTable;
