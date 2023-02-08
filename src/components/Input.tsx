import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="px-4 py-3 flex-1 bg-gray-500 border border-gray-700 rounded-lg text-white"
      placeholderTextColor="#808080"
      {...rest}
    />
  );
}
