import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { Home } from "./src/Screens/Home";
import { Loading } from "./src/components/Loading";
import { LightStatusBar } from "./src/components/LightStatusBar";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Home />
      <LightStatusBar />
    </>
  );
}
