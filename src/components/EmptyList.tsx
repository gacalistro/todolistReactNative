import { View, Text } from "react-native";
import { Octicons } from "@expo/vector-icons";

export function EmptyList() {
  return (
    <View className="mt-[50%] items-center">
      <Octicons name="checklist" size={56} color="#333333" />

      <Text className="mt-6 text-gray-300 font-bold text-sm">
        Você ainda não tem tarefas cadastradas
      </Text>
      <Text className="text-gray-300 font-regular text-sm">
        Crie tarefas e organize seus itens a fazer
      </Text>
      <Text className="text-gray-300 font-regular text-sm">
        Após criar, clique na tarefa para editar
      </Text>
    </View>
  );
}
