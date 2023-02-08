import { Text, View } from "react-native";

import { TodoListProps } from "../Screens/Home";

interface ProgressProps {
  todoList: TodoListProps;
}

export function Progress({ todoList }: ProgressProps) {
  return (
    <View className="w-full mt-6 flex-row justify-between">
      <View className="flex-row items-center">
        <Text className="text-blue-500 font-bold">Tarefas criadas</Text>
        <Text className="ml-2 px-2 py-[2px] bg-gray-400 rounded-full text-gray-200 font-bold">
          {todoList.length}
        </Text>
      </View>

      <View className="flex-row items-center font-bold">
        <Text className="text-purple-500 font-bold">Concluídas</Text>
        <Text className="ml-2 px-2 py-[2px] bg-gray-400 rounded-full text-gray-200 font-bold">
          {todoList.filter((todo) => todo.checked).length} de {todoList.length}
        </Text>
      </View>
    </View>
  );
}
