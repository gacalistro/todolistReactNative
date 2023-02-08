import { useState, useEffect } from "react";
import {
  Modal,
  ModalBaseProps,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Input } from "./Input";

interface EditModalProps extends ModalBaseProps {
  title: string;
  closeModal: () => void;
  saveTodoEdit: (title: string) => void;
}

export function EditModal({
  title,
  closeModal,
  saveTodoEdit,
  ...rest
}: EditModalProps) {
  const [newTitle, setNewTitle] = useState(title);

  function handleCancelEdit() {
    setNewTitle(title);
    closeModal();
  }

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  return (
    <Modal {...rest} transparent statusBarTranslucent>
      <View className="flex-1 items-center justify-center p-8 bg-gray-700/90">
        <Text className="mb-3 font-bold text-gray-300 text-xl">
          Editar tarefa
        </Text>
        <View className="flex-row mb-3">
          <Input value={newTitle} onChangeText={setNewTitle} />
        </View>

        <View className="flex-row justify-around gap-4">
          <TouchableOpacity
            className="bg-blue-500 p-4 flex-1 rounded-lg items-center"
            onPress={handleCancelEdit}
          >
            <Text className="font-bold text-gray-200">Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-purple-500 p-4 flex-1 rounded-lg items-center"
            onPress={() => saveTodoEdit(newTitle)}
          >
            <Text className="font-bold text-gray-200">Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
