import { StatusBar } from "expo-status-bar";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

const STORAGE_KEY = "@todos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});
  useEffect(() => {
    loadTodos();
  }, []);
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const saveTodos = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadTodos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    if (s) {
      setTodos(JSON.parse(s));
    }
  };
  const addTodo = async () => {
    if (text === "") {
      return;
    }
    const newTodos = { ...todos, [Date.now()]: { text, working } };
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText("");
  };
  const deleteTodo = async (key) => {
    Alert.alert("Delete todo", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm sure",
        style: "destructive",
        onPress: async () => {
          const newTodos = { ...todos };
          delete newTodos[key];
          setTodos(newTodos);
          await saveTodos(newTodos);
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <StatusBar style='light' />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.gray }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: !working ? "white" : theme.gray }}>Chill</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          value={text}
          onSubmitEditing={addTodo}
          style={styles.input}
          placeholder={
            working ? "What are you going to do to work?" : "What are you going to do to chill?"
          }
          onChangeText={onChangeText}
          returnKeyType='done'
        />
      </View>
      <ScrollView>
        {Object.keys(todos).map((key) =>
          todos[key].working === working ? (
            <View style={styles.todo} key={key}>
              <Text style={styles.todoText}>{todos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteTodo(key)}>
                <Feather name='x' size={24} color={theme.lightGray} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 75,
    justifyContent: "space-between",
  },
  btnText: {
    color: theme.gray,
    fontSize: 35,
    fontWeight: 500,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginVertical: 30,
    fontSize: 15,
  },
  todo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 17.5,
    paddingHorizontal: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
