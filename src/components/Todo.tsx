import { View, Text, TouchableOpacity } from "react-native";
import { Trash, Check } from "phosphor-react-native";
import clsx from "clsx";

interface TodoProps {
  id: string;
  title: string;
  checked: boolean;
  checkTodo: () => void;
  deleteTodo: () => void;
  editTodo: () => void;
}

export function Todo({
  title,
  checked,
  checkTodo,
  editTodo,
  deleteTodo,
}: TodoProps) {
  return (
    <View className="mb-3 p-4 flex-row justify-between bg-gray-500 border border-gray-400 rounded-lg">
      <TouchableOpacity activeOpacity={0.4} onPress={checkTodo} className="p-1">
        <View
          className={clsx(
            "w-6 h-6 items-center justify-center border border-blue-500 rounded-full",
            {
              ["bg-purple-500 border-0"]: checked,
            }
          )}
        >
          {checked && <Check size={18} color="white" />}
        </View>
      </TouchableOpacity>
      <Text
        className="ml-3 flex-1 text-sm text-gray-100 leading-snug"
        onPress={editTodo}
      >
        {title}
      </Text>
      <TouchableOpacity className="ml-3 rounded-lg p-1" onPress={deleteTodo}>
        <Trash size={24} color="#808080" />
      </TouchableOpacity>
    </View>
  );
}
