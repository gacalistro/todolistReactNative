import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Feather } from "@expo/vector-icons";

import { Todo } from "../components/Todo";
import { Progress } from "../components/Progress";
import { EmptyList } from "../components/EmptyList";
import { EditModal } from "../components/EditModal";
import { Input } from "../components/Input";

export type TodoListProps = {
  id: string;
  title: string;
  checked: boolean;
}[];

export function Home() {
  const [todoList, setTodoList] = useState<TodoListProps>([]);
  const [title, setTitle] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [todoEditTitle, setTodoEditTitle] = useState("");
  const [todoEditId, setTodoEditId] = useState("");

  function handleCreateTodo() {
    try {
      if (title.trim() === "") {
        return Alert.alert("Ops!", "Escreva o nome da tarefa");
      }

      setTodoList((prevState) => [
        ...prevState,
        {
          id: `${uuid.v4()}`,
          title,
          checked: false,
        },
      ]);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
    }
  }

  function handleCheckTodo(id: string) {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }

        return todo;
      })
    );
  }

  function handleEditTodo(id: string, newTitle: string) {
    const updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.title = newTitle;
      }

      return todo;
    });

    setTodoList(updatedList);
    closeModal();
  }

  function handleDeleteTodo(id: string) {
    setTodoList((prevState) => prevState.filter((todo) => todo.id !== id));
  }

  function openModal(id: string, title: string) {
    setModalStatus(true);
    setTodoEditTitle(title);
    setTodoEditId(id);
  }

  function closeModal() {
    setModalStatus(false);
  }

  async function loadTodoList() {
    const todoListStorage = await AsyncStorage.getItem("todoList");

    const parsedTodoList =
      todoListStorage != null ? JSON.parse(todoListStorage) : [];

    parsedTodoList.length > 0 ? setTodoList(parsedTodoList) : null;
  }

  async function storeTodoList() {
    await AsyncStorage.setItem("todoList", JSON.stringify(todoList));
  }

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    storeTodoList();
  }, [todoList]);

  return (
    <View className="p-8 pt-16 flex-1 items-center bg-gray-600">
      <View className="bg-gray-700 h-[165px] w-screen absolute" />

      <Text className="mb-8 font-extrabold text-4xl text-purple-900">
        <Text className="text-blue-900">to</Text>do
      </Text>

      <View className="flex-row gap-2">
        <Input
          onChangeText={setTitle}
          value={title}
          placeholder="Adicione uma nova tarefa"
        />

        <TouchableOpacity
          className="mt-16 p-3 flex-row items-center justify-center bg-blue-500 rounded-lg"
          activeOpacity={0.6}
          onPress={handleCreateTodo}
        >
          <Feather name="plus-circle" size={24} color="#F2F2F2" />
        </TouchableOpacity>
      </View>

      <Progress todoList={todoList} />

      <FlatList
        className="w-full mt-4"
        data={todoList}
        renderItem={({ item }) => (
          <Todo
            {...item}
            checkTodo={() => handleCheckTodo(item.id)}
            editTodo={() => openModal(item.id, item.title)}
            deleteTodo={() => handleDeleteTodo(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyList />}
        extraData={todoList}
      />

      <EditModal
        visible={modalStatus}
        closeModal={closeModal}
        title={todoEditTitle}
        saveTodoEdit={(newTitle) => handleEditTodo(todoEditId, newTitle)}
      />
    </View>
  );
}
